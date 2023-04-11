import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native'
import React, {useLayoutEffect, useState,useEffect} from 'react'
import CustomListItem from '../components/CustomListItem';
import { Avatar } from 'react-native-elements';
import {auth, db} from "../firebase"
import {signOut} from "firebase/auth"
import {TouchableOpacity} from "react-native-gesture-handler"
import {AntDesign, SimpleLineIcons} from "@expo/vector-icons"
import {collection,getFirestore,onSnapshot} from "firebase/firestore"



const HomeScreen = ({navigation}) => {
    const [chats,setChats]= useState([])
    const signOutUser = () => {
        signOut(auth).then(()=>{
            navigation.replace("Login")
        })
    }

    useEffect(()=>{
        const unsubscribe = onSnapshot(collection(getFirestore(db.app),"chats"),(snapshot)=>{
            setChats(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        })
    },[])

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "gignal",
            headerStyle: {backgroundColor: "#282828"},
            headerTitleStyle: {color: "#8FFFCF"},
            headerTintColor: "#8FFFCF",
            headerLeft: () => (<View style={{marginLeft: 20}}>
                <TouchableOpacity activeOpacity={0.5} onPress={signOutUser}>
                    <Avatar rounded source={{uri:auth?.currentUser?.photoURL || "https://velog.velcdn.com/images/binest03459/post/c0a2b2f3-4537-4e7e-b0ac-115c0939b177/image.png"}}/>
                </TouchableOpacity>
                
                
            </View>),
            headerRight: () => (
                <View style={{marginRight: 20,
                    flexDirection:'row',
                    justifyContent:'space-between',
                    width:80
                }}>
                <TouchableOpacity activeOpacity={0.5} onPress={null}>
                    <AntDesign name="camerao" size={24} color="#8FFFCF"/>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.5} onPress={()=>{navigation.navigate('AddChat')}}>
                    <SimpleLineIcons name="pencil" size={24} color="#8FFFCF"/>
                </TouchableOpacity>
           
            </View>
            )
        })
    }, [navigation])

  const enterChat = (id, chatName) =>{
    navigation.navigate('Chat',{
        id,
        chatName
    })
  }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {chats.map(({id,data:{chatName}})=>(
            <CustomListItem key={id} id={id} chatName={chatName} enterChat={enterChat}/>
        ))}
        
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#1c1c1c',
        flex:1
    }
})