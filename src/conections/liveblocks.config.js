import { createClient } from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";

const client = createClient({
  publicApiKey: "pk_dev_Oq2__RBnX9_mHsTOvF75KJdF",
});

export const { RoomProvider, useOthers, useMyPresence, useMap } =
  createRoomContext(client);