import { useEffect, useState } from "react"

import { createClient } from "@/modules/utils/client"
import { Message } from "@/modules/messaging"

export const useMessages = ({
  messages: messagesInitial,
}: {
  messages: Message[]
}) => {
  const [messages, setMessages] = useState(messagesInitial)

  useEffect(() => {
    const client = createClient()

    const changes = client
      .channel("schema-db-changes")
      .on<Message>(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "messages",
        },
        (payload) => {
          if (payload.eventType === "INSERT") {
            setMessages((messages) => [...messages, payload.new])
          }

          if (payload.eventType === "DELETE") {
            setMessages((messages) =>
              messages.filter(({ id }) => id !== payload.old.id)
            )
          }

          if (payload.eventType === "UPDATE") {
            setMessages((messages) =>
              messages.map((message) => {
                if (message.id === payload.new.id) {
                  return payload.new
                }

                return message
              })
            )
          }
        }
      )
      .subscribe()

    return () => void changes.unsubscribe()
  }, [messages, setMessages])

  return {
    messages,
  }
}
