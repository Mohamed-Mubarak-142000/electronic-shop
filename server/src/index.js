import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { createServer } from 'http';
import { Server } from 'socket.io';
import connectDB from './config/db.js';

// Load env vars
dotenv.config();

// Connect to database
connectDB();

import { initScheduler } from './utils/scheduler.js';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: process.env.CLIENT_URL || "http://localhost:3000",
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
        credentials: true
    }
});

// Middleware
app.use(express.json());
app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true
}));
app.use(helmet());
app.use(morgan('dev'));

// Routes
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import brandRoutes from './routes/brandRoutes.js';
import userRoutes from './routes/userRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
import portfolioRoutes from './routes/portfolioRoutes.js';
import jobRoutes from './routes/jobRoutes.js';
import Message from './models/Message.js';
import jwt from 'jsonwebtoken';
import User from './models/User.js';

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/brands', brandRoutes);
app.use('/api/users', userRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/jobs', jobRoutes);
import uploadRoutes from './routes/uploadRoutes.js';
app.use('/api/upload', uploadRoutes);

import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Basic route
app.get('/', (req, res) => {
    res.send('Electro Shop API is running...');
});

// Socket.IO authentication middleware
io.use(async (socket, next) => {
    try {
        const token = socket.handshake.auth.token;
        if (!token) return next(new Error("Authentication error"));

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select("-password");

        if (!user) return next(new Error("User not found"));

        socket.user = user;
        next();
    } catch (err) {
        next(new Error("Authentication error"));
    }
});

// Socket.IO connection
io.on('connection', (socket) => {
    console.log(`User connected: ${socket.user?.name} (${socket.id})`);

    socket.on('join_room', (roomId) => {
        // Validation: user can only join their own room unless they are admin
        if (socket.user.role !== 'admin' && socket.user._id.toString() !== roomId) {
            console.log(`Unauthorized room access attempt by ${socket.user.name} to room ${roomId}`);
            return;
        }
        socket.join(roomId);
        console.log(`User ${socket.user.name} joined room: ${roomId}`);
    });

    socket.on('send_message', async (data) => {
        const { roomId, text } = data;
        let { to } = data;

        try {
            // if 'to' is not provided and sender is a user, find an admin
            if (!to && socket.user.role === 'user') {
                const admin = await User.findOne({ role: 'admin' });
                if (admin) {
                    to = admin._id;
                } else {
                    console.error('No admin found to receive message');
                    return;
                }
            } else if (!to) {
                console.error('Recipient "to" is required');
                return;
            }

            const message = await Message.create({
                from: socket.user._id,
                to: to,
                roomId,
                text
            });

            const populatedMessage = await Message.findById(message._id)
                .populate('from', 'name role')
                .populate('to', 'name role');

            io.to(roomId).emit('receive_message', populatedMessage);
        } catch (error) {
            console.error('Error saving message:', error);
        }
    });

    socket.on('disconnect', () => {
        console.log('User disconnected', socket.id);
    });
});

// Make io accessible in routes
app.set('io', io);

// Initialize Scheduler
initScheduler(io);

// Custom Error Handling Middleware
app.use((err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    console.error(`[Error] ${err.message}`);
    if (process.env.NODE_ENV !== 'production') {
        console.error(err.stack);
    }
    res.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
});

const PORT = process.env.PORT || 5000;

const server = httpServer.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.error(`Unhandled Rejection: ${err.message}`);
    // Optional: Gracefully shutdown server if critical
    // server.close(() => process.exit(1));
});

// Graceful shutdown handling
const gracefulShutdown = () => {
    console.log('Received signal to terminate. Shutting down gracefully...');
    server.close(() => {
        console.log('HTTP server closed.');
        // Close database connection
        // mongoose.connection.close(false, () => {
        //     console.log('MongoDb connection closed.');
        //     process.exit(0);
        // });
        process.exit(0);
    });
};

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);
