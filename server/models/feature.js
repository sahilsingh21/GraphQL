const mongoose =  require('mongoose');
const specification = require('./specification');
const Schema = mongoose.Schema;

const featureSchema = new Schema({
        PowerSteering: Boolean,
        AntiLockBrakingSystem: Boolean,
        DriverAirbag: Boolean,
        PassengerAirbag: Boolean,
        AutomaticClimateControl: Boolean,
        AlloyWheels: Boolean,
        MultifunctionSteeringWheel: Boolean,
        PowerWindowsFront: Boolean,
        AirConditioner: Boolean,
        specificationsid: String
})

module.exports = mongoose.model('Feature',featureSchema);