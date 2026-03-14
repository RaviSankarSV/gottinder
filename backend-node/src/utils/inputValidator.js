const validator = require('validator');

const validateInputFields = (req) => {
    const { firstName, lastName, emailId } = req.body;

    if (!firstName || !lastName) {
        throw new Error("invalid User Name");
    }
    if (!validator.isEmail(emailId)) {
        throw new Error("Invlaid credentials!");
    }
}

module.exports = {
    validateInputFields
}