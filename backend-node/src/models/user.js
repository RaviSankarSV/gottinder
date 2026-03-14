const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
    },
    emailId: {
        type: String,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email is not valid :" + value);
            }
        }
    },
    password: {
        type: String,
    },
    photoUrl: {
        type: String,
    },
    gender: {
        type: String,
    },
    age: {
        type: Number,
    },
    about: {
        type: String
    },
    skills: {
        type: String
    }
}, {
    timestamps: true
});

// const userModel = mongoose.model('User', userSchema);
// module.export = userModel;
//another way

module.exports = mongoose.model("User", userSchema);