const mongoose = require('mongoose');
const DbConnection = async () => {
    await mongoose.connect(process.env.DB_URL)
        .then(() => { console.log('Database connnected Successfully') })
        .catch((err) => { console.log(`Connection Fail : ${err}`) });
};

module.exports = DbConnection;