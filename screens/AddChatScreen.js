import { StyleSheet, Text, View } from 'react-native'
import React, {useLayoutEffect,useState,useEffect} from 'react'
import { Input } from 'react-native-elements';
import Icon from "react-native-vector-icons/FontAwesome"
import { Button } from 'react-native-elements';
import {db} from "../firebase"
import {collection,getFirestore,addDoc} from "firebase/firestore"
const AddChatScreen = ({navigation}) => {
    const [input, setInput] = useState('')

    const createChat = async () => {
        //console.log(db.app)
        await addDoc(collection(getFirestore(db.app),"chats"),{
            chatName: input
        }).then(()=>{
            navigation.goBack()
        }).catch((error)=>{
            alert(error)
        })
    }
    useLayoutEffect(()=>{
        navigation.setOptions({
            title:"add a new chat",
            headerBackTitle:"Chats",
        })
    },[navigation])
  return (
    <View style={styles.container}>
      <Input
        placeholder="Enter a chat name"
        value={input}
        onChangeText={(text)=>setInput(text)}
        leftIcon={
            <Icon name="wechat" size={24} type="antdesign" color="black"/>
        }
      />
      <Button onPress={createChat} title="Create new chat" />
    </View>
  )
}

export default AddChatScreen

const styles = StyleSheet.create({
    container:{

    }
})