import { useState, useEffect, useRef } from "react"
import ChatWindow from "./components/ChatWindow"
import ChatInput from "./components/ChatInput"

const SYSTEM_PROMPT = "You are a helpful, friendly, and concise AI assistant. Always respond clearly and professionally."

function App() {
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("chat-messages")
    return saved ? JSON.parse(saved) : []
  })
  const [isLoading, setIsLoading] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    localStorage.setItem("chat-messages", JSON.stringify(messages))
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSend = async () => {
    const input = document.getElementById("chat-input")
    const userMessage = input.value.trim()
    if (!userMessage) return

    const timestamp = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    const newMessages = [...messages, { role: "user", content: userMessage, timestamp }]
    setMessages(newMessages)
    input.value = ""
    setIsLoading(true)

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "YOUR_API_KEY_HERE",
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 1000,
          system: SYSTEM_PROMPT,
          messages: newMessages.map(({ role, content }) => ({ role, content })),
        }),
      })

      const data = await response.json()
      const assistantMessage = data.content[0].text
      const assistantTimestamp = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })

      setMessages([
        ...newMessages,
        { role: "assistant", content: assistantMessage, timestamp: assistantTimestamp },
      ])
    } catch (error) {
      setMessages([
        ...newMessages,
        { role: "assistant", content: "Something went wrong. Please try again.", timestamp: "" },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleClear = () => {
    setMessages([])
    localStorage.removeItem("chat-messages")
  }

  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto border border-gray-200 shadow-lg">
      <div className="p-4 border-b border-gray-200 bg-blue-500 flex items-center justify-between">
        <h1 className="text-white font-semibold text-lg">AI Chat</h1>
        <button
          onClick={handleClear}
          className="text-white text-sm opacity-75 hover:opacity-100 transition-opacity"
        >
          Clear chat
        </button>
      </div>
      <ChatWindow messages={messages} isLoading={isLoading} bottomRef={bottomRef} />
      <ChatInput onSend={handleSend} isLoading={isLoading} />
    </div>
  )
}

export default App