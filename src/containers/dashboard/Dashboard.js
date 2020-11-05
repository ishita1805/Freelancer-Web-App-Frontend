import React from 'react'
import Cookies from 'js-cookie';
import ArtistDashboard from "../artistDashboard/ArtistDashboard"
import EmployerDashboard from "../employerDashboard/EmployerDashboard"

const Dashboard = () => {
    console.log(Cookies.get('role'))
    return (
        <div>
       {
            ((Cookies.get('role')) === "artist")?
            <ArtistDashboard/>:null
        }
        {
            ((Cookies.get('role')) === "hirer")?
            <EmployerDashboard/>:null
        }
        </div>
        
    )
}

export default Dashboard
