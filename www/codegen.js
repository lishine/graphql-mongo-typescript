module.exports = {
    schema: 'http://localhost:3100/graphql',
    documents: ['./src/**/*.tsx', './src/**/*.ts'],
    overwrite: true,
    generates: {
        './src/generated/graphql.tsx': {
            plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
            config: {
                skipTypename: false,
                withHooks: true,
                withHOC: false,
                withComponent: false,
                apolloReactHooksImportFrom: '@apollo/client',
                apolloReactCommonImportFrom: '@apollo/client',
            },
        },
        // './graphql.schema.json': {
        //     plugins: ['introspection'],
        // },
    },
    hooks: {
        afterAllFileWrite: ['prettier --write'],
        afterOneFileWrite: ['prettier --write'],
    },
}
