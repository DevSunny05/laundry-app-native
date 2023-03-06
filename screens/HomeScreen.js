import {
  Alert,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import Carousel from "../components/Carousel";
import Services from "../components/Services";
import ServiceData from "../data/ServiceData";
import DressItem from "../components/DressItem";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/ProductReducer";
import { useNavigation } from "@react-navigation/native";
import { collection, getDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const HomeScreen = () => {
  const cart = useSelector((state) => state.cart.cart);
  const [items,setItems]=useState([])
  const navigation=useNavigation()
  const total = cart
    .map((item) => item.quantity * item.price)
    .reduce((curr, prev) => curr + prev, 0);

  const [displayCurrentaddress, setDisplayCurrentAddress] = useState(
    "We are loading locatin"
  );
  const [locationServiceEnable, setLocationServiceEnable] = useState(false);

  const checkIfLocationEnable = async () => {
    let enable = await Location.hasServicesEnabledAsync();

    if (!enable) {
      Alert.alert(
        "Location services not enabled",
        "Please enable location services",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]
      );
    } else {
      setLocationServiceEnable(enable);
    }
  };

  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission denied",
        "Allow the app to use location services.",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]
      );
    }

    const { coords } = await Location.getCurrentPositionAsync();
    if (coords) {
      const { latitude, longitude } = coords;
      let responce = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      for (let item of responce) {
        let address = `${item.city}, ${item.country}, ${item.postalCode}`;
        setDisplayCurrentAddress(address);
      }
    }
  };
  useEffect(() => {
    checkIfLocationEnable();
    getCurrentLocation();
  }, []);

  const product = useSelector((state) => state.product.product);
  const dispatch = useDispatch();

  useEffect(() => {
    if (product.length > 0) {
      return;
    }

    const fetchProduct = async () => {
      const colRef=collection(db,"types")
      const docsSnap=await getDocs(colRef)
      docsSnap.forEach((doc)=>{
        items.push(doc.data())
       
      })

      items?.map((service)=>dispatch(getProducts(service)))
      // ServiceData.map((data) => dispatch(getProducts(data)));
    };
    fetchProduct();
    
  }, []);
  console.log(product)
  console.log(items)
  return (
    <>
      <ScrollView style={styles.container}>
        {/* location and profile */}
        <View style={styles.profileContainer}>
          <MaterialIcons name="location-on" size={28} color="#fd5c63" />
          <View>
            <Text style={styles.homeText}>Home</Text>
            <Text>{displayCurrentaddress}</Text>
          </View>
          <Pressable style={styles.Imagecontainer}>
            <Image
              style={styles.profile}
              source={{
                uri: "https://th.bing.com/th/id/OIP.6WCYmBOHH2xFo9vnSHgA_gHaEK?w=313&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
              }}
            />
          </Pressable>
        </View>
        {/* searchbar */}
        <View style={styles.searchContainer}>
          <TextInput placeholder="Search for items or more..." />
          <Feather name="search" size={24} color="#fd5c63" />
        </View>

        {/* image crousel */}

        <Carousel />

        {/* services */}
        <Services />

        {/* Render all the products */}

        {product.map((item, index) => (
          <DressItem key={index} item={item} />
        ))}
      </ScrollView>
      {total === 0 ? null : (
        <Pressable style={styles.bottomContainer}>
          <View>
            <Text style={styles.cartLength}>{cart.length} items | ₹{total}</Text>
            <Text style={styles.extraText}>Extra Charges Might Apply</Text>
          </View>

          <Pressable onPress={()=>navigation.navigate('Pickup')}>
            <Text style={styles.pickuptext}>Proceed To Pickup</Text>
          </Pressable>
        </Pressable>
      )}
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    backgroundColor: "#F0F0F0",
    flex: 1,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  Imagecontainer: {
    marginLeft: "auto",
  },
  homeText: {
    fontSize: 18,
    fontWeight: "600",
  },
  profile: {
    width: 40,
    height: 40,
    borderRadius: 21,
  },
  searchContainer: {
    padding: 10,
    margin: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 0.8,
    borderColor: "#c0c0c0",
    borderRadius: 7,
  },
  bottomContainer: {
    backgroundColor: "#088F8F",
    padding: 10,
    marginBottom: 30,
    margin: 15,
    borderRadius: 7,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cartLength:{
    fontSize:16,
    fontWeight:'600',
    color:'white'
  },
  extraText:{
    fontSize:13,fontWeight:'400',color:'white',marginVertical:5
},
  pickuptext:{
    fontSize:16,fontWeight:'500',color:'white'
  }
});
