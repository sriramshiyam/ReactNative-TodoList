import {Text, VStack} from 'native-base';
import React, {useEffect, useState} from 'react';
import {Appearance} from 'react-native';
import {useSelector} from 'react-redux';
import Hstackclear1 from './hstackclear1';
import Hstackclear2 from './hstackclear2';

const ClearedTasks = () => {
  const data = useSelector(state => state.data.value);
  const [clearedtasks, setClearedtasks] = useState([]);

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

    if (data.c.length > 0) {
      for (const c of data.c) {
        twoData.push(c);
        num++;
        if (num === 2) {
          collections.push(twoData);
          twoData = [];
          num = 0;
        } else if (num === 1) {
          if (data.c.indexOf(c) + 1 === data.c.length) {
            collections.push(twoData);
          }
        }
      }

      for (const c of collections) {
        if (c.length === 2) {
          if (mounted) {
            t.push(
              <Hstackclear1
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
              <Hstackclear2
                key={c[0]}
                text={c[0]}
                color={colors[Math.floor(Math.random() * colors.length)]}
              />,
            );
          }
        }
      }
      setClearedtasks(t);
    } else {
      setClearedtasks([]);
    }

    return () => {
      collections = [];
      twoData = [];
      num = 0;
      t = [];
      mounted = false;
    };
  }, [data.c]);

  return (
    <>
      <Text
        pt={2.5}
        color={Appearance.getColorScheme() === 'dark' ? 'white' : 'dark'}
        display={data.c.length > 0 ? 'flex' : 'none'}
        textAlign="center"
        fontSize={30}>
        Completed Tasks
      </Text>
      <VStack
        pt={2}
        pb={8}
        safeArea={true}
        space={5}
        alignItems="center"
        px={7}>
        {clearedtasks}
      </VStack>
    </>
  );
};

export default ClearedTasks;
