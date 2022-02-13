import React, { useEffect,useState, useContext } from 'react';
import Backdrop from './Backdrop';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {} from "@fortawesome/fontawesome-svg-core"
import { faArrowAltCircleUp, faEnvelope, faGlobe, faX } from '@fortawesome/free-solid-svg-icons'
import {fa} from "@fortawesome/fontawesome-svg-core"
import Button from './Button';
import { languageContext } from '../pages/_app'

function JobTag({text}){
    return (
        <div className="job-advert--tag">{text}</div>
    )
}
 


export default function JobAdvert({data}) {

  const [openModal, setOpenModal] = useState(false)
  const [lang, setLang] = useContext(languageContext)
  

  const getTitle = (type) =>{
      if(type == "job"){
          return  lang == "sv" ? "ANSTÄLLNING" : "EMPLOYMENT"
      }
      else if (type == "master"){
          return lang == "sv" ? "EXJOBB" : "MASTER THESIS"
      }
      else if (type == "internship"){
          return lang == "sv" ? "PRAKTIK" : "INTERNSHIP"
      }
      else if(type == "summerjob"){
          return lang == "sv" ? "SOMMARJOBB" : "SUMMER INTERNSHIP"
      }
      else if(type == "trainee"){
        return "TRAINEE"
    }
  }

  const MAX_CHAR_LENGTH = 250

  const [info,setInfo] = useState()

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
   

  },[data])
    
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
        <div>
            {
                    data.website.map((url,i) =>{
                        return(<div key={i}>
                            <FontAwesomeIcon icon={faGlobe} />
                            <a rel="noreferrer" target="_blank" href={url}>{lang == "sv" ? "Hemsida" : "Website"}</a>
                        </div>)
                    })
            }
            </div>
            {data.email != "" &&
                <div>
                <FontAwesomeIcon icon={faEnvelope} />
                <a href={"mailto:" + data.email}>Email</a>
                </div>
            }
        </div>
        
        <div className='job-advert--tag-container'>
            {data.tags.map((tag,i ) =>{
            return <JobTag key={tag + i} text={tag}/>
   })}
   </div>
   <div className='close-button-modal'>
        <div onClick={() => setOpenModal(false)} className='close-button-modal-x'>
            <FontAwesomeIcon icon={faX}/>
        </div>
   </div>
 </div>
 </div>
        </Backdrop>
    }
      
  <div className='job-advert' onClick={()=> setOpenModal(true)}>
   
    <h4>{data.company}</h4>
    <span>{getTitle(data.type)}</span>
    <div className='job-advert--middle'>
        <div className='job-advert--information'>
            {info && info.map((line,i) =>{
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
