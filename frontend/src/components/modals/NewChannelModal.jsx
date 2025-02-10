import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { setOnAddChannel, addChannel } from '../../store/slices/channels';

const BuildNewChannelModal = () => {
  const [show, setShow] = useState(false);
  const isOnAddChannel = useSelector((state) => state.channels.isOnAddChannel);
  console.log(isOnAddChannel);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isOnAddChannel) setShow(true);
    if (!isOnAddChannel) setShow(false);
  }, [isOnAddChannel]);

  console.log(show);

  return <>
    <Modal show={show} onHide={() => dispatch(setOnAddChannel(false))}>
      <Modal.Header closeButton>
        <Modal.Title>Создание нового канала</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="name@example.com"
              autoFocus
            />
          </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => dispatch(setOnAddChannel(false))}>
          Close
        </Button>
        <Button variant="primary" onClick={() => {}}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  </>


}

export const NewChannelModal = (props) => BuildNewChannelModal(props);
