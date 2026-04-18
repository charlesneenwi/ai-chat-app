import { useState, useEffect, useRef } from "react"
import.meta.env.VITE_GEMINI_API_KEY
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
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: SYSTEM_PROMPT }]
          },
          contents: newMessages.map(({ role, content }) => ({
            role: role === "assistant" ? "model" : "user",
            parts: [{ text: content }]
          }))
        }),
      }
    )

    const data = await response.json()
    console.log(data)
    const assistantMessage = data.candidates[0].content.parts[0].text
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
  if (window.confirm("Are you sure you want to clear the chat?")) {
    setMessages([])
    localStorage.removeItem("chat-messages")
  }
}

  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto" style={{background: '#0a0a0a', border: '1px solid #1a1a1a', borderRadius: '16px', margin: '20px auto', height: 'calc(100vh - 40px)'}}>
      <div className="flex items-center justify-between px-5 py-4" style={{background: '#0d0d0d', borderBottom: '1px solid #1f1f1f'}}>
        <div className="flex items-center gap-3">
          <div style={{width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 6px #22c55e88'}}></div>
          <div>
            <div style={{fontSize: '15px', fontWeight: '500', color: '#f0f0f0', letterSpacing: '0.3px'}}>AI Assistant</div>
            <div style={{fontSize: '11px', color: '#22c55e', marginTop: '1px'}}>Powered by Gemini</div>
          </div>
        </div>
        <button
          onClick={handleClear}
          style={{fontSize: '12px', color: '#444', background: 'none', border: '1px solid #222', padding: '5px 12px', borderRadius: '20px', cursor: 'pointer'}}
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