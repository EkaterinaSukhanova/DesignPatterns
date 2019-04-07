'use strict';

let promise = new Promise(function (resolve, reject) {
    let param = +process.argv[2];

    if (param % 2 === 0) {
        resolve(param);
    } else {
        reject(-param);
    }
});


promise.then(item => {
    return item / 2;
}).then(item => {
    console.log("param/2 " + item);
}).catch(item => {
    console.log("in catch: " + item);
});
