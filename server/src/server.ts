import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { AddressInfo } from 'node:net';
import serverlessExpress from '@vendia/serverless-express';

import mainRoute from './routes/main';
import authRoute from './routes/auth';
import setupDiscordAuth from './strategies/discordStrategy';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

setupDiscordAuth();

app.use('/', mainRoute);
app.use('/auth', authRoute);

if (process.env.NODE_ENV !== "production") {
	const server = app.listen(5000, () => {
		console.log(`Server started on port ${(server.address() as AddressInfo).port}...`);
	});
}
exports.handler = serverlessExpress({ app });