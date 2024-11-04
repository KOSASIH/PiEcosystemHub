// marketplace-service.js

const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const multer = require('multer');
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());
app.use('/uploads', express.static('uploads')); // Serve uploaded files

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Product Schema
const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  category: String,
  image: String, // Path to the uploaded image
  reviews: [{ user: String, rating: Number, comment: String }],
  createdAt: { type: Date, default: Date.now }
});

const Product = mongoose.model('Product', productSchema);

// User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: String
});

const User = mongoose.model('User ', userSchema);

// Middleware for authentication
const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to filename
  }
});

const upload = multer({ storage });

// User registration
app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashedPassword });
  
  try {
    await user.save();
    res.status(201).json({ message: 'User  registered successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error registering user', error });
  }
});

// User login
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  
  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// List products with optional search and pagination
app.get('/api/products', async (req, res) => {
  const { search, category, page = 1, limit = 10 } = req.query;
  const query = {};
  
  if (search) {
    query.name = { $regex: search, $options: 'i' }; // Case-insensitive search
  }
  
  if (category) {
    query.category = category;
  }
  
  try {
    const products = await Product.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit);
    const count = await Product.countDocuments(query);
    
    res.json({
      products,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error });
  }
});

// Create a new product (protected route)
app.post('/api/products', authenticateJWT, upload.single('image'), async (req, res) => {
  const newProduct = new Product({
    ...req.body,
    image: req.file ? req.file.path : null // Save the path of the uploaded image
  });

  try {
    await newProduct.save();
    res.status(201).json({ message: 'Product created', product: newProduct });
  } catch (error) {
    res.status(400).json({ message: 'Error creating product', error });
  }
});

// Update a product (protected route)
app.put('/api/products/:id', authenticateJWT, upload.single('image'), async (req, res) => {
  const { id } = req.params;
  const updateData = { ...req.body };

  if (req.file) {
    updateData.image = req.file.path; // Update image if a new one is uploaded
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product updated', product: updatedProduct });
  } catch (error) {
    res.status(400).json({ message: 'Error updating product', error });
  }
});

// Delete a product (protected route)
app.delete('/api/products/:id', authenticateJWT, async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error });
  }
});

// Add a review to a product (protected route)
app.post('/api/products/:id/reviews', authenticateJWT, async (req, res) => {
  const { id } = req.params;
  const { rating, comment } = req.body;

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    product.reviews.push({ user: req.user.username, rating, comment });
    await product.save();
    res.status(201).json({ message: 'Review added', reviews: product.reviews });
  } catch (error) {
    res.status(400).json({ message: 'Error adding review', error });
  }
});

// Get all reviews for a product
app.get('/api/products/:id/reviews', async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ reviews: product.reviews });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reviews', error });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Marketplace service running on port ${PORT}`);
});
