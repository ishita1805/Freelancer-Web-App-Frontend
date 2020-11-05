import React, { useState } from 'react'
import './employerDashboard.css'
import logo from '../../assets/logo.png'
import Button from "../../components/buttons/Buttons"
import axios from "axios"
import Cookies from 'js-cookie'
import Input from "../../components/input/Input"
import { Link } from "react-router-dom";



const EmployerDashboard = () => {
    var index = 0;
    const [dash,setDash]=useState(0);
    const [applicants,setApplicants]=useState("");
    const [hired,setHired]=useState("");
    const [jobs,setJobs]=useState([])
    const [title,setTitle]=useState('')
    const [company,setCompany]=useState('')
    const [duration,setDuration]=useState('')
    const [vacancy,setVacancy]=useState('')
    const [description,setDescription]=useState('')
    const [created,setCreated]=useState(false);
    const [applicantTable,setApplicantTable]=useState([])
    const [hiredTable,setHiredTable]=useState([])
    const [artistsTable,setartistsTable]=useState([])
    

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
    
    const getJobs = ()=>{
        setDash(1);
        axios.post("http://localhost:4000/jobs/ownerJobs",
        {
            "owner":Cookies.get('id')
        },
        {withCredentials:true})
        .then((response)=>{
            let list = response.data.jobs.reverse()
            setJobs(list);         
        })
        .catch((e)=>{
            console.log(e)
        })
    }

    const deleteJob = (id)=>{
        axios.post("http://localhost:4000/jobs/deleteJob",{
            "jobId": id
        },
        {withCredentials:true})
        .then((response)=>{
            console.log(response);
            getJobs();
        })
        .catch((e)=>{
            console.log(e)
        })

    }

    const createJobs = ()=>{
        axios.post("http://localhost:4000/jobs/createJob",{
            "title":title,
            "company":company,
            "duration":duration,
            "description":description,
            "owner":Cookies.get('id'),
            "vacancy":vacancy
        },
        {withCredentials:true})
        .then((response)=>{
            console.log(response);
            setCreated(true);
        })
        .catch((e)=>{
            console.log(e);
        })
    }

    const getArtists = ()=>{
     
        axios.get("http://localhost:4000/users/getUser")
        .then((response)=>{
            let list = [];
            console.log(response.data);
            (response.data).map((applicant)=>{
                let objTemp={
                    name:applicant.name,
                    number:applicant.number,
                    id:applicant._id,
                    email:applicant.email
                }
                if(applicant.role==="artist") list.push(objTemp);
            })
            setartistsTable(list);
            setDash(3);
        })
        .catch((e)=>{
            console.log(e)
        })
    }

    const getApplicants = (id)=>{
        axios.post("http://localhost:4000/jobs/oneJob",{
            "jobId": id
        },
        {withCredentials:true})
        .then((response)=>{
            let list = [];
            console.log(response.data);
            (response.data.data.applicants).map((applicant)=>{
                let objTemp={
                    name:applicant.name,
                    number:applicant.number,
                    id:applicant._id,
                    email:applicant.email
                }
                list.push(objTemp);
            })
            setApplicantTable(list);
            setApplicants(id);
        })
        .catch((e)=>{
            console.log(e)
        })
    }

    const hireApplicant = (jobId,userId)=>{

        axios.post("http://localhost:4000/jobs/hireJob",{
            "jobId":jobId,
            "userId":userId
        },
        {withCredentials:true})
        .then((response)=>{
            console.log(response);
            getJobs();
            getApplicants(jobId);
            getHired(jobId);

        })
        .catch((e)=>{
            console.log(e)
        })
    }

    const getHired = (id)=>{
        axios.post("http://localhost:4000/jobs/getOneJob",{
            "jobId": id
        },
        {withCredentials:true})
        .then((response)=>{
            // console.log(response.data.jobs.applicantsHired);
            let list = [];
            console.log(response.data);
            (response.data.jobs.applicantsHired).map((applicant)=>{
                let objTemp={
                    name:applicant.name,
                    number:applicant.number,
                    id:applicant._id,
                    email:applicant.email
                }
                list.push(objTemp);
            })
            setHiredTable(list);
            setHired(id);
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
                onClick={logout}/>
            </div>

            <div className="dash-nav-2">
                    <div className={dash!==1?"dash-nav-in":"dash-nav-in-selected"} onClick={getJobs}>View My Jobs</div>
                    <div className={dash!==2?"dash-nav-in":"dash-nav-in-selected"} onClick={()=>{setDash(2);setCreated(false);}}>Create A Job</div>
                    <div className={dash!==3?"dash-nav-in":"dash-nav-in-selected"} onClick={getArtists}>View All Artists</div>
            </div>
            <div className="dash-card">
                    {dash ===0?<div className="dash-enter"><h2>Welcome to the employer dashboard! </h2></div>:null}
                    {/* display a list of jobs */}
                    {dash ===1?(
                        
                        (jobs).map((job)=>(
                           
                            (job.status === "removed"?null:
                            <div className="jobCard">
                                
                                <h4>Job Title:{job.title}</h4>
                                <br/>

                                <h4>Company:{job.company}</h4>
                                <br/>
                    
                                <h4>Job Description: </h4>
                                <p>{job.description}</p>
                    
                                <div className="job-details">
                                    <span className="job-det-cont"><h4>Duration: {job.duration}</h4></span>
                                    <span><h4>Job Openings: {job.vacancy}</h4></span>
                                </div>
                    
                                <Button
                                label="Get Applicant List"
                                className="dash-but-style"
                                onClick={()=>{getApplicants(job._id)}}/>
                                
                                {applicants===job._id?(
                                    applicantTable.map((row)=>(
                                        <div className="tableRow">
                                            <h4>Name: {row.name}</h4>
                                            <h4>Email: {row.email}</h4>
                                            <h4>Number: {row.number}</h4>
                                            <div className="tableRowButtons">
                                            {job.vacancy>0?(<>
                                            <Button
                                            label="Hire"
                                            className="success"
                                            onClick={()=>{hireApplicant(job._id,row.id)}}
                                            />
                                            <Link to={"/portfolio/"+row.id}>
                                            <Button
                                            label="Portfolio"
                                            className="dark"
                                            />
                                            </Link>
                                            </>):null}
                                            </div>
                                        </div>
                                    ))
                                       
                                ):null}

                                <Button
                                label="Hired Applicants"
                                className="dash-but-style"
                                onClick={()=>{getHired(job._id)}}
                                />

                                {hired===job._id?(
                                    hiredTable.map((row)=>(
                                        <div className="tableRow">
                                            <h4>Name: {row.name}</h4>
                                            <h4>Email: {row.email}</h4>
                                            <h4>Number: {row.number}</h4>
                                            <Link to={"/portfolio/"+row.id}>
                                            <Button
                                            label="Portfolio"
                                            className="dark"
                                            />
                                            </Link>
                                        </div>
                                    ))
                                       
                                ):null}
                    
                                <Button
                                label="Delete This Job"
                                className="danger dash-but-style"
                                onClick={()=>deleteJob(job._id)}
                                />
                            </div>)
                        ))
                    ):null}
                    {/* display js to create new jobs */}
                    {dash ===2?(
                        <>
                        <div className="jobform">
                        <div className="createJob">
                            <Input 
                                label="Title of Job"
                                type="text"
                                className="size-ipt-1"
                                onChange={(e)=>{setTitle(e.target.value);setCreated(false);}}
                            />
                            <Input 
                                label="Company Name"
                                type="text"
                                className="size-ipt-1"
                                onChange={(e)=>{setCompany(e.target.value)}}
                            />
                        </div>
                        <div className="createJob">
                            <Input 
                                label="duration"
                                type="text"
                                className="size-ipt-1"
                                onChange={(e)=>{setDuration(e.target.value)}}
                            />
                            <Input 
                                label="vacancy"
                                type="number"
                                className="size-ipt-1"
                                onChange={(e)=>{setVacancy(e.target.value)}}
                            />
                        </div>
                        </div>
                        <div className="createJob">
                            <label for="text">Job Description</label>
                            <textarea 
                            id="text"
                            name="description" 
                            className="text-area"
                            onChange={(e)=>{setDescription(e.target.value)}}>
                            </textarea>
                            <Button 
                            label="Create Job"
                            className="success"
                            onClick={createJobs}/>
                        </div>
                        {created?<h4 className="green">New Job Created! Head over to "View My Jobs" to view your new job</h4>:null}
                        </>
                    ):null}
                    {/* display a table to view all artists */}
                    {dash ===3?(
                         artistsTable.map((row)=>(
                            <div className="tableRow2">
                                <h4>Name: {row.name}</h4>
                                <h4>Email: {row.email}</h4>
                                <h4>Number: {row.number}</h4>
                                <Link to={"/portfolio/"+row.id}>
                                    <Button
                                    label="Portfolio"
                                    className="dark"
                                    />
                                </Link>
                            </div>
                        ))
                    ):null}
            </div>
        </div>
    )
}

export default EmployerDashboard
// className="shift"