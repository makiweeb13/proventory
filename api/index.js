const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '..', 'server', '.env') });

const { errorHandler } = require('../server/middleware/errorHandler');

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

const routes = require('../server/routes');

app.use('/api/user', routes.userRoutes);
app.use('/api/category', routes.categoryRoutes);
app.use('/api/product', routes.productRoutes);
app.use('/api/sale', routes.saleRoutes);
app.use('/api/stat', routes.statRoutes);
app.use('/api/seed', routes.seedRoutes);

app.use(errorHandler);

if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
