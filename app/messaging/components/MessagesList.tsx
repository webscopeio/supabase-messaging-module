"use client"

import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"

import { Button } from "@/components/ui/button"
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
    <div className="scroll max-h-[calc(100vh_-_24rem)] flex-grow overflow-y-scroll">
      <div className="text-center">
        <Button variant="outline" onClick={() => fetchMore(1)}>
          Fetch More...
        </Button>
      </div>
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
              <div className="prose ml-11">
                <Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown>
              </div>
            </div>
          )
        )}
      </ul>
    </div>
  )
}
