import express from 'express';
import { PrismaClient } from "@prisma/client";
import UserRouter from './users';

const ProdRouter = express.Router();

const UserRouter = UserRouter();

//  Prisma
const prisma = new PrismaClient({
    log: ['info', 'query', 'warn', 'error'],
});

//  Routes

//  Display (get) all products
ProdRouter.get('/all', async (req, res) => {
    const products = await prisma.product.findMany();
    res.json(products);
});

//  Display product by its ID#
ProdRouter.get('/:id', async (req, res) => {
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

//  Create new product entry
ProdRouter.post('/create', async (req, res) => {
    const { filename, name, description, cost } = req.body;

    if(!name || !cost || !filename){
        console.log(req.body);
        return res.status(400).json({ message: 'A required field is missing.' });
    }

    try {
        const newProduct = await prisma.product.create({
            data: {
                filename: filename,
                name: name,
                description: description || null,
                cost: parseFloat(cost)
            },
        });
        res.json(newProduct);
    } catch(error) {
        console.error('Error creating product:', error);
        res.status(500).json({ message: 'Internal server error'});
    }
});

//  Purchase product
ProdRouter.post('/purchase/:id', async (req, res) => {
    const { street, city, province, country, postal_code, credit_card, credit_expire, credit_cvv, cart, invoice_amt, invoice_tax, invoice_total } = req.body;
    const id = parseInt(req.params.id);

    const product = await prisma.product.findUnique({
        where: {
            id: id,
        }
    });

    if(!street || !city || !province || !country || !postal_code || !credit_card || !credit_expire|| !credit_cvv) {
        
    }

    cart.push(product.id);

    console.log('Added: ', cart.find(product.id), ' to cart.');

});

ProdRouter.delete('/delete/:id', async (req, res) => {
    const id = parseInt(req.params.id);

    const product = await prisma.product.findUnique({
        where: {
            id: parseInt(id)
        }
    });

    await prisma.product.delete({ where: { id }});

    res.send('Deleted');

});

export default ProdRouter;