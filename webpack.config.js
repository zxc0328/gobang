const webpack = require('webpack');
const path = require('path');

module.exports = {
	entry: [    
    	"./app/app.js"
    ],
	output: {
	    path: './dist',
    	filename: 'bundle.js'
    }
};