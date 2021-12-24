import react, {Component} from "react";

class Subject extends Component {
    render() {
      console.log("Subject render");
      return (
        <header>
            <h1><a href="/" onClick={function(e) {
              e.preventDefault();
              this.props.onChangePage(); //App.js에 있는 Subject의 props에 있는 함수를 부르는 것.
            }.bind(this)}>{this.props.title}</a></h1>
            {this.props.sub}
        </header>
      );
    }
  }

export default Subject;