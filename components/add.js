import React from 'react';
import LottieView from 'lottie-react-native';
import {Box, Center, HStack, Text} from 'native-base';
import {Dimensions} from 'react-native';

const AddButton = props => {
  return (
    <HStack space={5} pt={5} alignItems="center">
      <Box
        width={Dimensions.get('screen').width / 3.3}
        height={Dimensions.get('screen').width / 3.3}>
        <Center>
          <LottieView
            style={{
              width: Dimensions.get('screen').width / 3.5,
              height: Dimensions.get('screen').width / 3.5,
            }}
            source={require('./lottie-animation/add.json')}
            autoPlay
          />
          <Text pt={1} fontSize={15}>
            Add Task
          </Text>
        </Center>
      </Box>
    </HStack>
  );
};

export default AddButton;
