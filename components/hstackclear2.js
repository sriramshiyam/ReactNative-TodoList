import React from 'react';
import {Box, Center, HStack, Text} from 'native-base';
import {StyleSheet, Dimensions, Pressable} from 'react-native';
import LottieView from 'lottie-react-native';
import {useDispatch} from 'react-redux';
import {deleteData, uncheck} from './data';

export default function Hstackclear2(props) {
  const dispatch = useDispatch();

  const uncheckc = () => {
    dispatch(uncheck(props.text));
  };

  const longPress = () => {
    dispatch(deleteData(props.text));
  };

  return (
    <HStack space={5} alignItems="center">
      <Pressable onPress={uncheckc} onLongPress={longPress}>
        <Box
          p={5}
          backgroundColor={props.color}
          borderRadius={10}
          width={Dimensions.get('screen').width / 2.3}
          height={Dimensions.get('screen').width / 2.3}>
          <Text style={styles.text} lineHeight="md">
            {props.text}
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
      <Box
        width={Dimensions.get('screen').width / 2.3}
        height={Dimensions.get('screen').width / 2.3}></Box>
    </HStack>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 17,
    color: '#ffffff',
  },
});
