import { createClient } from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";

const client = createClient({
  publicApiKey: "pk_dev_PGyW01x6PXtpMUvNchNnlm8gadXCYUwuRtj5lKoMw0Qf-YNbh0j8_aaue-LeFoW4",
});

export const { RoomProvider, useOthers, useMyPresence, useMap, useHistory } =
  createRoomContext(client);