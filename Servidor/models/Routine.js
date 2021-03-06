const mongoose = require("mongoose");

const RoutineShema = mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    break:{
        type: Number,
        required: true,
        trim: true
    },
    preparation:{
        type: Number,
        required: true,
        trim: true
    },
    tActividad:{
        type : Number,
        required:true
    },
    numSeries:{
        type : Number,
        required:true
    },
    numRondas:{
        type : Number,
        required:true
    },
    creator:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    date:{
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("Routine", RoutineShema)