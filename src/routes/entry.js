import { Router } from 'express';
import jwt from 'jsonwebtoken';
import config from 'config';
import { User, encryptPassword } from '../models/User';

const jwtSecret = config.get('auth.jwt.secret');
const router = Router();

const expiresIn = 60 * 60 * 24; // 1 day

// Login
router.post('/login', (req, res) => {
    User.findOneAndUpdate({ email: req.body.email }, { $set: { lastLogIn: new Date() } }, (err, user) => {
        if (err) throw err;
        if (!user) return res.status(409).end('Wrong email or pass');
        if (user.password !== encryptPassword(req.body.password)) return res.status(409).end('Wrong email or pass');

        const token = jwt.sign({
            user: req.body.email,
            accType: user.accountType,
            lastUsedSite: user.lastUsedSite,
            theme: user.theme,
        }, jwtSecret, { expiresIn });
        res.cookie('id_token', token, { maxAge: 1000 * expiresIn, httpOnly: true });
        return res.status(202).json({
            id_token: token,
            accountType: user.accountType,
            user: user.email,
            lastUsedSite: user.lastUsedSite,
            theme: user.theme,
        });
    });
});

// Register
router.post('/register', (req, res) => {
    if (!req.body.password) return res.status(400).end('Enter password');

    req.body.email = req.body.email.toLowerCase();

    return User.findOne({ email: req.body.email }, (err, user) => {
        if (err) throw err;
        if (user) return res.status(302).end('There is already user with same email');

        req.body.password = encryptPassword(req.body.password);
        req.body.dateCreated = new Date();
        const userSave = new User(req.body);
        return userSave.save((err, result) => {
            if (err) throw err;
            return res.status(200).json(result);
        });
    });
});

// Profile
router.get('/profile/:email', (req, res) => {
    const { email } = req.params;
    if (!email) return res.status(400).end('No email');

    return User.findOne({ email }, (err, user) => {
        if (err) throw err;
        if (!user) return res.status(409).end('Not found');
        return res.status(202).json(user);
    });
});


export default router;
