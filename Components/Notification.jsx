import React from 'react'
import { Pressable, Text, View, SafeAreaView, StyleSheet } from 'react-native'

const Notification = () => {
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.itemsContainer}>
            <Text style={styles.text}>No notification found yet</Text>
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    itemsContainer:{
        paddingTop:"20%",
        alignItems:'center'
    }
})

export default Notification