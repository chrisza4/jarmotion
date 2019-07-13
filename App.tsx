import React, { useState } from "react"
import { StyleSheet, Text, View, Button } from "react-native"

export default function App() {
  const [count, setCount] = useState(0)
  return (
    <View style={styles.container}>
      <Text>Hello Jarmotion {count}</Text>
      <Button title="Add Count" onPress={() => setCount(count + 1)} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
})
