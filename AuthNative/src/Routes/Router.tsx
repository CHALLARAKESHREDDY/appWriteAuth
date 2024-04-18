import { Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { AppwriteContext } from '../appWrite/AppwriteProvider'
import { NavigationContainer } from '@react-navigation/native'
import Loader from '../components/Loader'
import AppRoute from './AppRoute'
import AuthRoute from './AuthRoute'


const Router = () => {
 const [iseLoading,setIsLoading]=useState<boolean>(true)
 const {isLoggedIn,setIsLoggedIn,appwrite}=useContext(AppwriteContext)

 useEffect(()=>{
   appwrite.getCurrentUser()
   .then((response)=>{
      setIsLoading(false)
    if (response){
       setIsLoggedIn(true)
    }}
).catch(_ =>{
    setIsLoading(false)
    setIsLoggedIn(false)
})
 },[appwrite,setIsLoggedIn])

 if (iseLoading){
    return (
        <Loader />
    )
 }

  return (
    <NavigationContainer>
        {
            isLoggedIn?(
                <AppRoute />
            ):
            (
                <AuthRoute />
            )
        }
    </NavigationContainer>
  )
}

export default Router

