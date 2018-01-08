
var moment = require('moment');

// var date = new Date();

// console.log(date.getMonth());

// var date = new moment();
// date.add(1,'y').subtract(3,'months')

    var someTimestamp = moment.valueOf()
    console.log(someTimestamp)


var createAt = 123455555;
var date = moment(createAt);

console.log(date.format('h:mm a'))
