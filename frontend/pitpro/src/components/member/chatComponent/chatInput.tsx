import { useEffect, useRef, useState } from "react";
import EmojiPicker, { Theme } from "emoji-picker-react";
import { Smile, Send } from "lucide-react";

interface ChatInputProps {
  messageText: string;
  setMessageText: (text: string) => void;
  onSend: () => void;
  onTyping: () => void;
  isSending: boolean;
  disabled: boolean;
}

export default function ChatInput({
  messageText,
  setMessageText,
  onSend,
  onTyping,
  isSending,
  disabled,
}: ChatInputProps) {
  const [showEmoji, setShowEmoji] = useState(false);
  const emojiRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (emojiRef.current && !emojiRef.current.contains(e.target as Node)) {
        setShowEmoji(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const isSendDisabled = disabled || isSending || !messageText.trim();

  return (
    <div className="relative flex items-center gap-3 border-t border-zinc-900 bg-zinc-950 px-4 py-3">
      <div ref={emojiRef} className="relative">
        <button
          type="button"
          onClick={() => setShowEmoji((prev) => !prev)}
          className={`flex rounded-full p-2 transition-colors ${
            showEmoji ? "text-orange-500" : "text-zinc-400 hover:text-white"
          }`}
        >
          <Smile size={22} />
        </button>

        {showEmoji && (
          <div className="absolute bottom-14 left-0 z-50">
            <EmojiPicker
              theme={Theme.DARK}
              onEmojiClick={(emojiData) => {
                setMessageText(messageText + emojiData.emoji);
                setShowEmoji(false);
              }}
              width={300}
              height={380}
            />
          </div>
        )}
      </div>

      <input
        type="text"
        value={messageText}
        onChange={(e) => {
          setMessageText(e.target.value);
          onTyping();
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !isSendDisabled) {
            onSend();
          }
        }}
        placeholder="Type a message..."
        disabled={disabled}
        className="flex-1 rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-white outline-none placeholder:text-zinc-500 focus:border-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
      />

      <button
        type="button"
        onClick={onSend}
        disabled={isSendDisabled}
        className={`flex h-11 w-11 items-center justify-center rounded-full text-white transition-colors ${
          isSendDisabled
            ? "cursor-not-allowed bg-zinc-800"
            : "bg-orange-600 hover:bg-orange-500"
        }`}
      >
        <Send size={18} />
      </button>
    </div>
  );
}