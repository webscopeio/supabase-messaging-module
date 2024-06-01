"use client"

import MessageAuthor from "@/app/messaging/components/MessageAuthor"

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
        {messages.map(
          ({
            id,
            content,
            user_id,
          }: {
            id: number
            content: string
            user_id: string
          }) => (
            <div className="my-8" key={id}>
              <MessageAuthor user_id={user_id} />
              <div className="ml-11">{content}</div>
            </div>
          )
        )}
      </ul>
    </div>
  )
}
