const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require("path");
const express = require('express');

module.exports = function (app) {
    app.use(
        createProxyMiddleware('/IMREAL', {
            target: `${process.env.REACT_APP_API_HTTP}`,
            changeOrigin: true,
        })
    );
    app.use(
        express.static(path.join(__dirname, "../build"))
    );
};