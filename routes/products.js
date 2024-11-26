import express from 'express';
import { PrismaClient } from "@prisma/client";
import { authenticateSession } from '../lib/utility.js';

const ProdRouter = express.Router();

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
        return req.status(400).json({ message: 'Invalid ID #.'});
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
ProdRouter.post('/purchase/:id', authenticateSession, async (req, res) => {
    //  Quantity is set to 1 by default
    const { street, city, province, country, postal_code, credit_card, credit_expire, credit_cvv, cart, invoice_amt, invoice_tax, invoice_total, quantity = 1 } = req.body;

    const id = req.params.id;

    if(isNaN(id)){
        res.status(400).send('Error: Invalid ID number.');
    }

    const customer_id = req.session.customer.customer_id;

    //  Find product
    const product = await prisma.product.findUnique({
        where: {
            id: parseInt(id),
        }
    });

    if(!product){
        return res.status(404).send('Error finding product. Could not find a product with provided ID.');
    }

    //  Check that user submitted required info
    if(!street || !city || !province || !country || !postal_code || !credit_card || !credit_expire|| !credit_cvv) {
        return res.status(400).send('Missing a required field.');
    }

    const newPurchase = await prisma.purchase.create({
        data: {
            customer_id: customer_id,
            street: street,
            city: city,
            province: province,
            country: country,
            postal_code: postal_code,
            credit_card: credit_card,
            credit_expire: credit_expire,
            credit_cvv: credit_cvv,
            invoice_amt: invoice_amt,
            invoice_tax: invoice_tax,
            invoice_total: invoice_total,
        },
    });

    //  Create a new purchaseItem entry
    const purchaseItem = await prisma.purchaseItem.create({
        data: {
            purchase_id: newPurchase.purchase_id,
            product_id: product.id,
            quantity: quantity,
        }
    });
    
    //  Add product to cart
    req.session.cart.push(parseInt(id));

    console.log(`Added ${id} to cart.`);

    res.json(req.session.cart);
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