import { useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  StatusBar,
  ScrollView,
  Pressable,
  TextInput,
  Dimensions,
  Text,
  ToastAndroid,
  useColorScheme,
} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Task } from "./Task";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import Headbar from "./Headbar";
import { useDispatch, useSelector } from "react-redux";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { addData, initialize } from "./data";

const SCREENWIDTH = Dimensions.get("window").width;

export default function Tasks() {
  const colorScheme = useColorScheme();
  const [text, setText] = useState("");
  const [canAdd, setCanAdd] = useState(false);
  const [tasks, setTasks] = useState(false);
  const dispatch = useDispatch();
  const INPUTHEIGHT = useSharedValue(0);
  const INPUTPADDING = useSharedValue(0);
  const SCALE = useSharedValue(1);
  const data = useSelector((state) => state.data.value);

  const inputStyle = useAnimatedStyle(() => {
    return {
      height: INPUTHEIGHT.value,
      padding: INPUTPADDING.value,
    };
  });

  const fetchData = useCallback(async () => {
    let a = await AsyncStorage.getItem("tasks");
    let y = {
      d: [],
    };
    a = a !== null ? JSON.parse(a) : y;
    dispatch(initialize(a));
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setTimeout(async () => {
      await AsyncStorage.setItem("tasks", JSON.stringify(data));
    }, 200);
  });

  const addButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: SCALE.value }],
    };
  });

  const scaleChange = () => {
    SCALE.value = SCALE.value === 1 ? withTiming(0) : withTiming(1);
  };

  const rend = () => {
    let d = data.d;
    let t = [];
    for (const data of d) {
      t.push(<Task key={data} text={data} scaleChange={scaleChange}></Task>);
    }
    setTasks(t);
    return () => {
      t = [];
    };
  };

  useEffect(() => {
    rend();
  }, [data.d]);

  return (
    <>
      <Headbar />
      <StatusBar
        translucent
        barStyle={"light-content"}
        backgroundColor="rgba(256,256,256, 0)"
      />
      <GestureHandlerRootView
        style={[
          styles.container,
          { backgroundColor: colorScheme === "light" ? "#fff" : "#404040" },
        ]}
      >
        <ScrollView>
          <Animated.View
            style={[
              styles.input,
              inputStyle,
              { backgroundColor: colorScheme === "light" ? "#fff" : "#404040" },
            ]}
          >
            {canAdd ? (
              <BouncyCheckbox
                isChecked={false}
                size={35}
                fillColor="#7c7cfc"
                unfillColor="#FFFFFF"
                iconStyle={{ borderColor: "#7c7cfc", borderRadius: 15 }}
              />
            ) : (
              <Text></Text>
            )}
            {canAdd ? (
              <TextInput
                key={"add"}
                onChangeText={(text) => setText(text)}
                value={text}
                style={{
                  fontSize: 15,
                  color: colorScheme === "light" ? "#000" : "#fff",
                }}
                autoFocus
                onFocus={() => {
                  INPUTHEIGHT.value = withTiming(70);
                  INPUTPADDING.value = withTiming(15);
                }}
              />
            ) : (
              <Text></Text>
            )}
          </Animated.View>
          {tasks}
        </ScrollView>
      </GestureHandlerRootView>
      <Animated.View style={[styles.add, addButtonStyle]}>
        <Pressable
          onPress={() =>
            setCanAdd((prev) => {
              if (prev) {
                INPUTHEIGHT.value = withTiming(0);
                INPUTPADDING.value = withTiming(0);
                if (text.length === 0) {
                  ToastAndroid.show(
                    "Empty tasks are not allowed",
                    ToastAndroid.SHORT
                  );
                } else if (data.d.includes(text)) {
                  setText("");
                  ToastAndroid.show("Enter a new task", ToastAndroid.SHORT);
                } else {
                  dispatch(addData(text));
                  setText("");
                  return !prev;
                }
              } else if (data.d.length === 8) {
                ToastAndroid.show(
                  "Eight tasks are maximum",
                  ToastAndroid.SHORT
                );
              } else {
                return !prev;
              }
            })
          }
        >
          {canAdd ? (
            <AntDesign name="check" size={30} color="#fff" />
          ) : (
            <Ionicons name="add" size={30} color="#fff" />
          )}
        </Pressable>
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  add: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 25,
    bottom: 25,
    height: 60,
    width: 60,
    backgroundColor: "#7c7cfc",
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: {
    width: SCREENWIDTH,
    height: 100,
    backgroundColor: "white",
    padding: 15,
    paddingLeft: 25,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 10,
  },
});
