import React from 'react'
import LoginTitleLogoContainer from './components/loginTitleLogoContainer/LoginTitleLogoContainer'
import LoginFormLayout from '../loginInputLayout/LoginFormLayout'
import LoginInputLayout from './components/loginInputLayout/LoginInputLayout'
import LoginInputHeader from './components/loginInputHeader/LoginInputHeader'
import LoginInputFormContainer from './components/loginInputFormContainer/LoginInputFormContainer'

export const LoginFormContainer = () => {
  return (
    <LoginFormLayout>
      <LoginTitleLogoContainer />
      <LoginInputLayout>
        <LoginInputHeader />
        <LoginInputFormContainer />
      </LoginInputLayout>
    </LoginFormLayout>
    
  )
}
