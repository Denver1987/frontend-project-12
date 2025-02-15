import { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setOnAddChannel, createChannel } from '../../store/slices/channels';
import { getAuthToken } from '../../utils/login';
import * as yup from "yup";
import { useFormik } from 'formik';

const BuildNewChannelModal = () => {

  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const isOnAddChannel = useSelector((state) => state.channels.isOnAddChannel);

  useEffect(() => {
    if (isOnAddChannel) setShow(true);
    if (!isOnAddChannel) setShow(false);
  }, [isOnAddChannel]);

  const existsChannels = useSelector((state) => state.channels.channels).map((channel) => channel.name);

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
      .notOneOf(existsChannels, 'Такой канал уже существует')
    }),
    onSubmit: (values) => {
      dispatch(createChannel({newChannelName: values.name, authToken: getAuthToken()}))
    }
  });

  return <>
    <Modal show={show} onHide={() => dispatch(setOnAddChannel(false))}>
      <Modal.Header closeButton>
        <Modal.Title>Создание нового канала</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Название нового канала</Form.Label>
            <Form.Control
              onChange={formik.handleChange}
              name="name"
              values={formik.values.name}
              type="text"
              placeholder="Введите название..."
              autoFocus
              isInvalid={formik.touched.name && formik.errors.name}
            />
            <Form.Control.Feedback type="invalid" tooltip>
              {formik.errors.name}
            </Form.Control.Feedback>
          </Form.Group>


      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => dispatch(setOnAddChannel(false))}>
          Отмена
        </Button>
        <Button variant="primary" onClick={formik.handleSubmit}>
          Создать
        </Button>
      </Modal.Footer>
    </Modal>
  </>


}

export const NewChannelModal = (props) => BuildNewChannelModal(props);
