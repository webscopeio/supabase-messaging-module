import { useEffect, useState } from "react"
import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"

import { cn } from "@/lib/utils"
import MessageAuthor from "@/app/messaging/components/MessageAuthor"

export default function Message({
  newMessages,
  id,
  user_id,
  content,
}: {
  newMessages: number[]
  id: number
  user_id: string
  content: string
}) {
  const [isFaded, setFaded] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      setFaded(true)
    }, 1000)
  }, [])

  return (
    <div
      className={cn("duration-3000 my-8 rounded-sm transition-colors", {
        "bg-orange-200": newMessages.includes(id) && !isFaded,
        "bg-transparent": isFaded,
      })}
      key={id}
    >
      <MessageAuthor user_id={user_id} />
      <div className="prose ml-11">
        <Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown>
      </div>
    </div>
  )
}
