import './env.js';

import express from "express";
import path from "path";
import cors from "cors";

import {
	errorHandlerMiddleware,
	handleUncaughtError,
} from "./middlewares/errorHandlerMiddleware.js";
import userRoutes from "./src/user/routes/user.routes.js";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";
import apiDocs from '../swagger.json' with {type: 'json'}
import swagger from "swagger-ui-express"; // swagger docs

const server = express();

server.use(cors());
server.use(express.json()); // to accept json
server.use(cookieParser());

// swagger open api for testing
server.use("/api-docs", swagger.serve, swagger.setup(apiDocs));

server.get("/api/test", (req, res) => {
	res.send("hello")
});

if(process.env.NODE_ENV === 'PRODUCTION') {
	const __filename = fileURLToPath(import.meta.url);
	const __dirname = path.dirname(__filename);
	server.use(express.static(path.join(__dirname, '../frontend/dist')));

	server.get(/^(.*)$/, (req, res) => {
		res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
	})
}
// configure routes
server.use("/api/brandify/user", userRoutes);

// errorHandlerMiddleware
server.use(errorHandlerMiddleware);

export default server;
