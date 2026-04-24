import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import EmojiPicker, { Theme } from "emoji-picker-react";
import { ImagePlus, Smile, Send, X } from "lucide-react";

interface ChatInputProps {
  messageText: string;
  setMessageText: (text: string) => void;
  onSend: () => void;
  onTyping: () => void;
  isSending: boolean;
  disabled: boolean;

  // CHANGED: added image support props
  selectedImageFile: File | null;
  imagePreviewUrl: string;
  onImageSelect: (file: File | null) => void;
  onRemoveImage: () => void;
}

export default function ChatInput({
  messageText,
  setMessageText,
  onSend,
  onTyping,
  isSending,
  disabled,
  selectedImageFile,
  imagePreviewUrl,
  onImageSelect,
  onRemoveImage,
}: ChatInputProps) {
  const [showEmoji, setShowEmoji] = useState(false);
  const emojiRef = useRef<HTMLDivElement>(null);

  // CHANGED: file input ref
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  // CHANGED: allow send if either text or image exists
  const isSendDisabled =
    disabled || isSending || (!messageText.trim() && !selectedImageFile);

  // CHANGED: handle file picker
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      return;
    }

    onImageSelect(file);
  };

  const handleOpenFilePicker = () => {
    if (disabled || isSending) return;
    fileInputRef.current?.click();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isSendDisabled) {
      onSend();
    }
  };

  return (
    <div className="border-t border-zinc-900 bg-zinc-950 px-4 py-3">
      {imagePreviewUrl && (
        <div className="mb-3 rounded-2xl border border-zinc-800 bg-zinc-900 p-3">
          <div className="relative inline-block">
            <img
              src={imagePreviewUrl}
              alt="Selected preview"
              className="max-h-48 rounded-xl object-cover"
            />

            <button
              type="button"
              onClick={onRemoveImage}
              disabled={isSending}
              className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/70 text-white transition hover:bg-black"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      <div className="relative flex items-center gap-3">
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
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />

        <button
          type="button"
          onClick={handleOpenFilePicker}
          disabled={disabled || isSending}
          className={`flex rounded-full p-2 transition-colors ${
            selectedImageFile
              ? "text-orange-500"
              : "text-zinc-400 hover:text-white"
          } disabled:cursor-not-allowed disabled:opacity-60`}
        >
          <ImagePlus size={22} />
        </button>

        <input
          type="text"
          value={messageText}
          onChange={(e) => {
            setMessageText(e.target.value);
            onTyping();
          }}
          onKeyDown={handleKeyDown}
          placeholder={
            selectedImageFile ? "Add a caption (optional)..." : "Type a message..."
          }
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
    </div>
  );
}
