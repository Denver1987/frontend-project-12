import { useDispatch, useSelector } from "react-redux";
import { Button, ButtonGroup, Dropdown } from "react-bootstrap";
import { setCurrentChannel, setOnRemoveChannel, setOnRenameChannel } from "../store/slices/channels.js";
import { useEffect, useRef } from "react";

const BuildChannelBox = () => {
  const dispatch = useDispatch();
  const channels = useSelector((state) => state.channels.channels);
  const currentChannel = useSelector((state) => state.channels.currentChannelId);

  const channelBoxRef = useRef();

  useEffect(() => {
    if (channelBoxRef.current) {
      channelBoxRef.current.scrollTo({
        top: channelBoxRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [channels]);

  return <ul id="channels-box" ref={channelBoxRef} className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
  {channels.map((channel) =>
    (<li key={channel.id}>
      <Dropdown as={ButtonGroup} className="w-100 rounded-0 text-start">
        <Button
        variant={currentChannel === channel.id ? "secondary" : "light"}
        className="w-100 rounded-0 text-start"
        onClick={() => {dispatch(setCurrentChannel(channel.id))}}>
          # {channel.name}
        </Button>
        {channel.removable ? <>
          <Dropdown.Toggle split variant="light" id="dropdown-split-basic" />
          <Dropdown.Menu>
            <Dropdown.Item as="button" onClick = {() => {dispatch(setOnRenameChannel({ isOn: true, channelId: channel.id }))}}>Переименовать</Dropdown.Item>
            <Dropdown.Item as="button" onClick = {() => {dispatch(setOnRemoveChannel({ isOn: true, channelId: channel.id}))}}>Удалить</Dropdown.Item>
          </Dropdown.Menu>
          </>
          : null}
      </Dropdown>
    </li>)
  )}
  </ul>
}

export const ChannelBox = () => BuildChannelBox();

