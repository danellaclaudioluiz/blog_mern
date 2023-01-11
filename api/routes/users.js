const router = require("express").Router();
const User = require("../models/User");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

//UPDATE
router.put("/:id", async(req, res) => {
    if (req.body.userId === req.params.id) {
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, {new: true});
            console.log(updatedUser);
            res.status(200).json(updatedUser);
        } catch (err){
            console.log(err);
            res.status(500).json(err);
        }
    } else {
        res.status(401).json("You can updated only your account.");
    }
})

//DELETE

module.exports = router;
