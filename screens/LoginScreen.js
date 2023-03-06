import { ActivityIndicator, KeyboardAvoidingView, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const LoginScreen = () => {
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [loading,setLoading]=useState(false)
    const navigation=useNavigation()

    useEffect(()=>{
        setLoading(true)
        const unsubscribe=auth.onAuthStateChanged((authUser)=>{
            if(!authUser){
                setLoading(false)
            }
            if(authUser){
                navigation.navigate("Home")
            }
        })
        return unsubscribe
    },[])

    const login=()=>{
        signInWithEmailAndPassword(auth,email,password)
        .then((userCredential)=>{
            
            const user= userCredential.user
            
        })
    }
  return (
    <SafeAreaView style={styles.container}>
        {
            loading ? (
                <View style={styles.loadingContainer}>
                    <Text style={styles.loadingText}>Loading</Text>
                    <ActivityIndicator size="large" color="red"/>
                </View>
            ):(
                <KeyboardAvoidingView>
                <View style={styles.Container1}>
                    <Text style={styles.h1}>Sign In</Text>
                    <Text style={styles.h2}>Sign In to your account</Text>
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
        
                    <Pressable onPress={login} style={styles.buttonContainer}>
                        <Text style={styles.buttontext}>Login</Text>
                    </Pressable>
        
                    <Pressable onPress={()=>navigation.navigate("Register")} style={styles.signupContainer}>
                        <Text style={styles.signupText}>Dont't have a account? Sign Up</Text>
                    </Pressable>
                </View>
              </KeyboardAvoidingView>
            )
        }
     
    </SafeAreaView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
    container:{
        marginTop:40,flex:1,backgroundColor:'white',alignItems:'center',padding:10
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
    },
    loadingContainer:{
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row',
        flex:1
    },
    loadingText:{
        marginRight:10
    }
})