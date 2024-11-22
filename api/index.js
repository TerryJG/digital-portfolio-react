import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import imageRoutes from './routes/imageRoutes.js';
import videoRoutes from './routes/videoRoutes.js';
import categoryInfoRoutes  from "./routes/categoryInfoRoutes.js";

const app = express();
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// Static files
app.use(express.static(path.join(__dirname, '..', 'dist')));
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use((req, res, next) => {
    console.log('Full URL:', req.url);
    console.log('Base URL:', req.baseUrl);
    console.log('Original URL:', req.originalUrl);
    next();
});

// Routes
app.use('/portfolio/images', imageRoutes);
app.use('/portfolio/videos', videoRoutes);
app.use('/portfolio/categoryInfo', categoryInfoRoutes);

// Serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'), (err) => {
        if (err) {
            res.status(500).send(err);
        }
    });
});

// Fallback route
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'), (err) => {
        if (err) {
            res.status(500).send(err);
        }
    });
});

// MongoDB connection
if (!process.env.MONGO_URI) {
    console.error('MONGO_URI is not defined in environment variables');
    process.exit(1);
}

mongoose.connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    maxPoolSize: 10,
    maxIdleTimeMS: 60000,
    socketTimeoutMS: 45000,
})
    .then(() => {
        console.log('Connected to MongoDB successfully');
        // Remove the conditional server start since Vercel handles this
        if (!process.env.VERCEL) {
            app.listen(process.env.PORT || 3000, () => {
                console.log(`Server is listening on port ${process.env.PORT || 3000}`);
            });
        }
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

export default app;