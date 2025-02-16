import { useEffect, useRef, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setOnAddChannel, createChannel } from '../../store/slices/channels';
import { getAuthToken } from '../../utils/login';
import * as yup from "yup";
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';

const BuildNewChannelModal = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const inputRef = useRef();

  const [show, setShow] = useState(false);
  const isOnAddChannel = useSelector((state) => state.channels.isOnAddChannel);
  const isOnSending = useSelector((state) => state.channels.onSending);

  useEffect(() => {
    if (isOnAddChannel) {
      setShow(true);
      //inputRef.current.focus();
    }
    if (!isOnAddChannel) setShow(false);
  }, [isOnAddChannel]);

  const existingChannels = useSelector((state) => state.channels.channels).map((channel) => channel.name);

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: yup.object().shape({
      name: yup
      .string()
      .min(3, t('3-20symb'))
      .max(20, t('3-20symb'))
      .required(t('required'))
      .notOneOf(existingChannels, t('channelexist'))
    }),
    onSubmit: (values, { setSubmitting }) => {
      dispatch(createChannel({newChannelName: values.name, authToken: getAuthToken()}));
      setSubmitting(false);
      console.log(formik.isSubmitting)
    }
  });

  return <>
    <Modal show={show} onHide={() => dispatch(setOnAddChannel(false))}>
      <Modal.Header closeButton>
        <Modal.Title>{t('createChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>{t('channelName')}</Form.Label>
            <Form.Control
              ref={inputRef}
              onChange={formik.handleChange}
              name="name"
              values={formik.values.name}
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
        <Button variant="secondary" disabled={isOnSending} onClick={() => dispatch(setOnAddChannel(false))}>
        {t('cancel')}
        </Button>
        <Button variant="primary" disabled={isOnSending} onClick={formik.handleSubmit}>
        {t('create')}
        </Button>
      </Modal.Footer>
    </Modal>
  </>


}

export const NewChannelModal = (props) => BuildNewChannelModal(props);
