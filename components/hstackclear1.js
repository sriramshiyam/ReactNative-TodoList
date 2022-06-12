import {Box, Center, HStack, Text} from 'native-base';
import React from 'react';
import {Dimensions, Pressable, StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';
import {useDispatch} from 'react-redux';
import {uncheck, deleteData} from './data';

export default function Hstackclear1(props) {
  const dispatch = useDispatch();

  const uncheckc1 = () => {
    dispatch(uncheck(props.text1));
  };

  const uncheckc2 = () => {
    dispatch(uncheck(props.text2));
  };

  const longPress1 = () => {
    dispatch(deleteData(props.text1));
  };

  const longPress2 = () => {
    dispatch(deleteData(props.text2));
  };

  return (
    <HStack space={5} alignItems="center">
      {/* First Box */}
      <Pressable onPress={uncheckc1} onLongPress={longPress1}>
        <Box
          p={5}
          backgroundColor={props.color1}
          borderRadius={10}
          width={Dimensions.get('screen').width / 2.3}
          height={Dimensions.get('screen').width / 2.3}>
          <Text style={styles.text} lineHeight="md">
            {props.text1}
          </Text>
          <Center
            position="absolute"
            width={Dimensions.get('screen').width / 2.3}
            height={Dimensions.get('screen').width / 2.3}>
            <Box>
              <LottieView
                autoPlay={true}
                resizeMode="cover"
                loop={true}
                speed={1.2}
                style={{
                  height: Dimensions.get('screen').width / 4.3,
                  width: Dimensions.get('screen').width / 4.3,
                }}
                source={require('./lottie-animation/tick.json')}
              />
            </Box>
          </Center>
        </Box>
      </Pressable>
      {/* Second Box */}
      <Pressable onPress={uncheckc2} onLongPress={longPress2}>
        <Box
          p={5}
          backgroundColor={props.color2}
          borderRadius={10}
          width={Dimensions.get('screen').width / 2.3}
          height={Dimensions.get('screen').width / 2.3}>
          <Text style={styles.text} lineHeight="md">
            {props.text2}
          </Text>
          <Center
            position="absolute"
            width={Dimensions.get('screen').width / 2.3}
            height={Dimensions.get('screen').width / 2.3}>
            <Box>
              <LottieView
                autoPlay={true}
                resizeMode="cover"
                loop={true}
                speed={1.2}
                style={{
                  height: Dimensions.get('screen').width / 4.3,
                  width: Dimensions.get('screen').width / 4.3,
                }}
                source={require('./lottie-animation/tick.json')}
              />
            </Box>
          </Center>
        </Box>
      </Pressable>
    </HStack>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 17,
    color: '#ffffff',
  },
});
