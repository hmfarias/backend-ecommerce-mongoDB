import multer from 'multer';
import __dirname from './utils.js';

//Before starting Multer, we must configure where the files will be stored
const storage = multer.diskStorage({
	//destination will refer to the folder where the file is going to be saved
	destination: function (req, file, cb) {
		cb(null, __dirname + '/public/img'); //We specify the folder at this point
	},
	//Filename will refer to the final name that the file will contain
	filename: function (req, file, cb) {
		const timestamp = Date.now();
		cb(null, `${timestamp}-${file.originalname}`); //Originalname indicates that the initial name is conserved
	},
});

export const uploader = multer({ storage });
