import {Box, HStack, Text} from 'native-base';
import React from 'react';
import {Dimensions, Pressable, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import {check} from './data';

export default function Hstack1(props) {
  const dispatch = useDispatch();

  const check1 = () => {
    dispatch(check(props.text1));
  };

  const check2 = () => {
    dispatch(check(props.text2));
  };

  return (
    <HStack space={5} alignItems="center">
      {/* First Box */}
      <Pressable onPress={check1}>
        <Box
          p={5}
          backgroundColor={props.color1}
          borderRadius={10}
          width={Dimensions.get('screen').width / 2.3}
          height={Dimensions.get('screen').width / 2.3}>
          <Text style={styles.text} lineHeight="md">
            {props.text1}
          </Text>
        </Box>
      </Pressable>
      {/* Second Box */}
      <Pressable onPress={check2}>
        <Box
          p={5}
          backgroundColor={props.color2}
          borderRadius={10}
          width={Dimensions.get('screen').width / 2.3}
          height={Dimensions.get('screen').width / 2.3}>
          {/* Scroll View for Text */}
          <Text style={styles.text} lineHeight="md">
            {props.text2}
          </Text>
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
