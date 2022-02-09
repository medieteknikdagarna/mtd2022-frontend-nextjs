import React from 'react';
import { CompanyInformationCard } from './CompaniesWithInfo';
import Backdrop from './Backdrop';
import Button from './Button';

export default function CompanyModal({company,closeFunction}) {
  return (
    <Backdrop closeFunction={closeFunction}>
    <div className='modal-container'>
       <CompanyInformationCard clickable={false} company={company}/>
       <div className='button-close-modal'>
       <Button type="primary" onClick={closeFunction}>Close</Button>
       </div>
    </div>
    </Backdrop>
  );
}
