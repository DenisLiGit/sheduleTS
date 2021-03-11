const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs');
const User = require('../models/User')
const {check, validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')

// /api/auth/register
router.post(
'/register',
[
    check('email', 'email error w').isEmail(),
    check('password', 'password error q').isLength({min: 6})
],
async (req, res) => {
    try {
        const errors = validationResult(req.body)

        if(!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'eorror'
            })
        }
        const {email, password} = req.body.userInfo
        const candidate = await User.findOne({email})
        if (candidate) {
            return res.status(402).json({message: 'Пользователь уже существует'})
        }
        const hashPassword = await bcrypt.hash(password, 12)
        const user = new User({email, password: hashPassword})
        await user.save()

        res.status(201).json({message: 'Пользователь создан'})

    } catch (e) {
        res.status(500).json({ message: e})
    }
})


// /api/auth/login
router.post(
'/login',
[
    check('email', 'set email proprly').normalizeEmail().isEmail(),
    check('password', 'set pass').exists()
],
async (req, res) => {
    try {
    const errors = validationResult(req.body.userInfo)
        if(!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'error login'
            })
        }

        const {email, password} = req.body.userInfo

        const user = await User.findOne({email})
        if(!user) {
            return res.status(400).json({message: 'Неверные данные'})
        }

        const passMatch = await bcrypt.compare(password, user.password)
        if(!passMatch) {
            return res.status(400).json({message: 'Неверные данные'})
        }

        const token = jwt.sign(
            { userId: user.id },
            config.get("jwtSecretKey"),
            { expiresIn: '1h' }
        )

        res.status(201).json({ token, userId: user.id })
    } catch (e) {
        res.status(500).json({ message: e})
    }
})

module.exports = router