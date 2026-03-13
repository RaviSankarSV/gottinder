const express = require('express');
const app = express();
const connectDB = require("./config/mongoose");
const User = require("./models/user");
const user = require('./models/user');

app.use(express.json());

app.post("/signup", async (req, res) => {
    // const user = new User({
    //     "firstName": "Jon",
    //     "lastName": "Snow",
    //     "emailId": "jon@gmail.com",
    //     "password": "jon@123",
    //     "photoUrl": "https://s1.r29static.com/bin/entry/7ae/720x864,85/1841434/image.webp",
    //     "gender": "male",
    //     "age": 30,
    //     "about": "a good warrior",
    //     "skills": "Leadership"
    // })
    const user = new User(req.body);
    try {
        await user.save();
        res.send("User saved successfully!");
    } catch (err) {
        res.status(400).send("Failed to save the user " + err);
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
    console.log("userData: " + userData);
    try {
        const user = await User.findByIdAndUpdate({ "_id": userId }, userData);
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