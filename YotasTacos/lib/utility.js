import bcrypt from 'bcrypt';

//  Hash password
async function hashPassword(plaintextPassword) {
    const hash = await bcrypt.hash(plaintextPassword, 10);
    console.log(hash);
    return hash;
}

//  Check PW matches existing PW
async function comparePassword(plaintextPassword, hash){
    return await bcrypt.compare(plaintextPassword, hash);
}

//  Check that a user is logged in
function authenticateSession(req, res, next){
    if(req.session && req.session.customer){
        console.log('User is logged in.');
        return next();
    }
    res.status(401).send('Login before making a purchase.');
}

export{hashPassword, comparePassword, authenticateSession};
