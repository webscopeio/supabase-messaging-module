import React from "react"
import Link from "next/link"

import { Separator } from "@/components/ui/separator"
import { RoomsList } from "@/app/messaging/components/RoomsList"

import { Room, User } from "@/modules/messaging"

export function SidePanel({
  rooms,
  users,
  activeRoomId,
}: {
  rooms: Room[]
  users: User[]
  activeRoomId?: string
}) {
  return (
    <>
      <div className="min-w-4">
        <Link href="/messaging">
          <h1 className="py-2 font-extrabold">Webscope.io messaging</h1>
        </Link>
        <Separator className="my-4" />
        <h2 className="mb-4">Rooms</h2>
        <RoomsList
          rooms={rooms}
          activeRoomId={activeRoomId ? parseInt(activeRoomId) : undefined}
        />
        <Separator className="my-4" />
        <h2 className="mb-4">Users</h2>
        <ul>
          {users.map(({ id, email }) => (
            <li key={id} className="px-2">
              {email}
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
