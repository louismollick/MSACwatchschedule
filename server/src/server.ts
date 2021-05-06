import dotenv from 'dotenv';
import express from 'express';
import dynamoose from 'dynamoose';
import cors from 'cors';
import serverless from 'serverless-http';
import rootRoute from './routes/root';
import authRoute from './routes/auth';
import apiRoute from './routes/auth';
import './strategies/discordStrategy';
import './strategies/jwtStrategy';

// Connects to DynamoDB local database on port 8000
if (process.env.NODE_ENV !== 'production') dynamoose.aws.ddb.local();

// Express app configuration
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Configure routes
app.use('/', rootRoute);
app.use('/auth', authRoute);
app.use('/api', apiRoute);

module.exports.handler = serverless(app);

// app.listen(5000, () => {
//   console.log(`Server started...`);
// });
