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
    // .then(data => console.log(data,"issues"))
    .then(data => this.setState({issues:data}))
  }


  render(){
    const issues = this.state.issues.Issues
    return(
      // issues && issues.map(elm => {
      //   return <h1>{elm.title}</h1>
      // })
      <h1>a</h1>
    )
  }
}

const mapPropsToState = (state) => {
  return {state}
}

export default connect(mapPropsToState)(HomePage);