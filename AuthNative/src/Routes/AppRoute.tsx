import { Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Home from '../Screens/Home'

type AppStackProps={
    Home:undefined
}

const Stack=createStackNavigator<AppStackProps>()

const AppRoute = () => {
  return (
    <Stack.Navigator screenOptions={{
        headerTitleAlign:"center",
        headerBackTitleVisible:false

    }}>
        <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  )
}

export default AppRoute

