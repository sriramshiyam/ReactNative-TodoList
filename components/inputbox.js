import {Modal, FormControl, Input, Button} from 'native-base';
import React, {useEffect, useState} from 'react';
import {ToastAndroid} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {addData, editData} from './data';

const InputBox = props => {
  const [showModal, setShowModal] = useState(false);
  const [input, setInput] = useState('');
  const data = useSelector(state => state.data.value);
  const dispatch = useDispatch();

  useEffect(() => {
    setShowModal(props.show);
  }, [props.show]);

  return (
    <>
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          props.sd();
        }}>
        <Modal.Content maxWidth="400px">
          <Modal.Header>
            {props.canedit ? 'Edit Task' : 'New Task'}
          </Modal.Header>
          <Modal.Body>
            <FormControl>
              <Input
                value={input}
                placeholder="Type here ..."
                onChangeText={text => setInput(text)}
              />
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  setShowModal(false);
                  setInput('');
                  props.sd();
                  props.edited();
                }}>
                Cancel
              </Button>
              <Button
                onPress={() => {
                  if (input.length > 0) {
                    if (data.d.includes(input) || data.c.includes(input)) {
                      ToastAndroid.show(
                        'Please enter a new task',
                        ToastAndroid.SHORT,
                      );
                      setInput('');
                    } else if (props.canedit) {
                      dispatch(editData({old: props.old, new: input}));
                      setTimeout(() => {
                        setInput('');
                        setShowModal(false);
                        props.edited();
                      }, 200);
                    } else {
                      dispatch(addData(input));
                      setTimeout(() => {
                        setInput('');
                        setShowModal(false);
                        props.sd();
                      }, 200);
                    }
                  } else {
                    ToastAndroid.show(
                      'Please enter a task',
                      ToastAndroid.SHORT,
                    );
                  }
                }}>
                Save
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default InputBox;
