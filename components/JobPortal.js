
import { faPaperPlane, faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState,useRef, useContext, useEffect } from 'react'
import Button from './Button'
import ResponsiveContainer from './ResponsiveContainer'
import Link from 'next/link'
import ReservationSuccess from './ReservationSuccess'
import { languageContext } from '../pages/_app'
import JobAdvert from './JobAdvert'
let jobs_data_shuffled = shuffleArray(require("../public/content/jobbportalen.json").sv.jobs)
import { shuffleArray } from '../pages/foretag'
export default function JobPortal() {

    const [jobs, setJobs] = useState([])
    const [searchString, setSearchString] = useState("")
    const [checkboxes, setCheckboxes] = useState([])

    const [lang, setLang] = useContext(languageContext)

    const searchRef = useRef(null)
    useEffect(() => {
        var filteredData = filterByKeyword(jobs_data_shuffled,searchString);
        filteredData = filterByCheckboxes(filteredData);
        setJobs(filteredData);
    }, [checkboxes,searchString]);

    
    const filterByKeyword = (data,keyword) =>{
        keyword = keyword.trim().toLowerCase();
        let temp = data.filter((job) =>{
            if(job.tags.filter((tag) => tag.toLowerCase().includes(keyword)).length != 0){
                return true;
            }
            if(job.company.toLowerCase().includes(keyword)){
                return true;
            }
            return false;
        })
       return temp;
    }

    const filterByCheckboxes = (data) =>{
        if(checkboxes.length !== 0){
            data = data.filter((job) =>{
                return checkboxes.includes(job.type)
            })
        }
        return data;
    }

    const handleCheckboxChange = (event) =>{
        setCheckboxes(oldArray => {
            if (oldArray.includes(event.target.value)){
                return oldArray.filter( word => word !== event.target.value)
            }
            else{
                return [...oldArray, event.target.value]
            }
            
        });
        
    }

    const handleShowAll = () =>{
       setCheckboxes([])
    }
    

    return(
        
    <ResponsiveContainer className="jobportal">
            <div className='searchfield-jobportal'>
                <input className='search-field-input' ref={searchRef} onChange={(e) => setSearchString(e.target.value)} placeholder={ lang == "sv" ? 'Sök efter nyckelord eller företag' : "Search by keyword och company"}/>
                <div className='jobportal-checkboxes'>
                    <form>
                    <label>{lang == "sv" ? "Visa alla" : "Show all"}</label>
                    <input type="checkbox" name="Visa alla" value="showAll" checked={checkboxes.length === 0} onChange={handleShowAll}></input>
                    <label>{lang == "sv" ? "Anställning" : "Employment"}</label>
                    <input type="checkbox" name="Anställning" value="job" checked={checkboxes.includes("job")} onChange={(e) => handleCheckboxChange(e)}>
                    </input>
                    <label>{lang == "sv" ? "Exjobb" : "Master thesis"}</label>
                    <input type="checkbox" name="Exjobb" value="master" checked={checkboxes.includes("master")} onChange={(e) => handleCheckboxChange(e)}></input>
                    <label>{lang == "sv" ? "Sommarjobb" : "Summer internship"}</label>
                    <input type="checkbox" name="Sommarjob" value="summerjob" checked={checkboxes.includes("summerjob")} onChange={(e) => handleCheckboxChange(e)}></input>
                    <label>{lang == "sv" ? "Praktik" : "Internship"}</label>
                    <input type="checkbox" name="Praktik" checked={checkboxes.includes("internship")} value="internship" onChange={(e) => handleCheckboxChange(e)}></input>
                    <label>Trainee</label>
                    <input type="checkbox" name="Trainee" value="trainee" checked={checkboxes.includes("trainee")} onChange={(e) => handleCheckboxChange(e)}></input>
                    </form>
                </div>
            </div>

            <div className='job-advert-container'>
                {jobs &&
                    jobs.map((job,i) =>{
                    
                        return <JobAdvert key={i} data={job}/>
                    })
                }
                {jobs && jobs.length == 0 &&
                    <span className='no-results'>Här var det tyvärr tomt!</span>
                }
            </div>
            
    </ResponsiveContainer>)
}
