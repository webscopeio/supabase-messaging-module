import { Database } from "@/modules/types"
import { createClient } from "@/modules/utils/server"

export type Room = Database["public"]["Tables"]["rooms"]["Row"]
export type Message = Database["public"]["Tables"]["messages"]["Row"]

type ServerError = {
  error: { message: string }
}

export async function createRoom({
  name,
}: {
  name: string
}): Promise<ServerError | void> {
  const supabase = createClient()
  const { error } = await supabase.from("rooms").insert({
    name,
  })
  if (error) return { error: { message: error.message } }
}

export async function getRooms(): Promise<Room[]> {
  const supabase = createClient()
  const { data, error } = await supabase.from("rooms").select("*")

  if (error) throw new Error(error.message)

  return data
}

export async function getMessages({
  roomId,
}: {
  roomId: number
}): Promise<Message[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .eq("room_id", roomId)

  if (error) throw new Error(error.message)

  return data
}
