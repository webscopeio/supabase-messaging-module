import React from "react"

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

export default function AppLayout({
  sidePanel,
  children,
}: {
  sidePanel: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <ResizablePanelGroup className="min-h-screen" direction="horizontal">
      <ResizablePanel
        className="py-4 pr-6"
        defaultSize={20}
        minSize={8}
        maxSize={40}
      >
        {sidePanel}
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={80} className="px-6">
        <div className="w-full">{children}</div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
