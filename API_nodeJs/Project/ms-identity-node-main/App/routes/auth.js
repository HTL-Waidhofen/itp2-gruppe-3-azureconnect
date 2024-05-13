/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

var express = require('express');

const authProvider = require('../auth/AuthProvider');
const { REDIRECT_URI, POST_LOGOUT_REDIRECT_URI } = require('../authConfig');
const router = express.Router();

router.get('/signin', authProvider.login({
    scopes: [],
    redirectUri: REDIRECT_URI,
    successRedirect: '/'
}));
router.get('/acquireToken', authProvider.acquireToken({
    scopes: ['User.Read'],
    redirectUri: REDIRECT_URI,
    successRedirect: '/users/profile'
}));
router.get('/acquireToken', authProvider.acquireToken({
    scopes: ['User.default'],
    redirectUri: REDIRECT_URI,
    successRedirect: '/users/profile'
}));
router.get('/acquireToken', authProvider.acquireToken({
    scopes: ['email'],
    redirectUri: REDIRECT_URI,
    successRedirect: '/users/emails'
}));
router.get('/acquireToken', authProvider.acquireToken({
    scopes: ['email.default'],
    redirectUri: REDIRECT_URI,
    successRedirect: '/users/emails/'
}));
router.get('/acquireToken', authProvider.acquireToken({
    scopes: ['email.read'],
    redirectUri: REDIRECT_URI,
    successRedirect: '/users/emails'
}));
router.get('/acquireToken', authProvider.acquireToken({
    scopes: ['calendars'],
    redirectUri: REDIRECT_URI,
    successRedirect: '/users/calendars'
}));
router.get('/acquireToken', authProvider.acquireToken({
    scopes: ['calendars.default'],
    redirectUri: REDIRECT_URI,
    successRedirect: '/users/calendars'
}));
router.get('/acquireToken', authProvider.acquireToken({
    scopes: ['calendars.read'],
    redirectUri: REDIRECT_URI,
    successRedirect: '/users/calendars'
}));
router.get('/acquireToken', authProvider.acquireToken({
    scopes: ['calendars.readwrite'],
    redirectUri: REDIRECT_URI,
    successRedirect: '/users/calendars'
}));
router.post('/redirect', authProvider.handleRedirect());
router.get('/signout', authProvider.logout({
    postLogoutRedirectUri: POST_LOGOUT_REDIRECT_URI
}));
module.exports = router;
