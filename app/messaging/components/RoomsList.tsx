"use client"

import React from "react"
import Link from "next/link"

import { Room } from "@/modules/messaging"
import { useRooms } from "@/modules/messaging/hooks/useRooms"

export const RoomsList: React.FC<{ rooms: Room[] }> = ({
  rooms: roomsInitial,
}) => {
  const { rooms } = useRooms({ rooms: roomsInitial })

  return (
    <div>
      <ul>
        {rooms.map(({ id, name }: { id: number; name: string }) => (
          <li key={id}>
            <Link href={`/messaging/${id}`}>{name}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
