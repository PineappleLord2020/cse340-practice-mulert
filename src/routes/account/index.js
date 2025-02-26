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


    if (!email || !password || !confirmPW) {
        req.flash('error', 'One or more fields left blank. Please fill all fields.')
        res.redirect('/register');
    }

    if (email.length < 1) {
        res.redirect('/register');
        req.flash('error','Email was left blank.');
        return;
    }

    if (password.length < 8) {
        res.redirect('/register');
        req.flash('error', "Password isn't long enough.")
        return;
    }

    if (!confirmPW || password === confirmPW ) {
        res.redirect('/register');
        req.flash('error', "Passwords don't match. Please try again.")
        return;
    }

    register(email, password);
});


router.get('login', async(req, res) => {
    res.render('account/login', {title: 'Login'});
});


router.post('/login', async(req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const verify = await verifyUser;

    if (!email || !password || !confirmPW) {
        req.flash('error', 'One or more fields left blank. Please fill all fields.')
        res.redirect('/register');
    }

    if (email.length < 1) {
        res.redirect('/register');
        req.flash('error','Email was left blank.');
        return;
    }

    if (password.length < 8) {
        res.redirect('/register');
        req.flash('error', "Password isn't long enough.")
        return;
    }

});


router.get('/', forceToBeLoggedIn, (req, res) => {
    res.render('account/index', {title: 'Account'});
});

export default router;