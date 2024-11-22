import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
    dataFancybox: { type: String, required: true },
    contentType: { type: String, required: true },
    category: { type: String, required: true },
    date: { type: String, required: true },
    isFeatured: { type: Boolean, required: true },
    isArchived: { type: Boolean, required: true },
    caption: { type: String, required: true },
    href: { type: String, required: true },
    fallback_href: { type: String, required: true },
    thumbnailImageAlt: { type: String, required: true }
}, {
    timestamps: true,
    collection: 'images'
});

export const Image = mongoose.model('Image', imageSchema);