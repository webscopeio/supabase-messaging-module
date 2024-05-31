"use client"

import { Message } from "@/modules/messaging"
import { useMessages } from "@/modules/messaging/hooks/useMessages"

export const MessagesList: React.FC<{ messages: Message[] }> = ({
  messages: messagesInitial,
}) => {
  const { messages } = useMessages({ messages: messagesInitial })

  return (
    <div>
      <ul>
        {messages.map(({ id, content }: { id: number; content: string }) => (
          <li key={id}>{content}</li>
        ))}
      </ul>
    </div>
  )
}
