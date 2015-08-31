# nabla-servers-bower

[![Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/) [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/AlbanAndrieu/nabla-servers-bower)
[![Jenkins Build Status](http://home.nabla.mobi:8380/jenkins/job/nabla-servers-bower-nightly/badge/icon)](http://home.nabla.mobi:8380/jenkins/job/nabla-servers-bower-nightly)

[![Code Climate](https://codeclimate.com/github/AlbanAndrieu/nabla-servers-bower/badges/gpa.svg)](https://codeclimate.com/github/AlbanAndrieu/nabla-servers-bower) [![Test Coverage](https://codeclimate.com/github/AlbanAndrieu/nabla-servers-bower/badges/coverage.svg)](https://codeclimate.com/github/AlbanAndrieu/nabla-servers-bower/coverage)
[![Dependency Status](https://img.shields.io/david/AlbanAndrieu/nabla-servers-bower.svg?style=flat-square)](https://david-dm.org/AlbanAndrieu/nabla-servers-bower) [![devDependency Status](https://img.shields.io/david/dev/AlbanAndrieu/nabla-servers-bower.svg?style=flat-square)](https://david-dm.org/AlbanAndrieu/nabla-servers-bower#info=devDependencies)

A bower project.
=============

This project is publishing bower component inside another git repo https://github.com/AlbanAndrieu/nabla-bower-sample-component

This project is based on [AngularJS](https://github.com/angular/angular.js)

Aim is to deploy bower component inside [private-bower](https://www.npmjs.com/package/private-bower)

It contains a bower component that allow to easily override bootstrap

## Installation

Install NPM modules.

```js
sudo npm install.
```

Install Javascript dependencies.

```js
bower install
```

Include module in your app.

```js
var myApp = angular.module('myApp', [
  'sample-component'
]);
```

## Usage

```js
$filter('truncate')(string, length, breakOnWord)
```

### Options

#### string
Type: `String`
Default value: `undefined`

A string you want filter to truncate.

#### length
Type: `Integer`
Default value: `undefined`

A length of a string before the filter will start working.

#### breakOnWord
Type: `Boolean`
Default value: `undefined`

Defines whether filter should apply the truncate in the middle of the word.


## Tests

```js
grunt unit-test
```

## Build your own version

```js
grunt build
```

## Remove from private-bower

```
curl -X POST http://home.nabla.mobi:5678/removePackage -d '{"name":"sample-component"}' -H "Content-Type: application/json" --header "Auth-Key:TODO"
curl -X POST http://home.nabla.mobi:5678/removePackage -d '{"name":"nabla-styles"}' -H "Content-Type: application/json" --header "Auth-Key:TODO"
```

## Register to private-bower with SSH (deprecated)

```
#bower register sample-component ssh://git@github.com:AlbanAndrieu/nabla-bower-sample-component.git
#bower register nabla-styles ssh://git@github.com/AlbanAndrieu/nabla-bower-nabla-styles.git

```
## Register to private-bower with HTTPS

```
bower register sample-component https://github.com/AlbanAndrieu/nabla-bower-sample-component.git
bower register nabla-styles https://github.com/AlbanAndrieu/nabla-bower-nabla-styles.git
```

## Deploy to git

Use maven release feature in Jenkins
```
grunt bump
```
