const express = require('express');
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const eventRoutes = require('./categoryRoutes');
const bannerRoutes = require('./bannerRoutes');
const blogRoutes = require('./blogRoutes');
const videoRoutes = require('./videoRoutes');

const galleryRoutes = require('./galleryRoutes');




const router = express.Router();

router.use('/v1/auth', authRoutes);
router.use('/v1/user', userRoutes);
router.use('/v1/event', eventRoutes);
router.use('/v1/banners', bannerRoutes);
router.use('/v1/blogs', blogRoutes);
router.use('/v1/videos', videoRoutes);
router.use('/v1/gallery', galleryRoutes);



module.exports = router;
