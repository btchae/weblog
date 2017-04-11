//Import
import React from 'react'
import { match, RoutingContext } from 'react-router'
import ReactDOMServer from 'react-dom/server'
import express from 'express'
import hogan from 'hogan-express'

// Routes
import routes from './routes'

// Express Requirements
var express = require('express');
var app = express();
var logger = require('morgan');
var port = process.env.PORT || 3000;

//Middleware
app.use(logger('dev'));
app.engine('html', hogan)
app.set('views', __dirname + '/views')
app.use('/', express.static(__dirname + '/public/'))

app.get('*',(req, res) => {

  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    
    const reactMarkup = ReactDOMServer.renderToStaticMarkup(<RoutingContext {...renderProps}

    res.locals.reactMarkup = reactMarkup

    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      
      // Success!
      res.status(200).render('index.html')
    
    } else {
      res.status(404).render('index.html')
    }
  })
})

//Listen
app.listen(port);
console.log('=============================');
console.log('Our band name is PORT:' + port);
console.log('=============================');