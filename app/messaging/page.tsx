import { getAllUsers, getRooms } from "@/modules/messaging"

import { RoomsList } from "./components/RoomsList"

export default async function Page() {
  const rooms = await getRooms()
  const users = await getAllUsers()

  return (
    <>
      <RoomsList rooms={rooms} />
      <ul className="mt-8">
        <li>Users</li>
        {users.map(({ id, username }) => (
          <li key={id}>{username}</li>
        ))}
      </ul>
    </>
  )
}
