"use client"

import React from "react"

import { Room } from "@/modules/messaging"
import { useRooms } from "@/modules/messaging/hooks/useRooms"

export const PageRooms: React.FC<{ rooms: Room[] }> = ({
  rooms: roomsInitial,
}) => {
  const { rooms } = useRooms({ rooms: roomsInitial })

  return (
    <div>
      <h1 className="mb-4 text-4xl">Messages</h1>
      <ul>
        {rooms.map(({ id, name }: { id: number; name: string }) => (
          <li key={id}>{name}</li>
        ))}
      </ul>
    </div>
  )
}
