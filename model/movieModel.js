var mongoose = require('mongoose');
var random = require('mongoose-simple-random');
var Schema = mongoose.Schema;

//create Schema
var movieSchema = new Schema({
    title : String,
    translation: String,
    created_at: {
        type: String,
        default: Date.now()
    }
});

movieSchema.plugin(random);

var Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;