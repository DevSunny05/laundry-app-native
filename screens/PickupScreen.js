import {
    Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import HorizontalDatepicker from "@awrminkhodaei/react-native-horizontal-datepicker";
import TimeData from "../data/TimeData";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
const PickupScreen = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState([]);
  const [deliveryTime,setDeliveryTime]=useState([])

  const cart = useSelector((state) => state.cart.cart);
  const navigation=useNavigation()
  const total = cart
    .map((item) => item.quantity * item.price)
    .reduce((curr, prev) => curr + prev, 0);

    const procedeToCart=()=>{
        if(!selectedDate || !selectedTime || !deliveryTime){
            Alert.alert('Empty or Invalid', 'Please select all the fields', [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {text: 'OK', onPress: () => console.log('OK Pressed')},
              ]);
        }

        if(selectedDate && selectedTime && deliveryTime){
            navigation.replace('Cart',{
                selectedDate:selectedDate,
                selectedTime:selectedTime,
                no_of_days:deliveryTime
            })
        }
    }
  

  return (
    <>
    <SafeAreaView style={{ marginTop: 40 }}>
      <Text style={styles.addresText}>Enter Address</Text>
      <TextInput style={styles.textInput} />
      <Text style={styles.datepickupText}>Pick Up Date</Text>

      <HorizontalDatepicker
        mode="gregorian"
        startDate={new Date("2023-03-05")}
        endDate={new Date("2023-03-12")}
        initialSelectedDate={new Date("2023-03-05")}
        onSelectedDateChange={(date) => setSelectedDate(date)}
        selectedItemWidth={170}
        unselectedItemWidth={38}
        itemHeight={38}
        itemRadius={10}
        selectedItemTextStyle={styles.selectedItemTextStyle}
        unselectedItemTextStyle={styles.selectedItemTextStyle}
        selectedItemBackgroundColor="#222831"
        unselectedItemBackgroundColor="#ececec"
        flatListContainerStyle={styles.flatListContainerStyle}
      />

      <Text style={styles.datepickupText}>Select Time</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {TimeData.hourTime.map((item, index) => (
          <Pressable
            style={selectedTime.includes(item.time) ?{   
                    margin: 10,
                    borderRadius: 7,
                    padding: 15,
                    borderColor: "red",
                    borderWidth: 0.7,
            }:{
                    margin: 10,
                    borderRadius: 7,
                    padding: 15,
                    borderColor: "gray",
                    borderWidth: 0.7,
            }}
            onPress={() => setSelectedTime(item.time)}
            key={index}
          >
            <Text>{item.time}</Text>
          </Pressable>
        ))}
      </ScrollView>

      <Text style={styles.datepickupText}>Delivery Time</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {TimeData.deliveryTime.map((item, index) => (
          <Pressable
            style={deliveryTime.includes(item.name) ?{   
                    margin: 10,
                    borderRadius: 7,
                    padding: 15,
                    borderColor: "red",
                    borderWidth: 0.7,
            }:{
                    margin: 10,
                    borderRadius: 7,
                    padding: 15,
                    borderColor: "gray",
                    borderWidth: 0.7,
            }}
            onPress={() => setDeliveryTime(item.name)}
            key={index}
          >
            <Text>{item.name}</Text>
          </Pressable>
        ))}
      </ScrollView>

    </SafeAreaView>

    {
                total === 0 ?(null):(
                <Pressable style={styles.bottomContainer}>
                    <View>
                        <Text style={styles.cartLength}>{cart.length} items | ₹{total}</Text>
                        <Text style={styles.extraText}>Extra Charges Might Apply</Text>
                    </View>
        
                    <Pressable onPress={procedeToCart}>
                        <Text style={styles.pickuptext}>Proceed To Cart</Text>
                    </Pressable>
                </Pressable>
                )
            }
    </>
  );
};

export default PickupScreen;

const styles = StyleSheet.create({
  addresText: {
    fontSize: 16,
    fontWeight: "500",
    marginHorizontal: 10,
  },
  textInput: {
    padding: 40,
    borderColor: "gray",
    borderWidth: 0.7,
    margin: 10,
    borderRadius: 7,
    paddingVertical: 80,
  },
  datepickupText: {
    fontSize: 16,
    fontWeight: "500",
    marginHorizontal: 10,
    marginVertical: 5,
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
    marginTop:'auto'
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
