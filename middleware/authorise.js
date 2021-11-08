

module.exports = (permittedRoles) => {
    return function (req, res, next) {
        const user = req.user;

        console.log("user", user);
        const array = user.roles.filter((role) =>
            permittedRoles.includes(role)
        );

        if (array.length == 0) {
             return res.status(400).json({ status: "error", message: "You are not Permitted for this task" });
        }

        return next();
    }
}