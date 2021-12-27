import React, {Component} from 'react';
import Subject from './components/Subject';
import ReadContent from './components/ReadContent';
import CreateContent from './components/CreateContent';
import UpdateContent from './components/UpdateContent';
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
      mode:"welcome",
      selected_content_id:0,
      subject:{title:"WEB", sub:"world wide web!!!"},
      welcome:{title:"Welcome", desc:"Hello, React!"},
      contents:[
        {id:1, title:"HTML", desc:"HTML is for infomation"},
        {id:2, title:"CSS", desc:"CSS is for design"},
        {id:3, title:"JavaScript", desc:"JavaScript is for interactive"}
      ]
    }
  }

  getReadContent() {
    var i = 0;
      while(i < this.state.contents.length) {
        var data = this.state.contents[i];
        if(data.id === this.state.selected_content_id) {
          return data;
          break;
        }
        i += 1;
      }
  }

  getContent() {
    var _title, _desc, _article = null;
    if(this.state.mode === "welcome") {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title = {_title} desc = {_desc}></ReadContent>;
    } else if(this.state.mode === "read") {
      var _content = this.getReadContent();
      _article = <ReadContent title = {_content.title} desc = {_content.desc}></ReadContent>;
    } else if(this.state.mode === "create") {
      _article = <CreateContent onSubmit={function(_title, _desc){
        this.max_content_id += 1;
        
        if(_title === "" || _desc === "") {
          alert("값을 채워주세요.");
        } else {
          console.log(_title, _desc);
          //push는 원본을 바꾸면서 원소를 추가한다.
          // this.state.contents.push({id:this.max_content_id, title:_title, desc:_desc});
          
          //원본을 바꾸지 않고 추가만 하는 concat을 사용하는것이 좋다. 익숙해지기.
          // var _contents = this.state.contents.concat({id:this.max_content_id, title:_title, desc:_desc});
          //concat은 원본의 복제본을 만들어서 원본을 해치지 않고 새로 만드는 것이다.
          //수정 할 때에도 복제본을 가지고 수정하는것이 좋다고 한다.
  
          //복제해서 수정하는 방법 Array.from()
          var _contents = Array.from(this.state.contents);
          _contents.push({id:this.max_content_id, title:_title, desc:_desc});

          this.setState({
            contents:_contents,
            mode:"read",
            selected_content_id:this.max_content_id
          });
        }
      }.bind(this)}></CreateContent>;
    } else if(this.state.mode === "update") {
      _content = this.getReadContent();
      _article = <UpdateContent data={_content} onSubmit={
        function(_id, _title, _desc){
          var _contents = Array.from(this.state.contents);
          var i = 0;
          while(i < _contents.length) {
            if(_contents[i].id === _id) {
              _contents[i] = {id:_id, title:_title, desc:_desc};
              break;
            }
            i += 1;
          }
          this.setState({
            contents:_contents,
            mode:"read"
          });
      }.bind(this)}></UpdateContent>
    }
    return _article;
  }

  render() {
    console.log("App render");
    
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
            this.setState({ mode:"welcome", selected_content_id:0 });
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
          if(_mode === "delete") {
            if(this.state.selected_content_id === 0) {
              alert("삭제할 항목을 선택해주세요.");
            } else {
              if(window.confirm("really?")) {
                var _content = Array.from(this.state.contents);
                var i = 0;
                while(i < _content.length) {
                  if(_content[i].id === this.state.selected_content_id) {
                    _content.splice(i, 1);
                    break;
                  }
                  i += 1;
                }
                this.setState({
                  mode:"welcome",
                  selected_content_id:0,
                  contents:_content
                });
                alert("deleted!");
              }
            }
          } else {
            this.setState({
              mode:_mode
            });
          }
        }.bind(this)}></Control>

        {/* {_article} */}
        {this.getContent()}

        {/* <ReadContent title = {_title} desc = {_desc}></ReadContent> */}
        <ReadContent title = "Genergy" desc = "PLM is Product Lifecycle Management."></ReadContent>
      </div>
    );
  }
}

export default App;
