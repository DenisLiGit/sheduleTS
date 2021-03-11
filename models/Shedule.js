const {Schema, model} = require('mongoose')

const schema = new Schema({
    userId: {type: String, required: true},
    shedules: [{
        title: {type: String, required: true},
        description: {type: String},
        dayOfWeek: {type: Number, required: true},
        startDate: {type: Number, required: true},
        endDate: {type: Number, required: true},
        color: {type: String},
        icon: {type: Number},
        check: {type: Boolean},
        _id: {type: String}
    }]
})

module.exports = model('Shedule', schema)