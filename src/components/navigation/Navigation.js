import React, { useState, useEffect} from 'react'
import './navigation.css'
import { NavLink } from "react-router-dom";
import img from '../../assets/logo.png'

const Navigation = () => {
  const [nav,setNav] =useState(false);
  const navHandler = ()=>{
      setNav(!nav);

  }
    return (
      <>
        <div className="small-nav">
          <div className={nav?"nav-cross":"nav-cross box-shadow"} onClick={navHandler}>
            <div className={nav?"new-1 cross":"cross"}></div>
            <div className={nav?"new-2":"cross"}></div>
            <div className={nav?"new-3 cross":"cross"}></div>
          </div>
          <img src={img} className="logo" />
        </div>

        <div className={nav?"Nav2":"Navigation"}>
          <NavLink exact to="/" className="nav-item" onClick={navHandler} activeClassName="nav-item-active">Home</NavLink>
          <NavLink exact to="/about-us" className="nav-item" onClick={navHandler} activeClassName="nav-item-active">About Us</NavLink>
          <NavLink exact to="/initiatives" className="nav-item" onClick={navHandler} activeClassName="nav-item-active">Initiatives</NavLink>
          <NavLink exact to="/our-work" className="nav-item" onClick={navHandler} activeClassName="nav-item-active">Our Work</NavLink>
          <NavLink exact to="/get-involved" className="nav-item" onClick={navHandler} activeClassName="nav-item-active">Get Involved</NavLink>
          <NavLink exact to="/our-branches" className="nav-item" onClick={navHandler} activeClassName="nav-item-active">Our Branches</NavLink>
          <div className="logo-nav">
            <img src={img} className="logo" />
          </div>
        </div> 

        <div className="Navigation2">
          <NavLink exact to="/" className="nav-item" activeClassName="nav-item-active">Home</NavLink>
          <NavLink exact to="/about-us" className="nav-item" activeClassName="nav-item-active">About Us</NavLink>
          <NavLink exact to="/initiatives" className="nav-item" activeClassName="nav-item-active">Initiatives</NavLink>
          <NavLink exact to="/our-work" className="nav-item" activeClassName="nav-item-active">Our Work</NavLink>
          <NavLink exact to="/get-involved" className="nav-item" activeClassName="nav-item-active">Get Involved</NavLink>
          <NavLink exact to="/our-branches" className="nav-item" activeClassName="nav-item-active">Our Branches</NavLink>
          <div className="logo-nav">
            <img src={img} className="logo" />
          </div>
        </div> 
    </>
    )
}

export default Navigation
