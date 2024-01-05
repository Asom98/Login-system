const userModel = require("../models/User");

const handleGetUsersName = async (req, res) => {
    try {
        // Find all users in the database
        const users = await userModel.find({}, 'username');

        // Extract usernames from the result
        const username = users.map(user => user.username);

        // Send the usernames in the response
        res.status(200).json({ username });
    } catch (error) {
        console.error("Error getting user names:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = {
    handleGetUsersName,
};