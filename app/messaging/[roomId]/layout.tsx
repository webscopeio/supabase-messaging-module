import React from "react"

import { getAllUsers, getRooms } from "@/modules/messaging"

import "next/navigation"

import AppLayout from "@/app/messaging/components/AppLayout"
import { SidePanel } from "@/app/messaging/components/SidePanel"

export default async function Layout({
  children,
  params: { roomId: activeRoomId },
}: {
  children: React.ReactNode
  params: {
    roomId: string
  }
}) {
  const users = await getAllUsers()
  const rooms = await getRooms()

  const sidePanel = (
    <SidePanel rooms={rooms} users={users} activeRoomId={activeRoomId} />
  )

  return <AppLayout sidePanel={sidePanel}>{children}</AppLayout>
}
