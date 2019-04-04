const { exec } = require('child_process');

function callback(error, stdout, stderr) {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(stdout);
    console.log(stderr);
}

exec('npm i', {cwd: 'components/nabla-styles/'}, callback);
//exec('npm i', {cwd: 'components/sample-component/'}, callback);
