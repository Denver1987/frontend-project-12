import { Modal, Button } from "react-bootstrap";
import { useDispatch, useSelector} from "react-redux";
import { useEffect, useState } from "react";
import { removeChannel, setOnRemoveChannel } from "../../store/slices/channels";
import { getAuthToken } from "../../utils/login";
import { useTranslation } from "react-i18next";

export const BuildRemoveChannelModal = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);

  const isOnRemoveChannel = useSelector((state) => state.channels.isOnRemoveChannel);
  const removingChannel = useSelector((state) => state.channels.removingChannel);
  const isOnSending = useSelector((state) => state.channels.onSending);

  useEffect(() => {
    if (isOnRemoveChannel) setShow(true);
    if (!isOnRemoveChannel) setShow(false);
  }, [isOnRemoveChannel]);

  return <>
    <Modal show={show} onHide={() => dispatch(setOnRemoveChannel(false, null))}>
      <Modal.Header closeButton>
        <Modal.Title>{t('removingChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{t('sure')}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" disabled={isOnSending} onClick={() => dispatch(setOnRemoveChannel(false, null))}>
        {t('cancel')}
        </Button>
        <Button variant="danger" disabled={isOnSending} onClick={() => {dispatch(removeChannel({removeChannelId: removingChannel, authToken: getAuthToken()}))}}>
        {t('remove')}
        </Button>
      </Modal.Footer>
    </Modal>
  </>
}

export const RemoveChannelModal = () => BuildRemoveChannelModal();
