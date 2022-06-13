import {Modal, FormControl, Input, AlertDialog, Button} from 'native-base';
import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {addData, editData} from './data';

const InputBox = props => {
  const [showModal, setShowModal] = useState(false);
  const [iswarningOpen, setIswarningOpen] = useState(false);
  const [input, setInput] = useState('');
  const inputRef = useRef();
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
          <Modal.Header>New Task</Modal.Header>
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
                  props.sd();
                }}>
                Cancel
              </Button>
              <Button
                onPress={() => {
                  if (data.d.includes(input) || data.c.includes(input)) {
                    setIswarningOpen(true);
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
                }}>
                Save
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      <AlertDialog
        isOpen={iswarningOpen}
        onClose={() => setIswarningOpen(false)}>
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>Duplicate Task!</AlertDialog.Header>
          <AlertDialog.Body>Please enter a new Task.</AlertDialog.Body>
          <AlertDialog.Footer>
            <Button
              colorScheme="blue"
              onPress={() => {
                setInput('');
                setIswarningOpen(false);
              }}>
              Ok
            </Button>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </>
  );
};

export default InputBox;
