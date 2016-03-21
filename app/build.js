var NwBuilder = require('nw-builder');
var nw = new NwBuilder({
    files: './*.{js,png,json}', // use the glob format
    platforms: ['linux64', 'osx64', 'win32', 'win64'],
    version: '0.12.3',
    zip: true // <- this solve the problem
});

//Log stuff you want

nw.on('log',  console.log);

// Build returns a promise
nw.build().then(function () {
   console.log('all done!');
}).catch(function (error) {
    console.error(error);
});