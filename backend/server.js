import path from 'path';
import express from 'express';
import dotenv from "dotenv";
dotenv.config();
import cookieParser from 'cookie-parser';
import userRoutes from "./routes/userRoutes.js"
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';

connectDB();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use(cookieParser());

app.use("/api/users", userRoutes);


if (process.env.NODE_ENV === 'production') {
    const __dirname = path.resolve();

    app.use(express.static(path.join(__dirname, 'frontend/dist')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
    });
} else {
    app.get('/', (req, res) => res.send('The Server is Ready!'));
}



// Custom Error Handling
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`server started on port ${port}`));