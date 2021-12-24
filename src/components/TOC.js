//필수 임포트!!
import React, {Component} from "react";

class TOC extends Component {
    shouldComponentUpdate(newProps, newState){
      console.log(
        newProps.data //바뀐 값
        , this.props.data //현재 값
      );
      if(this.props.data === newProps.data) {
        return false;
      } else {
        return true;
      }
    }
    render () {
      console.log("TOC render");
      var lists = [];
      var data = this.props.data;
      var i = 0;
      while(i < data.length) {
        lists.push(
          <li key = {data[i].id}>
            <a 
              href = {"/content/" + data[i].id}
              onClick={function(id, e) {
                // debugger;
                e.preventDefault();
                this.props.onChangePage(id);
              }.bind(this, data[i].id)}>
              {data[i].title}
            </a>
          </li>);
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