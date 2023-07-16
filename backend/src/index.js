import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
const PORT = process.env.PORT || 3333;

app.use('/api', authRoutes);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
