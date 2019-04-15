const { statSync } = require('fs');
const { basename, resolve, isAbsolute } = require('path');
const glob = require('glob');
exports.getAlias = function(prjPath) {
    const alias = glob
        .sync(`${prjPath}/*`)
        .filter(v => {
            return statSync(v).isDirectory();
        })
        .reduce((prev, cur) => {
            prev[basename(cur)] = cur;
            return prev;
        }, {});
    return alias;
};

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
exports.replaceAlias = function(alias, path) {
    // console.log('alias = ', alias);

    let name = startWithAlias(alias, path);
    if (name) {
        // console.log('name = ', name);
        // console.log('alias.name = ', alias[name]);
        return path.replace(name, alias[name]);
    }
    return path;
};
