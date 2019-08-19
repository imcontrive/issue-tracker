import React, { Component } from 'react';

export default class InviteUser extends Component {

  state= {
    email:""
  }

  handlechange =  e => {
    let {name, value} = e.target;
    this.setState({
      [name] : value
    })
  }

  handelInvite = () =>  {
     const body=this.state.email;
    fetch(`http://localhost:3000/api/v1/invites`,
    {method:"POST",
     body: JSON.stringify(body)})
    .then(res => res.json())
    .then(data => console.log(data))
  }


  render() {
    return (
      <div>
        <input name="email" value={this.state.email} placeholder="Enter email" onChange={this.handlechange}/>
        <input type="submit" value="INVITE" onClick={this.handelInvite}/>
      </div>
    )
  }
}
