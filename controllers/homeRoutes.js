const router = require('express').Router();
const { BlogPost, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        // Get all blogposts and JOIN with user data
        const blogPostData = await BlogPost.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });

        // Serialize data so the template can read it
        const blogposts = blogPostData.map((blogpost) => blogpost.get({ plain: true }));
        const pageTitle = 'The Tech Blog';
        // Pass serialized data and session flag into template
        res.render('homepage', {
            pageTitle,
            blogposts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/blogpost/:id', async (req, res) => {
    try {
        const blogPostData = await BlogPost.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });

        const commentData = await Comment.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
            where: { blogpost_id: req.params.id },
        });

        const blogpost = blogPostData.get({ plain: true });
        const comments = commentData.map((comment) => comment.get({ plain: true }));
        const pageTitle = 'The Tech Blog';
        res.render('blogpost', {
            ...blogpost,
            comments,
            pageTitle,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Use withAuth middleware to prevent access to route
router.get('/dashboard', withAuth, async (req, res) => {
    try {
        // Find the logged in user based on the session ID
        const blogPostData = await BlogPost.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
            where: { user_id: req.session.user_id },
        });

        // Serialize data so the template can read it
        const blogposts = blogPostData.map((blogpost) => blogpost.get({ plain: true }));
        const pageTitle = 'Your Dashboard';
        res.render('dashboard', {
            blogposts,
            pageTitle,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/createpost', (req, res) => {
    const pageTitle = 'Your Dashboard';
    res.render('createpost', {pageTitle, logged_in: true});

});

router.get('/editpost/:id', async (req, res) => {
    try {
        const blogPostData = await BlogPost.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });
        const blogpost = blogPostData.get({ plain: true });
        const pageTitle = 'Your Dashboard';
        res.render('editpost', {
            ...blogpost,
            pageTitle,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }
    const pageTitle = 'The Tech Blog';
    res.render('login', {pageTitle});
});

router.get('/signup', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
        res.redirect('/login');
        return;
    }
    const pageTitle = 'The Tech Blog';
    res.render('signup', {pageTitle});
});

module.exports = router;
