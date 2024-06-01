"use client"

import { forwardRef, KeyboardEventHandler, useRef } from "react"
import { MDXEditorMethods, MDXEditorProps } from "@mdxeditor/editor"

import "@mdxeditor/editor/style.css"

import dynamic from "next/dynamic"
import { Send } from "lucide-react"

import { Button } from "@/components/ui/button"

import { Message } from "@/modules/messaging"
import { useMessages } from "@/modules/messaging/hooks/useMessages"

const Editor = dynamic(() => import("../components/InitializedMDXEditor"), {
  // Make sure we turn SSR off
  ssr: false,
})

// This is what is imported by other components. Pre-initialized with plugins, and ready
// to accept other props, including a ref.
const ForwardRefEditor = forwardRef<MDXEditorMethods, MDXEditorProps>(
  (props, ref) => <Editor {...props} editorRef={ref} />
)

// TS complains without the following line
ForwardRefEditor.displayName = "ForwardRefEditor"

export function CreateMessage({
  roomId,
  messages,
}: {
  roomId: number
  messages: Message[]
}) {
  const { createMessage } = useMessages({ roomId, messages })
  const rteRef = useRef<MDXEditorMethods>(null)

  const handleKeyDown: KeyboardEventHandler = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      if (!rteRef.current) return
      createMessage(rteRef.current.getMarkdown())
      rteRef.current.setMarkdown("")
    }
    // If Shift + Enter is pressed, let the default action proceed (e.g., new line)
  }

  return (
    <>
      <div className="min-h-40" onKeyDown={handleKeyDown}>
        <ForwardRefEditor markdown="" ref={rteRef} />
      </div>
      <Button
        className="w-full"
        onClick={() => {
          if (!rteRef.current) return
          console.log(rteRef.current.getMarkdown())
          createMessage(rteRef.current.getMarkdown())
          rteRef.current.setMarkdown("")
        }}
      >
        Send message <Send className="ml-2 w-4" />
      </Button>
    </>
  )
}
