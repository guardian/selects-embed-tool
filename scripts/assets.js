var fs = require('fs-extra');
var sass = require('node-sass');

module.exports = {
    css: function(path, absolutePath, version) {
        fs.removeSync(path + 'embed/guardian-selects/style.css');

        var css = sass.renderSync({
            file: './src/embed/sass/style.scss'
        }).css.toString('utf8');

        fs.mkdirsSync(path + 'embed/guardian-selects/v' + version);
        fs.writeFileSync(path + 'embed/guardian-selects/v' + version + '/style.css', css.replace(/@@assetPath@@/g, absolutePath).replace(/@@version@@/g, 'v' + version));
        console.log('updated css');
    },

    html: function(path, absolutePath, version) {
        fs.mkdirsSync(path + 'tools/guardian-selects');
        fs.writeFileSync(path + 'tools/guardian-selects/index.html',
            fs.readFileSync('./src/tool/index.html', 'utf8').replace(/@@assetPath@@/g, absolutePath).replace(/@@version@@/g, 'v' + version)
        );

        fs.mkdirsSync(path + 'embed/guardian-selects/v' + version)
        fs.writeFileSync(path + 'embed/guardian-selects/v' + version + '/embed.html',
            fs.readFileSync('./src/embed/embed.html', 'utf8').replace(/@@assetPath@@/g, absolutePath).replace(/@@version@@/g, 'v' + version)
        );

        console.log('updated html!');
    }
} 