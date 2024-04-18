import { Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Login from '../Screens/Login'
import Signup from '../Screens/Signup'

 export type AuthStackProps={
    Login:undefined,
    Signup:undefined
}

const Stack=createStackNavigator<AuthStackProps>()

const AuthRoute = () => {
  return (
    <Stack.Navigator screenOptions={{
        headerTitleAlign:"center"
        
    }}>
      <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Login" component={Login} />
        

    </Stack.Navigator>
  )
}

export default AuthRoute