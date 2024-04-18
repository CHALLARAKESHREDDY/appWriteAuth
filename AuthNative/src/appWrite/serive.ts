import {ID, Account, Client} from 'appwrite'
import Config from 'react-native-config'
import Snackbar from 'react-native-snackbar';
import { PropsWithChildren } from 'react'

const  appwriteClient = new Client()

const APPWRITE_ENDPOINT : string = "https://cloud.appwrite.io/v1";
const APPWRITE_PROJECT_ID:string = "661df6661c98cc5ea5ce";

type CreateUserAccount=PropsWithChildren<{
    email:string,
    password:string,
    name:string}>

type LoginUserAccount={
    email:string,
    password:string
}

class AppwriteService{
    account ;
    constructor(){
        appwriteClient.setEndpoint(APPWRITE_ENDPOINT)
        .setProject(APPWRITE_PROJECT_ID)

        this.account = new Account(appwriteClient)
    }

    //create a new record of user inside appwrite
    async createAccount({email,password,name}:CreateUserAccount){

        try{
            const userAccount=await  this.account.create(ID.unique(),email,password,name)
            if(userAccount){
                return this.login({email,password})
            }else {
                return userAccount
            }
        }catch (e) {
            Snackbar.show({
                text:String(e),
                duration: Snackbar.LENGTH_LONG

            })
            console.log("createAccount Error"+String(e))
        }
    }

    async login({email,password}:LoginUserAccount){
          try{
            return  await this.account.createEmailPasswordSession(email,password);
          }catch (e){
            Snackbar.show({
                text: String(e),
                duration: Snackbar.LENGTH_LONG
            })
            console.log("login Error"+String(e))
        }
    }

    async getCurrentUser(){
        try{
           return  await this.account.get()
        }catch (e){
            console.log("getCurrentUser Error:"+String(e))
        }
    }

    async logout(){
        try{
            await this.account.deleteSession('current')
        }catch (e){
            console.log( "LogOut Error" + e)
        }
    }
}

export default AppwriteService