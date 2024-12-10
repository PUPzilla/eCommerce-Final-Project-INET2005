import express from 'express';
import { PrismaClient } from '@prisma/client';
import { comparePassword, hashPassword } from '../lib/utility.js';
import PasswordValidator from 'password-validator';

const UserRouter = express.Router();

const prisma = new PrismaClient();

//  PW validation
var schema = new PasswordValidator();

schema
.is().min(8)
.is().max(24)
.has().uppercase()
.has().lowercase()
.has().digits(1);

UserRouter.get('/all', (req, res) => {
    res.send('All Users Route');
});

//  SignUp
UserRouter.post('/signup', async (req, res) => {
    //  User input
    const { email, password, first_name, last_name } = req.body;

    //  Validate
    if(!email || !password || !first_name || !last_name) {
        return res.status(400).send('Missing one or more required fields.');
    }

    //  Check for existing users
    const existingUser = await prisma.customer.findUnique({
        where: {
            email: email,
        }
    });

    if(existingUser) {
        return res.status(400).send('This user already exists.');
    }

    // Validate password with 'schema'
    if(!schema.validate(password)){
        return res.status(400).send({
            message: 'The entered password does not meet the requirements.',
            reasons: schema.validate(password, {list: true}),
        });
    }

    //  Hash password before saving
    const hashed_pass = await hashPassword(password);

    //  Add user to DB
    const user = await prisma.customer.create({
        data: {
            email: email,
            password: hashed_pass,
            first_name: first_name,
            last_name: last_name,
        },
    });
    res.json(user);
});

//  Login
UserRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;

    //  Validate input
    if(!email || !password){
        return res.status(400).send('Missing a required field.');
    }

    //  Check that user exists
    const existingUser = await prisma.customer.findUnique({
        where: {
            email: email,
        }
    });

    //  If user already exists
    if(!existingUser) {
        return res.status(404).send('This Email is not linked to an existing account.');
    }

    //  If valid email, verify the password
    const passwordMatch = await comparePassword(password, existingUser.password);
    if(!passwordMatch) {
        return res.status(401).send('Invalid Password');
    }

    //  Setup user session
    req.session.customer_id = existingUser.customer_id;

    res.json({ message: 'Legged in as: ', customer_id: req.session.customer_id });
});

//  Logout route
UserRouter.post('/logout', (req, res) => {
    req.session.destroy();
    res.send('Logged Out.');
});

//  Get session
UserRouter.get('/getsession/:id', (req, res) => {
    if(req.session.customer){
        res.json({'user' : req.session.customer});
    } else {
        res.status(401).send('Not logged in.');
    }
});

export default UserRouter;
