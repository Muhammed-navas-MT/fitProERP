import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import EmojiPicker, { Theme } from "emoji-picker-react";
import { Smile, Send, ImagePlus, X } from "lucide-react";

interface ChatInputProps {
  messageText: string;
  setMessageText: (text: string) => void;
  onSend: () => void;
  onTyping: () => void;
  isSending: boolean;
  disabled: boolean;
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
  const [emojiPickerWidth, setEmojiPickerWidth] = useState(320);
  const emojiRef = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    const updateEmojiPickerWidth = () => {
      setEmojiPickerWidth(Math.min(320, window.innerWidth - 32));
    };

    updateEmojiPickerWidth();
    window.addEventListener("resize", updateEmojiPickerWidth);

    return () => window.removeEventListener("resize", updateEmojiPickerWidth);
  }, []);

  const isSendDisabled =
    disabled || isSending || (!messageText.trim() && !selectedImageFile);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;
    if (!file.type.startsWith("image/")) return;

    onImageSelect(file);
    e.target.value = "";
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
    <div className="border-t border-[#2a2a2a] bg-[#1a1a1a] px-2 sm:px-4 py-2 sm:py-3">
      {imagePreviewUrl && (
        <div className="mb-3 rounded-2xl border border-[#2a2a2a] bg-[#121212] p-3">
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

          {selectedImageFile && (
            <p className="mt-2 text-xs text-gray-400">{selectedImageFile.name}</p>
          )}
        </div>
      )}

      <div className="relative flex items-center gap-1.5 sm:gap-3">
        <div ref={emojiRef} className="relative">
          <button
            type="button"
            onClick={() => setShowEmoji((prev) => !prev)}
            className={`flex rounded-full p-2 transition-colors ${
              showEmoji ? "text-purple-400" : "text-gray-400 hover:text-white"
            }`}
          >
            <Smile size={22} />
          </button>

          {showEmoji && (
            <div className="absolute bottom-14 left-0 z-50 max-w-[calc(100vw-2rem)]">
              <EmojiPicker
                theme={Theme.DARK}
                onEmojiClick={(emojiData) => {
                  setMessageText(messageText + emojiData.emoji);
                  setShowEmoji(false);
                }}
                width={emojiPickerWidth}
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
          className={`flex shrink-0 rounded-full p-2 transition-colors ${
            selectedImageFile
              ? "text-purple-400"
              : "text-gray-400 hover:text-white"
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
          className="min-w-0 flex-1 rounded-xl border border-[#2a2a2a] bg-[#121212] px-3 sm:px-4 py-2.5 text-sm text-white outline-none placeholder:text-gray-500 focus:border-purple-500 disabled:cursor-not-allowed disabled:opacity-60"
        />

        <button
          type="button"
          onClick={onSend}
          disabled={isSendDisabled}
          className={`flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-full text-white transition-colors ${
            isSendDisabled
              ? "cursor-not-allowed bg-[#2a2a2a]"
              : "bg-purple-500 hover:bg-purple-600"
          }`}
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}
