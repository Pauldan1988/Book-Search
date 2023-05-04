const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://maplesyrupman:passwordPassword@cluster0.ctvol.mongodb.net/?retryWrites=true&w=majority');

module.exports = mongoose.connection;
