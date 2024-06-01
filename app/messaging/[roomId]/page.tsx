import { CreateMessage } from "@/app/messaging/components/CreateMessage"
import { MessagesList } from "@/app/messaging/components/MessagesList"

import { getMessages, getRoom, getRooms } from "@/modules/messaging"

export default async function Page({ params }: { params: { roomId: string } }) {
  const roomId = parseInt(params.roomId)
  const messages = await getMessages({ roomId })
  const room = await getRoom({ id: roomId })
  return (
    <div className="min-h-page">
      <h1 className="mb-8 text-2xl font-bold">{room.name}</h1>
      <MessagesList roomId={roomId} messages={messages} />

      <CreateMessage messages={messages} roomId={roomId} />
    </div>
  )
}
