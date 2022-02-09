import React, { useEffect,useState } from 'react';
import Backdrop from './Backdrop';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {} from "@fortawesome/fontawesome-svg-core"
import { faArrowAltCircleUp, faEnvelope, faGlobe } from '@fortawesome/free-solid-svg-icons'
import {fa} from "@fortawesome/fontawesome-svg-core"
import Button from './Button';

function JobTag({text}){
    return (
        <div className="job-advert--tag">{text}</div>
    )
}
 


export default function JobAdvert({data}) {

  const [openModal, setOpenModal] = useState(false)

  const getTitle = (type) =>{
      if(type == "job"){
          return "ANSTÄLLNING"
      }
      else if (type == "master"){
          return "EXJOBB"
      }
      else if (type == "internship"){
          return "PRAKTIK"
      }
      else if(type == "summerjob"){
          return "SOMMARJOBB"
      }
  }

  const MAX_CHAR_LENGTH = 250

  const [info,setInfo] = useState(data.information)

  useEffect(()=>{
    let newInfo = [];
    let sum = 0
    for(let i = 0; i < data.information.length; i++){
        if( sum > MAX_CHAR_LENGTH){
            break;
        }
        if (data.information[i].length + sum > MAX_CHAR_LENGTH){
            let st = data.information[i].slice(0,MAX_CHAR_LENGTH-sum-1) + " ..."
            newInfo.push(st)
            break;
        }
        else{
            newInfo.push(data.information[i])
            sum += data.information[i].length
        }
    }

    setInfo(newInfo)
   

  },[])
    
  return (
      <>
    {openModal &&
        <Backdrop closeFunction={() => setOpenModal(false)}>
        <div className='modal-container-advert'>
        <div className='job-advert-modal'>
   
        <h4>{data.company}</h4>
        <span>{getTitle(data.type)}</span>
        <div className='job-advert--middle'>
            <div className='job-advert--information'>
                {data.information.map((line,i) =>{
                    return <p key={i.toString()}>{line}</p>
                })}
               
            </div>
            
            <div className='job-advert--logo'>
                <img src={"images/companies/all/" + data.logo_url}></img>
                
            </div>
        </div>
        <div className='job-advert-link'>
            {data.website != "" &&
                <div>
                <FontAwesomeIcon icon={faGlobe} />
                <a href={data.website}>Hemsida</a>
                </div>
            }
            {data.email != "" &&
                <div>
                <FontAwesomeIcon icon={faEnvelope} />
                <a href={"mailto:" + data.email}>{data.email}</a>
                </div>
            }
        </div>
        
        <div className='job-advert--tag-container'>
            {data.tags.map((tag,i ) =>{
            return <JobTag key={tag + i} text={tag}/>
   })}
   </div>
   <Button onClick={() => setOpenModal(false)}>Close</Button>
 </div>
 </div>
        </Backdrop>
    }
      
  <div className='job-advert' onClick={()=> setOpenModal(true)}>
   
    <h4>{data.company}</h4>
    <span>{getTitle(data.type)}</span>
    <div className='job-advert--middle'>
        <div className='job-advert--information'>
            {info.map((line,i) =>{
                return <p key={i.toString()}>{line}</p>
            })}
        </div>
        <div className='job-advert--logo'>
            <img src={"images/companies/all/" + data.logo_url}></img>
        </div>
    </div>
    <div className='job-advert--tag-container'>
        {data.tags.map((tag,i ) =>{
        return <JobTag key={tag+i} text={tag}/>
    })}
    </div>
  </div>
  </>
  );
}
