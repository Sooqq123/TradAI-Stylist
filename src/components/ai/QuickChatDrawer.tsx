/**
 * QuickChatDrawer Component - Ngăn Kéo Trò Chuyện Nhanh Với Gemini AI Stylist
 * Floating popup bar ở góc dưới: Trả lời siêu súc tích 2 câu kèm nút 1-click "Mặc thử món này ngay".
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  ArrowRight,
  Bot,
  Check,
  ChevronDown,
  MessageCircle,
  MessageSquare,
  Minus,
  Send,
  Shirt,
  Sparkles,
  User,
  Wand2,
  X,
  Zap,
} from 'lucide-react';
import { askStylistQuickQuestion, getContextualOfflineAnswer, QuickStylistAnswer } from '../../services/geminiService';
import {
  ALL_FASHION_ITEMS,
  MOCK_ACCESSORIES,
  MOCK_BOTTOMS,
  MOCK_FOOTWEAR,
  MOCK_GARMENTS,
} from '../../data/mockData';
import { useOutfitStore } from '../../store/useOutfitStore';
import { FashionItem } from '../../types';

interface QuickChatDrawerProps {
  isOpen?: boolean;
  onToggle?: () => void;
  focusedItem?: FashionItem | null;
  initialPrompt?: string;
  onShowToast?: (msg: string, type?: 'success' | 'info') => void;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'gemini';
  text: string;
  suggestedItemId?: string;
  suggestedItemName?: string;
  timestamp: string;
}

const QUICK_PROMPTS = [
  'Áo này phối với nón lá hay khăn vấn hợp hơn?',
  'Nam mặc áo ngũ thân nên để tóc kiểu gì?',
  'Món này đi chùa có cần lưu ý gì không?',
  'Phối giày gì vừa êm chân vừa đẹp du xuân?',
];

export const QuickChatDrawer: React.FC<QuickChatDrawerProps> = ({
  isOpen: controlledIsOpen,
  onToggle,
  focusedItem,
  initialPrompt,
  onShowToast,
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState<boolean>(false);
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;

  const toggleOpen = () => {
    if (onToggle) {
      onToggle();
    } else {
      setInternalIsOpen((prev) => !prev);
    }
  };

  const {
    currentOutfit,
    setGarment,
    setBottom,
    setFootwear,
    setHeadwear,
    toggleAccessory,
  } = useOutfitStore();

  const [inputMessage, setInputMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'gemini',
      text: 'Chào bạn! Mình là AI Stylist Cổ Phục. Bấm câu hỏi gợi ý bên dưới hoặc hỏi bất kỳ thắc mắc nào nhé!',
      timestamp: 'Vừa xong',
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom of messages
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  // Handle external prompt injection (e.g. from Flashcard)
  useEffect(() => {
    if (initialPrompt && isOpen) {
      handleSendMessage(initialPrompt);
    }
  }, [initialPrompt]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputMessage).trim();
    if (!query || isLoading) return;

    setInputMessage('');

    const userMsg: ChatMessage = {
      id: `user_${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const outfitSummary = `${currentOutfit.garment?.name || 'Áo cổ phục'}, giới tính: ${currentOutfit.gender || 'unisex'}, dịp: ${currentOutfit.occasion}`;
      const result: QuickStylistAnswer = await askStylistQuickQuestion(query, outfitSummary);

      const geminiMsg: ChatMessage = {
        id: `ai_${Date.now()}`,
        sender: 'gemini',
        text: result.answer,
        suggestedItemId: result.suggestedItemId,
        suggestedItemName: result.suggestedItemName,
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, geminiMsg]);
    } catch {
      const fallback = getContextualOfflineAnswer(query);
      const fallbackMsg: ChatMessage = {
        id: `ai_${Date.now()}`,
        sender: 'gemini',
        text: fallback.answer,
        suggestedItemId: fallback.suggestedItemId,
        suggestedItemName: fallback.suggestedItemName,
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  // 1-Click Try On Recommended Item
  const handleTryOnItem = (suggestedItemId?: string, suggestedItemName?: string) => {
    let foundItem: FashionItem | undefined;

    if (suggestedItemId) {
      foundItem = ALL_FASHION_ITEMS.find((item) => item.id === suggestedItemId);
    }

    if (!foundItem && suggestedItemName) {
      const lowerName = suggestedItemName.toLowerCase();
      foundItem = ALL_FASHION_ITEMS.find((item) =>
        item.name.toLowerCase().includes(lowerName)
      );
    }

    // Fallbacks based on keyword matches
    if (!foundItem && suggestedItemName) {
      const lower = suggestedItemName.toLowerCase();
      if (lower.includes('khăn') || lower.includes('nón')) {
        foundItem = MOCK_ACCESSORIES.find((a) => a.id.includes('khan_van')) || MOCK_ACCESSORIES[0];
      } else if (lower.includes('sneaker') || lower.includes('giày')) {
        foundItem = MOCK_FOOTWEAR.find((f) => f.id.includes('sneaker')) || MOCK_FOOTWEAR[0];
      } else if (lower.includes('quần')) {
        foundItem = MOCK_BOTTOMS[0];
      }
    }

    if (!foundItem) {
      foundItem = MOCK_ACCESSORIES[0];
    }

    // Apply item based on category
    if (foundItem.category === 'garment') {
      setGarment(foundItem);
    } else if (foundItem.category === 'bottom') {
      setBottom(foundItem);
    } else if (foundItem.category === 'footwear') {
      setFootwear(foundItem);
    } else if (foundItem.category === 'headwear') {
      setHeadwear(foundItem);
    } else {
      toggleAccessory(foundItem);
    }

    if (onShowToast) {
      onShowToast(`Đã mặc thử "${foundItem.name}" lên Canvas!`, 'success');
    }
  };

  return (
    <>
      {/* Floating Trigger Circular FAB (When collapsed) */}
      {!isOpen && (
        <button
          type="button"
          onClick={toggleOpen}
          aria-label="Hỏi nhanh Gemini"
          className="fixed bottom-[136px] sm:bottom-[76px] right-5 z-40 group w-12 h-12 rounded-full bg-gradient-to-tr from-[#9E2A2B] via-[#E05A47] to-[#FFD166] dark:from-[#FF3366] dark:via-[#9E2A2B] dark:to-[#FFD166] text-white flex items-center justify-center shadow-[0_8px_25px_rgba(224,90,71,0.45)] hover:shadow-[0_10px_30px_rgba(255,51,102,0.6)] hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer ring-2 ring-white/30 dark:ring-white/20"
        >
          {/* 4-point Gemini Sparkle Star Logo */}
          <svg
            viewBox="0 0 24 24"
            className="w-5 h-5 fill-white transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110 drop-shadow-sm"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 0C12 6.627 6.627 12 0 12C6.627 12 12 17.373 12 24C12 17.373 17.373 12 24 12C17.373 12 12 6.627 12 0Z" />
          </svg>

          {/* Small Notification Dot on Corner */}
          <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-[#06D6A0] border-2 border-white dark:border-[#0D0B14] shadow-xs flex items-center justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
          </span>

          {/* Tooltip on Hover */}
          <div className="absolute right-full top-1/2 -translate-y-1/2 mr-3 px-3 py-1.5 rounded-xl bg-[#18181B] dark:bg-white text-white dark:text-[#18181B] text-xs font-semibold whitespace-nowrap shadow-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-1 group-hover:translate-x-0 flex items-center gap-1.5 z-50">
            <span className="text-[#FFD166] dark:text-[#E05A47]">✦</span>
            <span>Hỏi nhanh Gemini</span>
            <span className="absolute left-full top-1/2 -translate-y-1/2 -ml-1 border-4 border-transparent border-l-[#18181B] dark:border-l-white" />
          </div>
        </button>
      )}

      {/* Expanded Quick Chat Drawer Popup */}
      {isOpen && (
        <div
          className="fixed bottom-20 sm:bottom-6 right-3 sm:right-6 z-50 w-[calc(100vw-24px)] sm:w-96 rounded-3xl bg-[#0F0C18]/95 dark:bg-[#0D0B14]/95 border border-[#FF3366]/40 shadow-[0_12px_50px_rgba(0,0,0,0.6)] backdrop-blur-xl flex flex-col text-white ring-1 ring-white/10 animate-in fade-in slide-in-from-bottom-3 duration-200 overflow-hidden"
          style={{ maxHeight: '520px' }}
        >
          {/* Header */}
          <div className="p-3.5 sm:p-4 bg-white/5 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#FF3366] to-[#B5179E] flex items-center justify-center text-white shadow-xs">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#FF3366]">
                    ✦ GEMINI FLASH
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#06D6A0]" />
                </div>
                <h4 className="font-editorial text-sm font-bold text-white">
                  Cố Vấn Phong Cách Nhanh
                </h4>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={toggleOpen}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                title="Thu nhỏ"
              >
                <Minus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-3.5 overflow-y-auto space-y-3 min-h-[220px] max-h-[300px]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-[#FF3366] to-[#E63946] text-white rounded-br-xs shadow-xs'
                      : 'bg-white/10 text-slate-100 rounded-bl-xs border border-white/10'
                  }`}
                >
                  <p>{msg.text}</p>

                  {/* 1-Click Try On Item Action Button */}
                  {msg.suggestedItemName && (
                    <div className="mt-2.5 pt-2 border-t border-white/15 flex items-center justify-between gap-2">
                      <span className="text-[10px] text-[#FFD166] font-semibold truncate">
                        Gợi ý: {msg.suggestedItemName}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          handleTryOnItem(msg.suggestedItemId, msg.suggestedItemName)
                        }
                        className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-extrabold bg-[#06D6A0] hover:bg-[#05B386] text-black shadow-xs transition-all active:scale-95 cursor-pointer shrink-0"
                      >
                        <Shirt className="w-3 h-3" />
                        <span>Mặc thử món này</span>
                      </button>
                    </div>
                  )}
                </div>
                <span className="text-[9px] text-slate-500 mt-1 px-1">{msg.timestamp}</span>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300 w-fit animate-pulse">
                <Sparkles className="w-3.5 h-3.5 text-[#FFD166] animate-spin" />
                <span>Gemini đang đúc kết 2 câu trả lời...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Chips */}
          <div className="p-2.5 bg-white/5 border-t border-white/10 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {QUICK_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSendMessage(prompt)}
                disabled={isLoading}
                className="text-[10px] px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white border border-white/10 whitespace-nowrap transition-colors cursor-pointer disabled:opacity-50"
              >
                ✦ {prompt}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-[#0A0812] border-t border-white/10 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Hỏi nhanh về cách phối đồ, lịch sử..."
              className="flex-1 bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#FF3366] transition-colors"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim() || isLoading}
              className="p-2 rounded-xl bg-gradient-to-r from-[#FF3366] to-[#B5179E] text-white hover:brightness-110 disabled:opacity-40 transition-all cursor-pointer"
              title="Gửi câu hỏi"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
