"use client"

import React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"

import { Room } from "@/modules/messaging"
import { useRooms } from "@/modules/messaging/hooks/useRooms"

export const RoomsList: React.FC<{ rooms: Room[]; activeRoomId?: number }> = ({
  rooms: roomsInitial,
  activeRoomId,
}) => {
  const { rooms } = useRooms({ rooms: roomsInitial })

  return (
    <ul>
      {rooms.map(({ id, name }: { id: number; name: string }) => (
        <li key={id}>
          <Link
            href={`/messaging/${id}`}
            className={cn("block rounded px-2 py-0.5 hover:bg-slate-600", {
              "font-bold": id === activeRoomId,
            })}
          >
            {name}
          </Link>
        </li>
      ))}
    </ul>
  )
}
