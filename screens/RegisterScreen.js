import { Alert, KeyboardAvoidingView, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';

const RegisterScreen = () => {
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [phone,setPhone]=useState("")

    const navigation=useNavigation()

    const register=()=>{
        if(email === "" || password === "" || phone === ""){
            Alert.alert('Invalid Details', 'Please fill all details.', [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {text: 'OK', onPress: () => console.log('OK Pressed')},
              ]);
        }

        createUserWithEmailAndPassword(auth,email,password)
        .then((userCredential)=>{
            
            const user=userCredential._tokenResponse.email;
            const myUserUid=auth.currentUser.uid;

            setDoc(doc(db,"users",`${myUserUid}`),{
                email:user,
                phone:phone
            })
        })
    }
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView>
        <View style={styles.Container1}>
            <Text style={styles.h1}>Register</Text>
            <Text style={styles.h2}>Create a new Account</Text>
        </View>

        <View style={styles.Container2}>
            <View style={styles.emailContainer}>
                <MaterialCommunityIcons name="email-outline" size={24} color="black" />
                <TextInput value={email} onChangeText={(text)=>setEmail(text)} placeholder='Email' placeholderTextColor="black" style={styles.textinput}/>
            </View>

            <View style={styles.emailContainer}>
                <Ionicons name="key-outline" size={24} color="black" />
                <TextInput value={password} onChangeText={(text)=>setPassword(text)} secureTextEntry={true}  placeholder='Password' placeholderTextColor="black" style={styles.textinput}/>
            </View>

            <View style={styles.emailContainer}>
                <Feather name="phone" size={24} color="black" />
                <TextInput value={phone} onChangeText={(text)=>setPhone(text)}   placeholder='Phone' placeholderTextColor="black" style={styles.textinput}/>
            </View>

            <Pressable onPress={register}  style={styles.buttonContainer}>
                <Text style={styles.buttontext}>Register</Text>
            </Pressable>

            <Pressable onPress={()=>navigation.navigate("Login")} style={styles.signupContainer}>
                <Text style={styles.signupText}>Already have a Account ? Sign In</Text>
            </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container:{
    marginTop:40,
    flex:1,
    backgroundColor:'white',
    alignItems:'center',
    padding:10
    },
    Container1:{
        justifyContent:'center',
        alignItems:'center',
        marginTop:100
    },
    h1:{
        fontSize:20,
        color:'#662d91',
        fontWeight:'bold'
    },
    h2:{
        fontSize:18,
        marginTop:8,
        fontWeight:'600'
    },
    Container2:{
        marginTop:50
    },
    textinput:{
        borderBottomWidth:1,
        borderBottomColor:'gray',
        width:300,
        marginVertical:20,
        marginLeft:13,
        fontSize:18
        

    },
    emailContainer:{
        flexDirection:'row',
        alignItems:'center'
    },
    buttonContainer:{
        width:200,
        backgroundColor:'#31bce7',
        padding:15,
        borderRadius:7,
        marginTop:20,
        marginLeft:'auto',
        marginRight:'auto'
    },
    buttontext:{
        fontSize:18,
        textAlign:'center',
        color:'white'
    },
    signupContainer:{
        marginTop:20
    },
    signupText:{
        textAlign:'center',
        fontSize:17,
        color:'gray',
        fontWeight:'500'
    }
})