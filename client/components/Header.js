import React, { Component } from 'react';
import { NavLink } from "react-router-dom"

class Header extends Component {
    state = {
        user:null
    }

    render(){
        return(
            <>
            <NavLink to = "/Login">Login</NavLink>
            <NavLink to = "/Signup">Signup</NavLink>
            </>
        )
    }
}

export default Header