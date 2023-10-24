const mongoose = require('mongoose');

const DbConnection = async (URL) => {
    await mongoose.connect(URL)
        .then(() => { console.log('Database connnected Successfully') })
        .catch((err) => { console.log(`Connection Fail : ${err}`) });
};

module.exports = {DbConnection};