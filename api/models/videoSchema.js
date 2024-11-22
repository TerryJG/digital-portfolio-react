import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
    dataFancybox: { type: String, required: true },
    contentType: { type: String, required: true },
    category: { type: String, required: true },
    'data-date': { type: String, required: true },
    isFeatured: { type: Boolean, required: true },
    isArchived: { type: Boolean, required: true },
    caption: { type: String, required: true },
    src: { type: String, required: true },
    fallbackSrc: { type: String },
    thumbnailImageAlt: { type: String, required: true },
    videoPreview: { type: String },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    icons: [{ type: String }],
    itemType: { type: String },
    imgSrc: { type: String }
}, {
    timestamps: true,
    collection: 'videos'
});

export const Video = mongoose.model('Video', videoSchema);