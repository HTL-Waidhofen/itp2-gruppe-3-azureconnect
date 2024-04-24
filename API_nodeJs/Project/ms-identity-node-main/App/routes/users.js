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
router.get('/emails', authProvider.acquireToken({
    scopes: ['email'],
    redirectUri: REDIRECT_URI,
    successRedirect: '/users/profile'
}));
/*router.get('/emails',
    isAuthenticated, // check if user is authenticated
    async function (req, res, next) {
        try {
            const graphResponse = await fetch(GRAPH_ME_ENDPOINT, req.session.accessToken);
            res.render('emails', { profile: graphResponse });
        } catch (error) {
            next(error);
        }
    }
);
*/
//const { getUserEmails } = require('./getUserEmails'); // adjust the path to where getUserEmails is defined

router.get('/emails', async function(req, res, next) {
  if (!req.session.isAuthenticated) {
    res.render('emails', { title: 'Emails', isAuthenticated: false });
  } else {
    try {
      const emails = await getUserEmails(req.session.accessToken);
      res.render('emails', { title: 'Emails', isAuthenticated: true, username: req.session.account.username, emails: emails });
    } catch (err) {
      next(err);
    }
  }
});

module.exports = router;
