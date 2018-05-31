var mongo = require('mongoose');

var iterationSchema = mongo.Schema({
    _id: mongo.Schema.Types.ObjectId,
    name: String,
    startDate: {
        type: Date,
        default: Date.now
    },
    endDate: {
        type: Date,
        default: Date.now
    },
    idProject: {
        type: mongo.Schema.Types.ObjectId,
        ref: 'Projects',
        required: true
    }
});

module.exports = mongo.model('Iteration', iterationSchema);