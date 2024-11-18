import express from 'express';
import { PrismaClient } from '@prisma/client';
import { comparePassword, hashPassword } from '../lib/utility';

const UserRouter = express.Router();

const prisma = new PrismaClient();

router.get('/users/all', (req, res) => {
    res.send('All Users Route');
});

//SignUp
router.post('/users/signup', async (req, res) => {
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
router.post('users/login', async (req, res) => {
    
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

//Logout
router.post(`/users/logout`, (req, res) => {
    res.send(`Logout Route`);
});

//Get session
router.get('/users/getsession', (req, res) => {
    res.send(`Get User Session`);
});

export default UserRouter;
