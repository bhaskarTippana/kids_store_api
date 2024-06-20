const User = require("../model/userRegister");

const getAddress = async (req, res) => {

    try {
        const user = await User.findOne({ _id: req.user.userId });
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        user.address.street = req.body.street || user.address.street;
        user.address.city = req.body.city || user.address.city;
        user.address.state = req.body.state || user.address.state;
        user.address.postalCode = req.body.postalCode || user.address.postalCode;
        user.address.country = req.body.country || user.address.country;

        await user.save();

        res.status(200).json({ message: "Address updated successfully" });
    } catch (error) {
        console.error("Error updating address:", error);
        res.status(500).json({ message: "Internal server error", error });
    }
};

module.exports = getAddress;
