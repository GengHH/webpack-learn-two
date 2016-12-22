// /test/helloWorld.spec.js
//import { expect } from 'chai';  (引用的时候，已经在全局进行了定义，所以这里就不用再引用了)

describe('hello world', () => {
  it('works!', () => {
    expect(true).to.be.true;
  });
});