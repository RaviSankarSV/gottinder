const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    emailId: {
        type: String,
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
});

// const userModel = mongoose.model('User', userSchema);
// module.export = userModel;
//another way

module.exports = mongoose.model("User", userSchema);