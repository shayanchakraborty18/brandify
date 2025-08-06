import server from "./index.js";
import connectToMongoDB from "./config/mongodbConfig.js";

const PORT = process.env.PORT || 3000;

server.listen(PORT, async () => {
	console.log(`Server running at port ${PORT}`);
	//connect to mongo db
	await connectToMongoDB();
}) 