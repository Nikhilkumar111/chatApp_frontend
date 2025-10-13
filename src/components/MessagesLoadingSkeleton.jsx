function MessagesLoadingSkeleton() {
  // Imagine this as fake chat bubbles while real messages are loading
  const totalBubbles = 6;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {Array.from({ length: totalBubbles }).map((_, i) => {
        // Left bubble if even, right bubble if odd
        const position = i % 2 === 0 ? "chat-start" : "chat-end";

        return (
          <div key={i} className={`chat ${position} animate-pulse`}>
            {/* Empty bubble to show loading effect */}
            <div className="chat-bubble bg-slate-800 text-white w-32"></div>
          </div>
        );
      })}
    </div>
  );
}

export default MessagesLoadingSkeleton;
