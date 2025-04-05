import React from 'react'
import { RegisterLayout } from './components/registerLayout/RegisterLayout'
import { RegisterImageBackground } from './components/registerImageBackground/RegisterImageBackground'
import { RegisterFormContainer } from './components/registerFormContainer/RegisterFormContainer'

export default function Register() {
return (
    <RegisterLayout>
      <RegisterImageBackground />
      <RegisterFormContainer />
    </RegisterLayout>
)
    
}