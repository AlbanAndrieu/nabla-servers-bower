# nabla-servers-bower

A bower project sample.
=============

This project is publishing bower component inside another git repo https://github.com/AlbanAndrieu/nabla-bower-sample-component

This project is based on [AngularJS](https://github.com/angular/angular.js)

Aim is to deploy bower component inside [private-bower](https://www.npmjs.com/package/private-bower)

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
curl -X POST http://home.nabla.mobi:5678/removePackage -d '{"name":"nabla-configuration"}' -H "Content-Type: application/json" --header "Auth-Key:TODO"
curl -X POST http://home.nabla.mobi:5678/removePackage -d '{"name":"nabla-auth"}' -H "Content-Type: application/json" --header "Auth-Key:TODO"
curl -X POST http://home.nabla.mobi:5678/removePackage -d '{"name":"nabla-header"}' -H "Content-Type: application/json" --header "Auth-Key:TODO"
curl -X POST http://home.nabla.mobi:5678/removePackage -d '{"name":"nabla-notifications"}' -H "Content-Type: application/json" --header "Auth-Key:TODO"
```

## Register to private-bower with SSH

```
bower register sample-component ssh://git@github.com:AlbanAndrieu/nabla-bower-sample-component.git
bower register nabla-configuration ssh://git@github.com/AlbanAndrieu/nabla-bower-nabla-configuration.git
bower register nabla-auth ssh://git@github.com/AlbanAndrieu/nabla-bower-nabla-auth.git
bower register nabla-header ssh://git@github.com/AlbanAndrieu/nabla-bower-nabla-header.git
bower register nabla-notifications ssh://git@github.com/AlbanAndrieu/nabla-bower-nabla-notifications.git

```
## Register to private-bower with HTTPS

```
bower register sample-component https://github.com/AlbanAndrieu/bower-sample-component.git
bower register nabla-configuration https://github.com/AlbanAndrieu/bower-nabla-configuration.git
bower register nabla-auth https://github.com/AlbanAndrieu/bower-nabla-auth.git
bower register nabla-header https://github.com/AlbanAndrieu/bower-nabla-header.git
bower register nabla-notifications https://github.com/AlbanAndrieu/bower-nabla-notifications.git
```

## Deploy to git
```
#cd ./scripts/bower/bower-sample-component
#How to remove a wrong tag in git
#git tag -d v0.0.0-local+sha.a6d3020
#git push origin :refs/tags/v0.0.0-local+sha.a6d3020
#create a tag
#git tag 0.0.1-beta.1
#git push origin tag 0.0.1-beta.1
#git tag
```
