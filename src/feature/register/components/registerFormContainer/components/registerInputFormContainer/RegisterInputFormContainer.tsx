import Input from '@/components/common/Input'
import React from 'react'
import RegisterActionContainer from '../registerActionContainer/RegisterActionContainer'

const RegisterInputFormContainer = () => {
  return (
    <div className="flex flex-col items-center justify-center pt-10">
      <div className="w-full max-w-md text-white">
        <form className="space-y-4">
          <Input className="w-full mt-1 p-2 border rounded-md" type="text" text="Name" required />
          <Input
            className="w-full mt-1 p-2 border rounded-md"
            type="text"
            text="Contact Number"
            required
          />
          <Input className="w-full mt-1 p-2 border rounded-md" type="email" text="Email" required />
          <Input
            className="w-full mt-1 p-2 border rounded-md"
            type="password"
            text="Password"
            required
          />
          <Input
            className="w-full mt-1 p-2 border rounded-md"
            type="password"
            text="Confirm Password"
            required
          />
          <RegisterActionContainer />
        </form>
      </div>
    </div>
  )
}

export default RegisterInputFormContainer
