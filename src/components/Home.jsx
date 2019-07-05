// import React, { Component } from "react";
//  class Home extends Component {
//   render() {
//     return <div>Home</div>;
//   }
// }
// export Home
import React, { Component } from "react";
import { CSSTransition } from "react-transition-group"; //react-transition-group动画组件
import "./Home.less";
export class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "123",
      in: false
    };
  }
  handleClick = e => {
    this.setState({in:!this.state.in})
  };

  render() {
    return (
      <div>
        Home
        {this.state.value}
        <CSSTransition
          in={this.state.in}
          appear={true}
          timeout={2000} //动画持续时间
          classNames="boss-text" //className值，防止重复
          unmountOnExit //在元素退场时，自动把DOM也删除
        >
          <div>BOSS级人物-孙悟空</div>
        </CSSTransition>
        <div>
        <button onClick={this.handleClick}>点击</button>
        </div>
      </div>
    );
  }
}

export default Home;
