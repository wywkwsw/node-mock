import resolve from '@rollup/plugin-node-resolve';
import commonjs from "@rollup/plugin-commonjs"
import json from '@rollup/plugin-json';
import nodePolyfills from 'rollup-plugin-node-polyfills';
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';
export default {
    input: ['./index.js'],
    output: {
      file: 'dist/index.js',
      format: 'umd',
      name:'mock-server'
    },
    plugins:[
        nodePolyfills(),       
        // globals(),
        // builtins(),
        resolve(),
        commonjs(),
        json()
    ]
  };