const mongoose =  require('mongoose');
const Schema = mongoose.Schema;

const specificationSchema = new Schema({
        AraiMileage: String,
        EngineDisplacement: Number,
        MaxTorque: String,
        TransmissionType: String,
        FuelTankCapacity: Number,
        FuelType: String,
        MaxPower: String,
        SeatingCapacity: Number,
        BootSpace: Number,
        BodyType: String,
        featuresid: String
})

module.exports = mongoose.model('Specification',specificationSchema);