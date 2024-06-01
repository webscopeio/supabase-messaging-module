import { CreateMessage } from "@/app/messaging/components/CreateMessage"
import { MessagesList } from "@/app/messaging/components/MessagesList"

import { getMessages } from "@/modules/messaging"

export default async function Page({ params }: { params: { roomId: string } }) {
  const roomId = parseInt(params.roomId)
  const messages = await getMessages({ roomId })

  return (
    <div className="min-h-page">
      <h1>Room ID: {params.roomId}</h1>
      <MessagesList roomId={roomId} messages={messages} />

      <CreateMessage messages={messages} roomId={roomId} />
    </div>
  )
}
