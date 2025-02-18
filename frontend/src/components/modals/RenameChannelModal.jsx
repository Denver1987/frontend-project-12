import { useEffect, useRef, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { setOnRenameChannel, renameChannel } from '../../store/slices/channels';
import { getAuthToken } from '../../utils/login';
import * as yup from "yup";
import { useTranslation } from 'react-i18next';
import badWordsFilter from '../../utils/badWordsFilter';

const BuildRenameChannelModal = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  //const inputRef = useRef();

  const existingChannels = useSelector((state) => state.channels.channels).map((channel) => channel.name);

  const isOnRenameChannel = useSelector((state) => state.channels.isOnRenameChannel);
  const renamingChannelId = useSelector((state) => state.channels.renamingChannel);
  const renamingChannelName = useSelector((state) => state.channels.channels)
    .reduce((previous, channel) => {
      if (channel.id == renamingChannelId) return previous + channel.name;
      else return previous;
    }, '');

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
      .notOneOf(existingChannels, t('channelExist'))
    }),
    onSubmit: (values) => {
      dispatch(renameChannel({newChannelName: badWordsFilter(values.name), channelId: renamingChannelId, authToken: getAuthToken()}))
    }
  });

  const [show, setShow] = useState(false);

  const isOnSending = useSelector((state) => state.channels.onSending);

  useEffect(() => {
    if (isOnRenameChannel) {
      setShow(true);
      formik.values.name = renamingChannelName;
      formik.setErrors({});
    }
    if (!isOnRenameChannel) setShow(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOnRenameChannel]);

  return <>
    <Modal show={show} onHide={() => dispatch(setOnRenameChannel(false, null))} autoFocus={false}>
      <Modal.Header closeButton>
        <Modal.Title>{t('renamingChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>{t('channelName')}</Form.Label>
          <Form.Control
            id="name"
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
            type="text"
            autoFocus
            onFocus={(event) => {event.target.select()}}
            isInvalid={formik.touched.name && formik.errors.name}
            onKeyDown={(event) => {event.key === 'Enter' ? formik.handleSubmit() : null}}
          />
          {/* <label className="visually-hidden" htmlFor="name">{t('channelName')}</label> */}
          <Form.Control.Feedback type="invalid" tooltip>
            {formik.errors.name}
          </Form.Control.Feedback>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => dispatch(setOnRenameChannel(false))} disabled={isOnSending}>
          {t('cancel')}
        </Button>
        <Button variant="primary" onClick={formik.handleSubmit} disabled={isOnSending}>
          {t('rename')}
        </Button>
      </Modal.Footer>
    </Modal>
  </>
}

export const RenameChannelModal = (props) => BuildRenameChannelModal(props);
