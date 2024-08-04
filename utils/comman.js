const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


async function createHash(params) {
    let data = await bcrypt.hash(params, 10);
    return data
}


async function validatePass(params) {
    const result = await bcrypt.compare(params.password, params.hash);
    return result;

}

async function createToken(params) {
    const token = jwt.sign({ userId: params._id, email: params.email }, process.env.JWTSECRETKEY, { expiresIn: "2h" });
    return token;
}


async function verifyToken(params) {
    const data = jwt.verify(params.token, process.env.JWTSECRETKEY,(err, res)=>{
        return res
    })
    return data
}







module.exports = {
    createHash,
    validatePass,
    createToken,
    verifyToken
}