/*!
 * ExtendJs Gruntfile (https://github.com/mkenney/ExtendJs)
 *
 * Copyright 2014 Michael Kenney
 *
 * Licensed under MIT (https://github.com/mkenney/ExtendJs/blob/master/LICENSE)
 */

module.exports = function (grunt) {
	'use strict';

	// Force Unix line endings
	grunt.util.linefeed = '\n';

	grunt.initConfig({

		// Metadata.
		pkg: grunt.file.readJSON('package.json')

		// Concat files together
		, concat: {
			options: {
					banner: '<%= banner %>'
				, stripBanners: false
			}
			, js: {
				src: [
					  'src/Array.js'
					, 'src/Date.js'
					, 'src/Ip.js'
					, 'src/Number.js'
					, 'src/String.js'
				]
				, dest: 'dist/js/<%= pkg.name %>.js'
			}
		}

		// Lint all javascript
		, jshint: {
			options: {
				jshintrc: 'jshint.json'
			}
			, grunt: {
				options: {
					jshintrc: 'jshint.json'
				}
				, src: ['Gruntfile.js']
			}
			, src: {
				src: 'src/*.js'
			}
		}

		// Minify all javascript
		, uglify: {
			options: {
				  report: 'min'
				, banner:
					'/**\n'+
					' * ExtendJs v<%= pkg.version %> (<%= pkg.homepage %>)\n'+
					' *\n'+
					' * Copyright 2014-<%= grunt.template.today("yyyy") %> <%= pkg.author %>\n'+
					' *\n'+
					' * Licensed under <%= pkg.license.type %> (<%= pkg.license.url %>)\n'+
					' */\n'
			}
			, build: {
				  src: '<%= concat.js.dest %>'
				, dest: 'dist/js/<%= pkg.name %>.min.js'
			}
		}


		// Task configuration.
		, clean: {
			js: {
				src: ['dist/js/*.js']
			}
		}
	});

	// Task plugins
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-nodeunit');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	// Full distribution
	grunt.registerTask('default', [
		  'clean'
		, 'concat'
		, 'jshint'
		, 'uglify'
	]);

	// Lint the code
	grunt.registerTask('lint', [
		'jshint'
	]);
};
