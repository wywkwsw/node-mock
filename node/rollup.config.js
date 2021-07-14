import resolve from '@rollup/plugin-node-resolve';
import commonjs from "@rollup/plugin-commonjs"
import json from '@rollup/plugin-json';
import nodePolyfills from 'rollup-plugin-node-polyfills';
export default {
    input: ['./index.js'],
    output: {
      file: 'dist/index.js',
      format: 'umd',
      name:'mock-server'
    },
    plugins:[
        nodePolyfills(), 
        resolve(),
        commonjs(),
        json()
    ]
  };