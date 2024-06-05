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

/*
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
router.get('/emails/:id',
    isAuthenticated,
    async function (req, res, next) {
        try {
            const emailId = req.params.id;
            console.log("Requested Email ID:", emailId); // Konsolenausgabe zur Überprüfung der E-Mail-ID
            
            const graphResponse = await fetch(`https://graph.microsoft.com/v1.0/me/messages/${emailId}?$select=body`, req.session.accessToken);
            
            if (!graphResponse || !graphResponse.body || !graphResponse.body.content) {
                console.error("Error: Email body not found or empty");
                throw new Error("Email body not found or empty");
            }

            res.render('emailBody', { body: graphResponse.body.content });
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
*/

//--------------------DASHBOARD--------------------
router.get('/dashboard',
    isAuthenticated, // check if user is authenticated
    async function (req, res, next) {
        try {
            // Fetch profile and emails concurrently
            const [profileResponse, emailsResponse , calendarResponse, documentResponse] = await Promise.all([
                fetch(`https://graph.microsoft.com/v1.0/me/`, req.session.accessToken),
                fetch(`https://graph.microsoft.com/v1.0/me/messages`, req.session.accessToken),
                fetch(`https://graph.microsoft.com/v1.0/me/events`, req.session.accessToken),
                fetch(`https://graph.microsoft.com/v1.0/me/drive/recent`, req.session.accessToken)
            ]);

            const profile = await profileResponse;
            const emails = await emailsResponse;
            const calendar = await calendarResponse;
            module.exports = calendar;
            const documents = await documentResponse;

            console.log("Documents:", documents);

            res.render('dashboard', { 
                profile,
                emails,
                calendar,
                documents,
                title: 'AzureConnect Dashboard'
            });
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;
