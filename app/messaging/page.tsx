import { getRooms } from "@/modules/messaging"

import { RoomsList } from "./components/RoomsList"

export default async function Page() {
  const rooms = await getRooms()

  return <RoomsList rooms={rooms} />
}
