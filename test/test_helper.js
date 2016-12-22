// /test/test_helper.js
// 是将expect和sinon都设置成全局变量,其他的测试文件都应用这个主文件。
import { expect } from 'chai';
import sinon from 'sinon';


//设置全局变量
global.expect = expect;
global.sinon = sinon;