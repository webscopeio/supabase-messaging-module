import { createClient } from "@/modules/utils/client"

const client = createClient()

export default function useUsers() {
  const getUserById = async ({ id }: { id: string }) => {
    const { data, error } = await client
      .from("profiles")
      .select("*")
      .eq("id", id)

    if (error) throw new Error(error.message)

    return data[0]
  }

  return { getUserById }
}
