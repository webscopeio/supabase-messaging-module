import AppLayout from "@/app/messaging/components/AppLayout"
import { SidePanel } from "@/app/messaging/components/SidePanel"

import { getAllUsers, getRooms } from "@/modules/messaging"

export default async function Page() {
  const users = await getAllUsers()
  const rooms = await getRooms()

  const sidePanel = <SidePanel rooms={rooms} users={users} />

  return (
    <AppLayout sidePanel={sidePanel}>
      <h1 className="py-16 text-center text-3xl">Welcome</h1>
    </AppLayout>
  )
}
