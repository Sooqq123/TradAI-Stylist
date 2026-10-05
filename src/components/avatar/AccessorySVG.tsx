/**
 * AccessorySVG Component - Minh Họa Toàn Bộ Phụ Kiện Đạt Chuẩn Thời Trang Vector 2D
 * - Khăn vấn nhung / Nón lá Huế / Mũ Beret: Khớp hoàn hảo với phom đầu và mái tóc mới.
 * - Kính mắt Y2K: Tọa lạc chuẩn xác trên sống mũi và đôi mắt phượng.
 * - Quạt xếp nan tre hoa sen: Cầm tự nhiên nơi bàn tay phải với ngón tay thon thả.
 * - Túi xách canvas / Túi cói đan tay: Quai vắt duyên dáng qua cổ tay trái.
 * - Chuỗi ngọc trai / Tai nghe retro: Ôm sát vòng cổ thanh thoát.
 * - Vòng ngọc bội phỉ thúy: Treo trang nhã bên sườn áo.
 */

import React from 'react';

interface AccessorySVGProps {
  id: string;
  colorHex?: string;
}

export const AccessorySVG: React.FC<AccessorySVGProps> = ({ id, colorHex }) => {
  const rawId = React.useId();
  const safeId = rawId.replace(/[^a-zA-Z0-9_-]/g, '');
  const darkOutline = '#1A1114';

  // ================= 1. KHĂN VẤN NHUNG (CROWNING TURBAN) =================
  if (id === 'headwear_khanvan_01') {
    const velvetColor = colorHex || '#4A181E';
    return (
      <g className="acc-khanvan">
        {/* Multi-layered Wrapped Velvet Turban (Nếp vấn vải nhung sang quý) */}
        <path
          d="M164 74 
             C162 40, 238 40, 236 74 
             C240 78, 238 86, 232 86 
             C230 48, 170 48, 168 86 
             C162 86, 160 78, 164 74 
             Z"
          fill={velvetColor}
          stroke={darkOutline}
          strokeWidth="1.2"
        />

        {/* Concentric Layered Folds (Từng tầng nếp vấn đều đặn) */}
        <path d="M168 70 C172 48, 228 48, 232 70" stroke="#7A2D37" strokeWidth="2.2" fill="none" opacity="0.8" />
        <path d="M171 76 C175 56, 225 56, 229 76" stroke="#9A3D4A" strokeWidth="1.8" fill="none" opacity="0.7" />
        <path d="M174 82 C178 64, 222 64, 226 82" stroke="#B24D5B" strokeWidth="1.4" fill="none" opacity="0.6" />

        {/* Traditional Gold Filigree Jewel at Center (Ngọc bội cài đỉnh đầu) */}
        <circle cx="200" cy="46" r="3.2" fill="#D4AF37" stroke="#7F5539" strokeWidth="0.8" />
        <circle cx="200" cy="46" r="1.4" fill="#FFF275" />
      </g>
    );
  }

  // ================= 2. NÓN LÁ XỨ HUẾ (BÀI THƠ) =================
  if (id === 'headwear_nonla_01') {
    return (
      <g className="acc-nonla">
        {/* Flowing Silk Chin Tie Ribbon (Dải lụa đỏ thắt duyên dáng dưới cằm) */}
        <path
          d="M166 84 
             C176 130, 185 170, 200 170 
             C215 170, 224 130, 234 84"
          stroke="#C53030"
          strokeWidth="2.4"
          strokeLinecap="round"
          fill="none"
        />
        {/* Soft Ribbon Knot Under Chin */}
        <ellipse cx="200" cy="170" rx="3.5" ry="2.5" fill="#C53030" />
        <path d="M198 171 Q194 185 192 195" stroke="#C53030" strokeWidth="2" fill="none" />
        <path d="M202 171 Q206 185 208 195" stroke="#C53030" strokeWidth="2" fill="none" />

        {/* Conical Body of Non La (Thân nón lá chóp nhọn chuẩn tỷ lệ) */}
        <path
          d="M200 24 
             L124 88 
             C165 98, 235 98, 276 88 
             Z"
          fill="#FAF8F5"
          stroke={darkOutline}
          strokeWidth="1.2"
        />

        {/* Concentric Bamboo Ribs (Các vành nan tre uốn tinh xảo) */}
        <path d="M136 78 Q200 89 264 78" stroke="#D5CEBE" strokeWidth="0.9" fill="none" />
        <path d="M150 67 Q200 78 250 67" stroke="#D5CEBE" strokeWidth="0.9" fill="none" />
        <path d="M165 54 Q200 64 235 54" stroke="#D5CEBE" strokeWidth="0.9" fill="none" />
        <path d="M182 40 Q200 48 218 40" stroke="#D5CEBE" strokeWidth="0.9" fill="none" />

        {/* Tip Peak Stitch Knot */}
        <circle cx="200" cy="24" r="2.5" fill="#D5CEBE" stroke={darkOutline} strokeWidth="0.8" />

        {/* Bamboo Leaf Shading Pattern */}
        <path d="M160 74 L175 83 M225 83 L240 74" stroke="#E8E2D5" strokeWidth="1" fill="none" />
      </g>
    );
  }

  // ================= 3. MŨ BERET INDOCHINE =================
  if (id === 'headwear_beret_01') {
    return (
      <g className="acc-beret">
        {/* Chic Tilted Wool Felt Body */}
        <path
          d="M162 76 
             C158 52, 234 40, 244 68 
             C248 80, 236 86, 222 86 
             C192 86, 166 86, 162 76 
             Z"
          fill="#2B2D42"
          stroke={darkOutline}
          strokeWidth="1.2"
        />
        {/* Beret Stalk */}
        <line x1="210" y1="52" x2="212" y2="45" stroke="#2B2D42" strokeWidth="2.4" strokeLinecap="round" />
        {/* Soft Highlight */}
        <path d="M174 65 Q212 55 236 68" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" fill="none" />
      </g>
    );
  }

  // ================= 4. KÍNH RÂM OVAL Y2K =================
  if (id === 'acc_kinhram_y2k') {
    return (
      <g className="acc-glasses">
        {/* Left Oval Lens */}
        <ellipse cx="186" cy="114" rx="10" ry="6.5" fill="#181A20" stroke="#CED4DA" strokeWidth="1.5" />
        {/* Left Lens Diagonal Glare Streak */}
        <path d="M181 112 L190 109" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />

        {/* Sleek Nose Bridge */}
        <path d="M196 114 Q200 111 204 114" stroke="#CED4DA" strokeWidth="1.5" fill="none" />

        {/* Right Oval Lens */}
        <ellipse cx="214" cy="114" rx="10" ry="6.5" fill="#181A20" stroke="#CED4DA" strokeWidth="1.5" />
        {/* Right Lens Diagonal Glare Streak */}
        <path d="M209 112 L218 109" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />

        {/* Silver Temples / Side Arms */}
        <line x1="176" y1="114" x2="169" y2="112" stroke="#CED4DA" strokeWidth="1.4" />
        <line x1="224" y1="114" x2="231" y2="112" stroke="#CED4DA" strokeWidth="1.4" />
      </g>
    );
  }

  // ================= 5. QUẠT XẾP NAN TRE HOA SEN (BÀN TAY PHẢI) =================
  if (id === 'acc_quatxep_01') {
    return (
      <g className="acc-fan">
        {/* Fan Pivot (Điểm chốt nan tre cầm chuẩn trong lòng bàn tay phải X=247, Y=365) */}
        <circle cx="247" cy="365" r="3.2" fill="#856404" stroke="#493202" strokeWidth="0.8" />
        <circle cx="247" cy="365" r="1.4" fill="#D4AF37" />

        {/* Open Fan Blades (Bề mặt nan quạt xòe tự nhiên hướng chéo lên trên) */}
        <path
          d="M247 365 
             L238 305 
             C268 290, 298 302, 312 328 
             Z"
          fill="#F4E0A5"
          stroke={darkOutline}
          strokeWidth="1.2"
        />

        {/* Painted Pink Lotus Blossom (Họa tiết hoa sen hồng thanh cao) */}
        <path
          d="M266 316 
             C272 302, 278 302, 284 316 
             C278 325, 272 325, 266 316 
             Z"
          fill="#E76F51"
        />
        <circle cx="275" cy="314" r="2.2" fill="#FFF275" />

        {/* Radiating Bamboo Ribs (Hệ nan tre tỏa đều từ tâm chốt tay phải) */}
        <line x1="247" y1="365" x2="238" y2="305" stroke="#B08968" strokeWidth="1.4" />
        <line x1="247" y1="365" x2="256" y2="296" stroke="#B08968" strokeWidth="0.9" />
        <line x1="247" y1="365" x2="274" y2="294" stroke="#B08968" strokeWidth="0.9" />
        <line x1="247" y1="365" x2="294" y2="308" stroke="#B08968" strokeWidth="0.9" />
        <line x1="247" y1="365" x2="312" y2="328" stroke="#B08968" strokeWidth="1.4" />

        {/* Silk Tassel (Tua rua lụa đỏ thướt tha rủ thẳng đứng xuống theo trọng lực) */}
        {/* Silk cord */}
        <line x1="247" y1="368" x2="247" y2="395" stroke="#C53030" strokeWidth="2.2" strokeLinecap="round" />
        <circle cx="247" cy="371" r="2.2" fill="#D4AF37" />
        {/* Tassel head cap */}
        <rect x="245" y="393" width="4" height="4" rx="1" fill="#D4AF37" />
        {/* Flowing silk tassel brush */}
        <path
          d="M245 397 L244 416 M247 397 L247 418 M249 397 L250 416"
          stroke="#C53030"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </g>
    );
  }

  // ================= 6. TÚI CANVAS / TÚI CÓI (CỔ TAY TRÁI) =================
  if (id === 'acc_tote_01' || id === 'acc_tuicoi_01') {
    const isStraw = id === 'acc_tuicoi_01';
    const bagColor = isStraw ? '#DDA15E' : '#F4F1DE';
    const strapColor = isStraw ? '#9C5823' : '#3D405B';

    return (
      <g className="acc-bag">
        {/* Bag Strap draped gracefully over left wrist at (X=153, Y=340) */}
        <path
          d="M153 340 
             C144 348, 138 364, 138 382 
             L145 382 
             C145 368, 149 354, 153 347 
             C157 354, 161 368, 161 382 
             L168 382 
             C168 364, 162 348, 153 340 
             Z"
          stroke={strapColor}
          strokeWidth="2.2"
          strokeLinecap="round"
          fill="none"
        />

        {/* Bag Body - Hanging straight down along left hip/thigh */}
        <rect
          x="130"
          y="380"
          width="44"
          height="52"
          rx="5"
          fill={bagColor}
          stroke={darkOutline}
          strokeWidth="1.2"
        />

        {/* Texture detail */}
        {isStraw ? (
          <g className="straw-texture">
            <line x1="132" y1="393" x2="172" y2="393" stroke="#BC6C25" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="132" y1="406" x2="172" y2="406" stroke="#BC6C25" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="132" y1="419" x2="172" y2="419" stroke="#BC6C25" strokeWidth="1" strokeDasharray="3 3" />
          </g>
        ) : (
          <text
            x="152"
            y="410"
            fontSize="7.5"
            fontWeight="bold"
            fill="#3D405B"
            textAnchor="middle"
            fontFamily="sans-serif"
            letterSpacing="0.8"
          >
            SÀI GÒN
          </text>
        )}
      </g>
    );
  }

  // ================= 7. DÂY CHUYỀN NGỌC TRAI =================
  if (id === 'acc_daychuyen_ngoctrai') {
    return (
      <g className="acc-necklace">
        {/* Pearl Arc around the neck */}
        <path
          d="M188 186 Q200 204 212 186"
          stroke="#FFFFFF"
          strokeWidth="3.6"
          strokeDasharray="2.2 2.6"
          strokeLinecap="round"
          fill="none"
        />
        {/* Drop Pearl Pendant at Center */}
        <circle cx="200" cy="202" r="3.2" fill="#FFFFFF" stroke="#CED4DA" strokeWidth="0.8" />
        <circle cx="200.8" cy="201.2" r="1.1" fill="#FFFFFF" />
      </g>
    );
  }

  // ================= 8. TAI NGHE RETRO INDIE =================
  if (id === 'acc_headphones_retro') {
    return (
      <g className="acc-headphones">
        {/* Metallic Headband resting comfortably on neck */}
        <path
          d="M174 186 Q200 208 226 186"
          stroke="#CED4DA"
          strokeWidth="3"
          fill="none"
        />
        {/* Left Orange/Black Foam Earpad */}
        <rect x="164" y="178" width="12" height="20" rx="6" fill="#F77F00" stroke={darkOutline} strokeWidth="1" />
        {/* Right Earpad */}
        <rect x="224" y="178" width="12" height="20" rx="6" fill="#F77F00" stroke={darkOutline} strokeWidth="1" />
      </g>
    );
  }

  // ================= 9. VÒNG NGỌC BỘI PHỈ THÚY =================
  if (id === 'acc_vongngoc_01') {
    return (
      <g className="acc-jade">
        {/* Silk Suspension Cord */}
        <line x1="228" y1="285" x2="234" y2="315" stroke="#C53030" strokeWidth="1.6" />
        {/* Jade Donut Disc (Ngọc Bội Bình An) */}
        <circle cx="235" cy="324" r="7.5" fill="#52B788" stroke="#1B4332" strokeWidth="1.2" />
        <circle cx="235" cy="324" r="3.2" fill="#F8F9FA" stroke="#1B4332" strokeWidth="0.9" />
        {/* Specular Lustre */}
        <path d="M233 319 Q237 319 238 322" stroke="rgba(255,255,255,0.7)" strokeWidth="1.2" fill="none" />
        {/* Silk Hanging Tassel */}
        <line x1="235" y1="332" x2="235" y2="348" stroke="#C53030" strokeWidth="1.8" />
      </g>
    );
  }

  // ================= 10. NÓN QUAI THAO KINH BẮC (NÓN BA TẦM) =================
  if (id === 'headwear_nonquaithao_01') {
    const strawBase = colorHex || '#E9D8A6';
    return (
      <g className="acc-nonquaithao">
        <defs>
          <linearGradient id={`strawGrad-${safeId}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FBF4E6" />
            <stop offset="45%" stopColor={strawBase} />
            <stop offset="100%" stopColor="#D2B17B" />
          </linearGradient>
          <linearGradient id={`ribbonGrad-${safeId}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#8A2846" />
            <stop offset="50%" stopColor="#B55D68" />
            <stop offset="100%" stopColor="#671D32" />
          </linearGradient>
        </defs>

        {/* 1. Dải Quai Thao lụa tơ tằm mềm mại rủ hai bên ngực */}
        {/* Dải quai bên trái (Left flowing silk ribbon) */}
        <path
          d="M162 68 
             C155 105, 160 150, 168 190 
             C172 212, 178 234, 180 252 
             L184 251 
             C182 233, 176 211, 172 189 
             C164 149, 159 105, 166 68 
             Z"
          fill={`url(#ribbonGrad-${safeId})`}
          stroke="#4A1525"
          strokeWidth="0.6"
        />
        {/* Left tassel & gold bead knot */}
        <circle cx="182" cy="252" r="3.2" fill="#D4AF37" stroke="#7F5539" strokeWidth="0.7" />
        <path
          d="M180 255 L178 278 M182 255 L182 280 M184 255 L186 278"
          stroke="#B55D68"
          strokeWidth="1.6"
          strokeLinecap="round"
        />

        {/* Dải quai bên phải (Right flowing silk ribbon) */}
        <path
          d="M238 68 
             C245 105, 240 150, 232 190 
             C228 212, 222 234, 220 252 
             L216 251 
             C218 233, 224 211, 228 189 
             C236 149, 241 105, 234 68 
             Z"
          fill={`url(#ribbonGrad-${safeId})`}
          stroke="#4A1525"
          strokeWidth="0.6"
        />
        {/* Right tassel & gold bead knot */}
        <circle cx="218" cy="252" r="3.2" fill="#D4AF37" stroke="#7F5539" strokeWidth="0.7" />
        <path
          d="M216 255 L214 278 M218 255 L218 280 M220 255 L222 278"
          stroke="#B55D68"
          strokeWidth="1.6"
          strokeLinecap="round"
        />

        {/* 2. Dáng nón tròn dẹt rộng vành (Nón Ba Tầm / Quai Thao) */}
        {/* Đáy vành nón (Rim depth / shadow under brim) */}
        <ellipse cx="200" cy="62" rx="84" ry="18" fill="#C6A778" stroke={darkOutline} strokeWidth="1.2" />

        {/* Thân nón dẹt chính (Main flat round hat disc) */}
        <ellipse cx="200" cy="56" rx="84" ry="18" fill={`url(#strawGrad-${safeId})`} stroke={darkOutline} strokeWidth="1.2" />

        {/* Thành nón viền dày đan cói mộc */}
        <path
          d="M116 56 C116 74, 284 74, 284 56 L284 62 C284 80, 116 80, 116 62 Z"
          fill="#DDB880"
          stroke={darkOutline}
          strokeWidth="1"
        />

        {/* Từng tầng nan cói đồng tâm đan tinh xảo */}
        <ellipse cx="200" cy="56" rx="72" ry="15" fill="none" stroke="#C8A56E" strokeWidth="0.9" strokeDasharray="3 2" />
        <ellipse cx="200" cy="56" rx="58" ry="12" fill="none" stroke="#C8A56E" strokeWidth="0.9" />
        <ellipse cx="200" cy="56" rx="44" ry="9" fill="none" stroke="#C8A56E" strokeWidth="0.8" strokeDasharray="2 2" />
        <ellipse cx="200" cy="56" rx="30" ry="6.5" fill="none" stroke="#C8A56E" strokeWidth="0.8" />

        {/* Nan cói xuyên tâm đan tăm (Woven radiating stitches) */}
        <line x1="126" y1="56" x2="156" y2="56" stroke="#B89358" strokeWidth="0.8" opacity="0.7" />
        <line x1="244" y1="56" x2="274" y2="56" stroke="#B89358" strokeWidth="0.8" opacity="0.7" />
        <line x1="145" y1="48" x2="165" y2="52" stroke="#B89358" strokeWidth="0.8" opacity="0.7" />
        <line x1="255" y1="48" x2="235" y2="52" stroke="#B89358" strokeWidth="0.8" opacity="0.7" />
        <line x1="145" y1="64" x2="165" y2="60" stroke="#B89358" strokeWidth="0.8" opacity="0.7" />
        <line x1="255" y1="64" x2="235" y2="60" stroke="#B89358" strokeWidth="0.8" opacity="0.7" />

        {/* Vòm bồ đài trung tâm nón (Center crown dome) */}
        <ellipse cx="200" cy="53" rx="18" ry="5.5" fill="#E2C593" stroke="#A98045" strokeWidth="0.9" />
        <circle cx="200" cy="52" r="2" fill="#D4AF37" />
      </g>
    );
  }



  // ================= 12. TÚI KẸP NÁCH DA BÓNG Y2K (SILVER METALLIC BAGUETTE) =================
  if (id === 'acc_silver_shoulder_bag') {
    return (
      <g className="acc-silver-baguette">
        <defs>
          <linearGradient id={`patentSilver-${safeId}`} x1="0%" y1="0%" x2="100%" y2="80%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="30%" stopColor="#E2E8F0" />
            <stop offset="55%" stopColor="#CBD5E1" />
            <stop offset="85%" stopColor="#94A3B8" />
            <stop offset="100%" stopColor="#64748B" />
          </linearGradient>
          <linearGradient id={`patentGlare-${safeId}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.85)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.15)" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>

        {/* Short shoulder strap hugging naturally over left shoulder & under arm */}
        <path
          d="M148 180 
             C138 186, 126 198, 128 218 
             L134 218 
             C132 201, 142 191, 150 184 
             Z"
          fill="#CBD5E1"
          stroke="#475569"
          strokeWidth="0.8"
        />
        {/* Metal grommets/eyelets on strap */}
        <circle cx="138" cy="191" r="1.4" fill="#F8FAFC" stroke="#475569" strokeWidth="0.6" />
        <circle cx="132" cy="201" r="1.4" fill="#F8FAFC" stroke="#475569" strokeWidth="0.6" />
        <circle cx="130" cy="211" r="1.4" fill="#F8FAFC" stroke="#475569" strokeWidth="0.6" />

        {/* Ambient shadow behind the bag on the side body */}
        <rect x="122" y="217" width="46" height="28" rx="8" fill="rgba(0,0,0,0.18)" />

        {/* Baguette Bag Body - Compact sleek curved patent leather */}
        <path
          d="M124 216 
             C124 213, 166 213, 166 216 
             L168 238 
             C168 245, 122 245, 122 238 
             Z"
          fill={`url(#patentSilver-${safeId})`}
          stroke="#334155"
          strokeWidth="1.2"
        />

        {/* High-gloss Patent Leather Diagonal Glare Streaks */}
        <path
          d="M128 217 L142 217 L132 243 L125 241 Z"
          fill={`url(#patentGlare-${safeId})`}
        />
        <path
          d="M148 217 L158 217 L152 243 L144 243 Z"
          fill="rgba(255,255,255,0.4)"
        />

        {/* Top Zipper Track & Metallic Pull Tab */}
        <line x1="126" y1="216" x2="164" y2="216" stroke="#475569" strokeWidth="1.6" strokeDasharray="1.5 1" />
        <circle cx="127" cy="216" r="2" fill="#E2E8F0" stroke="#334155" strokeWidth="0.6" />
        <line x1="127" y1="218" x2="126" y2="225" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />

        {/* Center Metal Hardware Clasp / Designer Plate */}
        <rect x="141" y="226" width="8" height="6" rx="1.5" fill="#F8FAFC" stroke="#334155" strokeWidth="0.8" />
        <line x1="143" y1="229" x2="147" y2="229" stroke="#64748B" strokeWidth="0.9" />

        {/* Bottom piping / seam reinforcement */}
        <path d="M124 238 Q145 244 166 238" stroke="#64748B" strokeWidth="1" fill="none" />
      </g>
    );
  }

  // ================= 13. KÍNH RÂM MA TRẬN GỌNG VUỐT BẠC CYBERPUNK =================
  if (id === 'acc_futuristic_cyber_shades') {
    return (
      <g className="acc-cyber-shades">
        <defs>
          <linearGradient id={`shadesLens-${safeId}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0F172A" />
            <stop offset="60%" stopColor="#1E293B" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>
          <linearGradient id={`mirrorStreak-${safeId}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="30%" stopColor="#38BDF8" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="70%" stopColor="#38BDF8" stopOpacity="0.85" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>

        {/* Left Temple Wing Arm (Vuốt nhọn ôm gò má ra thái dương) */}
        <line x1="162" y1="102" x2="170" y2="104" stroke="#CBD5E1" strokeWidth="1.8" strokeLinecap="round" />
        {/* Right Temple Wing Arm */}
        <line x1="238" y1="102" x2="230" y2="104" stroke="#CBD5E1" strokeWidth="1.8" strokeLinecap="round" />

        {/* Left Angular Matrix Winged Lens */}
        <polygon
          points="162,102 195,103 194,112 178,114 165,108"
          fill={`url(#shadesLens-${safeId})`}
          stroke="#E2E8F0"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />

        {/* Right Angular Matrix Winged Lens */}
        <polygon
          points="238,102 205,103 206,112 222,114 235,108"
          fill={`url(#shadesLens-${safeId})`}
          stroke="#E2E8F0"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />

        {/* Monobrow Titanium Upper Frame Bar */}
        <path
          d="M161 101 Q200 102 239 101"
          stroke="#F8FAFC"
          strokeWidth="1.8"
          strokeLinecap="round"
          fill="none"
        />

        {/* Cyberpunk Dynamic Mirror Glare Streaks */}
        <line x1="168" y1="106" x2="192" y2="106" stroke={`url(#mirrorStreak-${safeId})`} strokeWidth="1.6" strokeLinecap="round" />
        <line x1="208" y1="106" x2="232" y2="106" stroke={`url(#mirrorStreak-${safeId})`} strokeWidth="1.6" strokeLinecap="round" />

        {/* Precision Nose Bridge hugging mannequin nose */}
        <path
          d="M194 104 C197 102, 203 102, 206 104"
          stroke="#F8FAFC"
          strokeWidth="1.6"
          fill="none"
        />
        {/* Micro nose pad accents */}
        <circle cx="197" cy="107" r="0.9" fill="#94A3B8" />
        <circle cx="203" cy="107" r="0.9" fill="#94A3B8" />
      </g>
    );
  }

  // ================= 14. VÒNG CỔ NGỌC TRAI MIX XÍCH PUNK (PEARL PUNK CHOKER) =================
  if (id === 'acc_pearl_punk_choker') {
    return (
      <g className="acc-pearl-punk-choker">
        <defs>
          <radialGradient id={`pearlShine-${safeId}`} cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="45%" stopColor="#F8FAFC" />
            <stop offset="85%" stopColor="#E2E8F0" />
            <stop offset="100%" stopColor="#CBD5E1" />
          </radialGradient>
        </defs>

        {/* Neck contour shadow */}
        <path d="M190 152 Q200 158 210 152" stroke="rgba(0,0,0,0.2)" strokeWidth="4" fill="none" />

        {/* Right side: Industrial Punk Curb Chain Links (Mắt xích bạc kim loại) */}
        <path
          d="M200 157 C204 156, 208 155, 211 152"
          stroke="#94A3B8"
          strokeWidth="3.2"
          strokeDasharray="2.8 1.8"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M200 157 C204 156, 208 155, 211 152"
          stroke="#F8FAFC"
          strokeWidth="1.2"
          strokeDasharray="2.8 1.8"
          strokeLinecap="round"
          fill="none"
        />

        {/* Left side: Pure luminous natural pearl beads (Hạt ngọc trai tự nhiên đài các) */}
        <circle cx="190" cy="151" r="2.5" fill={`url(#pearlShine-${safeId})`} stroke="#CBD5E1" strokeWidth="0.5" />
        <circle cx="189.5" cy="150.3" r="0.7" fill="#FFFFFF" />

        <circle cx="193" cy="153" r="2.7" fill={`url(#pearlShine-${safeId})`} stroke="#CBD5E1" strokeWidth="0.5" />
        <circle cx="192.3" cy="152.2" r="0.8" fill="#FFFFFF" />

        <circle cx="196.5" cy="155.5" r="2.9" fill={`url(#pearlShine-${safeId})`} stroke="#CBD5E1" strokeWidth="0.5" />
        <circle cx="195.8" cy="154.6" r="0.9" fill="#FFFFFF" />

        {/* Center Fusion Junction: Statement pearl + Punk charm */}
        <circle cx="200" cy="157" r="3.2" fill={`url(#pearlShine-${safeId})`} stroke="#94A3B8" strokeWidth="0.7" />
        <circle cx="199" cy="156" r="1" fill="#FFFFFF" />

        {/* Punk Mini Safety-Pin / Padlock Hardware Pendant dangling at center */}
        {/* Jump ring */}
        <circle cx="200" cy="161" r="1.5" fill="none" stroke="#E2E8F0" strokeWidth="0.9" />
        {/* Safety pin body */}
        <path
          d="M198 162 L198 171 L202 171 L202 165 Z"
          fill="#CBD5E1"
          stroke="#475569"
          strokeWidth="0.7"
        />
        {/* Metallic clasp head */}
        <rect x="197" y="169" width="6" height="3" rx="1" fill="#F8FAFC" stroke="#334155" strokeWidth="0.6" />
      </g>
    );
  }

  // Fallback: Elegant Heritage / Modern Pendant Jewel (Tránh màn hình đen cho bất kỳ phụ kiện mới nào)
  return (
    <g className="acc-fallback">
      <circle cx="200" cy="180" r="10" fill={colorHex || '#D4AF37'} stroke="#2B2D42" strokeWidth="1.2" opacity="0.85" />
      <circle cx="200" cy="180" r="5" fill="#FFFFFF" opacity="0.6" />
    </g>
  );
};
