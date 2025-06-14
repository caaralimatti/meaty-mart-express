
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import LiveChat from "@/components/LiveChat";

interface LiveChatButtonProps {
  isLiveChatOpen: boolean;
  onLiveChatOpen: () => void;
  onLiveChatClose: () => void;
}

const LiveChatButton = ({ isLiveChatOpen, onLiveChatOpen, onLiveChatClose }: LiveChatButtonProps) => {
  return (
    <>
      <LiveChat
        isOpen={isLiveChatOpen}
        onClose={onLiveChatClose}
      />
      
      {!isLiveChatOpen && (
        <Button
          onClick={onLiveChatOpen}
          className="fixed bottom-4 right-4 z-40 bg-red-600 hover:bg-red-700 rounded-full w-14 h-14 shadow-lg"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      )}
    </>
  );
};

export default LiveChatButton;
