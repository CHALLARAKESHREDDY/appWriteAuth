import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { AppwriteContext } from '../appWrite/AppwriteProvider'
import Snackbar from 'react-native-snackbar';
import { Button } from '@rneui/base';

type UserObject={
  name:string,
  email:string
}

const Home = () => {
  const [userData,setUserData]=useState<UserObject>()
  const {appwrite,setIsLoggedIn}=useContext(AppwriteContext)

  const handleLogout=()=>{
    appwrite.logout()
    .then(()=>{
       setIsLoggedIn(false)
       Snackbar.show({
        text:"Logged Out Successfully",
        duration:Snackbar.LENGTH_LONG
       })
    })
  }

  useEffect(()=>{
    appwrite.getCurrentUser()
    .then((response)=>{
      if (response){
          const user:UserObject={name:response.name,email:response.email}
          setUserData(user)
        
      }
    })
  },[appwrite])

  return (
    <View>
      {
        userData && (
          <>
          <Text>{userData.name}</Text>
          <Text>{userData.email}</Text>
          <Button title="Logout" onPress={()=>handleLogout()}/>
          </>

        )
      }
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:"center",
    justifyContent:"center"
  }
})