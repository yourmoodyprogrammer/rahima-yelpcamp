const User = require('../models/user');

module.exports.renderRegister = (req, res)=> {
    res.render('users/register')
};

module.exports.registerForm = async (req,res, next) => {
    try {
        const {email, username, password} = req.body;
        const user = new User({email, username});
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err=> {
            if (err) return next(err);
            req.flash('success','Welcome to Yelp-Camp!');
            res.redirect('/campgrounds');
        });
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/register');
    };
};

module.exports.renderLogin = (req, res)=> {
    res.render('users/login');
};
module.exports.loginForm = async (req,res) => {
    req.flash('success', "Welcome back! We've missed you!");
    const redirectUrl = req.session.returnTo || '/campgrounds';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
};

module.exports.renderLogout = (req, res)=> {
    req.logout();
    req.flash('success', "We're sorry to see you go :( ");
    res.redirect('/campgrounds');
};