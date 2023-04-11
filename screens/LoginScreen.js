import React, {useState, useEffect} from 'react'
import {StyleSheet, Text, View, KeyboardAvoidingView} from 'react-native'
import {Button, Image, Input} from "react-native-elements"
import {auth} from "../firebase"
import {onAuthStateChanged, signInWithEmailAndPassword} from "firebase/auth"

import { StatusBar } from 'expo-status-bar'


const LoginScreen = ({navigation}) => {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,(authUser)=>{
            if(authUser){
                navigation.replace("Home")
            }
        })
        return unsubscribe
    },[]) 

    const signIn = () => {
        signInWithEmailAndPassword(auth,email,password)
    }
    return(
        <KeyboardAvoidingView behavior="padding" enabled style={styles.container}>
            <StatusBar style="light"/>
            <Image source={require("../assets/img1.png")}
            style={{width:200,height:200,margin:8,borderRadius:8}}/>

            <View style={styles.inputContainer}>
                <Input style={styles.input} 
                    placeholder='Email'
                    autoFocus 
                    type="Email" 
                    value={email} 
                    onChangeText={text => setEmail(text)}
                />
                <Input 
                    style={styles.input} 
                    placeholder='Password' 
                    secureTextEntry 
                    type="password"  
                    value={password} 
                    onChangeText={text => setPassword(text)}
                />
            </View>
            <Button 
                title="Login" 
                containerStyle={styles.button} 
                buttonStyle={styles.button} 
                titleStyle={styles.button}
                onPress={signIn}
            />
            <View style={{height:10}}/>
            <Button 
                title="Register" 
                type="outline"
                containerStyle={styles.button2} 
                buttonStyle={styles.button2} 
                titleStyle={styles.button2}
                onPress={() => {navigation.navigate('Register')}}
                raised
            />
            <View style={{height:100}}/>
        </KeyboardAvoidingView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    inputContainer:{
      width:300,

    },
    input:{
        color:'#8FFFCF'
    },
    container:{
        backgroundColor:'#181818',
        color:'#8FFFCF',
        // height: '100%'
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        padding: 10,
    },
    button:{
        backgroundColor:'#282828',
        color:'#8FFFCF',
        width:200,
        
    },
    button2:{
        backgroundColor:'#1c1c1c',
        color:'#8FFFCF',
        borderColor:'#4f4f4f',
        width:200,
        

    }
})