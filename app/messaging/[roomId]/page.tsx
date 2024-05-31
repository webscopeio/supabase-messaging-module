import { MessagesList } from "@/app/messaging/components/MessagesList"

import { getMessages } from "@/modules/messaging"

export default async function Page({ params }: { params: { roomId: string } }) {
  const roomId = parseInt(params.roomId)
  const messages = await getMessages({ roomId })

  return (
    <div>
      <h1>Room ID: {params.roomId}</h1>

      <MessagesList messages={messages} />
    </div>
  )
}
