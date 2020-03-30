const mongoose = require('mongoose')

const SpotSchema = new mongoose.Schema({
    thumbmail: String,
    company: String,
    price: Number,
    techs: [String],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

}, {
    toJSON: {
        virtuals: true
    },
})
SpotSchema.virtual('thumbmail_url').get(function() {
    return `http://192.168.15.11:3334/files/${this.thumbmail}`
})

module.exports = mongoose.model('Spot', SpotSchema)