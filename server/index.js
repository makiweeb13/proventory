const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const { errorHandler } = require('./middleware/errorHandler');

dotenv.config();

// Configure CORS to allow frontend origin and allow credentials
const corsOptions = {
  origin: process.env.FRONTEND_URL, // frontend URL
  credentials: true // Allow credentials (cookies, authorization headers)
};

// Middleware 
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Import routes
const routes = require('./routes');

// Routes
app.use('/user', routes.userRoutes);
app.use('/category', routes.categoryRoutes);
app.use('/product', routes.productRoutes);
app.use('/sale', routes.saleRoutes);

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
