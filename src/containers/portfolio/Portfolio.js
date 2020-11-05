import React, { useState, useEffect } from 'react'
import logo from '../../assets/logo.png'
import Button from "../../components/buttons/Buttons"
import axios from "axios"
import Cookies from 'js-cookie'
import { Link } from 'react-router-dom'

const Portfolio = (props) => {
    const [portfolioTable,setPortfolioTable]=useState([]);
    const [det,setDet]=useState({})
    useEffect(() => {
        getPortfolio()
    }, [])

    const logout = ()=>{
        axios.get("http://localhost:4000/users/logout",
        {withCredentials:true})
        .then(()=>{
            window.location.reload(false);    
        })
        .catch((e)=>{
            console.log(e);
        })
    }

    const getPortfolio = ()=>{
        axios.post("http://localhost:4000/users/getPortfolio",{
            userId:props.match.params.id
        },{withCredentials:true})
        .then((response)=>{
            console.log(response.data)
            let objDet = {
                name:response.data.name,
                email:response.data.email,
                number:response.data.number
            }
            setDet(objDet);
            let list = [];
            console.log(response.data.portolio);
            (response.data.portolio).map((portfolio)=>{
                let tempObj = {
                    url:portfolio.url,
                    publicId:portfolio.publicId,
                    id:portfolio._id
                }
                list.push(tempObj)
            })
            setPortfolioTable(list);
        })
        .catch((e)=>{
            console.log(e);
        })
    }

    return (
        <div className="dash-container">
           <div className="dash-nav">
                <img src={logo} className="dash-logo"/>
                <div>
                    <Link to="/dashboard"> 
                        <Button
                        label="Back"
                        className="primary"
                        />
                    </Link>
                    <Button
                        label="Log Out"
                        className="danger"
                        onClick={logout}
                    />
                </div>
            </div>

            <div className="viewPortfolio">
                <h2 className="shift">Artist Profile</h2>
                
                <div className="tableRow2">
                <h4 className="shift">Name: {det.name}</h4>
                <h4 className="shift">Email: {det.email}</h4>
                <h4 className="shift">Number: {det.number}</h4>
                </div>
                
                <h3 className="shift">Portfolio:</h3>
                <div className="portfolio-container">
                    {portfolioTable.map((item)=>(
                        <div className="image-card">
                            <img src={item.url} alt="image not available" className="image-portfolio"/>
                        </div>
                    ))}
                </div> 
            </div>

        </div>
    )
}

export default Portfolio
