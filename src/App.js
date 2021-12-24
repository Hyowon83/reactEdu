import React, {Component} from 'react';
import Subject from './components/Subject';
import ReadContent from './components/ReadContent';
import CreateContent from './components/CreateContent';
import TOC from './components/TOC';
import Control from './components/Control';
import './App.css';

// class Subject extends Component {
//   render() {
//     return (
//       //반드시 하나의 최상위 태그만 써야한다.
//       <header>
//           <h1>WEB</h1>
//           world wide web!
//       </header>
//     );
//   }
// }

// class Content extends Component {
//   render () {
//     return (
//       <article>
//           <h2>HTML</h2>
//           HTML is HyperText Markup Language.
//       </article>
//     );
//   }
// }

// 재사용성을 위한 컴포넌트로 바꾸기
// class Subject extends Component {
//   render() {
//     return (
//       <header>
//           <h1>{this.props.title}</h1>
//           {this.props.sub}
//       </header>
//     );
//   }
// }



class App extends Component {
  //컴포넌트가 실행되기 전에 먼저 constructor를 실행시켜서 state를 초기화 시킨다.
  constructor(props) {
    super(props);
    this.max_content_id = 3;
    this.state = {
      mode:"create",
      selected_content_id:2,
      subject:{title:"WEB", sub:"world wide web!!!"},
      welcome:{title:"Welcome", desc:"Hello, React!"},
      contents:[
        {id:1, title:"HTML", desc:"HTML is for infomation"},
        {id:2, title:"CSS", desc:"CSS is for design"},
        {id:3, title:"JavaScript", desc:"JavaScript is for interactive"}
      ]
    }
  }
  render() {
    console.log("App render");
    var _title, _desc, _article = null;
    if(this.state.mode === "welcome") {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title = {_title} desc = {_desc}></ReadContent>;
    } else if(this.state.mode === "read") {
      var i = 0;
      while(i < this.state.contents.length) {
        var data = this.state.contents[i];
        if(data.id === this.state.selected_content_id) {
          _title = data.title;
          _desc = data.desc;
          break;
        }
        i += 1;
      }
      _article = <ReadContent title = {_title} desc = {_desc}></ReadContent>;
    } else if(this.state.mode === "create") {
      _article = <CreateContent onSubmit={function(_title, _desc){
        console.log(_title, _desc);
        this.max_content_id += 1;

        //push는 원본을 바꾸면서 원소를 추가한다.
        // this.state.contents.push({id:this.max_content_id, title:_title, desc:_desc});
        
        //원본을 바꾸지 않고 추가만 하는 concat을 사용하는것이 좋다. 익숙해지기.
        var _contents = this.state.contents.concat({id:this.max_content_id, title:_title, desc:_desc});
        
        this.setState({
          contents:_contents
        });
      }.bind(this)}></CreateContent>;
    }
    return (
      <div className="App">
        {/* <Subject></Subject> */}

        {/* <Subject title = "WEB" sub = "world wide web!!!"></Subject>
        <Subject title = "React" sub = "For UI"></Subject>
        <Subject title = "Jang Hyowon" sub = "PLM Solution Engineer"></Subject> */}

        {/* constructor를 사용하는 방법 */}
        {/* 상위인 state를 하위의 props로 보낸다. */}
        <Subject
          title = {this.state.subject.title}
          sub = {this.state.subject.sub}
          onChangePage = {function() {
            this.setState({ mode:"welcome" });
            // alert("Hey :)");
          }.bind(this)}
        >
        </Subject>

        <TOC
          onChangePage = {function(id) {
            this.setState({ 
              mode:"read",
              selected_content_id:Number(id)
            });
            // alert("TOC");
          }.bind(this)}
          data = {this.state.contents}></TOC>

        <Control onChangeMode = {function(_mode){
          this.setState({
            mode:_mode
          });
        }.bind(this)}></Control>

        {_article}
        {/* <ReadContent title = {_title} desc = {_desc}></ReadContent> */}
        <ReadContent title = "Genergy" desc = "PLM is Product Lifecycle Management."></ReadContent>
      </div>
    );
  }
}

export default App;
