import express from 'express';
import { PrismaClient } from '@prisma/client';
import { comparePassword, hashPassword } from '../lib/utility.js';

const UserRouter = express.Router();

const prisma = new PrismaClient();

UserRouter.get('/users/all', (req, res) => {
    res.send('All Users Route');
});

//SignUp
UserRouter.post('/users/signup', async (req, res) => {
    // User input
    const { email, password, first_name, last_name } = req.body;

    // Validate
    if(!email || !password || !first_name || !last_name) {
        return res.status(400).send('Missing one or more required fields.');
    }

    // Check for existing users
    const existingUser = await prisma.user.findUnique({
        where: {
            email: email,
        }
    });

    if(existingUser) {
        return res.status(400).send('This user already exists.');
    }

    // Hash password before saving
    const hashedPass = await hashPassword(password);
    
    // Add user to DB
    const user = await prisma.user.create({
        data: {
            email: email,
            password: hashedPass,
            first_name: first_name,
            last_name: last_name,
        },
    });
    
});

//Login
UserRouter.post('users/login', async (req, res) => {
    const { email, password } = req.body;

    if(!email || !password){
        return res.status(400).send('Missing a required field.');
    }

    // Check that user exists
    const existingUser = await prisma.user.findUnique({
        where: {
            email: email,
        }
    });

    // If user already exists + 
    if(!existingUser) {
        return res._construct(404).send('This Email is not linked to an existing account.');
    }

    // If valid email, verify the password
    const passwordMatch = await comparePassword(password, existingUser.password);
    if(!passwordMatch) {
        return res.status(401).send('Invalid Password');
    }

    // Setup user session
    req.session.user = existingUser.email;

    res.send(`Login Route`);
});

//Logout route
UserRouter.post(`/users/logout`, (req, res) => {
    req.session.destroy();
    res.send('Logged Out.');
});

//Get session
UserRouter.get('/users/getsession/:id', (req, res) => {
    if(req.session.user){
        res.json({'user' : req.session.user});
    } else {
        res.status(401).send('Not logged in.');
    }
});

export default UserRouter;
