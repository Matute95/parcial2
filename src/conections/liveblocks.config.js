import { createClient } from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";

const client = createClient({
  publicApiKey: "pk_dev_BCEM7jjAo-2VC3uSDrHlj50TBkHE6icnFnSXWh8MCogAYrWyKKrzRZ66KQHKmQ-O",
});

export const { RoomProvider, useOthers, useMyPresence, useMap, useHistory } =
  createRoomContext(client);