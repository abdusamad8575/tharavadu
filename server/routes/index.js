const express = require('express');
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const productRoutes = require('./productRoutes');
const orderRoutes = require('./orderRoutes');
const eventRoutes = require('./categoryRoutes');
const addressRoutes = require('./addressRoutes');
const bannerRoutes = require('./bannerRoutes');
const blogRoutes = require('./blogRoutes');
const testimonialRoutes = require('./testimonialRoutes');
const brandRoutes = require('./brandRoutes');
const reviewRoutes = require('./reviewRoutes');
const videoRoutes = require('./videoRoutes');

const galleryRoutes = require('./galleryRoutes');




const router = express.Router();

router.use('/v1/auth', authRoutes);
router.use('/v1/user', userRoutes);
router.use('/v1/event', eventRoutes);
router.use('/v1/products', productRoutes);   
router.use('/v1/orders', orderRoutes);
router.use('/v1/address', addressRoutes);
router.use('/v1/banners', bannerRoutes);
router.use('/v1/blogs', blogRoutes);
router.use('/v1/testimonials', testimonialRoutes);
router.use('/v1/brands', brandRoutes);
router.use('/v1/reviews', reviewRoutes);
router.use('/v1/videos', videoRoutes);

router.use('/v1/gallery', galleryRoutes);



module.exports = router;
