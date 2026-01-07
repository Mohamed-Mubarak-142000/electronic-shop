import cron from 'node-cron';
import Job from '../models/Job.js';
import Product from '../models/Product.js';

export const initScheduler = (io) => {
    // Run every minute
    cron.schedule('* * * * *', async () => {
        try {
            const now = new Date();
            const pendingJobs = await Job.find({
                status: 'Pending',
                scheduledAt: { $lte: now }
            });

            for (const job of pendingJobs) {
                console.log(`Executing job: ${job.name} (${job._id})`);

                job.status = 'Active';
                await job.save();

                try {
                    if (job.type === 'discount') {
                        if (job.onModel === 'Product' && job.targetId) {
                            const product = await Product.findById(job.targetId);
                            if (product) {
                                // Apply discount logic (e.g. update price or just notify)
                                // For simplicity, let's just emit a notification
                                io.emit('job_executed', {
                                    message: `Special Offer: ${job.data.discountPercentage}% off on ${product.name}!`,
                                    messageAr: `عرض خاص: خصم ${job.data.discountPercentage}% على ${product.nameAr}!`,
                                    productId: product._id
                                });
                            }
                        }
                    } else if (job.type === 'notification') {
                        io.emit('job_notification', {
                            message: job.data.message,
                            messageAr: job.data.messageAr
                        });
                    }

                    job.status = 'Completed';
                } catch (err) {
                    console.error(`Error executing job ${job._id}:`, err);
                    job.status = 'Failed';
                }

                await job.save();
            }
        } catch (error) {
            console.error('Scheduler error:', error);
        }
    });
};
