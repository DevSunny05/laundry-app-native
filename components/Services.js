import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Services = () => {
    const services = [
        {
          id: "0",
          image: "https://cdn-icons-png.flaticon.com/128/3003/3003984.png",
          name: "Washing",
        },
        {
          id: "11",
          image: "https://cdn-icons-png.flaticon.com/128/2975/2975175.png",
          name: "Laundry",
        },
        {
          id: "12",
          image: "https://cdn-icons-png.flaticon.com/128/9753/9753675.png",
          name: "Wash & Iron",
        },
        {
          id: "13",
          image: "https://cdn-icons-png.flaticon.com/128/995/995016.png",
          name: "Cleaning",
        },
      ];
  return (
    <View style={{padding:10}}>
        <Text style={styles.heading}>Services Available</Text>
     <ScrollView horizontal  showsHorizontalScrollIndicator={false}  style={styles.outerContainer}>
        {
            services.map((service,index)=>(
                <Pressable key={index} style={styles.innerContainer}>
                    <Image source={{uri:service.image}} style={styles.image}/>
                    <Text style={styles.serviceName}>{service.name}</Text>
                </Pressable>
            ))
        }
     </ScrollView>
    </View>
  )
}

export default Services

const styles = StyleSheet.create({
    outerContainer:{
        padding:10,
        
    },
    heading:{
        fontSize:16,
        fontWeight:'500',
        marginBottom:7
    },
    innerContainer:{
        margin:10,
        backgroundColor:'white',
        padding:20,
        borderRadius:7
    },
    image:{
        width:70,
        height:70
    },
    serviceName:{
        textAlign:'center',
        marginTop:10
    }
})