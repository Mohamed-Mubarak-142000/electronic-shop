import Brand from '../models/Brand.js';

// Helper to create slug
const createSlug = (name) => {
    return name
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '');
};

// @desc    Fetch all brands
// @route   GET /api/brands
// @access  Public
export const getBrands = async (req, res) => {
    try {
        const brands = await Brand.find({});
        res.json(brands);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a brand
// @route   POST /api/brands
// @access  Private/Admin
export const createBrand = async (req, res) => {
    try {
        const { name, logoUrl, description } = req.body;

        const brandExists = await Brand.findOne({ name });
        if (brandExists) {
            return res.status(400).json({ message: 'Brand already exists' });
        }

        const brand = await Brand.create({
            name,
            slug: createSlug(name),
            logoUrl,
            description
        });

        res.status(201).json(brand);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update a brand
// @route   PUT /api/brands/:id
// @access  Private/Admin
export const updateBrand = async (req, res) => {
    try {
        const { name, logoUrl, description } = req.body;
        const brand = await Brand.findById(req.params.id);

        if (brand) {
            brand.name = name || brand.name;
            brand.logoUrl = logoUrl || brand.logoUrl;
            brand.description = description || brand.description;

            if (name && name !== brand.name) {
                brand.slug = createSlug(name);
            }

            const updatedBrand = await brand.save();
            res.json(updatedBrand);
        } else {
            res.status(404).json({ message: 'Brand not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a brand
// @route   DELETE /api/brands/:id
// @access  Private/Admin
export const deleteBrand = async (req, res) => {
    try {
        const brand = await Brand.findById(req.params.id);

        if (brand) {
            await brand.deleteOne();
            res.json({ message: 'Brand removed' });
        } else {
            res.status(404).json({ message: 'Brand not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
