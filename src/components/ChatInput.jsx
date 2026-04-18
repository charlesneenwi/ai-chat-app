function ChatInput({ onSend, isLoading }) {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

const handleKeyDown = (e) => {
  if (e.key === "Enter" && !e.shiftKey && !isLoading && !isMobile) {
    e.preventDefault()
    onSend()
  }
}

  return (
    <div style={{background: '#0d0d0d', borderTop: '1px solid #1a1a1a', padding: '14px 16px', display: 'flex', gap: '10px', alignItems: 'center'}}>
      <input
        type="text"
        id="chat-input"
        placeholder="Type a message..."
        disabled={isLoading}
        onKeyDown={handleKeyDown}
        style={{flex: 1, background: '#141414', border: '1px solid #222', borderRadius: '24px', padding: '10px 18px', fontSize: '16px', color: '#d4d4d4', outline: 'none', fontFamily: 'inherit', opacity: isLoading ? 0.5 : 1}}
      />
      <button
        onClick={onSend}
        disabled={isLoading}
        style={{background: '#16a34a', border: 'none', borderRadius: '50%', width: '38px', height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: isLoading ? 'not-allowed' : 'pointer', flexShrink: 0, opacity: isLoading ? 0.5 : 1}}
      >
        <svg viewBox="0 0 24 24" style={{width: '16px', height: '16px', fill: 'white'}}>
          <path d="M2 21l21-9L2 3v7l15 2-15 2v7z"/>
        </svg>
      </button>
    </div>
  )
}

export default ChatInput