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
          event: "INSERT", // Listen only to INSERTs
          schema: "public",
          table: "rooms",
        },
        (payload) => {
          const room: Room = payload.new
          setRooms((rooms) => [...rooms, room])
        }
      )
      .subscribe()

    return () => changes.unsubscribe()
  }, [rooms, setRooms])

  return {
    rooms,
  }
}
