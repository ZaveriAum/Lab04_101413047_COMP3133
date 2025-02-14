const mongoose = require('mongoose');

const geoSchema = new mongoose.Schema({
    lat: {
        type: String,
        required: true
    },
    lng: {
        type: String,
        required: true
    }
});

const addressSchema = new mongoose.Schema({
    street: {
        type: String,
        required: true
    },
    suite: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true,
        match: /^[a-zA-Z\s]+$/,
        message: 'City name must contain only alphabets and spaces'
    },
    zipcode: {
        type: String,
        required: true,
        match: /^\d{5}-\d{4}$/,
        message: 'Invalid zip code format. Use DDDDD-DDDD'
    },
    geo: {
        type: geoSchema,
        required: true
    }
});

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    catchPhrase: {
        type: String,
        required: true
    },
    bs: {
        type: String,
        required: true
    }
});

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: [4, 'Username must be at least 4 characters'],
        maxlength: [20, 'Username cannot exceed 20 characters']
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email address']
    },
    address: {
        type: addressSchema,
        required: true
    },
    phone: {
        type: String,
        required: true,
        match: /^\d-\d{3}-\d{3}-\d{4}$/,
        message: 'Invalid phone number format. Use D-DDD-DDD-DDDD'
    },
    website: {
        type: String,
        required: true,
        match: [/^(http|https):\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/, 'Invalid website URL. Use http:// or https://'],
        message: 'Invalid website URL format. Use http:// or https://'
    },
    company: {
        type: companySchema,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);