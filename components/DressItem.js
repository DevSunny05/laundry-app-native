import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";

const DressItem = ({ data }) => {
  return (
    <View>
      <Pressable style={styles.container}>
        <View>
          <Image style={styles.image} source={{ uri: data.image }} />
        </View>
        <View>
            <Text style={styles.name}>{data.name}</Text>
            <Text style={styles.price}>₹{data.price}</Text>
        </View>

        <Pressable style={styles.addButton}>
            <Text style={styles.addButtonText}>ADD</Text>
        </Pressable>
      </Pressable>
    </View>
  );
};

export default DressItem;

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#F8F8F8',
        borderRadius:7,
        padding:10,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        margin:14
    },
  image: {
    width: 70,
    height: 70,
  },
  addButton:{
    width:80
  },
  addButtonText:{
    borderColor:'gray',
    borderWidth:0.8,
    marginVertical:10,
    color:'#088F8F',
    textAlign:'center',
    padding:4,
    borderRadius:6,
    fontSize:17,
    fontWeight:'bold'
  },
  name:{
    width:83,
    fontSize:17,
    fontWeight:'500',
    marginBottom:7
  },
  price:{
    width:60,
    color:'gray',
    fontSize:15
  }
});
