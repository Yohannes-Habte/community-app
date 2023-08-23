import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';

// Routes
import userRouter from './routes/userRoutes.js';
import globalErrorHandler from './middlewares/globalErrorHandler.js';
import financeRouter from './routes/financeRoutes.js';
import prayerServiceRouter from './routes/prayerServiceRoutes.js';
import sacramentRouter from './routes/sacramentRoutes.js';
import spiritualDevelopmentRouter from './routes/spiritualDevelopmentRoutes.js';
import commentRouter from './routes/commentRoutes.js';

// Express app
const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 4000;

// Security key holder
dotenv.config();

// Connect to DB
const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('DB is connected!'.green.bold);
  } catch (error) {
    console.error;
  }
};

// Display tiny changes
app.use(morgan('tiny'));

// End points
app.use('/api/users', userRouter);
app.use('/api/finances', financeRouter);
app.use('/api/prayers', prayerServiceRouter);
app.use('/api/sacraments', sacramentRouter);
app.use('/api/spiritual-developments', spiritualDevelopmentRouter);
app.use('/api/comments', commentRouter); 

// Static assets
app.use(express.static('assets'));

// Global error handler
app.use(globalErrorHandler);

// Server Listner
app.listen(port, () => {
  connectToDB();
  console.log(`The server starts on port ${port}`.blue.bold);
});
