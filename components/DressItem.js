import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decreamentQuantity,
  increamentQuantity,
} from "../redux/CartReducer";
import { decreamentQty, increamentQty } from "../redux/ProductReducer";

const DressItem = ({ item }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  

  const addItemToCart = () => {
    dispatch(addToCart(item));
    dispatch(increamentQty(item));
  };
  return (
    <View>
      <Pressable style={styles.container}>
        <View>
          <Image style={styles.image} source={{ uri: item.image }} />
        </View>
        <View>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.price}>₹{item.price}</Text>
        </View>

        {cart.some((c) => c.id === item.id) ? (
          <Pressable style={styles.buttonContainer}>
            <Pressable
              onPress={() => {
                dispatch(decreamentQuantity(item)); // cart
                dispatch(decreamentQty(item)); // product
              }}
              style={styles.minusContainer}
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
              style={styles.plusContainer}
            >
              <Text style={styles.plusText}>+</Text>
            </Pressable>
          </Pressable>
        ) : (
          <Pressable onPress={addItemToCart} style={styles.addButton}>
            <Text style={styles.addButtonText}>ADD</Text>
          </Pressable>
        )}
      </Pressable>
    </View>
  );
};

export default DressItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F8F8F8",
    borderRadius: 7,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 14,
  },
  image: {
    width: 70,
    height: 70,
  },
  addButton: {
    width: 80,
  },
  addButtonText: {
    borderColor: "gray",
    borderWidth: 0.8,
    marginVertical: 10,
    color: "#088F8F",
    textAlign: "center",
    padding: 4,
    borderRadius: 6,
    fontSize: 17,
    fontWeight: "bold",
  },
  name: {
    width: 83,
    fontSize: 17,
    fontWeight: "500",
    marginBottom: 7,
  },
  price: {
    width: 60,
    color: "gray",
    fontSize: 15,
  },
  buttonContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  minusContainer: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderColor: "#BEBEBE",
    backgroundColor: "#E0E0E0",
    justifyContent: "center",
    alignContent: "center",
  },
  minusText: {
    fontSize: 20,
    color: "#088F8F",
    paddingHorizontal: 6,
    fontWeight: "600",
    textAlign: "center",
  },
  quantityText: {
    fontSize: 19,
    color: "#088F8F",
    paddingHorizontal: 8,
    fontWeight: "600",
  },
  plusContainer: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderColor: "#BEBEBE",
    backgroundColor: "#E0E0E0",
    justifyContent: "center",
    alignContent: "center",
  },
  plusText: {
    fontSize: 20,
    color: "#088F8F",
    paddingHorizontal: 6,
    fontWeight: "600",
    textAlign: "center",
  },
});
