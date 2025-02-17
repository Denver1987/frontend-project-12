import { Container, Row, Col } from "react-bootstrap"
import { NewChannelButton } from "./buttons/NewChannelButton";
import { NewChannelModal } from "./modals/NewChannelModal";
import { MessageInputForm } from "./MessageInputForm";
import { MessageBox } from "./MessageBox";
import { ChannelBox } from "./channelBox";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const BuildChatWindow = () => {
  const {t} = useTranslation();
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const currentChannelName = useSelector((state) => state.channels.channels)
    .reduce((previous, channel) => {
      console.log(channel.id, currentChannelId)
      if (channel.id == currentChannelId) return previous + channel.name;
      else return previous;
    }, '');
  const messageCount = useSelector((state) => state.messages.messages)
    .reduce((previous, message) => {
      if (message.channelId === currentChannelId) return previous + 1;
      else return previous;
    }, 0);

  return <Container className="h-100 my-4 overflow-hidden rounded shadow">
    <Row className="h-100">
      <Col className="col-3 h-100 flex-column d-flex">
        <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
          <b>{t('channels')}</b>
          <NewChannelButton />
        </div>
        <ChannelBox />
      </Col>
      <div className="col h-100">
        <div className="d-flex flex-column h-100">
          <div className="bg-light mb-4 p-3 shadow-sm small">
            <p className="m-0"><b># {currentChannelName}</b></p>
            <span className="text-muted">{t('messages', {count: messageCount})}</span>
          </div>
          <MessageBox />
          <div className="mt-auto">
            <MessageInputForm />
          </div>
        </div>
      </div>
    </Row>
    <NewChannelModal></NewChannelModal>
  </Container>

}

export const ChatWindow = () => BuildChatWindow();
