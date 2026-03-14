const express = require('express');
const app = express();
const connectDB = require("./config/mongoose");
const User = require("./models/user");
const bcrypt = require('bcrypt');
const { validateInputFields } = require('./utils/inputValidator');
//const user = require('./models/user');


app.use(express.json());

app.post("/signup", async (req, res) => {
    try {
        validateInputFields(req);
        const { password } = req.body;
        const passwordHash = await bcrypt.hash(password, 10);
        //console.log("password hash:", passwordHash); becasue it is working
        req.body.password = passwordHash;
        const user = new User(req.body);
        await user.save();
        res.send("User saved successfully!");
    } catch (err) {
        res.status(400).send("Error : " + err.message);
    }
})

app.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body;
        //check whether email present
        const user = await User.findOne({ emailId: emailId });
        if (!user) {
            throw new Error(" Invalid User details!");
        } else {
            const isPassword = await bcrypt.compare(password, user.password);
            if (isPassword) {
                res.status(200).send("Login successfull!");
            } else {
                throw new Error(" Invalid credentials!");
            }
        }
    } catch (err) {
        res.status(400).send("Login failed " + err.message);
    }
})

app.get("/findById", async (req, res) => {
    console.log("Id:", req.body);
    try {
        const user = await User.findOne({ "_id": req.body._id })
        console.log("User from db:" + user);

        if (user) {
            res.status(200).send("user details:" + user);
        } else {
            res.status(404).send("User details not found!");
        }
    } catch (err) {
        res.status(500).send("error while fethcing user details!" + err);
    }
})

app.patch("/updateById", async (req, res) => {
    const userId = req.body._id;
    console.log("userId: " + userId);
    const userData = req.body;
    console.log("userData:", JSON.stringify(userData, null, 2));
    try {
        const Allowed_Updates = [
            'firstName', 'lastname', 'emailId', 'password', 'photoUrl', 'skills', 'gender'
        ]

        // Remove _id and filter only allowed properties
        const updateData = Object.keys(userData).reduce((obj, key) => {
            if (key !== '_id' && Allowed_Updates.includes(key)) {
                obj[key] = userData[key];
            }
            return obj;
        }, {});

        console.log("Filtered update properties:", Object.keys(updateData));

        if (Object.keys(updateData).length === 0) {
            throw new Error("No valid properties to update!");
        }

        const user = await User.findByIdAndUpdate({ "_id": userId }, updateData, { returnDocument: 'after' });
        if (user) {
            res.status(200).send("User updated successfully" + user);
        }
    } catch (err) {
        res.status(500).send("Updating user failed!" + err);
    }
})


app.get("/findByEmail", async (req, res) => {
    console.log("emailId:", req.body);
    try {
        const user = await User.findOne({ "emailId": req.body.emailId })
        console.log("User from db:" + user);

        if (user) {
            res.status(200).send("user details:" + user);
        } else {
            res.status(404).send("User details not found!");
        }
    } catch (err) {
        res.status(500).send("error while fethcing user details!" + err);
    }
})

app.get("/feed", async (req, res) => {
    try {
        const users = await User.find({});
        if (users.length > 0) {
            res.send(users);
        } else {
            res.send("No users found!");
        }
    } catch (err) {
        res.status(500).send("internal Server error!");
    }

})


connectDB()
    .then(() => {
        console.log("Connection successfully established to MongoDB!");
        app.listen(7777, () => {
            console.log("Server started and listening at port:7777");
        })
    })
    .catch((err) => {
        console.log("Error ,connection failed to MongoDB!" + err);
    })