import { useRef, useState } from "react";
import useKeyboardSound from "../hooks/useKeyboardSound";
import useChatStore from "../store/useChatStore";
import toast from "react-hot-toast";
import { ImageIcon, SendIcon, XIcon, SmileIcon } from "lucide-react";
import EmojiPicker from "emoji-picker-react";

function MessageInput() {
  const { playRandomKeyStrokeSound } = useKeyboardSound();
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const fileInputRef = useRef(null);

  const { sendMessage, isSoundEnabled } = useChatStore();

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;
    if (isSoundEnabled) playRandomKeyStrokeSound();

    sendMessage({
      text: text.trim(),
      image: imagePreview,
    });

    setText("");
    setImagePreview("");
    setShowEmojiPicker(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file?.type?.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleEmojiClick = (emojiData) => {
    setText((prev) => prev + emojiData.emoji);
  };

  return (
    <div className="p-3 sm:p-4 border-t border-slate-700/50 bg-slate-900/40 backdrop-blur">
      {/* Image preview section */}
      {imagePreview && (
        <div className="max-w-3xl mx-auto mb-3 flex items-center justify-center sm:justify-start">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg border border-slate-700"
            />
            <button
              onClick={removeImage}
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-slate-200 hover:bg-slate-700"
              type="button"
            >
              <XIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Message input form */}
      <form
        onSubmit={handleSendMessage}
        className="max-w-3xl mx-auto flex items-center space-x-2 sm:space-x-4"
      >
        {/* Emoji Picker */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowEmojiPicker((prev) => !prev)}
            className="text-slate-400 hover:text-cyan-400 transition"
          >
            <SmileIcon className="w-6 h-6" />
          </button>

          {showEmojiPicker && (
            <div className="absolute bottom-14 sm:bottom-12 left-0 z-20 w-[90vw] sm:w-auto max-w-xs sm:max-w-none">
              <EmojiPicker
                onEmojiClick={handleEmojiClick}
                theme="dark"
                emojiStyle="native"
                height={320}
                width="100%"
              />
            </div>
          )}
        </div>

        {/* Message Input */}
        <input
          type="text"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            isSoundEnabled && playRandomKeyStrokeSound();
          }}
          className="flex-1 bg-slate-800/70 border border-slate-600 focus:border-cyan-500 
                     focus:ring-1 focus:ring-cyan-500 rounded-lg py-2 px-3 sm:py-2.5 sm:px-4 
                     text-slate-100 placeholder-slate-400 text-sm sm:text-base outline-none 
                     transition-all duration-200"
          placeholder="Type your message..."
        />

        {/* Image Upload */}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
          className="hidden"
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className={`bg-slate-800/50 text-slate-400 hover:text-slate-200 rounded-lg p-2 sm:px-4 
                      transition-colors ${imagePreview ? "text-cyan-500" : ""}`}
        >
          <ImageIcon className="w-5 h-5" />
        </button>

        {/* Send Button */}
        <button
          type="submit"
          disabled={!text.trim() && !imagePreview}
          className="bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-lg 
                     px-3 sm:px-4 py-2 font-medium hover:from-cyan-600 hover:to-cyan-700 
                     transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <SendIcon className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
}

export default MessageInput;
