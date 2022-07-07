import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Pressable,
  StyleSheet,
  TextInput,
  useColorScheme,
  ToastAndroid,
} from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useDispatch, useSelector } from "react-redux";
import { check, delet, editData, uncheck } from "./data";

const SCREENWIDTH = Dimensions.get("window").width;

const Task = ({ text, scaleChange }) => {
  const colorScheme = useColorScheme();
  const dispatch = useDispatch();
  const [canEdit, setCanEdit] = useState(false);
  const [t, setT] = useState("");
  const translateX = useSharedValue(0);
  const TRANSLATEXTHRESHOLD = -SCREENWIDTH * 0.34;
  const CONTAINERHEIGHT = useSharedValue(70);
  const CONTAINERPADDING = useSharedValue(15);
  const CONTAINEMARGINBOTTOM = useSharedValue(10);
  const OPACITY = useSharedValue(1);
  const tOPACITY = useSharedValue(1);
  const tX = useSharedValue(0);
  const data = useSelector((state) => state.data.value);

  useEffect(() => {
    setT(text);
  }, []);

  const gestureMethod = useAnimatedGestureHandler({
    onStart: (event, ctx) => {},
    onActive: (event, ctx) => {
      translateX.value = event.translationX > 0 ? 0 : event.translationX;
    },
    onEnd: (event, ctx) => {
      const isDismissed = translateX.value < TRANSLATEXTHRESHOLD;
      if (isDismissed && text[0] === "`") {
        translateX.value = withSpring(-SCREENWIDTH);
        CONTAINERHEIGHT.value = withTiming(0);
        CONTAINERPADDING.value = withTiming(0);
        CONTAINEMARGINBOTTOM.value = withTiming(0);
        OPACITY.value = withTiming(0);
      } else {
        translateX.value = withTiming(0);
      }
    },
  });

  useEffect(() => {
    if (text[0] === "`") {
      tOPACITY.value = withSpring(0.3);
      tX.value = withTiming(20);
      setTimeout(() => (tX.value = withTiming(0)), 100);
    }
  }, []);

  useEffect(() => {
    if (CONTAINERHEIGHT.value === 0) {
      dispatch(delet(t));
    }
  }, [CONTAINERHEIGHT.value]);

  const boxStyle = useAnimatedStyle(() => {
    return {
      height: CONTAINERHEIGHT.value,
      opacity: OPACITY.value,
      padding: CONTAINERPADDING.value,
      marginBottom: CONTAINEMARGINBOTTOM.value,
    };
  });

  const innerBoxStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
      height: CONTAINERHEIGHT.value,
      opacity: OPACITY.value,
      padding: CONTAINERPADDING.value,
    };
  });

  const tStyle = useAnimatedStyle(() => {
    return {
      opacity: tOPACITY.value,
      transform: [{ translateX: tX.value }],
    };
  });

  return (
    <Pressable
      onPress={() =>
        setCanEdit((prev) => {
          if (text[0] !== "`") {
            scaleChange();
            return !prev;
          }
        })
      }
    >
      <PanGestureHandler onGestureEvent={gestureMethod}>
        <Animated.View style={[boxStyle, styles.box]}>
          {t[0] === "`" ? (
            <MaterialCommunityIcons
              name="delete"
              size={30}
              color="white"
              style={{ marginRight: 15 }}
            />
          ) : (
            <MaterialCommunityIcons
              name="delete-off"
              size={30}
              color="white"
              style={{ marginRight: 15 }}
            />
          )}
          <Animated.View
            style={[
              innerBoxStyle,
              styles.innerBox,
              { backgroundColor: colorScheme === "light" ? "#fff" : "#404040" },
            ]}
          >
            <BouncyCheckbox
              isChecked={text[0] === "`"}
              size={35}
              fillColor="#7c7cfc"
              unfillColor="#FFFFFF"
              iconStyle={{ borderColor: "#7c7cfc", borderRadius: 15 }}
              onPress={(isChecked) => {
                function chec() {
                  tOPACITY.value = withSpring(0.3);
                  tX.value = withTiming(30);
                  setTimeout(() => (tX.value = withTiming(0)), 100);
                  dispatch(check(t));
                }

                function unchec() {
                  tOPACITY.value = withSpring(1);
                  dispatch(uncheck(t));
                }
                isChecked ? chec() : unchec();
              }}
            />
            {canEdit ? (
              <TextInput
                onChangeText={(e) => {
                  setT(e);
                }}
                value={t}
                style={{
                  fontSize: 15,
                  color: colorScheme === "light" ? "#000" : "#fff",
                }}
                autoFocus
                onBlur={() => {
                  scaleChange();
                  if (t.length === 0) {
                    ToastAndroid.show(
                      "Empty tasks are not allowed",
                      ToastAndroid.SHORT
                    );
                    setT(text);
                  } else if (
                    data.d.some((n) => n === "`" + t) ||
                    data.d.some((n) => n === t)
                  ) {
                    if (t === text) {
                    } else {
                      ToastAndroid.show("Enter a new task", ToastAndroid.SHORT);
                    }
                    setT(text);
                  } else {
                    dispatch(editData({ old: text, new: t }));
                  }
                  setCanEdit((prev) => !prev);
                }}
              />
            ) : (
              <Animated.Text
                style={[
                  {
                    fontSize: 15,
                    color: colorScheme === "light" ? "#000" : "#fff",
                  },
                  tStyle,
                ]}
              >
                {t[0] === "`" ? t.substring(1) : t}
              </Animated.Text>
            )}
          </Animated.View>
        </Animated.View>
      </PanGestureHandler>
    </Pressable>
  );
};

export { Task };

const styles = StyleSheet.create({
  box: {
    width: SCREENWIDTH,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "red",
    padding: 15,
    paddingRight: 0,
  },
  innerBox: {
    width: SCREENWIDTH,
    backgroundColor: "white",
    position: "absolute",
    left: 0,
    top: 0,
    padding: 15,
    paddingLeft: 25,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
});
