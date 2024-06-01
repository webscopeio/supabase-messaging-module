"use client"

import { useCallback, useEffect, useState } from "react"

import { createClient } from "@/modules/utils/client"
import { Message } from "@/modules/messaging"

const client = createClient()

export const useMessages = ({
  roomId,
  messages: messagesInitial,
}: {
  roomId: number
  messages: Message[]
}) => {
  const [messages, setMessages] = useState(messagesInitial)

  useEffect(() => {
    const randomId = Math.random().toString(36).substring(7)
    const changes = client
      .channel(`db-messages-changes-${randomId}`)
      .on<Message>(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "messages",
          filter: `room_id=eq.${roomId}`,
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

  const fetchMore = useCallback(
    (limit: number = 10) => {
      client
        .from("messages")
        .select()
        .eq("room_id", roomId)
        .lt("created_at", [messages[0].created_at])
        .order("created_at", { ascending: false })
        .limit(limit)
        .then(({ data: messagesOlder }) => {
          console.log(messagesOlder)

          setMessages((messages) => [...messagesOlder, ...messages])
        })
    },
    [messages, setMessages, roomId]
  )

  const createMessage = useCallback(
    (message: string) => {
      client
        .from("messages")
        .insert({
          content: message,
          room_id: roomId,
        })
        .then(({ data }) => {
          console.log(data)
        })
    },
    [roomId]
  )

  return {
    messages,
    fetchMore,
    createMessage,
  }
}
