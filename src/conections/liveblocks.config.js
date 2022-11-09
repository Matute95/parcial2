import { createClient } from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";

const client = createClient({
  publicApiKey: "pk_dev_D83nIZ3Wed-YyTs9iyqBbHCAoKOX-5MZSdDU17ttpQuk17_IwRWjNvctvBG8oRwa",
});

export const { RoomProvider, useOthers, useMyPresence, useMap, useHistory } =
  createRoomContext(client);