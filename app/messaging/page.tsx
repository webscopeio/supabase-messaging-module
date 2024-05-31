import { getRooms } from "@/modules/messaging"

export default async function Page() {
  const rooms = await getRooms()

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
