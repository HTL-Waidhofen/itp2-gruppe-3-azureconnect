/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

var express = require('express');

const authProvider = require('../auth/AuthProvider');
const { REDIRECT_URI, POST_LOGOUT_REDIRECT_URI } = require('../authConfig');
const router = express.Router();


router.get('/signin', authProvider.login({
    scopes: ['User.Read', 'Mail.Read', 'Calendars.ReadWrite', 'Files.Read' ,'Files.Read.All'],
    redirectUri: REDIRECT_URI,
    successRedirect: '/auth/acquireToken'
}));
router.get('/acquireToken', authProvider.acquireToken({
    scopes: [],
    redirectUri: REDIRECT_URI,
    successRedirect: '/users/dashboard'
}));

router.post('/redirect', authProvider.handleRedirect());
router.get('/signout', authProvider.logout({
    postLogoutRedirectUri: POST_LOGOUT_REDIRECT_URI
}));
module.exports = router;
