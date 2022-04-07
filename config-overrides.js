const { override, fixBabelImports } = require('customize-cra');
// import { override, fixBabelImports } from 'customize-cra';

module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: 'css',
    }),
);