const { body, validationResult } = require('express-validator');
const express = require('express');
const User = require('../models/User');
const router = express.Router();
const bcrypt = require('bcryptjs'); // bcrypt use for converting password into hash
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

// authtoken secret value to identify valid user
const JWT_SECRET = "userIdentities";


// Route 1: create user using post resquest /api/auth/login

router.post('/createuser', [
    body('name', 'Name must contian 3 characters').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must contain 8 characters').isLength({ min: 8 }),
], async (req, res) => {
    let success = false;
    try {
        //  Errors handling - bad resquest   
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ errors: error.array() });
        }

        // check whether the email exists already
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            success = false;
            return res.status(400).json({ success, error: 'A user with this email already exists' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const secpass = await bcrypt.hash(req.body.password, salt);

        // Create the user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secpass
        });

        // Genrate authentication token for user
        const data = {
            user: {
                id: user.id
            }
        };
        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({success, authtoken });

    } catch (error) { res.status(500).send("Internal Server Error"); }
});

// Route 2: login user using post resquest /api/auth/login

router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
    let success = false;
    //  Errors handling - bad resquest
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            success = false;
            return res.status(400).json({ success, error: "Please try to login with correct credentials" });
        }

        const passwordCompare = bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            success = false;
            return res.status(400).json({ success, error: "Please try to login with correct credentials" });
        }

        const data = {
            user: {
                id: user.id
            }
        };
        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authtoken });
    } catch (error) { res.status(500).send("Internal Server Error"); }
});

// Route 3: Get loggedin User detail using post resquest /api/auth/getuser
router.post('/getuser', fetchuser, async (req, res) => {
    let success = false;
    try {
        let userId = req.user.id;
        const user = await User.findById(userId).select('-password');
        success = true;
        res.status(success).send(user);
    } catch (error) { success, res.status(500).send("Internal Server Error"); }

});


module.exports = router;