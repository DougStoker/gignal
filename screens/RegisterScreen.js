import React, {useLayoutEffect, useState} from 'react'
import {StyleSheet, View, KeyboardAvoidingView} from 'react-native'
import { Input } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import { Button, Text } from 'react-native-elements';
//import {Text as elementText} from "react-native-elements" 
import {auth} from "../firebase"
import {createUserWithEmailAndPassword,updateProfile} from "firebase/auth"

const RegisterScreen =({navigation})=>{
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [imageUrl,setImageUrl] = useState('')
    useLayoutEffect(()=>{
        navigation.setOptions({
            headerBackTitle: "login"
        }, [navigation])
    })
    // const updateProfile = async (uEmail) => {
    //     //console.log(db.app)
    //     await addDoc(collection(getFirestore(db.app),"users"),{
    //         email: uEmail,
    //         displayName: name,
    //         photoUrl : imageUrl || "https://cdn.discordapp.com/attachments/682267472102949000/1087378883042615316/1324500486004.png"
    //     }).then(()=>{
    //         navigation.goBack()
    //     }).catch((error)=>{
    //         alert(error)
    //     })
    // }
    const register = () => {
        createUserWithEmailAndPassword(auth, email, password).then(
            authUser => {
                // authUser.user.update({
                //     displayName: name,
                //     photoURL: imageUrl || "https://cdn.discordapp.com/attachments/682267472102949000/1087378883042615316/1324500486004.png"
                // })
                // authUser.user.displayName = name;
                // authUser.user.photoUrl = imageUrl || "https://cdn.discordapp.com/attachments/682267472102949000/1087378883042615316/1324500486004.png"
                updateProfile(authUser.user,{
                         displayName: name,
                         photoURL: imageUrl || "https://cdn.discordapp.com/attachments/682267472102949000/1087378883042615316/1324500486004.png"
                     })
            }
        ).catch(error => alert(error.message))
        //updateProfile(email)
        
    }
    return(
        <KeyboardAvoidingView  behavior="padding" enabled style={styles.container}>
            <StatusBar style="light"/>
            <Text h3 style={[styles.input,{marginBottom:50}]}>Create an account</Text>
            <View style={styles.inputContainer}>
                <Input
                    style={styles.input} 
                    placeholder='Full Name' 
                    autofocus 
                    type='text' 
                    value={name} 
                    onChangeText={(text) => setName(text)}
                />
                <Input
                    style={styles.input} 
                    placeholder='Email' 
                    autofocus 
                    type='text' 
                    value={email} 
                    onChangeText={(text) => setEmail(text)}
                />
                <Input
                    style={styles.input} 
                    placeholder='Password' 
                    autofocus 
                    type='text' 
                    value={password} 
                    onChangeText={(text) => setPassword(text)}
                />
                <Input
                    style={styles.input} 
                    placeholder='PFP url (optional)' 
                    autofocus 
                    type='text' 
                    value={imageUrl} 
                    onChangeText={(text) => setImageUrl(text)}
                    onSubmitEditing={register}
                />
            </View>
            <Button
                title="Register"
                onPress={register}
                containerStyle={styles.button} buttonStyle={styles.button} titleStyle={styles.button}
            />
        </KeyboardAvoidingView>
    )
}

export default RegisterScreen

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
        //marginTop:10
    },
    button2:{
        backgroundColor:'#181818',
        color:'#8FFFCF',
        borderColor:'#282828',

    }
})