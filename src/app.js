import express from 'express';
import handlebars, { create } from 'express-handlebars';
import __dirname from './utils.js';
import mongoose from 'mongoose';
import methodOverride from 'method-override';

//config will contains the environment variables
import { config } from './config/config.js';

//import routers
import viewsRouter from './routes/views.router.js';
import productRouter from './routes/product.router.js';
import cartRouter from './routes/cart.router.js';

//create a new express app
const app = express();

//Middleware to analyze the body of applications
app.use(express.json()); //indicate that now we can receive JSON at the time of receiving requests
app.use(express.urlencoded({ extended: true })); //Allows information to also be sent from the URL

//Configure the handlebars template engine
// Create a Handlebars instance
const hbs = create({
	defaultLayout: 'main',
	helpers: {
		eq: (a, b) => a === b, // Register helper properly
	},
});

app.engine('handlebars', hbs.engine);
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

//define the 'public' folder where static files are
app.use(express.static(`${__dirname}/public`));

// to allow the use of PUT and DELETE methods using forms
app.use(methodOverride('_method'));

// Implement the routers
app.use('/', viewsRouter);
app.use('/products', productRouter);
app.use('/carts', cartRouter);

// Connect to the database
mongoose
	.connect(config.MONGODB_URI)
	.then(() => {
		const uriWithoutPassword = config.MONGODB_URI.replace(
			/(?<=:\/\/)(.*?)(?=@)/,
			'*****'
		);
		console.log(
			`Connected to the "${config.DB_NAME}" database, at ${uriWithoutPassword}`
		);
	})
	.catch((err) => {
		console.error("Couldn't connect to the database", err);
	});

// Initialize the http server
const httpServer = app.listen(config.PORT, () => {
	console.log(`Server is running on port ${config.PORT}`);
});
