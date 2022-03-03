const router = require("express").Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')


// REGISTER

router.post('/register', async (req, res) => {
    try {
        // hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        
        // create new user
        const newUser = new User({
            username: req.body.username,            
            email: req.body.email,
            password: hashedPassword
        })


        // save user and get response
        const user = await newUser.save()
        res.status(200).json(user)
    } catch(err) {
        res.status(500).json(err)
    }
})

// LOGIN
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email})
        !user && res.status(404).json('User is not found')

        const checkPassword = await bcrypt.compare(req.body.password, user.password)
        !checkPassword && res.status(400).json('Wrong password')

        res.status(200).json(user)
    } catch (err) {
        res.status(500).json(err)
    }
  });


module.exports = router

