const adminAuth = (req, res, next) => {
    const token = "xyz";
    const isAdminAuthorised = token === "xyz";
    if (!isAdminAuthorised) {
        res.status(401).send("Unauthtorised user request!");
    } else {
        console.log("admin user");
        next();
    }
};

const userAuth = (req, res, next) => {
    const token = "xyza";
    const isAdminAuthorised = token === "xyz";
    if (!isAdminAuthorised) {
        res.status(401).send("Unauthorised user request!");
    } else {
        console.log("user authorised");
        next();
    }
}

module.exports = {
    adminAuth,
    userAuth
}