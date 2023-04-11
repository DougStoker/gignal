import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {ListItem, Avatar} from "react-native-elements"



const CustomListItem = ({id,chatName,enterChat}) => {
  return (
    <ListItem containerStyle={styles.container} key={id} onPress={()=>enterChat(id,chatName)} bottomDivider>
        <Avatar
            rounded
            source={{
                uri:"https://cdn.discordapp.com/attachments/682267472102949000/1087378883042615316/1324500486004.png"
            }}
        
        />

        <ListItem.Content style={styles.title}>
            <ListItem.Title style={[styles.title,{fontWeight: "800"}]}>
                {chatName}
            </ListItem.Title>
            <ListItem.Subtitle numberOfLines={1} style={styles.title}>
                qweqwefasdfasfgwergsfg
            </ListItem.Subtitle>
        </ListItem.Content>
    </ListItem>
  )
}

export default CustomListItem

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#323232',
        borderWidth: 1,
        borderColor:"232323"
    },
    title:{
        backgroundColor:'#323232',
        color:'#8FFFCF',
        
    }
})