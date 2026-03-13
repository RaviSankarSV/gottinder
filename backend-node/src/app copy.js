const express = require('express');
const app = express();

const { adminAuth, userAuth } = require("./middlewares/authentication");


app.use("/admin", adminAuth);
//app.get("/user", userAuth);

app.get("/user/login", (req, res) => {
    res.send("user logged in successfully!");
})

app.get("/admin/getAdminUser", (req, res) => {
    res.send("Admin User details are present!");
})

app.get("/user/getUser", userAuth, (req, res) => {
    res.send("user details are present!");
})

app.get("/userDetails", (req, res) => {
    try {
        throw new Error();
        res.send("User Details send!");
    } catch (err) {
        res.status(500).send("Error Was thrown!");
    }
})

app.use("/tests", (req, res) => {
    res.send("Hello tetsing api");
});

app.use("/Hello", (req, res) => {
    res.send("Hello api");
});

app.get("/user/:userId", (req, res) => {
    console.log("req :", req.params);  //shows the params object : { "userId":123}
    console.log("")
})

const rh3 = (req, res, next) => {
    console.log("ROute handler 3!");
    next();
}

app.use("/testRoutes", (req, res, next) => {
    console.log("Second api function!");
    next();
})


app.use("/testRoutes", (req, res, next) => {
    console.log("Route Handler 1 ! ");
    next();
}, (req, res, next) => {
    console.log("Route handle 2!")
    next();
}, rh3, [
    (req, res, next) => {
        console.log("route handler 4 !");
        next();
    }, (req, res) => {
        console.log("route handler 5 !");
        res.send("Wokring in 5th handler!");
    }
]);

//it wont be called if it is present here
// app.use("/testRoutes", (req, res, next) => {
//     console.log("Second api function!");
//     next();
// })

app.use("/", (err, req, res, next) => {
    if (err) {
        res.send("Something an error!");
    }
})

// app.use((req, res) => {
//     res.send("server is running and showing in browser");
// });

app.listen(7777, () => {
    console.log("Server is running at 7777");
});