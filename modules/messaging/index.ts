import { Database } from "@/modules/types"
import { createClient } from "@/modules/utils/server"

export type Room = Database["public"]["Tables"]["rooms"]["Row"]
export type Message = Database["public"]["Tables"]["messages"]["Row"]
export type User = Database["public"]["Tables"]["profiles"]["Row"]

export async function getRooms(): Promise<Room[]> {
  const supabase = createClient()
  const { data, error } = await supabase.from("rooms").select("*")

  if (error) throw new Error(error.message)

  return data
}

export async function getAllUsers() {
  const supabase = createClient()
  const { data, error } = await supabase.from("profiles").select("*")

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
    .order("created_at", { ascending: false })
    .limit(20)

  if (error) throw new Error(error.message)

  return data
}
