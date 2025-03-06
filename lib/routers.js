const express = require("express");
const productsRouter = express.Router();
const Products = require("./../models/productModel");
const mongoose = require("mongoose");

// GET all products
productsRouter.get('/', async (req, res, next) => {
  try {
    const products = await Products.find();
    res.json(products);
  } catch (err) {
    next(err);
  }
});

// GET a single product by ID
productsRouter.get('/:id', async (req, res, next) => {


  const id = new mongoose.Types.ObjectId(req.params.id);
  if (!mongoose.isValidObjectId(id)) return res.status(400).json({ message: 'Invalid ID' });
  //check mongo id is valid or not
  try {
    const product = await Products.findById(id); 
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    next(err);
  }
});

productsRouter.post('/', async (req, res, next) => {
  try {
    const newProduct = new Products(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    next(err);
  }
});

// Update a product
productsRouter.put('/:id', async (req, res, next) => {
  const id = new mongoose.Types.ObjectId(req.params.id);

  try {
    const updatedProduct = await Products.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });
    res.json(updatedProduct);
  } catch (err) {
    next(err);
  }
});

// Delete a product
productsRouter.delete('/:id', async (req, res, next) => {
  const id = new mongoose.Types.ObjectId(req.params.id);

  try {
    const deleteProduct = await Products.findByIdAndDelete(id);
    if (!deleteProduct) return res.status(404).json({ message: "Product not found!" });
    res.status(200).json({ message: "Product deleted successfully!" });
  } catch (err) {
    next(err);
  }
});

module.exports = productsRouter;
