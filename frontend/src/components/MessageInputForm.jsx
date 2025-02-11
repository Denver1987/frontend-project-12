import { useState } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "../store/slices/messages";
import { getAuthToken, getCurrentUser } from "../utils/login";

const BuildMessageInputForm = () => {
  const currentChannel = useSelector((state) => {state.channel.currentChannel});
  const [messageText, setMessageText] = useState('');
  const dispatch = useDispatch();
  const newMessage = { body: messageText, channelId: currentChannel, username: getCurrentUser() }

  return (<>
    <Form>
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Новое сообщение"
          onChange={(event) => {setMessageText(event.target.value)}}
        />
        <Button variant="outline-secondary" id="button-addon2" onClick={() => {dispatch(sendMessage({newMessage, authToken: getAuthToken()}))}}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
            <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"></path>
          </svg>
        </Button>
      </InputGroup>
    </Form>
  </>);
}

export const MessageInputForm = () => BuildMessageInputForm();
