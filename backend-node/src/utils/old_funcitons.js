

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
