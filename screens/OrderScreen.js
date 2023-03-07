import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LottieView from "lottie-react-native"

const OrderScreen = () => {
  return (
    <SafeAreaView style={{marginTop:40}}>
      <LottieView 
      source={require("../assets/thumbs.json")}
       style={styles.thumb}
       autoPlay
       loop={false}
       speed={0.7}
       />
      <Text style={styles.text} >Your order has been placed</Text>
      <LottieView 
       source={require("../assets/sparkle.json")} 
        style={styles.sparkle}
        autoPlay
        loop={false}
        speed={0.7}
        />
    </SafeAreaView>
  )
}

export default OrderScreen

const styles = StyleSheet.create({
  thumb:{
    height:360,
    width:300,
    alignSelf:'center',
    marginTop:40,
    justifyContent:'center'
  },
  text:{
    marginTop:40,
    fontSize:19,
    fontWeight:"600",
    textAlign:"center"
  },
  sparkle:{
    height:300,
    position:'absolute',
    top:100,
    width:300,
    alignSelf:'center'
  }
})