import React from 'react'
import RegisterTitleLogoContainer from './components/registerTitleLogoContainer/RegisterTitleLogoContainer'
import RegisterFormLayout from '../registerInputLayout/RegisterFormLayout'

import RegisterInputLayout from './components/registerInputLayout/RegisterInputLayout'
import RegisterInputHeader from './components/registerInputHeader/RegisterInputHeader'
import RegisterInputFormContainer from './components/registerInputFormContainer/RegisterInputFormContainer'

export const RegisterFormContainer = () => {
  return (
    <RegisterFormLayout>
      <RegisterTitleLogoContainer />
      <RegisterInputLayout>
        <RegisterInputHeader />
        <RegisterInputFormContainer />
      </RegisterInputLayout>
    </RegisterFormLayout>
    
  )
}
