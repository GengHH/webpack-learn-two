import React, { Component } from 'react'; //这是RN 0.26后导入React的方式，这意思是，导入‘react’文件里export的一个默认的组件，将其命名为React以及Component这个非默认组件
import config from './config.json';
import styles from './Greeter.css'; //导入css

class Greeter extends Component {
    /*1.添加类名"root",它和Creeter.css中的类名实一致的*/
    /*2.获得json中的数据*/
    render() {
        return ( <
            div className = { styles.root } > { config.greetText } < /div>
        );
    }
}

export default Greeter;
//暴露默认组件(就是这个文件中定义的类名)