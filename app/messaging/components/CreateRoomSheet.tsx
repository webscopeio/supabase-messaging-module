"use client"

import * as React from "react"
import { useState } from "react"
import { Check, ChevronsUpDown, CirclePlus, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import { Room, User } from "@/modules/messaging"
import { useRooms } from "@/modules/messaging/hooks/useRooms"

export default function CreateRoomSheet({
  users,
  rooms,
}: {
  users: User[]
  rooms: Room[]
}) {
  const [open, setOpen] = React.useState(false)
  const [value] = React.useState("")
  const [selectedUsers, setSelectedUsers] = useState<User[]>([])
  const [roomName, setRoomName] = useState("")

  const usersToAdd = users.filter((user) => {
    return (
      selectedUsers.find((selectedUser) => selectedUser.id === user.id) ===
      undefined
    )
  })

  const { createRoom } = useRooms({ rooms })

  return (
    <Sheet
      onOpenChange={(open) => {
        if (!open) {
          setRoomName("")
          setSelectedUsers([])
        }
      }}
    >
      <SheetTrigger>
        <CirclePlus className="rounded" />
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Create a room</SheetTitle>
          <SheetDescription>
            Create a new room to start a conversation with your team.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-6 items-center gap-4">
            <Label htmlFor="name" className="col-span-2 text-right">
              Room name
            </Label>
            <Input
              id="name"
              value={roomName}
              onChange={(event) => setRoomName(event.target.value)}
              className="col-span-4"
            />
          </div>
          <div className="grid grid-cols-6 items-center gap-4">
            <Label htmlFor="username" className="col-span-2 text-right">
              Users
            </Label>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="col-span-4 justify-between"
                  disabled={usersToAdd.length === 0}
                >
                  {value
                    ? users.find((user) => user.id === value)?.email
                    : usersToAdd.length === 0
                      ? "All users selected"
                      : "Add users..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-max p-0">
                <Command>
                  <CommandInput placeholder="Add users..." />
                  <CommandEmpty>No user found.</CommandEmpty>
                  <CommandGroup>
                    {usersToAdd.map((user) => (
                      <CommandItem
                        key={user.id}
                        value={user.email}
                        onSelect={(currentValue) => {
                          setSelectedUsers((prev) => [
                            ...prev,
                            users.find((user) => user.email === currentValue)!,
                          ])
                          setOpen(false)
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            value === user.id ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {user.email}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
          <ul className="grid-cols-6 p-2 pl-28">
            {selectedUsers.map(({ id, email }) => (
              <li key={id} className="flex items-center justify-between px-2">
                {email}
                <button
                  onClick={() => {
                    setSelectedUsers((prev) =>
                      prev.filter((user) => user.id !== id)
                    )
                  }}
                >
                  <X />
                </button>
              </li>
            ))}
          </ul>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button
              type="submit"
              onClick={() => {
                createRoom({
                  name: roomName,
                  userIds: selectedUsers.map((user) => user.id),
                })
                setOpen(false)
              }}
            >
              Create
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
