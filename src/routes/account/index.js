import { Router } from 'express';
import { registerUser, verifyUser} from '../../models/account/index.js';

const router = Router();

router.get('/register', async(req, res) => {
    res.render('account/register', { title: 'Register' });
});


router.post('/register', async(req, res) => {

});


router.get('login', async(req, res) => {
    res.render('account/login', {title: 'Login'});
});


router.post('/login', async(req, res) => {

})


router.get('/', async(req, res) => {
    res.render('account/index', {title: 'Account'});
})