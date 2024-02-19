const userModel = require('../models/user');
const bcrypt = require('../helper/bcrypt');
const jwt = require('jsonwebtoken');

module.exports.registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        //validations
        if (!username|| !username || !password) {
            res.send({ message: "All fields required !" });
        }
        
        //checking existing for user
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(401).json({
                success: false,
                message: "User Already Exists! Please Go and Sign-in!"
            })
        } else {
            {
                //Encripting user password
                const hashedpassword = await bcrypt.creatHashPass(password);

                // creating newUser
                const newUser = await userModel.create({
                    username: username,
                    email: email,
                    password: hashedpassword,
                });
                await newUser.save();
                return res.status(200).json({
                    success: true,
                    message: "User registered successfully !!",
                    newUser
                })
            }
        }

    } catch (error) {
        let errMsg = error.message; 
            return res.status(500).json({
                success: false,
                message: errMsg
            })

    }
}

module.exports.signInUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(401).json({
                success: flase,
                message: "Invalid email / password",
            })
        }
        // find user in db
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found!"
            })
        }
        const hashedpassword = user.password;
        const match = await bcrypt.comparePass(password, hashedpassword);
        if (!match) {
            return res.status(404).json({
                success: false,
                message: "Invalid email / password!"
            })
        }
        const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '7d' });
        return res.status(200).json({
            success: true,
            message: "User logged_In successfully",
            user: user,
            token: token
        })


    } catch (error) {
        let errMsg = error.message; 
            return res.status(500).json({
                success: false,
                message: errMsg
            })

    }
}

