#### 코드 정리
- 기본
class Subject extends Component {
  render() {
    return (
      <!-- 반드시 하나의 최상위 태그만 써야한다. -->
      <header>
          <h1>WEB</h1>
          world wide web!
      </header>
    );
  }
}

- 재사용성을 위한 컴포넌트로 바꾸기 (변수설정)
class Subject extends Component {
  render() {
    return (
      <header>
          <h1>{this.props.title}</h1>
          {this.props.sub}
      </header>
    );
  }
}

- state와 props에 관하여
class App extends Component {
  <!-- 컴포넌트가 실행되기 전에 먼저 constructor를 실행시켜서 state를 초기화 시킨다. -->
  constructor(props) {
    super(props);
    this.state = {
      mode:"read",
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
    var _title, _desc = null;
    if(this.state.mode === "welcome") {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
    } else if(this.state.mode === "read") {
      _title = this.state.contents[0].title;
      _desc = this.state.contents[0].desc;
    }
    return (
      <div className="App">
        {/* <Subject></Subject> */}

        {/* <Subject title = "WEB" sub = "world wide web!!!"></Subject>
        <Subject title = "React" sub = "For UI"></Subject>
        <Subject title = "Jang Hyowon" sub = "PLM Solution Engineer"></Subject> */}

        {/* constructor를 사용하는 방법 */}
        {/* 상위인 state를 하위의 props로 보낸다. */}
        {/* <Subject
          title = {this.state.subject.title}
          sub = {this.state.subject.sub}>
        </Subject> */}

        <header>
            <h1><a href="/" onClick={function(e) {
              console.log(e);
              e.preventDefault(); //a태그의 기본적인 동작(reload)을 금지 시킴.
              // alert("Hi :)");
              //함수 안에서는 this의 값이 정해지지 않아서 에러가 나기 때문에 바인드로 this를 묶어줘야한다.
              // this.state.mode = "welcome"; 아래와 같이 써야만 함.
              this.setState({
                mode:"welcome"
              });
            }.bind(this)}>{this.state.subject.title}</a></h1>
            {this.state.subject.sub}
        </header>

        {/* <TOC></TOC> */}
        <TOC data = {this.state.contents}></TOC>

        {/* <Content></Content> */}
        <Content title = {_title} desc = {_desc}></Content>
        <Content title = "Genergy" desc = "PLM is Product Lifecycle Management."></Content>
      </div>
    );
  }
}

<!-- 반드시 써줘야 이 코드를 기본으로 인식하여 불러온다. -->
export default App;
