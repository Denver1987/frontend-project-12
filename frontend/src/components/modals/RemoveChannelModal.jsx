import { Modal, Button } from "react-bootstrap";
import { useDispatch, useSelector} from "react-redux";
import { useEffect, useState } from "react";
import { removeChannel, setOnRemoveChannel } from "../../store/slices/channels";
import { getAuthToken } from "../../utils/login";

export const BuildRemoveChannelModal = () => {
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);

  const isOnRemoveChannel = useSelector((state) => state.channels.isOnRemoveChannel);
  const removingChannel = useSelector((state) => state.channels.removingChannel);

  useEffect(() => {
    if (isOnRemoveChannel) setShow(true);
    if (!isOnRemoveChannel) setShow(false);
  }, [isOnRemoveChannel]);

  return <>
    <Modal show={show} onHide={() => dispatch(setOnRemoveChannel(false, null))}>
      <Modal.Header closeButton>
        <Modal.Title>Удаление канала</Modal.Title>
      </Modal.Header>
      <Modal.Body>Уверены?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => dispatch(setOnRemoveChannel(false, null))}>
          Отмена
        </Button>
        <Button variant="danger" onClick={() => {dispatch(removeChannel({removeChannelId: removingChannel, authToken: getAuthToken()}))}}>
          Удалить
        </Button>
      </Modal.Footer>
    </Modal>
  </>
}

export const RemoveChannelModal = () => BuildRemoveChannelModal();
