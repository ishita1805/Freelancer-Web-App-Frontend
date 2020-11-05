import React, { useState } from 'react'
import './artistDashboard.css'
import logo from '../../assets/logo.png'
import Button from "../../components/buttons/Buttons"
import axios from "axios"
import Cookies from 'js-cookie'

const ArtistDashboard = () => {
    const [dash,setDash]=useState(0);
    const [file,setFile]=useState(null);
    const [success,setSucces]=useState(false);
    const [portfolioTable,setPortfolioTable]=useState([]);
    const [jobs,setJobs]=useState([]);
    const [jobsDone,setJobsDone]=useState([]);

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

    const uploadPhoto = (e)=>{
        const fd = new FormData();
        fd.append('photo', file, file.name)
        fd.append('userId', Cookies.get('id'))
        e.preventDefault();
        axios.post("http://localhost:4000/photos/portfolio", fd, {withCredentials:true})
        .then((response)=>{
            console.log(response);
            setSucces(true);
        })
        .catch((e)=>console.log(e))
    }

    const deletePhoto = (id,pub)=>{
        // console.log(id,pub,Cookies.get('id'))
        axios.post("http://localhost:4000/photos/deletePhoto",{
            "userId":Cookies.get('id'),
            "photoId":id,
            "publicId":pub
        }, {withCredentials:true})
        .then((response)=>{
            console.log(response);
            getPortfolio();
        })
        .catch((e)=>console.log(e))
    }

    const getPortfolio = ()=>{
        setDash(1);
        axios.post("http://localhost:4000/users/getPortfolio",{
            userId:Cookies.get('id')
        },{withCredentials:true})
        .then((response)=>{
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

    const getJobs = ()=>{
        setDash(2)
        axios.get("http://localhost:4000/jobs/getJobs",{
            withCredentials:true
        })
        .then((response)=>{
            let list1 = [];
            let list2 =[];
            (response.data.jobs).map((job)=>{
                if((job.applicants).find(o => o._id === Cookies.get('id'))) 
                list1.push(job);
                else
                list2.push(job);
            })
            setJobs(list2);
            setJobsDone(list1);
        })
        .catch((e)=>{
            console.log(e)
        })
    }

    const applyJob = (id)=>{
        axios.post("http://localhost:4000/jobs/applyJob",{
            jobsApplied:id,
            userId:Cookies.get('id')
        },
        { withCredentials:true })
        .then((response)=>{
            console.log(response.data);
            getJobs();
        })
        .catch((e)=>{
            console.log(e);
        })
    }

    return (
        <div className="dash-container">
            <div className="dash-nav">
                <img src={logo} className="dash-logo"/>
                <Button
                label="Log Out"
                className="danger"
                onClick={logout}
                />
            </div>

            <div className="dash-nav-2">
                    <div className={dash!==1?"dash-nav-in":"dash-nav-in-selected"} onClick={getPortfolio}>My Portfolio</div>
                    <div className={dash!==2?"dash-nav-in":"dash-nav-in-selected"} onClick={getJobs}>Look For Jobs</div>
            </div>
            <div className="dash-card">
            {dash ===0?<div className="dash-enter"><h2>Welcome to the artist dashboard! </h2></div>:null}
            {dash ===1?
            <div className="dash-portfolio">
                <form enctype="multipart/form-data" className="portfolio-form">
                    <input
                    label="Upload Image"
                    type="file"
                    onChange={(e)=>setFile(e.target.files[0])}
                    />
                    <button onClick={uploadPhoto} className="dark">+ Photos</button>
                </form>
                <br/>
                {success?<h4 className="green">Image Uploaded</h4>:null}
                <h3>My Portfolio</h3>
                <div className="portfolio-container">
                    {portfolioTable.map((item)=>(
                        <div className="image-card">
                            <img src={item.url} alt="image not available" className="image-portfolio"/>
                            <Button
                            label="Delete Image"
                            onClick={()=>deletePhoto(item.id,item.publicId)}
                            />
                        </div>
                    ))}
                </div>
                
            </div>
            :null}
            {dash ===2?
    
            <div className="dash-portfolio">
                <h4>New Jobs</h4>
               {jobs.map((job)=>( 
                (job.status === "removed"?null:
                <div className="jobCard">          
                    <h4>Job Title: {job.title}</h4>
                    <br/>

                    <h4>Company: {job.company}</h4>
                    <br/>
        
                    <h4>Job Description:</h4>
                    <p>{job.description}</p>
        
                    <div className="job-details">
                        <span className="job-det-cont"><h4>Duration: {job.duration}</h4></span>
                        <span><h4>Job Openings: {job.vacancy}</h4></span>
                    </div>
                    <Button
                    label="Apply For Job"
                    className="success dash-but-style"
                    onClick={()=>applyJob(job.id)}
                    />
                </div>)))}
                <br/>
                <h4>Applied Jobs</h4>
                {jobsDone.map((job)=>( 
                (job.status === "removed"?null:
                <div className="jobCard">          
                    <h4>Job Title: {job.title}</h4>
                    <br/>

                    <h4>Company: {job.company}</h4>
                    <br/>
        
                    <h4>Job Description:</h4>
                    <p>{job.description}</p>
        
                    <div className="job-details">
                        <span className="job-det-cont"><h4>Duration: {job.duration}</h4></span>
                        <span><h4>Job Openings: {job.vacancy}</h4></span>
                    </div>
                    
                </div>)))}
                    
            </div>
            :null}
            </div>
        </div>
    )
}

export default ArtistDashboard
