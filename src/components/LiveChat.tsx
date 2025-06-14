
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, X, Send, User, Bot } from "lucide-react";
import { toast } from "sonner";

interface Message {
  id: number;
  text: string;
  sender: "user" | "support";
  time: string;
}

interface LiveChatProps {
  isOpen: boolean;
  onClose: () => void;
}

const LiveChat = ({ isOpen, onClose }: LiveChatProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! Welcome to QuickGoat support. How can I help you today?",
      sender: "support",
      time: "10:30 AM"
    }
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: newMessage,
      sender: "user",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage("");
    setIsTyping(true);

    // Simulate support response
    setTimeout(() => {
      const supportMessage: Message = {
        id: messages.length + 2,
        text: "Thanks for your message! Our team will get back to you shortly. For urgent orders, please call our hotline.",
        sender: "support",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, supportMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Card className="w-80 h-96 shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between bg-red-600 text-white p-3">
          <div className="flex items-center space-x-2">
            <MessageCircle className="w-5 h-5" />
            <CardTitle className="text-sm">Live Support</CardTitle>
            <Badge className="bg-green-500 text-white text-xs">Online</Badge>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-red-700">
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        
        <CardContent className="p-0 flex flex-col h-80">
          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[75%] p-2 rounded-lg ${
                  message.sender === 'user' 
                    ? 'bg-red-600 text-white' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  <div className="flex items-center space-x-1 mb-1">
                    {message.sender === 'support' ? (
                      <Bot className="w-3 h-3" />
                    ) : (
                      <User className="w-3 h-3" />
                    )}
                    <span className="text-xs opacity-75">
                      {message.sender === 'support' ? 'Support' : 'You'}
                    </span>
                  </div>
                  <p className="text-sm">{message.text}</p>
                  <p className="text-xs opacity-75 mt-1">{message.time}</p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 p-2 rounded-lg">
                  <div className="flex items-center space-x-1">
                    <Bot className="w-3 h-3" />
                    <span className="text-xs">Support is typing...</span>
                  </div>
                  <div className="flex space-x-1 mt-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="p-3 border-t flex space-x-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1"
            />
            <Button onClick={sendMessage} size="sm" className="bg-red-600 hover:bg-red-700">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LiveChat;
