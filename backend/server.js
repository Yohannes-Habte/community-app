import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import cookieParser from 'cookie-parser';

// Routes
import globalErrorHandler from './middlewares/globalErrorHandler.js';
import financeRouter from './routes/financeRoutes.js';
import commentRouter from './routes/commentRoutes.js';
import memberRouter from './routes/memberRoutes.js';
import authUserRouter from './routes/authUserRoutes.js';
import prayerRequestRouter from './routes/prayerRequestRoutes.js';
import sacramentRouter from './routes/sacramentRoutes.js';
import spiritualRouter from './routes/spiritualRoutes.js';
import addressTypeRouter from './routes/addressTypeRoutes.js';
import priestDelegationRouter from './routes/priestDelegationRoutes.js';
import committeeRouter from './routes/committeesRoutes.js';
import contributionRouter from './routes/contributionRoutes.js';
import eventRouter from './routes/eventRoutes.js';

// Express app
const app = express();
app.use(cookieParser());
app.use(
  cors({
    origin: ['http://localhost:3000', 'http://church-app'],
    credentials: true,
  })
);
app.use(express.json());

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
app.use('/api/auth', authUserRouter);
app.use('/api/members', memberRouter);
app.use('/api/addressTypes', addressTypeRouter);
app.use('/api/committees', committeeRouter);
app.use('/api/finances', financeRouter);
app.use('/api/prayers', prayerRequestRouter);
app.use('/api/sacraments', sacramentRouter);
app.use('/api/spirituals', spiritualRouter);
app.use('/api/comments', commentRouter);
app.use('/api/delegations', priestDelegationRouter);
app.use('/api/contributions', contributionRouter);
app.use('/api/events', eventRouter);

// Static assets
app.use(express.static('assets'));

// Global error handler
app.use(globalErrorHandler);

// Server Listner
const port = process.env.PORT || 4000;
app.listen(port, () => {
  connectToDB();
  console.log(`The server starts on port ${port}`.blue.bold);
});
