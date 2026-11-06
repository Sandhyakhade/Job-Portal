import express, { urlencoded } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/db.js';
dotenv.config();
connectDB();
const app = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 5000
app.get('/api/v1/health', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'Job portal api is running smoothly',
        timestamp:new Date().toISOString(),
    })
})
app.listen(PORT, () => {
    console.log(`server running on PORT:${PORT}`);
})