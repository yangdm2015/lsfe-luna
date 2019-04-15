const { statSync } = require('fs');
const rootPath = process.cwd();
const { basename, resolve, isAbsolute } = require('path');
const glob = require('glob');

// console.log('rootPath = ', rootPath);
let c = resolve(rootPath, 'server/config');
// console.log('c = ', c);
let prjPath = '/Users/yangshan/Documents/repo/mall-fe-pc-product/src';

const alias = glob
    .sync(`${prjPath}/*`)
    .filter(v => {
        return statSync(v).isDirectory();
    })
    .reduce((prev, cur) => {
        prev[basename(cur)] = cur;
        return prev;
    }, {});
const startWithAlias = function(alias, path) {
    let aliasNames = Object.keys(alias);
    let r = aliasNames.find(name => {
        let rExp = new RegExp(`^${name}`);
        if (rExp.test(path)) {
            return name;
        }
        return false;
    });
    return r;
};
let path = 'utils/index';
let r = startWithAlias(alias, path);
console.log('r = ', r);
