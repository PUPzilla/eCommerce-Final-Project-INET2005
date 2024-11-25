import bcrypt from 'bcrypt';

// Hash password
async function hashPassword(plaintextPassword) {
    const hash = await bcrypt.hash(plaintextPassword, 10);
    console.log(hash);
    return hash;
}

// Check PW matches existing PW
async function comparePassword(plaintextPassword, hash){
    return await bcrypt.compare(plaintextPassword, hash);
}

export{hashPassword, comparePassword};
