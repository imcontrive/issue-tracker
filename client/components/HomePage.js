import React, { Component } from 'react';
import { connect } from "react-redux"

class HomePage extends Component{

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
      // console.log(data)
      this.props.dispatch({type:'ADD_ISSUES',Issues: data})
     );
  }

  
  render(){
    // const { IssuesInfo } = this.props.state.currentUser;
    // const {Issues} = this.state.issues;
    // console.log(IssuesInfo,"check point two in Home");

    return(
      <>
      {/* {
        IssuesInfo ? IssuesInfo.map((issue)=> {
          <p>{issue.title}</p>
        }): "Not Found" */}
        
          
      {/* } */}
      <p>not found</p>
      
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

export default connect(mapPropsToState)(HomePage);