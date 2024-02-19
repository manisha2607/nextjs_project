const bcrypt = require('bcrypt');

module.exports.creatHashPass = async (password) => {
    try {
        const salt = 10;
        const hashedPass = await bcrypt.hash(password, salt);
        return hashedPass;
    } catch (error) {
        console.log(`Error in bcrypting the password :: ${error}`);
    }
}

module.exports.comparePass = async (password, hashedpass) => {
    try {
        return bcrypt.compare(password, hashedpass);
    } catch (error) {
        console.log(`Error in comaparing the password :: ${error}`);
    }
}
