const router = require('express').Router();
const { BlogPost, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// Get all blogposts and JOIN with user data
router.get('/', async (req, res) => {
    try {
        const blogPostData = await BlogPost.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });

        const blogposts = blogPostData.map((blogpost) => blogpost.get({ plain: true }));
        res.render('homepage', {
            blogposts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get blogpost data and associated comments from the post from blogpostid
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
        res.render('blogpost', {
            ...blogpost,
            comments,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Use withAuth middleware to prevent access to route
router.get('/dashboard', withAuth, async (req, res) => {
    try {
        // Find all blogpost data posted by logged in user
        const blogPostData = await BlogPost.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
            where: { user_id: req.session.user_id },
        });

        const blogposts = blogPostData.map((blogpost) => blogpost.get({ plain: true }));
        res.render('dashboard', {
            blogposts,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Render createpost page when accessed
router.get('/createpost', (req, res) => {
    res.render('createpost', {logged_in: req.session.logged_in});

});

// Get blogpost data from id when editing a post from editpost page
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
        res.render('editpost', {
            ...blogpost,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Render login in page when accessed
router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
        res.redirect('/dashboard');
        return;
    }
    res.render('login');
});

// Render signup page when accessed
router.get('/signup', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
        res.redirect('/dashboard');
        return;
    }
    res.render('signup');
});

module.exports = router;
