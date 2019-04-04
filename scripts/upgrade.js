#!/usr/bin/env node

(function () {
    const fs = require('fs');
    const path = require('path');
    const argv = require('minimist');
    const execSync = require('child_process').execSync;

    const ARGS = parseInputArgs();
    const VERSION = ARGS.version;
    const PUBLISH = ARGS.publish;
    const COMPONENTS_FOLDER_NAMES = ['nabla-styles'];

    const mainPackagePath = path.join(__dirname, '../package.json');
    let mainPackage = require(mainPackagePath);
    mainPackage.version = VERSION;
    fs.writeFileSync(mainPackagePath, JSON.stringify(mainPackage, null, '\t'));

    const componentsPath = path.join(__dirname, '../components/');
    let packages = readJsonFiles(COMPONENTS_FOLDER_NAMES);
    packages = packages.map(package => {
        package.version = VERSION + '-SNAPSHOT';
        package.dependencies = upgradeDependencies(package.dependencies);
        package.devDependencies = upgradeDependencies(package.devDependencies);
        return package;
    });
    writeJsonFiles(COMPONENTS_FOLDER_NAMES, packages);

    if (PUBLISH) {
        publishComponents(COMPONENTS_FOLDER_NAMES);
        writeJsonFiles(COMPONENTS_FOLDER_NAMES, packages);
    }

    function writeJsonFiles(foldersArray, files) {
        foldersArray.forEach((folderName, index) => {
            fs.writeFileSync(path.join(__dirname, '../components', folderName, 'package.json'), JSON.stringify(files[index], null, '\t'));
            console.log(files[index].name + " version updated!");
        });
    }

    function readJsonFiles(foldersArray) {
        let jsons = [];
        foldersArray.forEach(folderName => {
            jsons.push(require(path.join(__dirname, '../components', folderName, 'package.json')));
        });
        return jsons;
    }

    function upgradeDependencies(dependencies) {
        if (dependencies) {
            let dependenciesNames = Object.keys(dependencies);
            dependenciesNames.forEach(dependencyName => {
                if (dependencyName.includes('@nabla')) {
                    dependencies[dependencyName] = '^' + VERSION + '-SNAPSHOT';
                }
            });
        }
        return dependencies;
    }

    function publishComponents(foldersArray) {
        try {
            foldersArray.forEach(folderName => {
                execSync('npm i && grunt && grunt publish', { cwd: path.join(__dirname, '../components', folderName), stdio: [0, 1, 2] });
            });
        } catch (error) {
            console.log(error);
            process.exit(1);
        }
    }

    function parseInputArgs() {
        const args = argv(process.argv.slice(2), {
            alias: { v: 'version', p: 'publish' }
        });

        if (args.version === undefined) {
            console.log('\nERORR: You need to specify version.\n\n' +
                '-v VERSION, --version=VERSION       Next version of ui-components.\n');
            process.exit(1);
        }

        return args;
    }
})();
