import multer from "multer";
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import fs from 'fs';

const uploadDir1 = path.join(process.cwd(), 'backend/public/uploads/user');
fs.mkdirSync(uploadDir1, { recursive: true });

const uploadDir2 = path.join(process.cwd(), 'backend/public/uploads/product');
fs.mkdirSync(uploadDir2, { recursive: true });

// configure with filename and storage
const storageA = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, uploadDir1);
	},
	filename: (req, file, cb) => {
		const ext = path.extname(file.originalname);
		const publicId = uuidv4(); // unique public ID
		const filename = publicId + ext;
		cb(null, filename);
	},
});
const uploadA = multer({
	storage: storageA,
});
const storageB = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, uploadDir2);
	},
	filename: (req, file, cb) => {
		const uniqueId = uuidv4(); // public id
		const ext = path.extname(file.originalname);
		const customFileName = `${uniqueId}${ext}`;
		file.publicId = uniqueId; // store publicId in file object
		cb(null, customFileName);
	},
});
const uploadB = multer({
	storage: storageB,
});
export { uploadA, uploadB };
