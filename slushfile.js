/*
 * slush-atom-shell
 * https://github.com/paulohp/slush-atom-shell
 *
 * Copyright (c) 2014, Paulo Pires
 * Licensed under the MIT license.
 */

 'use strict';

 var gulp = require('gulp'),
 install = require('gulp-install'),
 conflict = require('gulp-conflict'),
 template = require('gulp-template'),
 rename = require('gulp-rename'),
 downloadatomshell = require('gulp-download-atom-shell'),
 _ = require('underscore.string'),
 inquirer = require('inquirer');

 gulp.task('default', function (done) {
  var prompts = [{
    type: 'input',
    name: 'appName',
    message: 'What is the name of your app?',
    default: 'atom-shell.app'
  }, {
    type: 'input',
    name: 'appDescription',
    message: 'What is the description for your app?',
    default: 'atom-shell app from scratch'
  }, {
    type: 'input',
    name: 'appVersion',
    message: 'What is the version for your app?',
    default: '0.0.1'
  }, {
    type: 'confirm',
    name: 'moveon',
    message: 'Continue?'
  }];
    //Ask
    inquirer.prompt(prompts,
      function (answers) {
        if (!answers.moveon) {
          return done();
        }
        answers.appNameSlug = _.slugify(answers.appName);
        gulp.src(__dirname + '/templates/**')
        .pipe(template(answers))
        .pipe(rename(function (file) {
          if (file.basename[0] === '_') {
            file.basename = '.' + file.basename.slice(1);
          }
        }))
        .pipe(conflict('./'))
        .pipe(gulp.dest('./'))
        .pipe(install())
        .on('end', function () {
          done();
        });
      });
  });
