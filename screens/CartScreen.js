import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { cleanCart, decreamentQuantity, increamentQuantity } from "../redux/CartReducer";
import { decreamentQty, increamentQty } from "../redux/ProductReducer";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

const CartScreen = () => {
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const { selectedTime, no_of_days } = route.params;
  
  const total = cart
    .map((item) => item.quantity * item.price)
    .reduce((curr, prev) => curr + prev, 0);

  const userUid=auth.currentUser.uid

    const placeOrder=async()=>{
      navigation.navigate("Order")
      dispatch(cleanCart())
      await setDoc(doc(db,"users",`${userUid}`),{
        orders:{...cart},
        pickupDetails:route.params
      },{
        merge:true
      })
      
    }
  return (
    <>
      <ScrollView style={{ marginTop: 40 }}>
        {total === 0 ? (
          <View style={styles.emptycartContainer}>
            <Text style={styles.emptycartText}>Your cart is empty</Text>
          </View>
        ) : (
          <>
            <View style={styles.viewContainer}>
              <Ionicons
                onPress={() => navigation.goBack()}
                name="arrow-back"
                size={24}
                color="black"
              />
              <Text>Your bucket</Text>
            </View>

            <Pressable style={styles.detailContainer}>
              {cart.map((item, index) => (
                <View key={index} style={styles.detailInnerContainer}>
                  <Text style={{ width: 100, fontSize: 16, fontWeight: "500" }}>
                    {item.name}
                  </Text>
                  <Pressable style={styles.buttonContainer}>
                    <Pressable
                      onPress={() => {
                        dispatch(decreamentQuantity(item)); // cart
                        dispatch(decreamentQty(item)); // product
                      }}
                    >
                      <Text style={styles.minusText}>-</Text>
                    </Pressable>

                    <Pressable>
                      <Text style={styles.quantityText}>{item.quantity}</Text>
                    </Pressable>

                    <Pressable
                      onPress={() => {
                        dispatch(increamentQuantity(item)); // cart
                        dispatch(increamentQty(item)); //product
                      }}
                    >
                      <Text style={styles.plusText}>+</Text>
                    </Pressable>
                  </Pressable>

                  <Text style={{ fontSize: 16, fontWeight: "500" }}>
                    ₹{item.price * item.quantity}
                  </Text>
                </View>
              ))}
            </Pressable>

            <View style={styles.billingContainer}>
              <Text style={{ fontSize: 16, fontWeight: "bold", marginTop: 30 }}>
                Billing Details
              </Text>
              <View style={styles.innerBillingContainer}>
                <View style={styles.container1}>
                  <Text
                    style={{ fontSize: 17, fontWeight: "400", color: "gray" }}
                  >
                    Item Total
                  </Text>
                  <Text style={{ fontSize: 17, fontWeight: "500" }}>
                    ₹{total}
                  </Text>
                </View>

                <View style={styles.container2}>
                  <Text
                    style={{ fontSize: 17, fontWeight: "400", color: "gray" }}
                  >
                    Delivery Fee | 1.2KM
                  </Text>
                  <Text
                    style={{
                      fontSize: 17,
                      fontWeight: "500",
                      color: "#088F8F",
                    }}
                  >
                    FREE
                  </Text>
                </View>

                <View style={styles.container3}>
                  <Text
                    style={{ fontSize: 17, fontWeight: "400", color: "gray" }}
                  >
                    Free Delivery on Your order
                  </Text>
                </View>

                <View style={styles.container4} />

                <View style={styles.container5}>
                  <Text
                    style={{ fontSize: 17, fontWeight: "400", color: "gray" }}
                  >
                    selected Date
                  </Text>
                  <Text
                    style={{
                      fontSize: 17,
                      fontWeight: "500",
                      color: "#088F8F",
                    }}
                  >
                    {/* {route.params.selectedDate} */}
                  </Text>
                </View>

                <View style={styles.container6}>
                  <Text
                    style={{ fontSize: 17, fontWeight: "400", color: "gray" }}
                  >
                    No Of Days
                  </Text>

                  <Text
                    style={{
                      fontSize: 17,
                      fontWeight: "500",
                      color: "#088F8F",
                    }}
                  >
                    {route.params.no_of_days}
                  </Text>
                </View>

                <View style={styles.container7}>
                  <Text
                    style={{ fontSize: 17, fontWeight: "400", color: "gray" }}
                  >
                    selected Pick Up Time
                  </Text>

                  <Text
                    style={{
                      fontSize: 17,
                      fontWeight: "500",
                      color: "#088F8F",
                    }}
                  >
                    {route.params.selectedTime}
                  </Text>
                </View>
                <View style={styles.container8} />

                <View style={styles.container9}>
                  <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                    To Pay
                  </Text>
                  <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                    {total + 95}
                  </Text>
                </View>
              </View>
            </View>
          </>
        )}
      </ScrollView>
      {total === 0 ? null : (
        <Pressable style={styles.bottomContainer}>
          <View>
            <Text style={styles.cartLength}>
              {cart.length} items | ₹{total}
            </Text>
            <Text style={styles.extraText}>Extra Charges Might Apply</Text>
          </View>

          <Pressable onPress={placeOrder}>
            <Text style={styles.pickuptext}>Place Order</Text>
          </Pressable>
        </Pressable>
      )}
    </>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  emptycartContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  emptycartText: {
    marginTop: 40,
  },
  viewContainer: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  detailContainer: {
    backgroundColor: "white",
    borderRadius: 12,
    marginLeft: 10,
    marginRight: 10,
    padding: 14,
  },
  buttonContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: "center",
    borderColor: "#BEBEBE",
    borderWidth: 0.5,
    borderRadius: 10,
  },
  minusText: {
    fontSize: 20,
    color: "#088F8F",
    paddingHorizontal: 6,
    fontWeight: "600",
  },
  quantityText: {
    fontSize: 19,
    color: "#088F8F",
    paddingHorizontal: 8,
    fontWeight: "600",
  },
  plusText: {
    fontSize: 20,
    color: "#088F8F",
    paddingHorizontal: 6,
    fontWeight: "600",
  },
  detailInnerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 12,
  },
  billingContainer: {
    marginHorizontal: 10,
  },
  innerBillingContainer: {
    backgroundColor: "white",
    borderRadius: 7,
    padding: 10,
    marginTop: 15,
  },
  container1: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  container2: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 8,
  },
  container3: {
    flexDirection: "row",
    alignItems: "center",
  },
  container4: {
    borderColor: "gray",
    height: 1,
    borderWidth: 0.5,
    marginTop: 10,
  },
  container5: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  container6: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  container7: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  container8: {
    borderColor: "gray",
    height: 1,
    borderWidth: 0.5,
    marginTop: 10,
  },
  container9: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 8,
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
