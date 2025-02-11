import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { setCurrentChannel } from "../store/slices/channels";

const BuildChannelBox = () => {
  const dispatch = useDispatch();
  const channels = useSelector((state) => state.channels.channels);
  const currentChannel = useSelector((state) => state.channels.currentChannelId);
  console.log(channels, currentChannel);
  return channels.map((channel) =>
    (<li key={channel.id}>
      <Button
        variant={currentChannel === channel.id ? "secondary" : "light"}
        className="w-100 rounded-0 text-start"
        onClick={() => {dispatch(setCurrentChannel(channel.id))}}>
        # {channel.name}
      </Button>
    </li>)
  )
}

export const ChannelBox = () => BuildChannelBox();

