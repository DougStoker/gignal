import { StyleSheet, Text, View, SafeAreaView, KeyboardAvoidingView,ScrollView,TextInput,Keyboard , TouchableWithoutFeedback} from 'react-native'
import React, {useLayoutEffect,useState} from 'react'
import { Avatar } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AntDesign,FontAwesome,Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import {db, auth} from "../firebase"
import {collection,getFirestore,doc,serverTimestamp,addDoc,onSnapshot,orderBy,query} from "firebase/firestore"
//import {currentUser} from "firebase/auth"





const ChatScreen = ({navigation,route}) => {
    const [input,setInput] = useState('')
    const [messages,setMessages] = useState([])
    useLayoutEffect(()=>{
        navigation.setOptions({
            title: "Chat",
            headerTitleAlign:"left",
            headerBackTitleVisible: false,
            headerTitle: ()=>(
                <View style={{flexDirection:"row",alignItems:"center"}}>
                    <Avatar rounded source={{uri:"https://cdn.discordapp.com/attachments/682267472102949000/1087378883042615316/1324500486004.png"}}/>
                    <Text style={{color:'#8FFFCF',marginLeft:10,fontWeight:700}}>{route.params.chatName}</Text>
                </View>
                
            ),
            headerLeft: () => (
                <TouchableOpacity style={{marginLeft:10}} onPress={navigation.goBack}>
                    <AntDesign name="arrowleft" size={24} color='#8FFFCF'/>
                </TouchableOpacity>
            ),
            headerRight: () => (
                <View style={{
                    flexDirection:"row",
                    justifyContent:"space-between",
                    width:80,
                    marginRight:20
                }}>
                    <TouchableOpacity>
                        <FontAwesome name="video-camera" size={24} color='#8FFFCF'/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name="call" size={24} color='#8FFFCF'/>
                    </TouchableOpacity>
                </View>
            )

        })
    },[navigation])

  const sendMessage = () => {
    Keyboard.dismiss()
    addDoc(collection(doc(collection(getFirestore(db.app),"chats"),route.params.id),"messages"),{
        timestamp: serverTimestamp(),
        message: input,
        //displayName: currentUser(auth).displayName
        displayName: auth.currentUser.displayName,
        email:auth.currentUser.email,
        photoURL:auth.currentUser.photoURL
    })
    setInput('')
  
  }
  useLayoutEffect(()=>{
    let m = collection(doc(collection(getFirestore(db.app),"chats"),route.params.id),"messages")//.orderBy('timestamp','desc')
    //console.log(m)
    let g = query(m,orderBy('timestamp','asc'))
    const unsubscribe = onSnapshot(g, (snapshot)=>{setMessages(
        snapshot.docs.map(doc =>({
            id:doc.id,
            data:doc.data()
        }))
    )})
    return unsubscribe
  },[route])
  return (
    <SafeAreaView style={{flex:1,backgroundColor:"#1c1c1c"}}>
      <StatusBar style="light"/>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        KeyboardVerticalOffset={90}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <>
            <ScrollView>
                {messages.map(({id,data})=>(
                    data.email === auth.currentUser.email ? (
                        <View key={id} style={styles.sender}>
                            <Avatar rounded source={{uri:data.photoURL||"https://cdn.discordapp.com/attachments/682267472102949000/1087378883042615316/1324500486004.png"}}/>
                            <Text style={styles.sendertext}>{data.message}</Text>
                        </View>
                    ) : (<View key={id} style={styles.reciever}>
                        <Avatar rounded source={{uri:data.photoURL||"https://cdn.discordapp.com/attachments/682267472102949000/1087378883042615316/1324500486004.png"}}/>
                        <Text style={styles.senderName}>{data.displayName}</Text>
                        <Text style={styles.recievertext}>{data.message}</Text>
                    </View>)
                ))}
                

            </ScrollView>
            <View style={styles.footer}>
                <TextInput
                placeholder="Message"
                value={input}
                onChangeText={text => setInput(text)}
                onSubmitEditing={sendMessage}
                style={styles.textInput}
                />
                <TouchableOpacity activeOpacity={0.5} onPress={sendMessage}>
                    <Ionicons name="send" size={24} color='#8FFFCF'/>
                </TouchableOpacity>
            </View>
         </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default ChatScreen

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    footer:{
        flexDirection:"row",
        alignItems:"center",
        width:"100%",
        padding:15
    },
    textInput:{
        bottom:0,
        height:40,
        flex:1,
        marginRight:15,
        backgroundColor:"#282828",
        padding:10,
        color:"#8FFFCF",
        borderRadius:30
    },
    sender:{
        padding:15,
        backgroundColor:"#282828",
        alignSelf:"flex-end",
        borderRadius:20,
        marginRight:15,
        marginBottom:20,
        maxWidth:"80%",
        color:"#8FFFCF", 
        position:"relative",
    },
    reciever:{
        padding:15,
        backgroundColor:"#282828",
        alignSelf:"flex-start",
        borderRadius:20,
        marginLeft:15,
        marginBottom:20,
        maxWidth:"80%",
        color:"#8FFFCF", 
        position:"relative",
    },
    recievertext:{
        color:"#8FFFCF", 
    },
    sendertext:{
        color:"#8FFFCF", 
    },
    senderName:{
        color:"#8FEFAF", 
        fontWeight:"bold"
    }

    
})