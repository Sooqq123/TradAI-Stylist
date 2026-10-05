/**
 * AvatarBase Component - Người Mẫu Vector 2D Chuẩn Mực Cao Cấp (Haute Couture Female Mannequin)
 * Phom Nữ: Nữ tính, V-line, mắt phượng mí đôi, môi mọng san hô, má hồng đào và suối tóc suôn mềm sau vai.
 *
 * Tích hợp đường viền bóng đổ nhẹ (drop shadow) ở cổ, nách và mạn sườn để tạo chiều sâu tự nhiên,
 * khắc phục hoàn toàn hiện tượng trang phục nhìn như miếng dán đè lên người mẫu.
 *
 * Coordinate system: viewBox="0 0 400 640".
 */

import React from 'react';

interface AvatarBaseProps {
  gender?: 'nam' | 'nu' | 'unisex';
  skinTone?: string;
  hairColor?: string;
  underwearColor?: string;
  showUnderwear?: boolean;
  showHeadband?: boolean;
}

export const AvatarBase: React.FC<AvatarBaseProps> = ({
  gender = 'nu',
  skinTone = '#F6D2BD',
  hairColor = '#1A1822',
  underwearColor = '#242132',
  showUnderwear = true,
  showHeadband = true,
}) => {
  const rawId = React.useId();
  const safeId = rawId.replace(/[^a-zA-Z0-9_-]/g, '');

  const blushGradId = `blush-${safeId}`;
  const lipGradId = `lip-${safeId}`;
  const neckShadowId = `neck-shadow-${safeId}`;
  const irisGradId = `iris-${safeId}`;

  return (
    <g className="avatar-base avatar-female">
      <defs>
        {/* Soft Radial Peach Blush */}
        <radialGradient id={blushGradId} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#E56A6F" stopOpacity="0.45" />
          <stop offset="60%" stopColor="#E56A6F" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#E56A6F" stopOpacity="0" />
        </radialGradient>

        {/* Coral-Rose Luscious Lip Gradient */}
        <linearGradient id={lipGradId} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#BA3745" />
          <stop offset="45%" stopColor="#CD4A57" />
          <stop offset="100%" stopColor="#9C2430" />
        </linearGradient>

        {/* Soft Chin Shadow on Slender Neck */}
        <linearGradient id={neckShadowId} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#D59582" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#D59582" stopOpacity="0" />
        </linearGradient>

        {/* Warm Espresso Iris Gradient */}
        <radialGradient id={irisGradId} cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#5A3428" />
          <stop offset="65%" stopColor="#351D16" />
          <stop offset="100%" stopColor="#1E0E0A" />
        </radialGradient>
      </defs>

      {/* 0. Ambient Ground Shadow */}
      <ellipse cx="200" cy="614" rx="80" ry="7" fill="rgba(10, 4, 8, 0.4)" />
      <ellipse cx="200" cy="614" rx="46" ry="4" fill="rgba(10, 4, 8, 0.3)" />

      {/* 1. Back Hair (Tóc sau đầu Nữ) */}
      <g className="avatar-back-hair">
        {/* Cranium Base */}
        <ellipse cx="200" cy="72" rx="34" ry="26" fill={hairColor} />

        {/* Sleek Hair Flowing Silhouette behind Neck and Shoulders */}
        <g className="female-hair-back">
          <path
            d="M168 62 
               C156 78, 150 105, 150 138 
               C150 170, 154 205, 160 228 
               C164 232, 172 228, 176 210 
               C182 185, 184 155, 188 138 
               L212 138 
               C216 155, 218 185, 224 210 
               C228 228, 236 232, 240 228 
               C246 205, 250 170, 250 138 
               C250 105, 244 78, 232 62 
               Z"
            fill={hairColor}
          />
          {/* Subtle Strand Highlights */}
          <path d="M154 135 C154 170, 158 200, 162 222" stroke="#2D2838" strokeWidth="1" fill="none" opacity="0.6" />
          <path d="M246 135 C246 170, 242 200, 238 222" stroke="#2D2838" strokeWidth="1" fill="none" opacity="0.6" />
        </g>
      </g>

      {/* 2. Ears (Đôi vành tai hai bên mặt Nữ) */}
      <g className="avatar-ears">
        {/* Left Ear */}
        <path
          d="M169 98 C165 100, 163 110, 166 117 C168 120, 171 120, 172 116 Z"
          fill={skinTone}
          stroke="#E2A692"
          strokeWidth="0.8"
        />
        {/* Right Ear */}
        <path
          d="M231 98 C235 100, 237 110, 234 117 C232 120, 229 120, 228 116 Z"
          fill={skinTone}
          stroke="#E2A692"
          strokeWidth="0.8"
        />
      </g>

      {/* 3. Legs Base (Đôi chân thon gọn phom Nữ) */}
      <g className="avatar-legs">
        {/* Left Leg */}
        <path
          d="M174 300 
             C172 340, 172 385, 174 430 
             C175 465, 172 505, 174 555 
             L188 555 
             C191 505, 191 465, 193 430 
             C195 385, 196 340, 198 320 
             Z"
          fill={skinTone}
        />
        {/* Right Leg */}
        <path
          d="M202 320 
             C204 340, 205 385, 207 430 
             C209 465, 209 505, 212 555 
             L226 555 
             C228 505, 225 465, 226 430 
             C228 385, 228 340, 226 300 
             Z"
          fill={skinTone}
        />

        {/* Bare Feet */}
        <path
          d="M173 555 C171 572, 169 588, 173 598 C176 601, 187 601, 189 597 C191 585, 191 572, 189 555 Z"
          fill={skinTone}
        />
        <path
          d="M211 555 C209 572, 209 585, 211 597 C213 601, 224 601, 227 598 C231 588, 229 572, 227 555 Z"
          fill={skinTone}
        />
      </g>

      {/* 4. Neutral Undergarments (Nội y cạp cao thanh lịch phom Nữ) */}
      {showUnderwear && (
        <path
          d="M174 256 
             C168 276, 166 298, 170 322 
             C180 325, 192 325, 198 318 
             L200 312 
             L202 318 
             C208 325, 220 325, 230 322 
             C234 298, 232 276, 226 256 
             Z"
          fill={underwearColor}
          stroke="#D8D0C8"
          strokeWidth="1"
        />
      )}

      {/* 5. Torso Silhouette (Thân trên thanh mảnh, thon gọn phom Nữ) */}
      <path
        d="M188 168 
           C174 172, 156 176, 148 180 
           C144 196, 144 214, 156 218 
           C164 226, 168 242, 174 256 
           C168 276, 166 298, 170 322 
           L230 322 
           C234 298, 232 276, 226 256 
           C232 242, 236 226, 244 218 
           C256 214, 256 196, 252 180 
           C244 176, 226 172, 212 168 
           Z"
        fill={skinTone}
      />

      {/* 5.1 Ambient Depth Shadows (Đường viền bóng đổ nhẹ ở nách và mạn sườn để tạo chiều sâu) */}
      <g className="avatar-ambient-depth-shadows" opacity="0.35">
        {/* Left Armpit / Axillary Hollow Shadow */}
        <ellipse
          cx="153"
          cy="204"
          rx="3.5"
          ry="11"
          fill="rgba(50, 15, 20, 0.6)"
          transform="rotate(-14, 153, 204)"
        />
        {/* Right Armpit / Axillary Hollow Shadow */}
        <ellipse
          cx="247"
          cy="204"
          rx="3.5"
          ry="11"
          fill="rgba(50, 15, 20, 0.6)"
          transform="rotate(14, 247, 204)"
        />
        {/* Side Torso Flank Shadow Line */}
        <line
          x1="154"
          y1="216"
          x2="160"
          y2="280"
          stroke="rgba(60, 20, 25, 0.3)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <line
          x1="246"
          y1="216"
          x2="240"
          y2="280"
          stroke="rgba(60, 20, 25, 0.3)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </g>

      {/* 6. Arms & Hands (Cánh tay buông thẳng tự nhiên phom Nữ) */}
      {/* Left Arm */}
      <g className="avatar-left-arm">
        <path
          d="M148 180 
             C142 205, 142 235, 144 265 
             C145 295, 146 320, 148 338 
             L158 338 
             C156 320, 154 295, 153 265 
             C152 238, 154 222, 156 218 
             C152 200, 150 190, 148 180 
             Z"
          fill={skinTone}
        />
        {/* Hand */}
        <path
          d="M148 338 
             C147 348, 148 362, 150 376 
             C151 386, 153 392, 155 394 
             C156 395, 158 393, 158 388 
             C160 382, 161 370, 161 356 
             C163 352, 164 346, 162 342 
             C160 339, 158 338, 158 338 
             Z"
          fill={skinTone}
          stroke="#E2A692"
          strokeWidth="0.6"
        />
        {/* Finger lines */}
        <path d="M152 366 L152 384" stroke="#DCA08C" strokeWidth="0.6" fill="none" />
        <path d="M155 368 L155 392" stroke="#DCA08C" strokeWidth="0.6" fill="none" />
        <path d="M158 368 L158 386" stroke="#DCA08C" strokeWidth="0.6" fill="none" />
        <path d="M160 344 C163 348, 163 353, 161 356" stroke="#DCA08C" strokeWidth="0.7" fill="none" />
      </g>

      {/* Right Arm */}
      <g className="avatar-right-arm">
        <path
          d="M252 180 
             C258 205, 258 235, 256 265 
             C255 295, 254 320, 252 338 
             L242 338 
             C244 320, 246 295, 247 265 
             C248 238, 246 222, 244 218 
             C248 200, 250 190, 252 180 
             Z"
          fill={skinTone}
        />
        {/* Hand */}
        <path
          d="M252 338 
             C253 348, 252 362, 250 376 
             C249 386, 247 392, 245 394 
             C244 395, 242 393, 242 388 
             C240 382, 239 370, 239 356 
             C237 352, 236 346, 238 342 
             C240 339, 242 338, 242 338 
             Z"
          fill={skinTone}
          stroke="#E2A692"
          strokeWidth="0.6"
        />
        {/* Finger lines */}
        <path d="M248 366 L248 384" stroke="#DCA08C" strokeWidth="0.6" fill="none" />
        <path d="M245 368 L245 392" stroke="#DCA08C" strokeWidth="0.6" fill="none" />
        <path d="M242 368 L242 386" stroke="#DCA08C" strokeWidth="0.6" fill="none" />
        <path d="M240 344 C237 348, 237 353, 239 356" stroke="#DCA08C" strokeWidth="0.7" fill="none" />
      </g>

      {/* 7. Neck & Clavicle (Cổ & Xương quai xanh thon thả phom Nữ) */}
      <g className="avatar-neck">
        <path
          d="M193 140 
             L188 168 
             C192 171, 208 171, 212 168 
             L207 140 
             Z"
          fill={skinTone}
        />
        {/* Soft Chin Shadow on Neck */}
        <path
          d="M192 141 
             Q200 149 208 141 
             L208 152 
             Q200 159 192 152 
             Z"
          fill={`url(#${neckShadowId})`}
        />
        {/* Clavicle */}
        <path
          d="M188 167 Q194 169 198 168"
          stroke="#D59582"
          strokeWidth="0.8"
          fill="none"
          opacity="0.7"
        />
        <path
          d="M212 167 Q206 169 202 168"
          stroke="#D59582"
          strokeWidth="0.8"
          fill="none"
          opacity="0.7"
        />

        {/* 7.1 Drop shadow at neck base / collar seam */}
        <path
          d="M186 168 Q200 176 214 168 Q200 172 186 168 Z"
          fill="rgba(50, 15, 20, 0.25)"
        />
      </g>

      {/* 8. Head & Face (Khuôn mặt V-line nét thanh tú phom Nữ) */}
      <g className="avatar-head">
        {/* Face Contour */}
        <path
          d="M174 78 
             C169 94, 169 110, 173 122 
             C177 132, 188 142, 200 144 
             C212 142, 223 132, 227 122 
             C231 110, 231 94, 226 78 
             Z"
          fill={skinTone}
        />

        {/* Natural Hairline (Đường chân tóc trên trán) */}
        <path
          d="M174 78 
             C180 70, 192 66, 200 68 
             C208 66, 220 70, 226 78 
             C220 73, 210 71, 200 71 
             C190 71, 180 73, 174 78 
             Z"
          fill={hairColor}
        />

        {/* Velvet Headband (Băng đô nhung quý phái) */}
        {showHeadband && (
          <g className="avatar-headband">
            <path
              d="M167 80 
                 C164 50, 236 50, 233 80 
                 C230 56, 170 56, 167 80 
                 Z"
              fill="#6B1D28"
            />
            {/* Velvet Sheen */}
            <path
              d="M169 76 
                 C167 53, 233 53, 231 76 
                 C229 58, 171 58, 169 76 
                 Z"
              fill="#8F2837"
            />
          </g>
        )}

        {/* Airbrushed Radial Peach Blush (Má hồng đào thanh tú) */}
        <ellipse cx="174" cy="116" rx="8" ry="4.5" fill={`url(#${blushGradId})`} />
        <ellipse cx="226" cy="116" rx="8" ry="4.5" fill={`url(#${blushGradId})`} />

        {/* Eyebrows (Lông mày lá liễu mềm mại thon thả) */}
        <path
          d="M185 93 C180 89, 174 89, 169 92"
          stroke="#2E1D19"
          strokeWidth="1.3"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M215 93 C220 89, 226 89, 231 92"
          stroke="#2E1D19"
          strokeWidth="1.3"
          strokeLinecap="round"
          fill="none"
        />

        {/* Eyes (Mắt phượng mí đôi sắc sảo) */}
        {/* Left Eye */}
        <g className="avatar-eye-left">
          <path d="M185 103 C181 99, 173 99, 168 103 C173 107, 181 107, 185 103 Z" fill="#F8F9FA" />
          <path d="M184 99 C179 96, 173 97, 169 100" stroke="#C48B7A" strokeWidth="0.7" fill="none" />
          <circle cx="177" cy="103" r="3.8" fill={`url(#${irisGradId})`} />
          <circle cx="177" cy="103" r="1.9" fill="#120A08" />
          <circle cx="176" cy="101.8" r="1" fill="#FFFFFF" />
          {/* Eyeliner cánh én sắc sảo */}
          <path
            d="M186 103 C182 99, 173 98, 168 102 L166 101"
            stroke="#1A1110"
            strokeWidth="1.6"
            strokeLinecap="round"
            fill="none"
          />
          <path d="M184 104 C180 107, 173 106, 169 103" stroke="#B87F70" strokeWidth="0.6" fill="none" />
        </g>

        {/* Right Eye */}
        <g className="avatar-eye-right">
          <path d="M215 103 C219 99, 227 99, 232 103 C227 107, 219 107, 215 103 Z" fill="#F8F9FA" />
          <path d="M216 99 C221 96, 227 97, 231 100" stroke="#C48B7A" strokeWidth="0.7" fill="none" />
          <circle cx="223" cy="103" r="3.8" fill={`url(#${irisGradId})`} />
          <circle cx="223" cy="103" r="1.9" fill="#120A08" />
          <circle cx="222" cy="101.8" r="1" fill="#FFFFFF" />
          {/* Eyeliner cánh én sắc sảo */}
          <path
            d="M214 103 C218 99, 227 98, 232 102 L234 101"
            stroke="#1A1110"
            strokeWidth="1.6"
            strokeLinecap="round"
            fill="none"
          />
          <path d="M216 104 C220 107, 227 106, 231 103" stroke="#B87F70" strokeWidth="0.6" fill="none" />
        </g>

        {/* Refined Nose (Sống mũi thanh tú) */}
        <g className="avatar-nose">
          <path
            d="M197 104 C196 112, 196 118, 197 122"
            stroke="#DF9F90"
            strokeWidth="0.7"
            fill="none"
            opacity="0.5"
          />
          <path
            d="M197 122 C198 124, 202 124, 203 122"
            stroke="#B86E60"
            strokeWidth="0.9"
            strokeLinecap="round"
            fill="none"
          />
          <path d="M195 121 C196 122.5, 197 122.5, 197 122" stroke="#D28B7A" strokeWidth="0.6" fill="none" />
          <path d="M203 122 C203 122.5, 204 122.5, 205 121" stroke="#D28B7A" strokeWidth="0.6" fill="none" />
        </g>

        {/* Lips (Môi cánh én căng mọng phủ son bóng san hô) */}
        <g className="avatar-lips">
          {/* Upper Lip */}
          <path
            d="M193 131 
               C196 128.5, 198 128.5, 200 130 
               C202 128.5, 204 128.5, 207 131 
               C204 133, 196 133, 193 131 
               Z"
            fill="#BA3745"
          />
          {/* Parting Line */}
          <path d="M193 131 C197 133, 203 133, 207 131" stroke="#6E151E" strokeWidth="0.9" fill="none" />
          {/* Lower Lip */}
          <path
            d="M193 131 
               C195 137, 198 139, 200 139 
               C202 139, 205 137, 207 131 
               Z"
            fill={`url(#${lipGradId})`}
          />
          {/* Lip Gloss Specular */}
          <ellipse cx="200" cy="135.5" rx="2.8" ry="1" fill="#FFFFFF" opacity="0.45" />
        </g>
      </g>
    </g>
  );
};
