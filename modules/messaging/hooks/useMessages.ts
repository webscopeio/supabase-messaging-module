import { Message } from "@/modules/messaging"

export const useMessages = ({ messages }: { messages: Message[] }) => {
  return { messages }
}
