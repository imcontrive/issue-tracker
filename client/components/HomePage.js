import React, { Component } from 'react';
import { connect } from "react-redux"



class HomePage extends Component{


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
    return(
     this.state.issues.map((elm,index) => {
      
     })
    )
  }
}

const mapPropsToState = (state) => {
  return {state}
}

export default connect(mapPropsToState)(HomePage);