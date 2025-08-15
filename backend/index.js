import './env.js';

import express from "express";
import path from "path";
import cors from "cors";

import {
	errorHandlerMiddleware,
	handleUncaughtError,
} from "./middlewares/errorHandlerMiddleware.js";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";
import apiDocs from '../swagger.json' with {type: 'json'}
import swagger from "swagger-ui-express";
import productRoutes from "./src/product/routes/product.routes.js";
import userRoutes from "./src/user/routes/user.routes.js";
import orderRoutes from "./src/order/routes/order.routes.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = express();

server.use(cors({
	origin: ["https://brandify-8mm5.onrender.com", "http://localhost:5173"],
	credentials: true
}));
server.use(express.json()); // to accept json
server.use(cookieParser());

// swagger open api for testing
server.use("/api-docs", swagger.serve, swagger.setup(apiDocs));

server.get("/api/test", (req, res) => {
	res.send("hello")
});

// configure routes
server.use("/api/brandify/user", userRoutes);
server.use("/api/brandify/product", productRoutes);
server.use("/api/brandify/order", orderRoutes);


// errorHandlerMiddleware 
server.use(errorHandlerMiddleware);

// console.log("process.cwd(): ", process.cwd());
// console.log("__dirname: ", __dirname);


if(process.env.NODE_ENV === 'PRODUCTION') {
	server.use("/static", express.static(path.join(__dirname, '/public')));

	server.use(express.static(path.join(__dirname, '../frontend/dist')));

	server.get(/^(.*)$/, (req, res) => {
		res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
	})
}

export default server;
