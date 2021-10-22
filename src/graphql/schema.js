const {makeExecutableSchema} = require('graphql-tools');

const resolvers = require('./resolvers/index');
const typeDefs = require('./typeDefs/index');

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});

module.exports = schema;