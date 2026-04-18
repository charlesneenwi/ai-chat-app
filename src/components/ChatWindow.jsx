function TypingBubble() {
  return (
    <div className="flex flex-col gap-1 items-start">
      <div style={{display: 'inline-flex', alignItems: 'center', gap: '5px', background: '#0f1f14', border: '1px solid #1a3322', borderRadius: '6px', padding: '3px 10px', fontSize: '11px', color: '#22c55e', marginBottom: '4px'}}>
        <div style={{width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e'}}></div>
        Assistant
      </div>
      <div style={{display: 'flex', gap: '4px', alignItems: 'center', padding: '12px 16px', background: '#141414', border: '1px solid #222', borderRadius: '18px', borderBottomLeftRadius: '4px'}}>
        <span style={{width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e', display: 'inline-block', animation: 'bounce 1.2s infinite', animationDelay: '0ms'}}></span>
        <span style={{width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e', display: 'inline-block', animation: 'bounce 1.2s infinite', animationDelay: '200ms'}}></span>
        <span style={{width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e', display: 'inline-block', animation: 'bounce 1.2s infinite', animationDelay: '400ms'}}></span>
      </div>
    </div>
  )
}

function ChatWindow({ messages, isLoading, bottomRef }) {
  return (
    <>
      <style>{`
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-5px); opacity: 1; }
        }
      `}</style>
      <div style={{flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px', background: '#0a0a0a'}}>
        {messages.length === 0 && !isLoading ? (
          <div style={{textAlign: 'center', color: '#333', marginTop: '80px', fontSize: '14px'}}>
            Start a conversation...
          </div>
        ) : (
          <>
            {messages.map((message, index) => (
              <div
                key={index}
                style={{display: 'flex', flexDirection: 'column', gap: '4px', alignItems: message.role === 'user' ? 'flex-end' : 'flex-start'}}
              >
                {message.role === 'assistant' && (
                  <div style={{display: 'inline-flex', alignItems: 'center', gap: '5px', background: '#0f1f14', border: '1px solid #1a3322', borderRadius: '6px', padding: '3px 10px', fontSize: '11px', color: '#22c55e', marginBottom: '2px'}}>
                    <div style={{width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e'}}></div>
                    Assistant
                  </div>
                )}
                <div
                  style={{
                    maxWidth: '72%',
                    padding: '11px 16px',
                    fontSize: '14px',
                    lineHeight: '1.6',
                    borderRadius: '18px',
                    ...(message.role === 'user'
                      ? {background: '#16a34a', color: '#f0fdf4', borderBottomRightRadius: '4px'}
                      : {background: '#141414', color: '#d4d4d4', border: '1px solid #222', borderBottomLeftRadius: '4px'})
                  }}
                >
                  {message.content}
                </div>
                {message.timestamp && (
                  <span style={{fontSize: '10px', color: '#333', padding: '0 4px'}}>
                    {message.timestamp}
                  </span>
                )}
              </div>
            ))}
            {isLoading && <TypingBubble />}
          </>
        )}
        <div ref={bottomRef} />
      </div>
    </>
  )
}

export default ChatWindow