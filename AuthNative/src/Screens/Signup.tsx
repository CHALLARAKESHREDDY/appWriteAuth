import { StyleSheet, Text, View,KeyboardAvoidingView,Platform,TextInput, Pressable} from 'react-native'
import React, { useContext, useState } from 'react'
import { AppwriteContext } from '../appWrite/AppwriteProvider'
import { StackScreenProps } from '@react-navigation/stack'
import { AuthStackProps } from '../Routes/AuthRoute'
import Snackbar from 'react-native-snackbar'

type SignupProps=StackScreenProps<AuthStackProps,"Signup">

const Signup = ({navigation}:SignupProps) => {
   const {appwrite,setIsLoggedIn}=useContext(AppwriteContext)
   const [error,setError]=useState<string>("")
   const [name,setName]=useState<string>("")
   const [email,setEmail]=useState<string>("")
   const [password,setPassword]=useState<string>("")
   const [checkPassword,setCheckPassword]=useState<string>("")
   
   const handleSignup=()=>{
    if(name?.length<1 || email.length<1 || password.length<1 || checkPassword.length<1 ){
         setError("All Fileds are Required")
    }
    else if(password!==checkPassword) {
        setError("passwords should match")
    }else{
      const user={name,email,password}
      appwrite.createAccount(user).then((response)=>{
             if (response){
              setIsLoggedIn(true)
              Snackbar.show({text:"Signup Successful",duration:Snackbar.LENGTH_LONG})
             }
      }) .catch(e => {
        console.log(e);
        setError(e.message)
        
      })
    }
   }
     
  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    style={styles.container}>
    <View style={styles.formContainer}>
      <Text style={styles.appName}>Appwrite Auth</Text>

      {/* Name */}
      <TextInput
        value={name}
        onChangeText={text => {
          setError('');
          setName(text);
        }}
        placeholderTextColor={'#AEAEAE'}
        placeholder="Name"
        style={styles.input}
      />

      {/* Email */}
      <TextInput
        value={email}
        keyboardType="email-address"
        onChangeText={text => {
          setError('');
          setEmail(text);
        }}
        placeholderTextColor={'#AEAEAE'}
        placeholder="Email"
        style={styles.input}
      />

      {/* Password */}
      <TextInput
        value={password}
        onChangeText={text => {
          setError('');
          setPassword(text);
        }}
        placeholderTextColor={'#AEAEAE'}
        placeholder="Password"
        secureTextEntry
        style={styles.input}
      />

      {/* Repeat password */}
      <TextInput
        secureTextEntry
        value={checkPassword}
        onChangeText={text => {
          setError('');
          setCheckPassword(text);
        }}
        placeholderTextColor={'#AEAEAE'}
        placeholder="Repeat Password"
        style={styles.input}
      />

      {/* Validation error */}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {/* Signup button */}
      <Pressable
        onPress={handleSignup}
        style={[styles.btn, {marginTop: error ? 10 : 20}]}>
        <Text style={styles.btnText}>Sign Up</Text>
      </Pressable>

      {/* Login navigation */}
      <Pressable
        onPress={() => navigation.navigate('Login')}
        style={styles.loginContainer}>
        <Text style={styles.haveAccountLabel}>
          Already have an account?{'  '}
          <Text style={styles.loginLabel}>Login</Text>
        </Text>
      </Pressable>
    </View>
  </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  formContainer: {
    justifyContent: 'center',
    alignContent: 'center',
    height: '100%',
  },
  appName: {
    color: '#f02e65',
    fontSize: 40,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fef8fa',
    padding: 10,
    height: 40,
    alignSelf: 'center',
    borderRadius: 5,

    width: '80%',
    color: '#000000',

    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 1,
  },
  errorText: {
    color: 'red',
    alignSelf: 'center',
    marginTop: 10,
  },
  btn: {
    backgroundColor: '#ffffff',
    padding: 10,
    height: 45,

    alignSelf: 'center',
    borderRadius: 5,
    width: '80%',
    marginTop: 10,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 3,
  },
  btnText: {
    color: '#484848',
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
  loginContainer: {
    marginTop: 60,
  },
  haveAccountLabel: {
    color: '#484848',
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 15,
  },
  loginLabel: {
    color: '#1d9bf0',
  },
});

export default Signup