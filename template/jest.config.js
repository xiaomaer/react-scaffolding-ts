module.exports = {
    setupFiles: ['./test/jestsetup.js'],
    snapshotSerializers: ['enzyme-to-json/serializer'],
    moduleNameMapper: {
        '^.+\\.(css|scss)$': 'identity-obj-proxy'
    }
};
