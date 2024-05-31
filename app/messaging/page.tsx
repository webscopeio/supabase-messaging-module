import { getRooms } from "@/modules/messaging"

import { PageRooms } from "./rooms"

export default async function Page() {
  const rooms = await getRooms()

  return <PageRooms rooms={rooms} />
}
