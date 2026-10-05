/**
 * FootwearSVG Component - Minh Họa Giày Dép Đạt Chuẩn Thời Trang Vector 2D
 * Khớp chuẩn 100% với Quy Chuẩn Hình 2:
 * 1. Guốc Mộc Quai Nhung Đỏ / Hài Nhung:
 *    - Khi mặc quần dài: Mũi hài/guốc nhung đỏ hé lộ trang nhã ngay dưới gấu quần lụa dợn sóng (Y=593 - 606).
 *    - Khi mặc quần short: Hiển thị trọn vẹn phom guốc mộc tiện gỗ nâng gót duyên dáng.
 * 2. Sneaker Trắng Chunky Platform:
 *    - Đế cao su dày dặn năng động, chi tiết dây giày và đường cắt da hiện đại.
 * 3. Loafer Da Đen Lịch Lãm: Da bóng sang trọng, khóa kim loại vàng kim (horsebit).
 * 4. Combat Boots Cá Tính: Da đen cổ cao, đế răng cưa.
 */

import React from 'react';

interface FootwearSVGProps {
  id?: string;
  colorHex?: string;
}

export const FootwearSVG: React.FC<FootwearSVGProps> = ({
  id = 'footwear_guoc_01',
  colorHex,
}) => {
  const darkOutline = '#1A1114';

  // ================= 1. GUỐC MỘC QUAI NHUNG ĐỎ / HÀI NHUNG (CHUẨN HÌNH 2) =================
  if (id === 'footwear_guoc_01') {
    const velvetColor = colorHex || '#9B2226';
    return (
      <g className="footwear-guoc">
        {/* Left Footwear */}
        <g className="shoe-left">
          {/* Wooden Heel & Arch (Hiển thị khi mặc short) */}
          <path
            d="M172 575 L170 592 L188 592 L186 575 Z"
            fill="#8B5A3E"
            stroke={darkOutline}
            strokeWidth="1.1"
          />
          <path
            d="M168 574 Q178 566 188 574"
            stroke={velvetColor}
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />

          {/* Wooden Sole Tip */}
          <path
            d="M165 593 
               C165 604, 172 607, 180 607 
               C186 607, 190 604, 189 593 
               Z"
            fill="#6E3F28"
            stroke={darkOutline}
            strokeWidth="1.2"
          />
          {/* Crimson Velvet Toe Cap (Mũi hài/guốc nhung đỏ chuẩn Hình 2) */}
          <path
            d="M166 593 
               C166 603, 172 606, 179 606 
               C185 606, 189 603, 188 593 
               Z"
            fill={velvetColor}
            stroke={darkOutline}
            strokeWidth="1"
          />
          {/* Specular Velvet Highlight */}
          <path
            d="M169 595 Q176 602 184 595"
            stroke="rgba(255,255,255,0.45)"
            strokeWidth="1"
            fill="none"
          />
        </g>

        {/* Right Footwear */}
        <g className="shoe-right">
          {/* Wooden Heel & Arch */}
          <path
            d="M212 575 L210 592 L228 592 L226 575 Z"
            fill="#8B5A3E"
            stroke={darkOutline}
            strokeWidth="1.1"
          />
          <path
            d="M210 574 Q220 566 230 574"
            stroke={velvetColor}
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />

          {/* Wooden Sole Tip */}
          <path
            d="M211 593 
               C210 604, 214 607, 220 607 
               C228 607, 235 604, 235 593 
               Z"
            fill="#6E3F28"
            stroke={darkOutline}
            strokeWidth="1.2"
          />
          {/* Crimson Velvet Toe Cap */}
          <path
            d="M212 593 
               C211 603, 215 606, 221 606 
               C228 606, 234 603, 234 593 
               Z"
            fill={velvetColor}
            stroke={darkOutline}
            strokeWidth="1"
          />
          {/* Specular Velvet Highlight */}
          <path
            d="M216 595 Q223 602 230 595"
            stroke="rgba(255,255,255,0.45)"
            strokeWidth="1"
            fill="none"
          />
        </g>
      </g>
    );
  }

  // ================= 2. SNEAKER TRẮNG PLATFORM =================
  if (id === 'footwear_sneaker_01') {
    return (
      <g className="footwear-sneaker">
        {/* Left Sneaker */}
        <g className="sneaker-left">
          <path
            d="M164 592 L164 606 C170 609, 185 609, 190 606 L190 592 Z"
            fill="#FFFFFF"
            stroke={darkOutline}
            strokeWidth="1.2"
          />
          <line x1="164" y1="601" x2="190" y2="601" stroke="#CED4DA" strokeWidth="1" />
          <path
            d="M165 592 C165 572, 172 565, 182 565 C189 565, 189 572, 189 592 Z"
            fill="#F8F9FA"
            stroke={darkOutline}
            strokeWidth="1.1"
          />
          <line x1="172" y1="575" x2="182" y2="575" stroke="#6C757D" strokeWidth="1.5" />
          <line x1="171" y1="582" x2="183" y2="582" stroke="#6C757D" strokeWidth="1.5" />
        </g>

        {/* Right Sneaker */}
        <g className="sneaker-right">
          <path
            d="M210 592 L210 606 C215 609, 230 609, 236 606 L236 592 Z"
            fill="#FFFFFF"
            stroke={darkOutline}
            strokeWidth="1.2"
          />
          <line x1="210" y1="601" x2="236" y2="601" stroke="#CED4DA" strokeWidth="1" />
          <path
            d="M211 592 C211 572, 211 565, 218 565 C228 565, 235 572, 235 592 Z"
            fill="#F8F9FA"
            stroke={darkOutline}
            strokeWidth="1.1"
          />
          <line x1="218" y1="575" x2="228" y2="575" stroke="#6C757D" strokeWidth="1.5" />
          <line x1="217" y1="582" x2="229" y2="582" stroke="#6C757D" strokeWidth="1.5" />
        </g>
      </g>
    );
  }

  // ================= 2b. CHUNKY PLATFORM SNEAKER =================
  if (id === 'footwear_chunky_platform') {
    return (
      <g className="footwear-chunky-platform">
        {/* Left Platform Sneaker */}
        <g className="chunky-left">
          {/* Thick Lugged Sole */}
          <path d="M162 602 L192 602 L191 612 L163 612 Z" fill="#E9ECEF" stroke={darkOutline} strokeWidth="1.2" />
          <path d="M165 612 L168 615 L172 612 L176 615 L180 612 L184 615 L188 612" stroke={darkOutline} strokeWidth="1" fill="none" />
          {/* Upper Body */}
          <path d="M164 590 C164 570, 168 565, 177 565 C186 565, 190 570, 190 590 L192 602 L162 602 Z" fill="#FFFFFF" stroke={darkOutline} strokeWidth="1.2" />
          <line x1="170" y1="578" x2="184" y2="578" stroke="#FF3366" strokeWidth="1.5" />
          <line x1="169" y1="585" x2="185" y2="585" stroke="#FF3366" strokeWidth="1.5" />
        </g>
        {/* Right Platform Sneaker */}
        <g className="chunky-right">
          {/* Thick Lugged Sole */}
          <path d="M208 602 L238 602 L237 612 L209 612 Z" fill="#E9ECEF" stroke={darkOutline} strokeWidth="1.2" />
          <path d="M211 612 L214 615 L218 612 L222 615 L226 612 L230 615 L234 612" stroke={darkOutline} strokeWidth="1" fill="none" />
          {/* Upper Body */}
          <path d="M210 590 C210 570, 214 565, 223 565 C232 565, 236 570, 236 590 L238 602 L208 602 Z" fill="#FFFFFF" stroke={darkOutline} strokeWidth="1.2" />
          <line x1="216" y1="578" x2="230" y2="578" stroke="#FF3366" strokeWidth="1.5" />
          <line x1="215" y1="585" x2="231" y2="585" stroke="#FF3366" strokeWidth="1.5" />
        </g>
      </g>
    );
  }

  // ================= 2c. GIÀY MARY JANE QUAI ĐÔI ĐẾ DÀY =================
  if (id === 'footwear_mary_jane_double_strap') {
    const cherryColor = colorHex || '#800E13';
    return (
      <g className="footwear-maryjane">
        {/* Left Mary Jane */}
        <g className="mj-left">
          <rect x="165" y="602" width="24" height="6" rx="2" fill="#1A1822" stroke={darkOutline} strokeWidth="1.1" />
          <path d="M166 592 C166 602, 172 605, 178 605 C184 605, 188 602, 188 592 Z" fill={cherryColor} stroke={darkOutline} strokeWidth="1.2" />
          {/* Double Buckle Straps */}
          <line x1="168" y1="582" x2="186" y2="582" stroke={cherryColor} strokeWidth="2.2" />
          <circle cx="177" cy="582" r="1.5" fill="#D4AF37" />
          <line x1="169" y1="588" x2="185" y2="588" stroke={cherryColor} strokeWidth="2.2" />
          <circle cx="177" cy="588" r="1.5" fill="#D4AF37" />
        </g>
        {/* Right Mary Jane */}
        <g className="mj-right">
          <rect x="211" y="602" width="24" height="6" rx="2" fill="#1A1822" stroke={darkOutline} strokeWidth="1.1" />
          <path d="M212 592 C212 602, 218 605, 224 605 C230 605, 234 602, 234 592 Z" fill={cherryColor} stroke={darkOutline} strokeWidth="1.2" />
          {/* Double Buckle Straps */}
          <line x1="214" y1="582" x2="232" y2="582" stroke={cherryColor} strokeWidth="2.2" />
          <circle cx="223" cy="582" r="1.5" fill="#D4AF37" />
          <line x1="215" y1="588" x2="231" y2="588" stroke={cherryColor} strokeWidth="2.2" />
          <circle cx="223" cy="588" r="1.5" fill="#D4AF37" />
        </g>
      </g>
    );
  }

  // ================= 2d. GUỐC MỘC GÓT VUỐT CONG SƠN MÀI =================
  if (id === 'footwear_guoc_son_mai') {
    const lacquerColor = colorHex || '#B8001F';
    return (
      <g className="footwear-guoc-son-mai">
        <g className="guoc-left">
          {/* Curved Lacquer Wooden Heel */}
          <path d="M170 580 C166 595, 172 605, 186 605 L188 595 C180 595, 175 590, 176 580 Z" fill="#6B1D2F" stroke={darkOutline} strokeWidth="1.1" />
          {/* High Gloss Lacquer Vamp */}
          <path d="M166 592 C166 604, 172 607, 179 607 C186 607, 189 604, 188 592 Z" fill={lacquerColor} stroke={darkOutline} strokeWidth="1.2" />
          {/* Gold Inlay Detail */}
          <path d="M172 595 Q178 602 184 595" stroke="#D4AF37" strokeWidth="1.2" fill="none" />
        </g>
        <g className="guoc-right">
          {/* Curved Lacquer Wooden Heel */}
          <path d="M230 580 C234 595, 228 605, 214 605 L212 595 C220 595, 225 590, 224 580 Z" fill="#6B1D2F" stroke={darkOutline} strokeWidth="1.1" />
          {/* High Gloss Lacquer Vamp */}
          <path d="M211 592 C210 604, 214 607, 221 607 C228 607, 234 604, 234 592 Z" fill={lacquerColor} stroke={darkOutline} strokeWidth="1.2" />
          {/* Gold Inlay Detail */}
          <path d="M216 595 Q222 602 228 595" stroke="#D4AF37" strokeWidth="1.2" fill="none" />
        </g>
      </g>
    );
  }

  // ================= 2e. BOOTS DA CỔ LỬNG CHELSEA BOOTS =================
  if (id === 'footwear_chelsea_boots' || id === 'footwear_boots_01') {
    return (
      <g className="footwear-chelsea-boots">
        {/* Left Chelsea Boot */}
        <g className="boot-left">
          <rect x="164" y="602" width="26" height="6" rx="2" fill="#0D0B12" stroke={darkOutline} strokeWidth="1.2" />
          <path d="M165 602 L167 550 L187 550 L189 602 Z" fill="#1C1917" stroke={darkOutline} strokeWidth="1.2" />
          {/* Elastic Side Gusset */}
          <polygon points="174,555 180,555 178,585 176,585" fill="#44403C" />
        </g>
        {/* Right Chelsea Boot */}
        <g className="boot-right">
          <rect x="210" y="602" width="26" height="6" rx="2" fill="#0D0B12" stroke={darkOutline} strokeWidth="1.2" />
          <path d="M211 602 L213 550 L233 550 L235 602 Z" fill="#1C1917" stroke={darkOutline} strokeWidth="1.2" />
          {/* Elastic Side Gusset */}
          <polygon points="220,555 226,555 224,585 222,585" fill="#44403C" />
        </g>
      </g>
    );
  }

  // ================= 4. GIÀY LOAFER DA ĐEN / ĐÍNH KHÓA KIM LOẠI (DEFAULT) =================
  const isMetalBuckle = id === 'footwear_loafer_metal_buckle';
  return (
    <g className="footwear-loafer">
      {/* Left Loafer */}
      <g className="loafer-left">
        <path
          d="M165 593 
             C165 604, 172 608, 179 608 
             C186 608, 190 604, 189 593 
             Z"
          fill="#111827"
          stroke={darkOutline}
          strokeWidth="1.2"
        />
        <path d="M168 596 Q174 603 178 604" stroke="rgba(255,255,255,0.3)" strokeWidth="1" fill="none" />
        <rect x="171" y="595" width="11" height={isMetalBuckle ? 3.5 : 2.8} rx="1.4" fill="#D4AF37" stroke="#7F5539" strokeWidth="0.8" />
        {isMetalBuckle && <line x1="176" y1="594" x2="176" y2="600" stroke="#FFF275" strokeWidth="1" />}
      </g>

      {/* Right Loafer */}
      <g className="loafer-right">
        <path
          d="M211 593 
             C210 604, 214 608, 221 608 
             C228 608, 235 604, 235 593 
             Z"
          fill="#111827"
          stroke={darkOutline}
          strokeWidth="1.2"
        />
        <path d="M222 604 Q226 603 232 596" stroke="rgba(255,255,255,0.3)" strokeWidth="1" fill="none" />
        <rect x="218" y="595" width="11" height={isMetalBuckle ? 3.5 : 2.8} rx="1.4" fill="#D4AF37" stroke="#7F5539" strokeWidth="0.8" />
        {isMetalBuckle && <line x1="223" y1="594" x2="223" y2="600" stroke="#FFF275" strokeWidth="1" />}
      </g>
    </g>
  );
};
