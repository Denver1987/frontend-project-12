import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { setOnAddChannel, addChannel } from '../../store/slices/channels';
import { getAuthToken } from '../../utils/login';

const BuildNewChannelModal = () => {
  const [show, setShow] = useState(false);
  const isOnAddChannel = useSelector((state) => state.channels.isOnAddChannel);
  console.log(isOnAddChannel);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isOnAddChannel) setShow(true);
    if (!isOnAddChannel) setShow(false);
  }, [isOnAddChannel]);

  console.log(show);

  const [newChannelName, setNewChannelName] = useState('');

  return <>
    <Modal show={show} onHide={() => dispatch(setOnAddChannel(false))}>
      <Modal.Header closeButton>
        <Modal.Title>Создание нового канала</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Название нового канала</Form.Label>
            <Form.Control
              onChange={(event) => {setNewChannelName(event.target.value)}}
              type="text"
              placeholder="Введите название..."
              autoFocus
            />
          </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => dispatch(setOnAddChannel(false))}>
          Отмена
        </Button>
        <Button variant="primary" onClick={() => {dispatch(addChannel({newChannelName, authToken: getAuthToken()}))}}>
          Создать
        </Button>
      </Modal.Footer>
    </Modal>
  </>


}

export const NewChannelModal = (props) => BuildNewChannelModal(props);
