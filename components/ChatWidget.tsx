import React, { useState, useRef, useEffect } from 'react';
import { sendMessageToGemini } from '../services/geminiService';

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; text: string }[]>([
    { role: 'model', text: 'Hello! I am your Speeki AI Data Assistant. Ask me anything about the November 2025 report.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
        // Construct history for the API format
        const historyForApi = messages.map(m => ({
            role: m.role,
            parts: [{ text: m.text }]
        }));

      const response = await sendMessageToGemini(userMsg, historyForApi);
      setMessages(prev => [...prev, { role: 'model', text: response || "No response received." }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "Error communicating with AI." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-brand-neonPurple text-white shadow-lg shadow-brand-neonPurple/30 hover:scale-110 transition-transform flex items-center justify-center"
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
        )}
      </button>

      {/* Chat Panel */}
      <div 
        className={`fixed bottom-24 right-6 w-96 max-h-[600px] h-[70vh] bg-brand-card border border-white/10 rounded-2xl shadow-2xl z-40 flex flex-col transition-all duration-300 transform origin-bottom-right ${
          isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'
        }`}
      >
        <div className="p-4 border-b border-white/10 bg-gradient-to-r from-brand-neonPurple/20 to-transparent rounded-t-2xl">
          <h3 className="font-mono font-bold text-brand-neonPurple">Speeki AI Assistant</h3>
          <p className="text-xs text-gray-400">Powered by Gemini</p>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div 
                className={`max-w-[80%] p-3 rounded-lg text-sm ${
                  msg.role === 'user' 
                    ? 'bg-brand-neonPurple/20 text-white rounded-br-none border border-brand-neonPurple/30' 
                    : 'bg-white/5 text-gray-300 rounded-bl-none border border-white/10'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {loading && (
             <div className="flex justify-start">
               <div className="bg-white/5 text-gray-300 p-3 rounded-lg rounded-bl-none text-xs animate-pulse">
                 Thinking...
               </div>
             </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t border-white/10">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about the data..."
              className="flex-1 bg-black/30 border border-white/20 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand-neonPurple text-white"
            />
            <button 
              onClick={handleSend}
              disabled={loading}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors disabled:opacity-50"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatWidget;