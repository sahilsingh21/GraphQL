const graphql = require('graphql');
const _= require('lodash');

const {
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLInt, 
    GraphQLSchema, 
    GraphQLID,
    GraphQLBoolean,
    GraphQLList 
} = graphql;

var specifications = [
    {id: '1', AraiMileage: '12.65 kmpl', FuelType: "Petrol", EngineDisplacement: 3982, MaxPower: "576.63bhp@6250rpm", MaxTorque: "700Nm@2100–5500rpm", SeatingCapacity: 2, TransmissionType: "Automatic", BootSpace: 285, FuelTankCapacity: 75, BodyType: "Coupe", featuresid: '1'},
    {id: '2', AraiMileage: '15.65 kmpl', FuelType: "Disel", EngineDisplacement: 4482, MaxPower: "576.63bhp@6250rpm", MaxTorque: "700Nm@2100–5500rpm", SeatingCapacity: 2, TransmissionType: "Automatic", BootSpace: 285, FuelTankCapacity: 75, BodyType: "Coupe", featuresid: '2'},
];

var features = [
    {id: '1', PowerSteering: true, PowerWindowsFront: true, AntiLockBrakingSystem: true, AirConditioner: true, DriverAirbag: true, PassengerAirbag: true, AutomaticClimateControl: true, AlloyWheels: true, MultifunctionSteeringWheel: true, specificationsid: '1'},
    {id: '2', PowerSteering: true, PowerWindowsFront: true, AntiLockBrakingSystem: true, AirConditioner: true, DriverAirbag: true, PassengerAirbag: true, AutomaticClimateControl: true, AlloyWheels: true, MultifunctionSteeringWheel: true, specificationsid: '2'},
]


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
                console.log(parent);
                return _.find(features, {id: parent.featuresid});
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
                console.log(parent);
                return _.find(specifications, {id: parent.specificationsid});
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
               return _.find(specifications, {id: args.id});
            }
        },
        feature: {
            type: FeaturesType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                return _.find(features, {id: args.id});
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

module.exports = new GraphQLSchema({
    query: RootQuery
});