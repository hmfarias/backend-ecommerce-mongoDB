//import dotenv and initialize environment variables
import dotenv from 'dotenv';
dotenv.config(); //load the .env file

export const config = {
	PORT: process.env.PORT || 8080,
	MONGODB_URI: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`,
};
