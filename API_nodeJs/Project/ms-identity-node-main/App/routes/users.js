/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

var express = require('express');
var router = express.Router();

var fetch = require('../fetch');

var { GRAPH_ME_ENDPOINT } = require('../authConfig');

// custom middleware to check auth state
function isAuthenticated(req, res, next) {
    if (!req.session.isAuthenticated) {
        return res.redirect('/auth/signin'); // redirect to sign-in route
    }

    next();
};

router.get('/id',
    isAuthenticated, // check if user is authenticated
    async function (req, res, next) {
        res.render('id', { idTokenClaims: req.session.account.idTokenClaims });
    }
);

router.get('/profile',
    isAuthenticated, // check if user is authenticated
    async function (req, res, next) {
        try {
            const graphResponse = await fetch(GRAPH_ME_ENDPOINT, req.session.accessToken);
            res.render('profile', { profile: graphResponse });
        } catch (error) {
            next(error);
        }
    }
);
router.get('/emails',
    isAuthenticated, // check if user is authenticated
    async function (req, res, next) {
        try {
            const graphResponse = await fetch("https://graph.microsoft.com/v1.0/me/messages", req.session.accessToken);
            res.render('emails', { emails: graphResponse });
        } catch (error) {
            next(error);
        }
    }
);

router.get('/calendars',
    isAuthenticated, // check if user is authenticated
    async function (req, res, next) {
        try {
            const graphResponse = await fetch(`https://graph.microsoft.com/v1.0/me/calendars`, req.session.accessToken);
            
            res.render('calendars', { calendars: graphResponse });
        } catch (error) {
            next(error);
        }
    }
);


//--------------------DASHBOARD--------------------
router.get('/dashboard',
    isAuthenticated, // check if user is authenticated
    async function (req, res, next) {
        try {
            const [profileResponse, emailsResponse] = await Promise.all([
                fetch(`https://graph.microsoft.com/v1.0/me/`, req.session.accessToken),
                fetch(`https://graph.microsoft.com/v1.0/me/messages`, req.session.accessToken),
                ]);

            const profile = await profileResponse;
            const emails = await emailsResponse;

            res.render('dashboard', { 
                profile,
                emails,
                title: 'AzureConnect Dashboard'
            });
        } catch (error) {
            next(error);
        }
    }
);
router.get('/me/messages/:id', isAuthenticated, async function (req, res, next) {
    try {
        const emailId = req.params.id;
        const emailResponse = await fetch(`https://graph.microsoft.com/v1.0/me/messages/${emailId}`, req.session.accessToken);
        res.json(emailResponse);
    } catch (error) {
        next(error);
    }
});


module.exports = router;
