// /test/containers/Root.spec.js
// 测试代码  ( 在shallow(<Root />);处总是报语法错误，问题尚未解决)
import React from 'react';                     // required to get test to work.  we can get around this later with more configuration
import {shallow} from 'enzyme';              // method from enzyme which allows us to do shallow render
import Root from '../app/containers/Root';  // import our soon to be component

describe('(Container) Root', () => {
  //it('renders as a <div>', () => {
  //  const wrapper = shallow(<Root />);
  //  expect(wrapper.type()).to.eql('div');
 // });

 // it('has style with height 100%', () => {
 //   const wrapper = shallow (<Root />);
 //   const expectedStyles = {
 //     height: '100%',
 //     background: '#333'
//    }
//    expect(wrapper.prop('style')).to.eql(expectedStyles);
//  });

  it('contains a header explaining the Root', () => {
    const wrapper = shallow(<Root />);
    expect(wrapper.find('.welcome-header')).to.have.length(1);
 });
  
  
 //   it('should render children when passed in', () => {
//    const wrapper = shallow(
//      <Root>
//        <div className="unique" />
//      </Root>
 //   );
//    expect(wrapper.contains(<div className="unique" />)).to.equal(true);
//  });

});
