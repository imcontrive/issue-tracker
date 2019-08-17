import React, { Component } from 'react';
import { connect } from "react-redux"

class Home extends Component{

  state={
    issues:[]
  }

  componentDidMount(){
    fetch("http://localhost:3000/api/v1/issues",{
      method:"GET",
      headers:{
        "Authorization":`Token ${localStorage.token}`
      }
    })
    .then(res => res.json())
    .then(data =>
      this.props.dispatch({type:'ADD_ISSUES',data})
     );
  }

  
  render(){
    const { IssuesInfo } = this.props.state;

    return(
      <>
      {
        IssuesInfo.Issues ? IssuesInfo.Issues.map((issue, index) => 
          <p><small>{index}</small>{issue.title}</p>
        ):""
      }
      
      </>
    )
  }
}

const mapPropsToState = (state) => {
  console.log(state,"state in home");
  return {
    state
  }
}

export default connect(mapPropsToState)(Home);