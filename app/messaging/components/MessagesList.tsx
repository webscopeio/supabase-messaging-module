"use client"

import { Message } from "@/modules/messaging"
import { useMessages } from "@/modules/messaging/hooks/useMessages"

export const MessagesList: React.FC<{
  roomId: number
  messages: Message[]
}> = ({ roomId, messages: messagesInitial }) => {
  const { messages, fetchMore } = useMessages({
    roomId,
    messages: messagesInitial,
  })

  return (
    <div>
      <button onClick={() => fetchMore(1)}>Fetch More</button>
      <ul>
        {messages.map(({ id, content }: { id: number; content: string }) => (
          <li key={id}>{content}</li>
        ))}
      </ul>
    </div>
  )
}
