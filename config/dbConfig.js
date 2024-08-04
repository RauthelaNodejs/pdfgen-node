const mongoose = require('mongoose');
let mongoUrl = process.env.MONGOURL ||"mongodb://localhost/test"
function dbConnection() {
    mongoose.connect(mongoUrl, { useNewUrlParser: true });
    mongoose.set({debug : true})
    mongoose.connection.once('open', function () {
        console.log('Database connected Successfully');
    }).on('error', function (err) {
        console.log('Error', err);
    })
}


module.exports = {
    dbConnection
}
