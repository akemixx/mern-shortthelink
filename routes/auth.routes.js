const {Router} = require('express');
const bcrypt = require('bcryptjs');
const {check, validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../models/User');

const router = Router();

// /api/auth/signUp
router.post(
    '/signUp',
    [
        check('email', 'Incorrect email. ')
            .isEmail(),
        check('password', 'Incorrect password. Min length of the password is 6 symbols. ')
            .isLength({min: 6})
    ],
    async (request, response) => {
        try {
            const errors = validationResult(request);
            if (!errors.isEmpty()) {
                response.status(400).json({
                    message: 'Incorrect register data. ',
                    errors: errors.array()
                });
            }

            const {email, password} = request.body;
            const user = await User.findOne({ email });

            if (user) {
                return response.status(400).json({message: 'User with this email already exists. '});
            }

            const hashedPassword = await bcrypt.hash(password, 12);

            const newUser = new User({email, password: hashedPassword});
            await newUser.save();

            return response.status(201).json({message: 'User has been created. '});
        } catch (e) {
            return response.status(500).json({message: 'Something went wrong. Try again. '});
        }
    }
    );


// /api/auth/signIn
router.post(
    '/signIn',
    [
        check('email', 'Incorrect email. ')
            .isEmail(),
        check('password', 'Incorrect password. ')
            .exists()
    ],
    async (request, response) => {
        try {
            const errors = validationResult(request);
            if (!errors.isEmpty()) {
                return response.status(400).json({
                    message: 'Incorrect login data. ',
                    errors: errors.array()
                });
            }

            const {email, password} = request.body;

            const user = await User.findOne({ email });
            if (!user) {
                return response.status(400).json({message: 'User with this email not found. '});
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if(!isMatch){
                return response.status(400).json({message: 'Incorrect password. Try again. '});
            }

            const token = jwt.sign(
                { userId : user.id },
                config.get('jwtSecret'),
                { expiresIn : '1h'}
            );
            return response.json( { token, userId : user.id });
        } catch (e) {
            return response.status(500).json({message: `Something went wrong. Try again. ${e.message}`});
        }
    });

module.exports = router;