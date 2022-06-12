import {VStack, ScrollView, Text} from 'native-base';
import React, {useEffect, useState} from 'react';
import {Dimensions, Pressable, StatusBar, BackHandler} from 'react-native';
import {useSelector} from 'react-redux';
import AddButton from './add';
import ClearedTasks from './clearedTasks';
import Hstack1 from './hstack1';
import Hstack2 from './hstack2';
import InputBox from './inputbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {initialize} from './data';
import {useDispatch} from 'react-redux';

const TodoList = () => {
  const dispatch = useDispatch();
  const data = useSelector(state => state.data.value);
  const [showDialog, setShowDialog] = useState(false);
  const [tasks, setTasks] = useState([]);

  function sd() {
    setShowDialog(false);
  }

  useEffect(async () => {
    let a = await AsyncStorage.getItem('data');
    console.log(a);
    let y = {
      d: [],
      c: [],
    };
    a = a !== null ? JSON.parse(a) : y;
    dispatch(initialize(a));
  }, []);

  useEffect(() => {
    setTimeout(async () => {
      await AsyncStorage.setItem('data', JSON.stringify(data));
    }, 200);
  });

  const colors = [
    'info.500', //#0ea5e9
    'pink.500', //#ec4899
    'red.600', //#dc2626
    'blue.700', //#1d4ed8
    'fuchsia.600', //#c026d3
    'orange.500', //#f97316
    'red.600', //#dc2626
    'violet.600', //#7c3aed
    'cyan.600', //#0891b2
    'yellow.500', //#eab308
    'cyan.500', //#06b6d4
    'indigo.500', //#6366f1
    'amber.700', //#b45309
    'darkBlue.500', //#0077e6
    'rose.600', //#e11d48
    'lightBlue.600', //#0284c7
    'purple.600', //#9333ea
    'orange.600', //#ea580c
    'red.500', //#ef4444
  ];

  useEffect(() => {
    let mounted = true;
    let collections = [];
    let twoData = [];
    let num = 0;
    let t = [];

    if (data.d.length > 0) {
      for (const d of data.d) {
        twoData.push(d);
        num++;
        if (num === 2) {
          collections.push(twoData);
          twoData = [];
          num = 0;
        } else if (num === 1) {
          if (data.d.indexOf(d) + 1 === data.d.length) {
            collections.push(twoData);
          }
        }
      }

      for (const c of collections) {
        if (c.length === 2) {
          if (mounted) {
            t.push(
              <Hstack1
                key={c[0]}
                text1={c[0]}
                text2={c[1]}
                color1={colors[Math.floor(Math.random() * colors.length)]}
                color2={colors[Math.floor(Math.random() * colors.length)]}
              />,
            );
          }
        } else {
          if (mounted) {
            t.push(
              <Hstack2
                key={c[0]}
                text={c[0]}
                color={colors[Math.floor(Math.random() * colors.length)]}
              />,
            );
          }
        }
      }
      setTasks(t);
    } else {
      setTasks([]);
    }

    return () => {
      collections = [];
      twoData = [];
      num = 0;
      t = [];
      mounted = false;
    };
  }, [data.d]);

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="rgba(0, 0, 0, 0)"
        translucent
      />
      <ScrollView
        height={Dimensions.get('screen').height}
        showsVerticalScrollIndicator={false}>
        <Text
          pt={10}
          display={data.d.length > 0 ? 'flex' : 'none'}
          textAlign="center"
          fontSize={30}>
          Tasks
        </Text>
        <VStack py={0} safeArea={true} space={5} alignItems="center" px={7}>
          {tasks}
          <Pressable onPress={() => setShowDialog(true)}>
            <AddButton />
          </Pressable>
          <InputBox show={showDialog} sd={sd} />
        </VStack>
        <ClearedTasks />
      </ScrollView>
    </>
  );
};

export default TodoList;
