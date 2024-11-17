import express from 'express';

const UserRouter = express.Router();

router.get('/users/all', (req, res) => {
    res.send('All Users Route');
});

router.post('/users/signup', (req, res) => {
    res.send(`SignUp route`);
});

router.post('users/login', (req, res) => {
    res.send(`Login Route`);
});

router.post(`/users/logout`, (req, res) => {
    res.send(`Logout Route`);
});

router.get('/users/getsession', (req, res) => {
    res.send(`Get User Session`);
});

export default UserRouter;
