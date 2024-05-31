import { useCallback, useEffect, useState } from "react"

import { createClient } from "@/modules/utils/client"

import { Room } from ".."

type UseRoomsProps = {
  rooms: Room[]
  onCreate?: VoidFunction
}

type CreateRoom = ({
  name,
  userIds,
}: {
  name: string
  userIds: Array<string>
}) => void

type InviteToRoom = ({
  roomId,
  userIds,
}: {
  roomId: number
  userIds: Array<string>
}) => void

type UseRoomsReturnType = {
  rooms: Room[]
  createRoom: CreateRoom
  inviteToRoom: InviteToRoom
}

const client = createClient()

export const useRooms = ({
  rooms: roomsInitial,
  onCreate,
}: UseRoomsProps): UseRoomsReturnType => {
  const [rooms, setRooms] = useState(roomsInitial)

  useEffect(() => {
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

  const createRoom = useCallback<CreateRoom>(
    async ({ name, userIds }) => {
      try {
        const room = await client
          .from("rooms")
          .insert({
            name,
          })
          .select()

        // TODO: Fix the -1
        const roomId = room.data?.at(0)?.id ?? -1

        await client.from("room_participants").insert(
          userIds.map((user_id) => ({
            user_id,
            room_id: roomId,
          }))
        )

        onCreate?.()
      } catch (e) {
        console.log(e)
      }
    },
    [onCreate]
  )

  const inviteToRoom = useCallback<InviteToRoom>(({ roomId, userIds }) => {
    void client.from("room_participants").insert(
      userIds.map((user_id) => ({
        user_id,
        room_id: roomId,
      }))
    )
  }, [])

  return {
    rooms,
    createRoom,
    inviteToRoom,
  }
}
