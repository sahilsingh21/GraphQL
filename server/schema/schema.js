const graphql = require('graphql');
const _= require('lodash');
const Specification = require('../models/specification');
const Feature = require('../models/feature');
const specification = require('../models/specification');

const {
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLInt,  
    GraphQLSchema, 
    GraphQLID,
    GraphQLBoolean,
    GraphQLList 
} = graphql;

// var specifications = [
//     {id: '1', AraiMileage: '12.65 kmpl', FuelType: "Petrol", EngineDisplacement: 3982, MaxPower: "576.63bhp@6250rpm", MaxTorque: "700Nm@2100–5500rpm", SeatingCapacity: 2, TransmissionType: "Automatic", BootSpace: 285, FuelTankCapacity: 75, BodyType: "Coupe", featuresid: '1'},
//     {id: '2', AraiMileage: '15.65 kmpl', FuelType: "Disel", EngineDisplacement: 4482, MaxPower: "576.63bhp@6250rpm", MaxTorque: "700Nm@2100–5500rpm", SeatingCapacity: 2, TransmissionType: "Automatic", BootSpace: 285, FuelTankCapacity: 75, BodyType: "Coupe", featuresid: '2'},
// ];

// var features = [
//     {id: '1', PowerSteering: true, PowerWindowsFront: true, AntiLockBrakingSystem: true, AirConditioner: true, DriverAirbag: true, PassengerAirbag: true, AutomaticClimateControl: true, AlloyWheels: true, MultifunctionSteeringWheel: true, specificationsid: '1'},
//     {id: '2', PowerSteering: true, PowerWindowsFront: true, AntiLockBrakingSystem: true, AirConditioner: true, DriverAirbag: true, PassengerAirbag: true, AutomaticClimateControl: true, AlloyWheels: true, MultifunctionSteeringWheel: true, specificationsid: '2'},
// ]


const SpecificationsType = new GraphQLObjectType({
    name: 'Specifications',
    fields: () => ({
        id: {type: GraphQLID},
        AraiMileage: {type: GraphQLString},
        EngineDisplacement: {type: GraphQLInt},
        MaxTorque: {type: GraphQLString},
        TransmissionType: {type: GraphQLString},
        FuelTankCapacity: {type: GraphQLInt},
        FuelType: {type: GraphQLString},
        MaxPower: {type: GraphQLString},
        SeatingCapacity: {type: GraphQLInt},
        BootSpace: {type: GraphQLInt},
        BodyType: {type: GraphQLString},
        feature: {
            type: FeaturesType,
            resolve(parent, args){
                // return _.find(features, {id: parent.featuresid});
                return Feature.findById(parent.featuresid);
            }
        }
    })
});

const FeaturesType = new GraphQLObjectType({
    name: 'Features',
    fields: () => ({
        id: {type: GraphQLID},
        PowerSteering: {type: GraphQLBoolean},
        AntiLockBrakingSystem: {type: GraphQLBoolean},
        DriverAirbag: {type: GraphQLBoolean},
        PassengerAirbag: {type: GraphQLBoolean},
        AutomaticClimateControl: {type: GraphQLBoolean},
        AlloyWheels: {type: GraphQLBoolean},
        MultifunctionSteeringWheel: {type: GraphQLBoolean},
        PowerWindowsFront: {type: GraphQLBoolean},
        AirConditioner: {type: GraphQLBoolean},
        specification: {
            type: SpecificationsType,
            resolve(parent, args){
                // return _.find(specifications, {id: parent.specificationsid});
                return Specification.findById(parent.specificationsid);
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields:{
        specification: {
            type: SpecificationsType,
            args: {id:{type: GraphQLID}},
            resolve(parent, args){
            //    return _.find(specifications, {id: args.id});
                return Specification.findById(args.id);
            }
        },
        feature: {
            type: FeaturesType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                // return _.find(features, {id: args.id});
                return Feature.findById(args.id);
            }
        }
        // specifications: {
        //     type: SpecificationsType,
        //     resolve(parent, args){
        //         return specifications;
        //     }
        // }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addSpecification: {
            type: SpecificationsType,
            args:{
                AraiMileage: {type: GraphQLString},
                EngineDisplacement: {type: GraphQLInt},
                MaxTorque: {type: GraphQLString},
                TransmissionType: {type: GraphQLString},
                FuelTankCapacity: {type: GraphQLInt},
                FuelType: {type: GraphQLString},
                MaxPower: {type: GraphQLString},
                SeatingCapacity: {type: GraphQLInt},
                BootSpace: {type: GraphQLInt},
                BodyType: {type: GraphQLString},
                featuresid: {type: GraphQLString}
            },
            resolve(parent, args){
                let specification = new Specification({
                    AraiMileage: args.AraiMileage,
                    EngineDisplacement: args.EngineDisplacement,
                    MaxTorque: args.MaxTorque,
                    TransmissionType: args.TransmissionType,
                    FuelTankCapacity: args.FuelTankCapacity,
                    FuelType: args.FuelType,
                    MaxPower: args.MaxPower,
                    SeatingCapacity: args.SeatingCapacity,
                    BootSpace: args.BootSpace,
                    BodyType: args.BodyType,
                    featuresid: args.featuresid
                });
                return specification.save();
            }
        },
        addFeature: {
            type: FeaturesType,
            args:{
                PowerSteering: {type: GraphQLBoolean},
                AntiLockBrakingSystem: {type: GraphQLBoolean},
                DriverAirbag: {type: GraphQLBoolean},
                PassengerAirbag: {type: GraphQLBoolean},
                AutomaticClimateControl: {type: GraphQLBoolean},
                AlloyWheels: {type: GraphQLBoolean},
                MultifunctionSteeringWheel: {type: GraphQLBoolean},
                PowerWindowsFront: {type: GraphQLBoolean},
                AirConditioner: {type: GraphQLBoolean}
            },
            resolve(parent, args){
                let feature = new Feature({
                    PowerSteering: args.PowerSteering,
                    AntiLockBrakingSystem: args.AntiLockBrakingSystem,
                    DriverAirbag: args.DriverAirbag,
                    PassengerAirbag: args.PassengerAirbag,
                    AutomaticClimateControl: args.AutomaticClimateControl,
                    AlloyWheels: args.AlloyWheels,
                    MultifunctionSteeringWheel: args.MultifunctionSteeringWheel,
                    PowerWindowsFront: args.PowerWindowsFront,
                    AirConditioner: args.AirConditioner,
                    specificationsid: args.specificationsid
                });
                return feature.save();
            }
        }
    }
})



module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});