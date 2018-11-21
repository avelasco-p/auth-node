const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectID,
	email: {
		type: String,
		unique: true,
		required: true,
		trim: true,
	},
});

module.exports = mongoose.model('User', UserSchema) 
