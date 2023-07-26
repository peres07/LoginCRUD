import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import bodyParser from 'body-parser';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';
import { validateToken } from './middleware/validateToken.js';
import { validatePassword } from './middleware/validatePassword.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
const PORT = process.env.PORT || 3333;

app.use('/api', authRoutes);
app.use('/api', validateToken, validatePassword, userRoutes);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
