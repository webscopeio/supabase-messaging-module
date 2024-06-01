import { useState } from "react"

import { Skeleton } from "@/components/ui/skeleton"
import { AvatarPlaceholder } from "@/components/avatar-placeholder"

import { User } from "@/modules/messaging"
import useUsers from "@/modules/messaging/hooks/useUsers"

export default function MessageAuthor({ user_id }: { user_id: string }) {
  const [user, setUser] = useState<User>()

  const { getUserById } = useUsers()
  getUserById({ id: user_id }).then((user) => {
    setUser(user)
  })

  return (
    <div className="mb-2 flex items-center gap-2">
      {user ? (
        <>
          <AvatarPlaceholder preferredHue={user?.preferred_hue || "123"} />
          <h3 className="font-bold">{user?.email || user_id}</h3>
        </>
      ) : (
        <>
          <Skeleton className="size-9 rounded-full" />
          <Skeleton className="h-5 w-40 rounded-lg" />
        </>
      )}
    </div>
  )
}
