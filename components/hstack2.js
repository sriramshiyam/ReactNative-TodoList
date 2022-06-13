import React from 'react';
import {Box, HStack, Text} from 'native-base';
import {StyleSheet, Dimensions, Pressable} from 'react-native';
import {useDispatch} from 'react-redux';
import {check} from './data';

export default function Hstack2(props) {
  const dispatch = useDispatch();

  const checkc = () => {
    dispatch(check(props.text));
  };

  return (
    <HStack space={5} alignItems="center">
      <Pressable onPress={checkc} onLongPress={() => props.edit(props.text)}>
        <Box
          p={5}
          backgroundColor={props.color}
          borderRadius={10}
          width={Dimensions.get('screen').width / 2.3}
          height={Dimensions.get('screen').width / 2.3}>
          <Text style={styles.text} lineHeight="md">
            {props.text}
          </Text>
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
