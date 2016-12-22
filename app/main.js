//main.js 
//var greeter = require('./Greeter.js');
//document.getElementById('root').appendChild(greeter());


import React from 'react';
import {render} from 'react-dom';     //react 中的虚拟DOM
import Greeter from './Greeter';

import './main.css';				//使用require导入css文件

render(<Greeter />, document.getElementById('root'));

console.log(Greeter);