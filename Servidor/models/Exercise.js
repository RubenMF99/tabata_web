const mongoose = require("mongoose");

const ExerciseShema = mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    seconds:{
        type:Number,
        required: true,
        trim: true
    },
    routine:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Routine'
    },
    date:{
        type: Date,
        default: Date.now()
    }
},

)

module.exports = mongoose.model("Exercise", ExerciseShema)