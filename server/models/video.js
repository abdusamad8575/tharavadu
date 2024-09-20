const mongoose = require('mongoose')

const vlogSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    subtitle: {
        type: String,
        required: true
    },
    url: {
        type: String,
    },
    // image: {
    //     type: String,
    //     required: true
    // },
    status: {
        type: Boolean,
        default: true
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('Vlog', vlogSchema)