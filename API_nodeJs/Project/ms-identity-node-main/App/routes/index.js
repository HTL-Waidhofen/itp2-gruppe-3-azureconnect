/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'AzureConnect Login',
        isAuthenticated: req.session.isAuthenticated,
        username: req.session.account?.username,
    });
});


const hbs = require('hbs');

// Register a helper to stringify JSON
hbs.registerHelper('json', function(context) {
    return JSON.stringify(context);
});


module.exports = router;
