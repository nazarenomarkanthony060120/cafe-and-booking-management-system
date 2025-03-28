import React from 'react'

export const LoginFormContainer = () => {
  return (
    <div className="w-[35%] flex items-center justify-center p-6">
    <div className="w-full max-w-md p-8 text-white">
      <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
      {/* <form onSubmit={handleSubmit} className="space-y-4"> */}
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            className="w-full mt-1 p-2 border rounded-md"
            // value={email}
            // onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Password</label>
          <input
            type="password"
            className="w-full mt-1 p-2 border rounded-md"
            // value={password}
            // onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          Login
        </button>
      {/* </form> */}
    </div>
  </div>
  )
}
