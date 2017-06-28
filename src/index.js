/* eslint-disable no-console */

import './index.css'

import numeral from 'numeral'
//https://github.com/adamwdraper/Numeral-js

const courseValue = numeral(1000).format('$0,0.00')
console.log(`I would pay ${courseValue} for this course!`)
