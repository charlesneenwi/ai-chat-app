function ChatInput({ onSend, isLoading }) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey && !isLoading) {
      e.preventDefault()
      onSend()
    }
  }

  return (
    <div className="flex gap-2 p-4 border-t border-gray-200">
      <input
        type="text"
        id="chat-input"
        placeholder="Type a message..."
        disabled={isLoading}
        onKeyDown={handleKeyDown}
        className="flex-1 px-4 py-2 border border-gray-300 rounded-full outline-none focus:border-blue-500 disabled:opacity-50"
      />
      <button
        onClick={onSend}
        disabled={isLoading}
        className="px-5 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:opacity-50 transition-colors"
      >
        {isLoading ? "..." : "Send"}
      </button>
    </div>
  )
}

export default ChatInput