import React, { useState } from 'react';
import { MessageCircle, X, Send, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Toast: React.FC = () => {
  const { toastMessage } = useApp();
  if (!toastMessage) return null;

  return (
    <div
      id="global-toast-notification"
      className="fixed bottom-20 lg:bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-5 duration-200"
    >
      <div className="bg-[#0b1c30] text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 border border-slate-700/80 max-w-sm">
        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
        <p className="text-xs font-medium leading-tight">{toastMessage}</p>
      </div>
    </div>
  );
};

export const FloatingHelpWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { from: 'bot', text: 'Namaste! Welcome to Daily Hub support. How can we help you today with your order or service booking?' }
  ]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    const userMsg = message;
    setMessage('');
    setChatHistory((prev) => [...prev, { from: 'user', text: userMsg }]);

    setTimeout(() => {
      setChatHistory((prev) => [
        ...prev,
        {
          from: 'bot',
          text: `Got it! Our Hyderabad support manager has received your query: "${userMsg.slice(0, 30)}...". For urgent doorstep assistance, our delivery & service helpline is live 24/7 at +91 98480 22338.`
        }
      ]);
    }, 800);
  };

  return (
    <div className="fixed bottom-20 lg:bottom-6 right-4 z-40">
      {isOpen ? (
        <div className="w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col h-[400px] animate-in fade-in slide-in-from-bottom-4 duration-200">
          {/* Header */}
          <div className="bg-[#005c55] text-white p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <MessageCircle className="w-4 h-4 text-emerald-200" />
              </div>
              <div>
                <h4 className="text-xs font-bold leading-none">Daily Hub Care (హైదరాబాద్)</h4>
                <p className="text-[10px] text-emerald-100 flex items-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Replies in under 2 mins
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white p-1 rounded-md"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-3 overflow-y-auto space-y-2.5 bg-slate-50 text-xs">
            {chatHistory.map((item, i) => (
              <div
                key={i}
                className={`flex ${item.from === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-2.5 rounded-xl ${
                    item.from === 'user'
                      ? 'bg-[#005c55] text-white rounded-br-none'
                      : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none shadow-2xs'
                  }`}
                >
                  <p className="leading-relaxed">{item.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="p-2.5 bg-white border-t border-slate-200 flex gap-1.5">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask about orders, plumber, water..."
              className="flex-1 text-xs border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#005c55]"
            />
            <button
              type="submit"
              className="bg-[#005c55] hover:bg-[#004d47] text-white p-2 rounded-lg transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          title="Instant Support & WhatsApp Help"
          className="flex items-center gap-2 bg-[#005c55] hover:bg-[#004d47] text-white px-3.5 py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 group text-xs font-bold"
        >
          <div className="relative">
            <MessageCircle className="w-4 h-4 text-emerald-200" />
            <span className="w-2 h-2 rounded-full bg-emerald-400 absolute -top-0.5 -right-0.5 animate-ping"></span>
          </div>
          <span className="hidden sm:inline">Daily Hub Help</span>
        </button>
      )}
    </div>
  );
};

export const FloatingWidgets: React.FC = () => {
  return (
    <>
      <Toast />
      <FloatingHelpWidget />
    </>
  );
};
