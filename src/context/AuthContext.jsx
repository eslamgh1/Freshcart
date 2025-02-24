import React, { createContext, useEffect, useState } from 'react'
export const authContext = createContext()
import { jwtDecode } from 'jwt-decode'


// token idea
export default function AuthContextProvider({ children }) {
  ; /! what is the lazy initialization/
  const [userToken, setUserToken] = useState(null)

  // to get ID user from given token
  const [userData, setUserData] = useState(null)

  function decryptUserToken() {
    const resDecrypt = jwtDecode(userToken)
    // console.log('resDecrypt', resDecrypt)
    setUserData(resDecrypt)
  }



  
  useEffect(
    function () {
      if (userToken) {
        decryptUserToken()
      }
    },
    [userToken]
  )

  useEffect(function () {
    console.log('AuthContext-localStorage.getItem')
    const tkn = localStorage.getItem('tkn')
    if (tkn !== null) {
      setUserToken(tkn)
    }
  }, [])

  return (
    <>
      <authContext.Provider value={{ setUserToken, userToken, userData }}>

        {children}
      
      </authContext.Provider>
    </>
  )
}
