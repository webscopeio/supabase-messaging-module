"use client"

import { useQuery } from "@tanstack/react-query"

import { Skeleton } from "@/components/ui/skeleton"
import { AvatarPlaceholder } from "@/components/avatar-placeholder"

import useUsers from "@/modules/messaging/hooks/useUsers"

export default function MessageAuthor({ user_id }: { user_id: string }) {
  const { getUserById } = useUsers()

  const query = useQuery({
    queryKey: ["user", user_id],
    queryFn: () => getUserById({ id: user_id }),
  })

  return (
    <div className="mb-2 flex items-center gap-2">
      {query.data ? (
        <>
          <AvatarPlaceholder preferredHue={query.data.preferred_hue || "123"} />
          <h3 className="font-bold">{query.data.email || user_id}</h3>
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
