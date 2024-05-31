import { useCallback, useEffect, useState } from "react"

import { createClient } from "@/modules/utils/client"
import { Profile } from "@/modules/user/profile"

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

type GetRoomParticipants = ({ roomId }: { roomId: number }) => Promise<
  | {
      id: number
      username: string
    }[]
  | null
>

type UseRoomsReturnType = {
  rooms: Room[]
  createRoom: CreateRoom
  inviteToRoom: InviteToRoom
  getRoomParticipants: GetRoomParticipants
}

const client = createClient()

export const useRooms = ({
  rooms: roomsInitial,
  onCreate,
}: UseRoomsProps): UseRoomsReturnType => {
  const [rooms, setRooms] = useState(roomsInitial)

  useEffect(() => {
    const changes = client
      .channel("db-rooms-changes")
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

  const getRoomParticipants = useCallback<GetRoomParticipants>(
    async ({ roomId }) => {
      const participants = await client
        .from("room_participants")
        .select(
          `
          id,
          profiles ( username )
        `
        )
        .eq("room_id", roomId)

      return participants.data?.map((data) => ({
        id: data.id,
        username: data.profiles.at(0)?.username ?? "",
      }))
    },
    []
  )

  return {
    rooms,
    createRoom,
    inviteToRoom,
    getRoomParticipants,
  }
}
