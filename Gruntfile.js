'use strict';

module.exports = function(grunt) {
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-simple-mocha');

	grunt.initConfig({
		jshint: {
			dev: {
				options: {
					node: true,
					globals: {
						describe: true,
						it: true,
						before: true,
						after: true
					}
				},
				src: ['Gruntfile.js', 'test/*.js', 'server.js', 'routes.js']
			}
		},
		simplemocha: {
			all: {
				src: ['test/*.js']
			}
		}

	});

	grunt.registerTask('test', ['jshint', 'simplemocha']);
	grunt.registerTask('default', ['test']);
};