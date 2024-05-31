import { useEffect, useState } from "react"

import { createClient } from "@/modules/utils/client"

import { Room } from ".."

type UseRoomsProps = {
  rooms: Room[]
}

type UseRoomsReturnType = {
  rooms: Room[]
}

export const useRooms = ({
  rooms: roomsInitial,
}: UseRoomsProps): UseRoomsReturnType => {
  const [rooms, setRooms] = useState(roomsInitial)

  useEffect(() => {
    const client = createClient()

    const changes = client
      .channel("schema-db-changes")
      .on<Room>(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "rooms",
        },
        (payload) => {
          if (payload.eventType === "INSERT") {
            setRooms((rooms) => [...rooms, payload.new])
          }

          if (payload.eventType === "DELETE") {
            setRooms((rooms) => rooms.filter(({ id }) => id !== payload.old.id))
          }

          if (payload.eventType === "UPDATE") {
            setRooms((rooms) =>
              rooms.map((room) => {
                if (room.id === payload.new.id) {
                  return payload.new
                }

                return room
              })
            )
          }
        }
      )
      .subscribe()

    return () => void changes.unsubscribe()
  }, [rooms, setRooms])

  return {
    rooms,
  }
}
