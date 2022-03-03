// This file will handle the connection logic to the mongodb database
const mongoose = require('mongoose')
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/task-manager', { useNewUrlparser: true }).then(() => {
    console.log('connected to mongodb successfully')
}).catch((e) => {
    console.log('error while attempting to connect to mongodb');
    console.log(e);
});
//To prevent deprectation warnings (from mongodb native driver)
// mongoose.set('useCreateIndex', true);
// mongoose.set('useFindAndModify', false);
module.exports = {
    mongoose
}