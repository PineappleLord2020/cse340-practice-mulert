import { Router } from 'express';
import { registerUser, verifyUser} from '../../models/account/index.js';

const router = Router();

router.get('/register', async(req, res) => {
    res.render('account/register', { title: 'Register' });
});


router.post('/register', async(req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const confirmPW = req.body.confirm_password;
    const register = await registerUser;

    if (email.length < 0) {
        res.redirect('/register');
        return;
    }

    if (password.length < 8) {
        res.redirect('/register');
        return;
    }

    if (!confirmPW || password === confirmPW ) {
        res.redirect('/register');
        return;
    }
});


router.get('login', async(req, res) => {
    res.render('account/login', {title: 'Login'});
});


router.post('/login', async(req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const verify = await verifyUser;
})


router.get('/', forceToBeLoggedIn, (req, res) => {
    res.render('account/index', {title: 'Account'});
})