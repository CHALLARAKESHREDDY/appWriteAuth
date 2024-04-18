import { StyleSheet, Text, View } from 'react-native'
import React, { FC, useState } from 'react'
import { PropsWithChildren } from 'react'
import { createContext } from 'react'
import AppwriteService from './serive';

type contextValueProps={
    appwrite:AppwriteService;
    isLoggedIn:boolean;
    setIsLoggedIn:(isLoggedIn:boolean)=>void
}

 export const AppwriteContext=createContext<contextValueProps>({
    appwrite:new AppwriteService(),
    isLoggedIn:false,
    setIsLoggedIn:()=>{},
})

const AppwriteProvider: FC<PropsWithChildren>= ({children}) => {
 
    const [isLoggedIn,setIsLoggedIn]=useState(false)

    const defaultValue={
        appwrite:new AppwriteService(),
    isLoggedIn,
    setIsLoggedIn
    }

  return (
    <AppwriteContext.Provider value={defaultValue}>
      {children}
    </AppwriteContext.Provider >
  )
}

export default AppwriteProvider

const styles = StyleSheet.create({})