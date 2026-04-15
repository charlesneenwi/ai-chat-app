function TypingBubble() {
  return (
    <div className="flex items-center gap-1 bg-gray-100 px-4 py-3 rounded-2xl rounded-bl-sm max-w-[75px]">
      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0ms]"></span>
      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:150ms]"></span>
      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:300ms]"></span>
    </div>
  )
}

function ChatWindow({ messages, isLoading, bottomRef }) {
  return (
    <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
      {messages.length === 0 && !isLoading ? (
        <div className="text-center text-gray-400 mt-20">
          Start a conversation...
        </div>
      ) : (
        <>
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex flex-col gap-1 ${
                message.role === "user" ? "items-end" : "items-start"
              }`}
            >
              <div
                className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                  message.role === "user"
                    ? "bg-blue-500 text-white rounded-br-sm"
                    : "bg-gray-100 text-gray-800 rounded-bl-sm"
                }`}
              >
                {message.content}
              </div>
              {message.timestamp && (
                <span className="text-xs text-gray-400 px-1">
                  {message.timestamp}
                </span>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex items-start">
              <TypingBubble />
            </div>
          )}
        </>
      )}
      <div ref={bottomRef} />
    </div>
  )
}

export default ChatWindow