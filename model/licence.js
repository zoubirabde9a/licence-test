import mongoose from 'mongoose';


const licenceScheme = mongoose.Schema({
    ref: 
    {
        type: String,
        index: {unique: true}
    },
    serial: String,
    status: Number,
    start: Date,
    end: Date,
    days: Number
});

const licence = mongoose.model('licence', licenceScheme);

export default licence;