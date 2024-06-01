"use client"

import { useEffect, useRef, useState } from "react"

import { Button } from "@/components/ui/button"

import { Message } from "@/modules/messaging"
import { useMessages } from "@/modules/messaging/hooks/useMessages"

import MessagePanel from "./Message"

export const MessagesList: React.FC<{
  roomId: number
  messages: Message[]
}> = ({ roomId, messages: messagesInitial }) => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const { messages, fetchMore } = useMessages({
    roomId,
    messages: messagesInitial,
    onMessageCreate: (message) => {
      setNewMessages((newMessages) => [...newMessages, message.id])
    },
  })
  const [newMessages, setNewMessages] = useState<number[]>([])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight + 200
    }
  }, [messages.at(-1)?.id])

  return (
    <div
      ref={scrollRef}
      className="scroll h-[calc(100vh_-_24rem)] flex-grow overflow-y-scroll"
    >
      <div className="text-center">
        <Button variant="outline" onClick={() => fetchMore(1)}>
          Fetch More...
        </Button>
      </div>
      <div>
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
            <MessagePanel
              key={id}
              newMessages={newMessages}
              id={id}
              user_id={user_id}
              content={content}
            />
          )
        )}
      </div>
    </div>
  )
}
