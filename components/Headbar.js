import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Headbar() {
  return (
    <View style={styles.headbar}>
      <Text style={styles.tasks}>Tasks</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headbar: {
    paddingTop: 40,
    paddingRight: 0,
    paddingBottom: 15,
    paddingLeft: 25,
    backgroundColor: "#7c7cfc",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.48,
    shadowRadius: 11.95,
    elevation: 18,
  },
  tasks: {
    color: "white",
    fontSize: 28,
  },
});
