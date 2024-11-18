import express from 'express';
import cors from 'cors';
import { PrismaClient } from "@prisma/client";
import fs from 'fs';

const ProdRouter = express.Router();

//Prisma
const prisma = new PrismaClient({ log: ['query', 'info', 'warn', 'error'], });

// Routes

// Display (get) all products
ProdRouter.get('/api/products/all', async (req, res) => {
    const products = await prisma.product.findMany();
    res.send('Get all Products route.');

    res.json(products);
});

// Display product by its ID#
ProdRouter.get('/api/products/:id', async (req, res) => {
    const id = req.params.id;

    if(isNaN(id)){
        return req.statusCode(400).json({ message: 'Invalid ID #.'});
    }

    const product = await prisma.product.findUnique({
        where: {
            id: parseInt(id),
        },
    });

    if(product) {
        res.json(product);
    } else {
        res.status(404).json({message: 'Error: Product not found.'});
    }
});

// Create new product entry
ProdRouter.post('/api/products/create', async (req, res) => {
    const filename = req.file ? req.file.filename : null;
    const { image_filename, name, description, cost } = req.body;

    if(!name || !description || !cost){
        return res.status(400).json({ message: 'A required field is missing.' });
    }

    const newProduct = await prisma.product.create({
        data: {
            image_filename: image_filename,
            name: name,
            desciption: description,
            cost: cost
        },
    });

    res.json(newProduct);
});

// Purchase product
ProdRouter.post('/products/purchase', async (req, res) => {

    res.send('Purchase route');

    // if(isNaN(id)){
    //     return req.statusCode(400).json({ message: 'Invalid ID #.'});
    // }

    // const productToDelete = await prisma.product.findUnique({
    //     where: {
    //         id: parseInt(id),
    //     },
    // });

    // if(!productToDelete) {
    //     return res.status(404).json({ message: 'Product not found.' });
    // }

    // console.log(`Product to delete: ${productToDelete}`);

    // // Construct filepath for deletion
    // const oldFilePath = path.join(__dirname, '../public/images/', productToDelete.image_filename);

});

export default ProdRouter;