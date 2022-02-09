
import { faPaperPlane, faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState,useRef, useContext, useEffect } from 'react'
import Button from './Button'
import ResponsiveContainer from './ResponsiveContainer'
import Link from 'next/link'
import ReservationSuccess from './ReservationSuccess'
import { languageContext } from '../pages/_app'
import JobAdvert from './JobAdvert'
const jobs_data_shuffled = shuffleArray(require("../public/content/jobbportalen.json").sv.jobs)
import { shuffleArray } from '../pages/foretag'
export default function JobPortal() {

    const [jobs, setJobs] = useState(null)

    const [checkboxes, setCheckboxes] = useState({"showAll": true, "job": false, "master": false, "summerjob": false, "internship": false, "trainee": false})

    const searchRef = useRef(null)
    useEffect(() => {
        filterWithCriteria()
    }, [checkboxes]);

    
    const filterJobsOnSearch = (keyword) =>{
        keyword = keyword.trim().toLowerCase();
        let temp = jobs_data_shuffled.filter((job) =>{
            if(job.tags.filter((tag) => tag.toLocaleLowerCase().includes(keyword)).length != 0){
                return true;
            }
            if(job.company.toLocaleLowerCase().includes(keyword)){
                return true;
            }
            
        
        })
       

       return temp;
    } 


    const handleSearch = (event) =>{
       let filtered_jobs = filterJobsOnSearch(event.target.value)
       filterWithCriteria(filtered_jobs)
    } 

    const filterWithCriteria = (data = jobs_data_shuffled) =>{
        if(searchRef.current.value != ""){
            data = filterJobsOnSearch(searchRef.current.value)
        }
        if(!checkboxes["showAll"]){
            data = data.filter((job) =>{
                return checkboxes[job.type]
            })
        }
        setJobs(data)
    }

    const handleShowAll = () =>{
        setCheckboxes(prevState => {
            if( prevState.showAll){
                return prevState
            }
           return ({"showAll": true, "job": false, "master": false, "summerjob": false, "internship": false, "trainee": false})
    })
    }
    

    return(
    <ResponsiveContainer className="jobportal">
            <div className='searchfield-jobportal'>
                <input className='search-field-input' ref={searchRef} onChange={handleSearch} placeholder='Sök efter nyckelord eller företag'/>
                <div className='jobportal-checkboxes'>
                    <form onChange={() => filterWithCriteria()}>
                    <label>Visa alla</label>
                    <input type="checkbox" name="Visa alla" value="1" checked={checkboxes["showAll"]} onChange={() => handleShowAll()}></input>
                    <label>Anställning</label>
                    <input type="checkbox" name="Anställning" value="0" checked={checkboxes.job} onChange={() => setCheckboxes(prevState => ({...prevState,["job"]: !prevState.job, ["showAll"]: false}))}>

                    </input>
                    <label>Exjobb</label>
                    <input type="checkbox" name="Exjobb" value="0" checked={checkboxes.master} onChange={() => setCheckboxes(prevState => ({...prevState,["master"]: !prevState.master, ["showAll"]: false}))}></input>
                    <label>Sommarjobb</label>
                    <input type="checkbox" name="Sommarjobb" value="0" checked={checkboxes.summerjob} onChange={() => setCheckboxes(prevState => ({...prevState,["summerjob"]: !prevState.summerjob, ["showAll"]: false}))}></input>
                    <label>Praktik</label>
                    <input type="checkbox" name="Praktik" checked={checkboxes.internship} value="0" onChange={() => setCheckboxes(prevState => ({...prevState,["internship"]: !prevState.internship, ["showAll"]: false}))}></input>
                    <label>Trainee</label>
                    <input type="checkbox" name="Trainee" value="0" checked={checkboxes.trainee} onChange={() => setCheckboxes(prevState => ({...prevState,["trainee"]: !prevState.trainee, ["showAll"]: false}))}></input>
                    </form>
                </div>
            </div>

            <div className='job-advert-container'>
                {jobs &&
                    jobs.map((job,i) =>{
                    
                        return <JobAdvert key={"job-advert" + i} data={job}/>
                    })
                }
                {jobs && jobs.length == 0 &&
                    <span className='no-results'>Här var det tyvärr tomt!</span>
                }
            </div>
            
    </ResponsiveContainer>)
}
