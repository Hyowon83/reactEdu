//필수 임포트!!
import React, {Component} from "react";

class TOC extends Component {
    render () {
      console.log("TOC render");
      var lists = [];
      var data = this.props.data;
      var i = 0;
      while(i < data.length) {
        lists.push(<li key = {data[i].id}><a href = {"/content/" + data[i].id}>{data[i].title}</a></li>);
        i += 1;
      }
      return (
        <nav>
            <ul>
                {lists}
            </ul>
        </nav>
      );
    }
  }

//TOC라는 클래스를 가져다 쓸 수 있게 만들어준다.
export default TOC;