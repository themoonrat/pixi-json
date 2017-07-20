import pkg from './package.json';
import buble from 'rollup-plugin-buble';
import resolve from 'rollup-plugin-node-resolve';
import uglify from 'rollup-plugin-uglify';
import { minify } from 'uglify-es';

const prod = process.env.BUILD === 'prod';
const format = process.env.FORMAT || 'umd';

const entry = `src/index.js`;
const suffix = prod ? `.min` : '';
const suffixFormat = format !== 'umd' ? `.${format}` : '';
const dest = `bin/pixi-json${suffixFormat}${suffix}.js`;

const plugins = [
    resolve(),
    buble()
];

if (prod) {
    plugins.push(uglify({
        mangle: true,
        compress: true,
        output: {
            comments: function(node, comment) {
                const {value, type} = comment;
                if (type === 'comment2') {
                    return value[0] === '!';
                }
            }
        }
    }, minify));
}

const compiled = (new Date()).toUTCString().replace(/GMT/g, 'UTC');

const banner = `/*!
 * ${pkg.name} - v${pkg.version}
 * Compiled ${compiled}
 *
 * pixi-json is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */\n`;

export default {
    banner,
    format,
    intro: `if (typeof PIXI === 'undefined') { throw 'PixiJS is required'; }`,
    outro: ``,
    entry,
    dest,
    sourceMap: true,
    plugins
};