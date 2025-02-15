import { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { setOnRenameChannel, renameChannel } from '../../store/slices/channels';
import { getAuthToken } from '../../utils/login';
import * as yup from "yup";

const BuildRenameChannelModal = () => {

  const dispatch = useDispatch();

  const existingChannels = useSelector((state) => state.channels.channels).map((channel) => channel.name);

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: yup.object().shape({
      name: yup
      .string()
      .min(3, 'Имя должно содержать от 3 до 20 символов')
      .max(20, 'Имя должно содержать от 3 до 20 символов')
      .required('Это обязательное поле')
      .notOneOf(existingChannels, 'Такой канал уже существует')
    }),
    onSubmit: (values) => {
      dispatch(renameChannel({newChannelName: values.name, channelId: renamingChannel, authToken: getAuthToken()}))
    }
  });

  const [show, setShow] = useState(false);
  const isOnRenameChannel = useSelector((state) => state.channels.isOnRenameChannel);
  const renamingChannel = useSelector((state) => state.channels.renamingChannel);

  useEffect(() => {
    if (isOnRenameChannel) setShow(true);
    if (!isOnRenameChannel) setShow(false);
  }, [isOnRenameChannel]);

  return <>
    <Modal show={show} onHide={() => dispatch(setOnRenameChannel(false, null))}>
      <Modal.Header closeButton>
        <Modal.Title>Переименование канала</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Новое название канала</Form.Label>
          <Form.Control
            name="name"
            onChange={formik.handleChange}
            value= {formik.values.name}
            type="text"
            placeholder="Введите название..."
            autoFocus
            isInvalid={formik.touched.name && formik.errors.name}
            onKeyDown={(event) => {event.key === 'Enter' ? formik.handleSubmit() : null}}
          />
          <Form.Control.Feedback type="invalid" tooltip>
            {formik.errors.name}
          </Form.Control.Feedback>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => dispatch(setOnRenameChannel(false))}>
          Отмена
        </Button>
        <Button variant="primary" onClick={formik.handleSubmit}>
          Переименовать
        </Button>
      </Modal.Footer>
    </Modal>
  </>
}

export const RenameChannelModal = (props) => BuildRenameChannelModal(props);
