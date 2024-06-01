import { CreateMessage } from "@/app/messaging/components/CreateMessage"
import { MessagesList } from "@/app/messaging/components/MessagesList"

import { getMessages, getRoom } from "@/modules/messaging"

export default async function Page({ params }: { params: { roomId: string } }) {
  const roomId = parseInt(params.roomId)
  const messages = await getMessages({ roomId })

  const room = await getRoom({ id: roomId })
  return (
    <div className="flex min-h-[calc(100vh_-_6rem)] flex-col">
      <h1 className="mb-8 text-2xl font-bold">{room.name}</h1>
      <MessagesList roomId={roomId} messages={messages.reverse()} />

      <CreateMessage messages={messages} roomId={roomId} />
    </div>
  )
}
