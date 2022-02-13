import React, { useEffect, useState, useContext } from 'react';
import { shuffleArray } from '../pages/foretag';
const content = require("../public/content/company_information.json")
import CompanyModal from './CompanyModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { languageContext } from '../pages/_app'
import { faX } from '@fortawesome/free-solid-svg-icons'

export function CompanyInformationCard({company, showText=true, clickable=true}){
    const [lang, setLang] = useContext(languageContext)
    const [isOpen, setOpen] = useState(false);
    const handleOpenModal = () =>{
        if(clickable){
            setOpen(true)
        } 
    }

    return(
        <>
        {
            isOpen && 
            <CompanyModal closeFunction={() => setOpen(false)} company={company}/>
        }
        <div onClick={handleOpenModal} className={'company-information-card'}>
            <div className={'company-information-card--right background-image-' + company.partner}>
                <img src={"images/companies/all/" + company.logo}/>
            </div>
            <div className='company-information-card--left'>
                <h5>{company.company.toUpperCase()}</h5>
                <span className={"company-information-card--"+company.partner}>{company.partner.toUpperCase()}</span>
                <div className='company-information-card--information'>
                {showText &&
                    company.information.map((line,i) =>{
                        return <p key={i.toString()}>{line}</p>
                    })
                }

                {!showText &&
                    <span>{lang == "sv" ? "Läs mer" : "Read more"}</span>
                }
                </div>
            </div>
            {!clickable &&
            <div className='close-button-modal'>
                <div onClick={() => setOpen(false)} className='close-button-modal-x'>
                    <FontAwesomeIcon icon={faX}/>
                </div>
            </div>
    }
           
        </div>
        </>
    )
}


export default function CompaniesWithInfoGold() {
    const[companies, setCompanies] = useState(null);

    useEffect(()=>{
        let filtered_companies = content.sv.companies.filter((company) =>{
            return company.partner == "gold"
        })
        filtered_companies.sort(() => Math.random() - 0.5);
        setCompanies(filtered_companies);

    },[])
  return (
  <div className='landing-companies-gold'>
  {companies &&
    companies.map((company) =>{
       return <CompanyInformationCard key={company.company} company={company}/>
    })
  }
    
  </div>
  );
}

export function CompaniesWithInfoSilver() {
    const[companies, setCompanies] = useState(null);

    useEffect(()=>{
        let filtered_companies = content.sv.companies.filter((company) =>{
            return company.partner == "silver"
        })
        filtered_companies.sort(() => Math.random() - 0.5);
        setCompanies(filtered_companies);

    },[])
    return (
    <div className='landing-companies-silver'>
    {companies &&
      companies.map((company) =>{
         return <CompanyInformationCard key={company.company} showText={false} company={company}/>
      })
    }
      
    </div>
    );
  }

  export function CompaniesWithInfoBronze() {
    const[companies, setCompanies] = useState(null);

    useEffect(()=>{
        let filtered_companies = content.sv.companies.filter((company) =>{
            return company.partner == "bronze"
        })
        filtered_companies.sort(() => Math.random() - 0.5);
        setCompanies(filtered_companies);

    },[])
    return (
    <div className='landing-companies-bronze'>
    {companies &&
      companies.map((company) =>{
         return <CompanyInformationCard key={company.company} showText={false} company={company}/>
      })
    }
      
    </div>
    );
  }

  export function CompaniesWithInfoStandard() {
    const[companies, setCompanies] = useState(null);

    useEffect(()=>{
        let filtered_companies = content.sv.companies.filter((company) =>{
            return company.partner == "standard"
        })
        filtered_companies.sort(() => Math.random() - 0.5);
        setCompanies(filtered_companies);

    },[])
    return (
    <div className='landing-companies-standard'>
    {companies &&
      companies.map((company) =>{
         return <CompanyInformationCard key={company.company} showText={false} company={company}/>
      })
    }
      
    </div>
    );
  }
