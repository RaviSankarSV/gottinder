const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect(
        "mongodb+srv://playwithtexh_db_user:NamahSivaaya$5@cluster0.ltbtohg.mongodb.net/gottinder"
    )
};

module.exports = connectDB;