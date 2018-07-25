# nabla-servers-bower
![nabla-servers-bower](http://home.nabla.mobi:7075/images/mroizo.1f00120c.png)

[![Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/) [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/AlbanAndrieu/nabla-servers-bower)
[![Jenkins Build Status](http://home.nabla.mobi:8381/job/nabla-servers-bower-nightly/badge/icon)](http://home.nabla.mobi:8381/job/nabla-servers-bower-nightly)
[![Quality Gate](https://sonarcloud.io/api/project_badges/measure?project=com.nabla.project.servers.sample%3Abower-pom%3Amaster&metric=alert_status)](https://sonarcloud.io/dashboard?id=com.nabla.project.servers.sample%3Abower-pom)

[![Code Climate](https://codeclimate.com/github/AlbanAndrieu/nabla-servers-bower/badges/gpa.svg)](https://codeclimate.com/github/AlbanAndrieu/nabla-servers-bower) [![Test Coverage](https://codeclimate.com/github/AlbanAndrieu/nabla-servers-bower/badges/coverage.svg)](https://codeclimate.com/github/AlbanAndrieu/nabla-servers-bower/coverage)
[![Dependency Status](https://img.shields.io/david/AlbanAndrieu/nabla-servers-bower.svg?style=flat-square)](https://david-dm.org/AlbanAndrieu/nabla-servers-bower) [![devDependency Status](https://img.shields.io/david/dev/AlbanAndrieu/nabla-servers-bower.svg?style=flat-square)](https://david-dm.org/AlbanAndrieu/nabla-servers-bower#info=devDependencies)
[![Known Vulnerabilities](https://snyk.io/test/github/albanandrieu/nabla-servers-bower/badge.svg)](https://snyk.io/test/github/albanandrieu/nabla-servers-bower)
[![NSP Status](https://nodesecurity.io/orgs/nabla/projects/7d689bf7-12fd-4576-8d59-9a62700aae21/badge)](https://nodesecurity.io/orgs/nabla/projects/7d689bf7-12fd-4576-8d59-9a62700aae21)

A bower project.
=============

This project is publishing bower component inside another git repo https://github.com/AlbanAndrieu/nabla-bower-sample-component

This project is based on [AngularJS](https://github.com/angular/angular.js)

Aim is to deploy bower component inside [private-bower](https://www.npmjs.com/package/private-bower)

It contains a bower component that allow to easily override bootstrap

## Quality tools

### pre-commit

See [pre-commit](http://pre-commit.com/)
Run `pre-commit install`
Run `pre-commit autoupdate`

Run `pre-commit run --all-files`

Commit `git commit -am 'TEST' --no-verify`

### takari maven wrapper

See [takari-maven-wrapper] (https://github.com/takari/maven-wrapper)

```
mvn -N io.takari:maven:wrapper
```

## NODE/NPM Installation

```
#npm cache clean -f
npm install -g n
#n stable
n 8.9.4
node -v
/usr/local/bin/node -v
npm install -g npm@5.5.1
```

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

## Other resources

Yo generator :
https://github.com/peterhendrick/openSource

Thanks for reading!

# Contributing

The [issue tracker](https://github.com/AlbanAndrieu/nabla-servers-bower-sample/issues) is the preferred channel for bug reports, features requests and submitting pull requests.

For pull requests, editor preferences are available in the [editor config](.editorconfig) for easy use in common text editors. Read more and download plugins at <http://editorconfig.org>.

License
-------

[Apache v2](http://www.apache.org/licenses/LICENSE-2.0.html)

***

Alban Andrieu [linkedin](https://fr.linkedin.com/in/nabla/)
