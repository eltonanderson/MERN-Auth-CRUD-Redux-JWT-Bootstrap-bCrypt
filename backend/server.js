import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js';

const port = process.env.PORT || 3000;

connectDB();

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use(cookieParser());

server.use('/api/users', userRoutes);

if (process.env.NODE_ENV === 'production') {
    const __dirname = path.resolve();
    server.use(express.static(path.join(__dirname, '/frontend/dist')));

    server.get('*', (req, res) =>
        res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
    );
} else {
    server.get('/', (req, res) => {
        res.send('API is running....');
    });
}

server.use(notFound);
server.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
