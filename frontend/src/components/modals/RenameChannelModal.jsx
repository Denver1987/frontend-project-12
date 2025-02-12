import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { setOnRenameChannel, renameChannel } from '../../store/slices/channels';
import { getAuthToken } from '../../utils/login';

const BuildRenameChannelModal = () => {
  const [show, setShow] = useState(false);
  const isOnRenameChannel = useSelector((state) => state.channels.isOnRenameChannel);
  const renamingChannel = useSelector((state) => state.channels.renamingChannel);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isOnRenameChannel) setShow(true);
    if (!isOnRenameChannel) setShow(false);
  }, [isOnRenameChannel]);

  const [newChannelName, setNewChannelName] = useState('');

  return <>
    <Modal show={show} onHide={() => dispatch(setOnRenameChannel(false, null))}>
      <Modal.Header closeButton>
        <Modal.Title>Переименование канала</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Новое название канала</Form.Label>
            <Form.Control
              onChange={(event) => {setNewChannelName(event.target.value)}}
              type="text"
              placeholder="Введите название..."
              autoFocus
            />
          </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => dispatch(setOnRenameChannel(false))}>
          Отмена
        </Button>
        <Button variant="primary" onClick={() => {dispatch(renameChannel({newChannelName, channelId: renamingChannel, authToken: getAuthToken()}))}}>
          Переименовать
        </Button>
      </Modal.Footer>
    </Modal>
  </>
}

export const RenameChannelModal = (props) => BuildRenameChannelModal(props);
