import { useDispatch, useSelector } from "react-redux";
import { Button, ButtonGroup, Dropdown } from "react-bootstrap";
import { setCurrentChannel, setOnRemoveChannel, setOnRenameChannel, resetSuccess } from "../store/slices/channels.js";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { ToastContainer, toast } from 'react-toastify';


const BuildChannelBox = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const channels = useSelector((state) => state.channels.channels);
  const currentChannel = useSelector((state) => state.channels.currentChannelId);
  const isChannelCreated = useSelector((state) => state.channels.isCreateSuccess);
  const isChannelRenamed = useSelector((state) => state.channels.isRenameSuccess);
  const isChannelRemoved = useSelector((state) => state.channels.isRemoveSuccess);
  const showToast = (text) => {toast.success(() => <div>{text}</div>) };

  const channelBoxRef = useRef();

  useEffect(() => {
    if (channelBoxRef.current) {
      channelBoxRef.current.scrollTo({
        top: channelBoxRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
    if (isChannelCreated) showToast(t('channelCreated'));
    if (isChannelRenamed) showToast(t('channelRenamed'));
    if (isChannelRemoved) showToast(t('channelRemoved'));
    dispatch(resetSuccess());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [channels, isChannelCreated, isChannelRenamed, isChannelRemoved]);

  return <><ul id="channels-box" ref={channelBoxRef} className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
  {channels.map((channel) =>
    (<li key={channel.id}>
      <Dropdown as={ButtonGroup} className="w-100 rounded-0 text-start">
        <Button
        variant={currentChannel === channel.id ? "secondary" : "light"}
        className="w-100 rounded-0 text-start text-truncate"
        onClick={() => {dispatch(setCurrentChannel(channel.id))}}>
          # {channel.name}
        </Button>
        {channel.removable ? <>
          <Dropdown.Toggle split variant="light" id="dropdown-split-basic"><span className="visually-hidden">{t('channelControl')}</span></Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item as="button" onClick = {() => {dispatch(setOnRenameChannel({ isOn: true, channelId: channel.id }))}}>{t('rename')}</Dropdown.Item>
            <Dropdown.Item as="button" onClick = {() => {dispatch(setOnRemoveChannel({ isOn: true, channelId: channel.id}))}}>{t('remove')}</Dropdown.Item>
          </Dropdown.Menu>
          </>
          : null}
      </Dropdown>
    </li>)
  )}
  </ul>
  {/* <ToastContainer></ToastContainer> */}
  </>
}

export const ChannelBox = () => BuildChannelBox();

