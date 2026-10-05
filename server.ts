import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: '10mb' }));

// Standard model configuration
const MODEL_NAME = 'gemini-flash-latest';

// Fallback cascade: 'gemini-flash-latest' -> 'gemini-3.8-flash' -> 'gemini-3.1-flash-lite'
async function generateContentWithServerFallback(ai: GoogleGenAI, params: any) {
  const models = [MODEL_NAME, 'gemini-3.8-flash', 'gemini-3.1-flash-lite'];
  let lastErr: any;
  for (const model of models) {
    try {
      return await ai.models.generateContent({
        ...params,
        model,
      });
    } catch (err: any) {
      lastErr = err;
      if (
        err?.status === 404 ||
        err?.status === 503 ||
        err?.message?.includes('not found') ||
        err?.message?.includes('no longer available') ||
        err?.message?.includes('high demand')
      ) {
        continue;
      }
      throw err;
    }
  }
  throw lastErr;
}

// Track quota cooldown to prevent hammering exhausted free-tier API
let quotaExhaustedUntil = 0;

function isQuotaCurrentlyExhausted(): boolean {
  return Date.now() < quotaExhaustedUntil;
}

function markQuotaExhausted(retryDelaySeconds = 300) {
  quotaExhaustedUntil = Date.now() + retryDelaySeconds * 1000;
  console.info(
    `[Gemini Server Proxy] Free-tier quota exceeded. Seamlessly activating Curated Heritage Engine for ${retryDelaySeconds}s.`
  );
}

// ================= CURATED HIGH-FIDELITY FALLBACK ENGINES =================

function getContextualOfflineAnswer(question: string, _outfitSummary?: string) {
  const q = question.toLowerCase();

  // 1. Thấp / lùn / khiêm tốn
  if (
    q.includes('thấp') ||
    q.includes('lùn') ||
    q.includes('chiều cao') ||
    q.includes('khiêm tốn') ||
    q.includes('hack dáng') ||
    q.includes('ngắn') ||
    q.includes('1m5') ||
    q.includes('nấm lùn')
  ) {
    return {
      answer:
        'Chiều cao khiêm tốn hoàn toàn diện cổ phục cực tôn dáng! Bí quyết là chọn tà áo lửng vừa qua gối khoảng 10-15cm kết hợp cùng quần tây may đo cạp cao hoặc giày sneaker chunky độn đế để kéo dài đôi chân. Tránh tà áo quá dài quết đất hoặc quần thụng quá lùng bùng nhé.',
      suggestedItemId: 'footwear_chunky_sneaker',
      suggestedItemName: 'Giày Sneaker Chunky Platform Độn Đế',
      source: 'curated_fallback',
    };
  }

  // 2. Béo / mập / đậm người / bụng to / thừa cân
  if (
    q.includes('béo') ||
    q.includes('mập') ||
    q.includes('đậm') ||
    q.includes('ngoại cỡ') ||
    q.includes('plussize') ||
    q.includes('bụng') ||
    q.includes('to con') ||
    q.includes('mũm mĩm') ||
    q.includes('thừa cân') ||
    q.includes('vai to') ||
    q.includes('tròn')
  ) {
    return {
      answer:
        'Với vóc dáng tròn trịa, áo ngũ thân tay chẽn hoặc áo tấc dáng suông buông thẳng là "chân ái" giúp giấu khuyết điểm vòng hai cực kỳ khéo léo. Bạn nên ưu tiên chất liệu lụa cát hoặc đũi có độ đứng phom vừa phải, phối tone màu trầm thanh lịch như xanh lam chàm hay rêu đậm.',
      suggestedItemId: 'garment_nguthan_01',
      suggestedItemName: 'Áo Ngũ Thân Tay Chẽn Nam/Nữ',
      source: 'curated_fallback',
    };
  }

  // 3. Gầy / mảnh mai / ốm
  if (
    q.includes('gầy') ||
    q.includes('ốm') ||
    q.includes('mảnh') ||
    q.includes('nhỏ con') ||
    q.includes('khẳng khiu')
  ) {
    return {
      answer:
        'Dáng người mảnh khảnh diện áo tấc tay thụng hoặc phối layer áo ngũ thân bên ngoài áo thun/baby tee sẽ tạo độ phồng sang trọng và đầy đặn hơn. Hãy chọn gam màu tươi sáng như hoàng yến, hồng đào hoặc kem be cùng họa tiết dệt gấm chìm để thêm phần khí chất.',
      suggestedItemId: 'garment_aotac_01',
      suggestedItemName: 'Áo Tấc Cung Đình Tay Thụng',
      source: 'curated_fallback',
    };
  }

  // 4. Bối cảnh Huế / Cố đô / Đại Nội / Lăng tẩm
  if (
    q.includes('huế') ||
    q.includes('đại nội') ||
    q.includes('lăng') ||
    q.includes('cố đô') ||
    q.includes('sông hương') ||
    q.includes('an định')
  ) {
    return {
      answer:
        'Check-in tại Huế hoặc không gian rêu phong cổ kính, set Áo Tấc tay thụng hoặc Áo Ngũ Thân kết hợp nón bài thơ hoặc khăn vấn là chuẩn "chàng thơ / nàng thơ xứ thần kinh" 100 điểm. Gam màu tím hoa cà, vàng cung đình hay xanh ngọc bích sẽ cực kỳ hòa quyện với tường thành cổ kính.',
      suggestedItemId: 'head_khan_van_nu',
      suggestedItemName: 'Khăn Vấn Lụa Quý Tộc',
      source: 'curated_fallback',
    };
  }

  // 5. Đám cưới / tiệc cưới / hôn lễ / lễ vu quy
  if (
    q.includes('cưới') ||
    q.includes('tiệc') ||
    q.includes('hôn lễ') ||
    q.includes('dự tiệc') ||
    q.includes('dạ hội') ||
    q.includes('vu quy')
  ) {
    return {
      answer:
        'Đi dự đám cưới hay tiệc trang trọng, bạn nên chọn áo ngũ thân hoặc áo dài lụa tơ tằm với gam màu tươi vui như đỏ chu sa, hồng cánh sen hay xanh ngọc bích để chúc phúc cho gia chủ. Tránh diện nguyên cây trắng toát hoặc áo có tà xẻ quá cao để giữ gìn sự lịch thiệp, tôn trọng ngày trọng đại.',
      suggestedItemId: 'garment_nguthan_nu',
      suggestedItemName: 'Áo Ngũ Thân Lụa Gấm Quý Phái',
      source: 'curated_fallback',
    };
  }

  // 6. Đi chùa / đền / phủ / chốn tâm linh / viếng lễ
  if (
    q.includes('chùa') ||
    q.includes('đền') ||
    q.includes('phủ') ||
    q.includes('tâm linh') ||
    q.includes('viếng') ||
    q.includes('dâng hương') ||
    q.includes('miếu') ||
    q.includes('lễ bái')
  ) {
    return {
      answer:
        'Khi viếng chùa chiền và không gian tâm linh, quy tắc bất biến là tà áo cài kín cổ cúc, vạt buông thẳng và bắt buộc mặc cùng quần dài suông qua mắt cá chân. Tuyệt đối không phối với chân váy ngắn, quần ngố hay chất liệu quá xuyên thấu để giữ trọn sự thanh tịnh, trang nghiêm.',
      suggestedItemId: 'bottom_silk_01',
      suggestedItemName: 'Quần Lụa Trắng Dáng Suông',
      source: 'curated_fallback',
    };
  }

  // 7. Hà Nội / Phố cổ / Hồ Gươm / Cầu Long Biên
  if (
    q.includes('hà nội') ||
    q.includes('phố cổ') ||
    q.includes('hồ gươm') ||
    q.includes('long biên') ||
    q.includes('tràng an') ||
    q.includes('văn miếu')
  ) {
    return {
      answer:
        'Dạo phố cổ Hà Nội hay bờ hồ, hãy mix áo dài truyền thống hoặc áo ngũ thân cùng một đôi loafer da bóng hoặc sneaker trắng và túi kẹp nách Y2K. Phong cách vừa giữ được nét thanh lịch Tràng An, vừa cực kỳ phóng khoáng và êm chân khi tản bộ.',
      suggestedItemId: 'footwear_loafer_leather',
      suggestedItemName: 'Giày Loafer Da Bóng Đính Khóa Kim Loại',
      source: 'curated_fallback',
    };
  }

  // 8. Sài Gòn / Miền Tây / Nam Bộ
  if (
    q.includes('sài gòn') ||
    q.includes('miền tây') ||
    q.includes('nam bộ') ||
    q.includes('bà ba') ||
    q.includes('sông nước')
  ) {
    return {
      answer:
        'Ở Sài Gòn hay miền Tây sông nước đầy nắng ấm, áo bà ba lụa cách tân phối quần ống rộng và guốc mộc là bản phối tuyệt đối thoải mái, thanh mát. Bạn có thể phối thêm kính râm ma trận viền bạc để tạo điểm nhấn Gen Z cá tính.',
      suggestedItemId: 'garment_baba_01',
      suggestedItemName: 'Áo Bà Ba Nam Bộ Cách Tân',
      source: 'curated_fallback',
    };
  }

  // 9. Giày dép / Sneaker / Guốc / Loafer / Boots
  if (
    q.includes('giày') ||
    q.includes('sneaker') ||
    q.includes('guốc') ||
    q.includes('boots') ||
    q.includes('loafer') ||
    q.includes('đi lại') ||
    q.includes('chân')
  ) {
    return {
      answer:
        'Nếu muốn phong thái cổ điển trang nhã, guốc mộc sơn mài hoặc loafer da là lựa chọn hoàn hảo. Còn nếu theo đuổi phong cách Gen Z Remix đường phố, một đôi chunky sneaker độn đế hoặc Chelsea boots da lì sẽ nâng tầm outfit cực ngầu và hiện đại.',
      suggestedItemId: 'footwear_chunky_sneaker',
      suggestedItemName: 'Giày Sneaker Chunky Platform Độn Đế',
      source: 'curated_fallback',
    };
  }

  // 10. Phụ kiện đầu: Khăn vấn / nón lá / nón quai thao / tóc
  if (
    q.includes('khăn') ||
    q.includes('nón') ||
    q.includes('đầu') ||
    q.includes('tóc') ||
    q.includes('mũ') ||
    q.includes('quạt')
  ) {
    return {
      answer:
        'Khăn vấn giúp định hình khung mặt đĩnh đạc, quý phái chuẩn phong thái cung đình khi chụp ảnh chân dung hoặc dự tiệc. Còn nón lá bài thơ hay quạt xếp lại mang đến nét dịu dàng, thơ mộng khi chụp ảnh góc rộng ngoài trời.',
      suggestedItemId: 'head_khan_van_nu',
      suggestedItemName: 'Khăn Vấn Lụa Quý Tộc',
      source: 'curated_fallback',
    };
  }

  // 11. Phong cách Gen Z / Y2K / Streetwear / Remix
  if (
    q.includes('y2k') ||
    q.includes('remix') ||
    q.includes('streetwear') ||
    q.includes('gen z') ||
    q.includes('chất') ||
    q.includes('ngầu') ||
    q.includes('cá tính')
  ) {
    return {
      answer:
        'Công thức remix Việt phục đỉnh chóp của Gen Z: Khoác áo ngũ thân mở cúc bên ngoài áo Baby Tee Y2K, phối cùng quần parachute cargo ống rộng và kính râm cyber. Vừa tôn vinh văn hóa cội nguồn, vừa khẳng định chất riêng không lẫn vào đâu được!',
      suggestedItemId: 'y2k_baby_tee',
      suggestedItemName: 'Áo Baby Tee Y2K Cropped',
      source: 'curated_fallback',
    };
  }

  // 12. Màu sắc / phong thủy / ngũ hành / mệnh
  if (
    q.includes('màu') ||
    q.includes('mệnh') ||
    q.includes('phong thủy') ||
    q.includes('hợp')
  ) {
    return {
      answer:
        'Cổ phục Việt ứng dụng triết lý Ngũ Sắc tương sinh: Đỏ (may mắn, hỷ khí), Xanh lam chàm (bình an, trí tuệ), Vàng hoàng cúc (thịnh vượng, cao quý), Trắng (tinh khôi). Bạn hãy chọn gam màu tôn nước da và hòa hợp với không gian nơi mình đến nhé.',
      suggestedItemId: 'garment_aodai_01',
      suggestedItemName: 'Áo Dài Truyền Thống Màu Sắc May Mắn',
      source: 'curated_fallback',
    };
  }

  // Mặc định thực tế theo thời trang, không rập khuôn ngày Tết
  return {
    answer:
      'Khi diện cổ phục, điều quan trọng nhất là giữ cấu trúc tà áo buông phẳng tự nhiên và phần khuy cài ngay ngắn. Tùy vóc dáng và nơi đến, bạn có thể tự do nhấn nhá thêm phụ kiện hiện đại như loafer, túi kẹp nách hoặc trang sức để outfit thật nổi bật và vừa vặn với bản thân.',
    suggestedItemId: 'acc_quat_tram',
    suggestedItemName: 'Quạt Trầm Hương Điêu Khắc',
    source: 'curated_fallback',
  };
}

function getCuratedAdvice(
  occasion?: string,
  style?: string,
  garmentType?: string,
  outfitName?: string
) {
  const gType = (garmentType || 'ao_dai').toLowerCase();
  const st = (style || 'y2k').toLowerCase();

  let stylingTitle = 'Việt Phục Di Sản • Cân Bằng Hài Hòa Tết 2026';
  let recommendationReason =
    'Sự giao thoa tinh tế giữa cấu trúc cổ phục truyền thống và điểm xuyết phụ kiện đương đại giúp tôn trọn vóc dáng thanh nhã và phong thái du xuân tự tin.';
  let culturalTip =
    'Giữ cấu trúc tà áo buông phẳng tự nhiên, cài khuy chỉnh tề khi dâng hương hoặc chúc Tết trưởng bối.';
  let auspiciousColors = ['Đỏ Chu Sa (#C53030)', 'Xanh Lam Chàm (#2B4162)', 'Vàng Hoàng Cúc (#D4AF37)'];
  let suggestedItemIds = ['garment_aodai_01', 'bottom_silk_01', 'footwear_guoc_01'];

  if (gType.includes('ngu_than') || gType.includes('ngũ thân')) {
    stylingTitle = 'Ngũ Thân Phong Nhã • Quý Anh Quý Cô Tràng An';
    recommendationReason =
      'Phom áo ngũ thân tay chẽn buông thẳng tạo tư thế lưng đĩnh đạc, kết hợp cùng quần lụa suông hoặc quần âu cạp cao toát lên vẻ trang trọng quý phái.';
    culturalTip =
      'Hệ 5 cúc khuy cài lệch bên phải tượng trưng cho Ngũ Thường (Nhân - Lễ - Nghĩa - Trí - Tín), luôn cài đủ khuy để giữ phong thái nho nhã.';
    suggestedItemIds = ['garment_nguthan_01', 'bottom_silk_01', 'footwear_guoc_01', 'acc_khan_van_nam'];
  } else if (gType.includes('nhat_binh') || gType.includes('nhật bình')) {
    stylingTitle = 'Nhật Bình Cung Đình • Vương Giả & Đài Các';
    recommendationReason =
      'Cổ áo viền ngũ sắc bản to mang lại vẻ đẹp quyền quý, lộng lẫy chuẩn tinh thần hoàng gia triều Nguyễn cho các khung hình check-in đầu năm.';
    culturalTip =
      'Áo Nhật Bình nên phối cùng quần lụa trắng ngà hoặc đen tuyền dáng suông rộng, kèm hoa tai ngọc hoặc quạt trầm để tôn trọn vẻ đoan trang.';
    suggestedItemIds = ['garment_nhatbinh_01', 'bottom_silk_01', 'acc_quat_tram', 'head_khan_van_nu'];
  } else if (gType.includes('ba_ba') || gType.includes('bà ba')) {
    stylingTitle = 'Bà Ba Nam Bộ • Duyên Dáng & Phóng Khoáng';
    recommendationReason =
      'Chất liệu lụa mềm xẻ tà hai bên hông tạo cảm giác nhẹ nhàng, linh hoạt, rất thích hợp cho những buổi dạo chợ hoa xuân hay cà phê bạn bè.';
    culturalTip =
      'Có thể phối cùng nón lá hoặc túi cói thủ công, khăn rằn vắt vai để tăng chất thơ mộc mạc miền sông nước.';
    suggestedItemIds = ['garment_baba_01', 'bottom_silk_01', 'footwear_guoc_01'];
  } else if (gType.includes('tu_than') || gType.includes('tứ thân')) {
    stylingTitle = 'Tứ Thân Dân Gian • Nét Duyên Kinh Bắc';
    recommendationReason =
      'Dải thắt lưng lụa đào buộc chéo trước bụng cùng nón ba tầm tạo điểm nhấn thắt đáy lưng ong đầy duyên dáng của phụ nữ Bắc Bộ xưa.';
    culturalTip =
      'Bốn vạt áo tượng trưng cho tứ thân phụ mẫu, vạt áo trước buộc chéo tạo nét e ấp, tình tứ trong ngày hội xuân.';
    suggestedItemIds = ['garment_tuthan_01', 'bottom_silk_01', 'footwear_guoc_01'];
  }

  if (st.includes('y2k') || st.includes('street')) {
    stylingTitle += ' (Remix Đương Đại)';
    recommendationReason +=
      ' Điểm xuyết cùng sneaker da trắng low-top hoặc kính râm oval mang lại vibe Cyber Heritage cực chiến!';
    auspiciousColors = ['Đỏ Son Neon (#FF3366)', 'Vàng Kim Hoàng Cúc (#FFD166)', 'Xanh Bạc Hà (#06D6A0)'];
  }

  return {
    stylingTitle,
    recommendationReason,
    culturalTip,
    auspiciousColors,
    suggestedItemIds,
  };
}

function getCuratedContextAnalysis(textPrompt = '', imageBase64?: string) {
  const p = (textPrompt || '').toLowerCase();

  const CONTEXT_PRESETS = [
    {
      environment: 'Không gian đền chùa, di tích lịch sử & lăng tẩm cổ kính',
      culturalBoundary: 'Không gian tâm linh tôn nghiêm, tà áo cần khép kín đoan trang, dài quá gối, tránh mặc quần ngắn hay trang phục phá cách phản cảm',
      userIntent: 'Tâm nguyện cầu an, chiêm bái di sản và mong muốn nét đẹp đoan trang, thanh tịnh',
      recommendedGarments: ['ngu_than', 'giao_linh', 'ao_dai'],
      recommendedVibe: 'vintage',
    },
    {
      environment: 'Quán cà phê vintage, phố đi bộ & góc phố check-in hiện đại',
      culturalBoundary: 'Thoải mái tự do mix-match phụ kiện đô thị, giữ dáng tà áo gọn gàng thoải mái khi di chuyển',
      userIntent: 'Phong cách dạo phố Gen Z phóng khoáng, kết hợp hài hòa giữa nét truyền thống và tinh thần streetwear',
      recommendedGarments: ['ba_ba', 'ao_dai', 'ngu_than'],
      recommendedVibe: 'streetwear',
    },
    {
      environment: 'Sự kiện dạ tiệc, đám cưới truyền thống hoặc không gian tiệc sang trọng',
      culturalBoundary: 'Đề cao sự trang nhã quý phái, chất liệu gấm tơ chỉn chu, tôn vinh nét đẹp vương giả đài các',
      userIntent: 'Khẳng định gu thẩm mỹ kiêu sa, sang trọng và nổi bật trong các dịp lễ hội trọng đại',
      recommendedGarments: ['nhat_binh', 'ao_dai', 'ngu_than'],
      recommendedVibe: 'minimal',
    },
    {
      environment: 'Vườn hoa xuân, không gian sinh thái tự nhiên & sông nước hữu tình',
      culturalBoundary: 'Hài hòa cùng cảnh sắc thiên nhiên cỏ cây hoa lá, tà áo mềm mại thướt tha buông bay trong gió xuân',
      userIntent: 'Nét duyên dáng thanh xuân tươi mới, thơ mộng và ngọt ngào trong từng khung hình kỷ niệm',
      recommendedGarments: ['tu_than', 'ao_dai', 'ba_ba'],
      recommendedVibe: 'feminine',
    },
  ];

  if (p.includes('chùa') || p.includes('đền') || p.includes('lễ') || p.includes('tâm linh') || p.includes('di tích')) {
    return CONTEXT_PRESETS[0];
  }
  if (p.includes('phố') || p.includes('dạo') || p.includes('quán') || p.includes('cà phê') || p.includes('coffee') || p.includes('trà')) {
    return CONTEXT_PRESETS[1];
  }
  if (p.includes('cưới') || p.includes('tiệc') || p.includes('đám cưới') || p.includes('dạ tiệc') || p.includes('huế') || p.includes('party')) {
    return CONTEXT_PRESETS[2];
  }
  if (p.includes('hoa') || p.includes('vườn') || p.includes('thiên nhiên') || p.includes('sông') || p.includes('đồng') || p.includes('công viên')) {
    return CONTEXT_PRESETS[3];
  }

  // Hash imageBase64 if present so different uploaded images produce different recommendations
  if (imageBase64) {
    let hash = 0;
    const step = Math.max(1, Math.floor(imageBase64.length / 300));
    for (let i = 0; i < imageBase64.length; i += step) {
      hash = (hash << 5) - hash + imageBase64.charCodeAt(i);
      hash |= 0;
    }
    const idx = Math.abs(hash) % 4;
    return CONTEXT_PRESETS[idx];
  }

  return CONTEXT_PRESETS[1];
}

function getCuratedStory(garmentName = 'Áo Cổ Phục') {
  const lower = garmentName.toLowerCase();

  if (lower.includes('ngũ thân')) {
    return `Áo Ngũ Thân ra đời từ thế kỷ 18 dưới triều chúa Nguyễn Phúc Khoát và được định chế hoàn bị dưới thời vua Minh Mạng, trở thành quốc phục của người Việt suốt nhiều thế kỷ. Cấu trúc 5 thân áo tượng trưng cho đạo lý Tứ Thân Phụ Mẫu bao bọc lấy người mặc, cùng hàng 5 chiếc cúc xà cừ đại diện cho Nhân - Lễ - Nghĩa - Trí - Tín.\n\nVới phom dáng chữ A suông rộng kín cổng cao tường, chiếc áo ngũ thân tay chẽn vừa tạo tư thế thẳng lưng đĩnh đạc cho nam giới, vừa toát lên vẻ đoan trang nho nhã của phụ nữ. Tà áo không ôm sát mà buông thẳng, tôn lên phong thái đĩnh đạc quý phái.\n\nNgày nay, Gen Z mang ngũ thân trở lại đời sống qua những bản phối giao thoa tinh tế: kết hợp cùng quần âu xếp ly hay sneaker năng động dạo phố Tết. Đó là tuyên ngôn tự hào về một di sản tri thức phong nhã ngàn năm.`;
  }

  if (lower.includes('nhật bình')) {
    return `Áo Nhật Bình là thường phục cao quý của bậc Hoàng hậu, Phi tần và Công chúa triều Nguyễn từ năm 1807. Tên gọi "Nhật Bình" bắt nguồn từ chiếc cổ áo to bản ghép lại tạo thành hình chữ nhật ngay ngắn trước ngực, viền dải ngũ sắc tượng trưng cho ngũ hành tương sinh.\n\nHoa văn thêu tinh xảo trên áo Nhật Bình thường là hình phượng hoàng, hoa sen, mây nước gửi gắm lời chúc cát tường vượng khí. Chiếc áo thể hiện đỉnh cao nghệ thuật dệt may và mỹ cảm cung đình triều Nguyễn.\n\nBước vào nhịp sống hiện đại, áo Nhật Bình trở thành nguồn cảm hứng bất tận cho các bộ ảnh cưới và lễ hội nghệ thuật đương đại, khẳng định vẻ đẹp vương giả vượt thời gian.`;
  }

  if (lower.includes('bà ba')) {
    return `Áo Bà Ba là linh hồn của vùng đất phương Nam trù phú, xuất hiện từ thế kỷ 19 và trở thành người bạn tri kỷ của người dân sông nước Cửu Long. Với phom dáng ngắn ngang hông, xẻ tà hai bên và hàng cúc cài thẳng tắp, áo bà ba tối ưu cho sự linh hoạt, thoáng mát và phóng khoáng.\n\nVẻ đẹp của áo bà ba nằm ở sự giản dị, chân thành. Dù là chiếc áo nâu sồng lao động hay chiếc áo bà ba lụa gấm thướt tha dạo chợ nổi, nó đều toát lên cốt cách phóng khoáng, hiền hòa và hiếu khách.\n\nKhi bước vào tủ đồ Gen Z Tết 2026, áo bà ba kết hợp cùng nón lá bài thơ, quần jeans ống rộng hay túi cói thủ công mang lại nét đẹp thanh xuân vừa mộc mạc, vừa tràn đầy năng lượng tươi mới.`;
  }

  return `Áo Dài là biểu tượng nhan sắc và tâm hồn Việt Nam qua bao thế hệ. Bắt nguồn từ áo ngũ thân truyền thống, qua bàn tay sáng tạo của các họa sĩ tài hoa đầu thế kỷ 20, chiếc áo dài đã trở thành tuyệt phẩm tôn vinh đường nét duyên dáng, kín đáo mà quyến rũ của người phụ nữ Việt.\n\nHai tà áo buông lướt mềm mại theo từng bước chân, đường xẻ hông cao trên nền quần lụa suông rộng tạo nên vũ điệu thị giác thanh thoát không trang phục nào sánh được. Áo dài đỏ chu sa, vàng hoàng yến hay trắng tinh khôi luôn là linh hồn của ngày Tết cổ truyền.\n\nThế hệ Gen Z đón nhận áo dài bằng sự trân trọng và nguồn năng lượng remix không giới hạn: kết hợp cùng sneaker chunky hay phụ kiện đô thị, đưa áo dài bước từ truyền thống thẳng vào đời sống hiện đại.`;
}

// ================= SERVER API PROXY ROUTES =================

// 1. Outfit Advice Endpoint
app.post('/api/gemini/advice', async (req, res) => {
  const { occasion, style, garmentType, outfitName } = req.body;
  const curated = getCuratedAdvice(occasion, style, garmentType, outfitName);

  if (isQuotaCurrentlyExhausted() || !process.env.GEMINI_API_KEY) {
    return res.status(200).json({
      success: true,
      data: curated,
      source: 'curated_fallback',
    });
  }

  try {
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: { headers: { 'User-Agent': 'aistudio-build' } },
    });

    const prompt = `Bạn là Nhà giám tuyển & Cố vấn thời trang cổ phục Việt Nam cho Gen Z Tết 2026.
Phân tích cách phối giữa:
- Dòng áo: ${garmentType || 'Áo Cổ Phục'}
- Dịp mặc: ${occasion || 'Du xuân'}
- Vibe phong cách: ${style || 'Cyber Y2K'}
${outfitName ? `- Tên bản phối: ${outfitName}` : ''}

Trả về JSON đúng cấu trúc:
{
  "stylingTitle": "Tiêu đề tư vấn ngắn gọn",
  "recommendationReason": "Phân tích hòa hợp (2-3 câu).",
  "culturalTip": "Lời khuyên văn hóa (2 câu).",
  "auspiciousColors": ["Màu 1", "Màu 2"],
  "suggestedItemIds": ["mã món đồ"]
}`;

    const response = await generateContentWithServerFallback(ai, {
      contents: prompt,
      config: { responseMimeType: 'application/json' },
    });

    const parsed = JSON.parse(response.text?.trim() || '{}');
    if (parsed.stylingTitle && parsed.recommendationReason) {
      return res.status(200).json({
        success: true,
        data: parsed,
        source: 'gemini_api',
      });
    }

    return res.status(200).json({ success: true, data: curated, source: 'curated_fallback' });
  } catch (error: any) {
    if (error?.status === 429 || error?.message?.includes('quota') || error?.message?.includes('429')) {
      markQuotaExhausted(600);
    }
    // Always return 200 with curated data so UI is seamless and robust
    return res.status(200).json({
      success: true,
      data: curated,
      source: 'curated_fallback',
    });
  }
});

// 2. Context Analysis Endpoint
app.post('/api/gemini/analyze-context', async (req, res) => {
  const { textPrompt, imageBase64 } = req.body;
  const curated = getCuratedContextAnalysis(textPrompt, imageBase64);

  if (isQuotaCurrentlyExhausted() || !process.env.GEMINI_API_KEY) {
    return res.status(200).json({ success: true, data: curated, source: 'curated_fallback' });
  }

  try {
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: { headers: { 'User-Agent': 'aistudio-build' } },
    });

    const contents: any[] = [];
    if (imageBase64) {
      const cleanBase64 = imageBase64.replace(/^data:image\/[a-zA-Z]+;base64,/, '');
      contents.push({
        inlineData: { mimeType: 'image/jpeg', data: cleanBase64 },
      });
    }

    const promptText = imageBase64
      ? `Bạn là Chuyên gia Cố vấn Cổ phục Việt Nam & Giám tuyển thị giác.
Hãy quan sát kỹ bức ảnh đính kèm và phân tích thực tế các đặc trưng trực quan của bức ảnh:
- Nhận diện không gian/địa điểm trong ảnh: trong nhà, ngoài trời, đền chùa/di tích cổ kính, quán cafe/đường phố trẻ trung, sự kiện tiệc tùng/đám cưới sang trọng, hay thiên nhiên vườn hoa.
- Nhận diện tông màu chủ đạo và ánh sáng trong ảnh để gợi ý trang phục hòa hợp hoặc tôn bật trên nền ảnh.
- Kết hợp với yêu cầu chữ nếu có: "${textPrompt || 'Không có mô tả chữ, hãy dựa hoàn toàn vào khung cảnh và màu sắc trực quan của bức ảnh'}".

Trả về JSON đúng cấu trúc:
{
  "environment": "Mô tả cụ thể không gian và đặc trưng thị giác nhận diện từ ảnh",
  "culturalBoundary": "Ranh giới văn hóa hoặc phép tắc trang phục cần lưu ý tại địa điểm này",
  "userIntent": "Mục đích diện đồ và phong cách phù hợp nhất với bối cảnh ảnh này",
  "recommendedGarments": ["ao_dai", "ngu_than", "ba_ba", "tu_than", "nhat_binh", "giao_linh"],
  "recommendedVibe": "y2k | streetwear | minimal | vintage | feminine"
}`
      : `Phân tích bối cảnh: "${textPrompt || ''}". Trả về JSON:
{
  "environment": "string",
  "culturalBoundary": "string",
  "userIntent": "string",
  "recommendedGarments": ["ao_dai", "ngu_than", "ba_ba", "tu_than", "nhat_binh", "giao_linh"],
  "recommendedVibe": "y2k | streetwear | minimal | vintage | feminine"
}`;

    contents.push({ text: promptText });

    const response = await generateContentWithServerFallback(ai, {
      contents,
      config: { responseMimeType: 'application/json' },
    });

    const parsed = JSON.parse(response.text || '{}');
    if (parsed.environment) {
      return res.status(200).json({ success: true, data: parsed, source: 'gemini_api' });
    }
    return res.status(200).json({ success: true, data: curated, source: 'curated_fallback' });
  } catch (err: any) {
    if (err?.status === 429 || err?.message?.includes('quota') || err?.message?.includes('429')) {
      markQuotaExhausted(600);
    }
    return res.status(200).json({ success: true, data: curated, source: 'curated_fallback' });
  }
});

function rgbToHueServer(r: number, g: number, b: number): number {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  if (max === min) return 0;
  const d = max - min;
  let h = 0;
  if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
  else if (max === g) h = (b - r) / d + 2;
  else if (max === b) h = (r - g) / d + 4;
  return h * 60;
}

function evaluateColorHarmonyServer(hex1?: string, hex2?: string): 'tone_sur_tone' | 'complementary' | 'neutral' | 'conflict' {
  if (!hex1 || !hex2) return 'neutral';
  const c1 = hex1.replace('#', '').toUpperCase();
  const c2 = hex2.replace('#', '').toUpperCase();
  if (c1 === c2) return 'tone_sur_tone';

  const neutralHexes = ['FFFFFF', 'F8F9FA', '121212', '111827', '212529', 'F0EBD8', 'FAF0CA', 'FAF9F6', '2B2D42', 'E9ECEF'];
  if (neutralHexes.includes(c1) || neutralHexes.includes(c2)) return 'complementary';

  const r1 = parseInt(c1.substring(0, 2), 16) || 0;
  const g1 = parseInt(c1.substring(2, 4), 16) || 0;
  const b1 = parseInt(c1.substring(4, 6), 16) || 0;
  const r2 = parseInt(c2.substring(0, 2), 16) || 0;
  const g2 = parseInt(c2.substring(2, 4), 16) || 0;
  const b2 = parseInt(c2.substring(4, 6), 16) || 0;

  const h1 = rgbToHueServer(r1, g1, b1);
  const h2 = rgbToHueServer(r2, g2, b2);
  const diff = Math.abs(h1 - h2);

  if (diff <= 35 || diff >= 325) return 'tone_sur_tone';
  if ((diff >= 150 && diff <= 210) || (diff >= 100 && diff <= 140)) return 'complementary';
  if (diff > 50 && diff < 100) return 'conflict';
  return 'neutral';
}

function computeServerInstantHeuristic(outfit: any) {
  const garment = outfit?.garment;
  const bottom = outfit?.bottom;
  const footwear = outfit?.footwear;
  const garmentName = garment?.name || 'Áo Cổ Phục';
  const garmentType = garment?.garmentType || 'ao_dai';
  const bottomName = bottom?.name || 'Quần Lụa';
  const footwearName = footwear?.name || 'Giày dép';
  const accCount = outfit?.accessories?.length || 0;

  let score = 70;
  let balanceScore = outfit?.culturalBalance ?? 75;
  const stylistNotes: string[] = [];

  const isFormalRoyal =
    garmentType === 'nhat_binh' ||
    garmentType === 'ngu_than' ||
    garmentName.toLowerCase().includes('nhật bình') ||
    garmentName.toLowerCase().includes('ngũ thân');

  const bottomTags = (bottom?.tags || []).map((t: string) => t.toLowerCase());
  const bottomNameLower = (bottom?.name || '').toLowerCase();
  const footwearTags = (footwear?.tags || []).map((t: string) => t.toLowerCase());
  const footwearNameLower = (footwear?.name || '').toLowerCase();

  const isShortBottom =
    bottomNameLower.includes('short') ||
    bottomNameLower.includes('ngắn') ||
    bottomNameLower.includes('lửng') ||
    bottomNameLower.includes('mini') ||
    bottomTags.some((t: string) => t.includes('short') || t.includes('ngắn') || t.includes('lửng') || t.includes('mini'));

  const isCasualFootwear =
    footwearNameLower.includes('dép') ||
    footwearNameLower.includes('tông') ||
    footwearNameLower.includes('sandal') ||
    footwearTags.some((t: string) => t.includes('dép') || t.includes('tông') || t.includes('sandal') || t.includes('xỏ ngón'));

  const hasSilkBottom = bottomTags.some((t: string) => t.includes('lụa')) || bottomNameLower.includes('lụa');
  const hasTailoredTrouser = bottomTags.some((t: string) => t.includes('tây') || t.includes('may đo') || t.includes('cashmere')) || bottomNameLower.includes('tây');
  const hasMaxiSkirt = bottomTags.some((t: string) => t.includes('maxi') || t.includes('xếp ly dài')) || bottomNameLower.includes('maxi');
  const hasDenim = bottomTags.some((t: string) => t.includes('denim') || t.includes('jean')) || bottomNameLower.includes('jean');

  const isSneaker = footwearTags.some((t: string) => t.includes('sneaker') || t.includes('thể thao')) || footwearNameLower.includes('sneaker');
  const isWhiteSneaker = isSneaker && (footwearTags.some((t: string) => t.includes('trắng')) || footwearNameLower.includes('trắng') || footwear?.colorHex?.toUpperCase() === '#FFFFFF');
  const isTraditionalShoes = footwearTags.some((t: string) => t.includes('guốc') || t.includes('mộc') || t.includes('sơn mài')) || footwearNameLower.includes('guốc');
  const isLoaferOrBoots = footwearTags.some((t: string) => t.includes('loafer') || t.includes('boots') || t.includes('mary jane')) || footwearNameLower.includes('loafer');

  if (isFormalRoyal && (isShortBottom || isCasualFootwear)) {
    score -= 35;
    balanceScore = Math.max(15, balanceScore - 40);
    stylistNotes.push(
      `Cảnh báo chuẩn mực: ${garmentName} là dòng trang phục cung đình tôn nghiêm, phối cùng ${isShortBottom ? bottomName : footwearName} ngắn/xuề xòa làm phá vỡ phom dáng đoan chính của cổ phục!`
    );
  }

  if (accCount > 3) {
    score -= 15;
    balanceScore = Math.max(25, balanceScore - 15);
    stylistNotes.push(`Set đồ đang có ${accCount} phụ kiện, hơi ôm đồm chi tiết khiến tà áo bị phân tán thị giác.`);
  }

  const garmentHex = outfit?.colorHex || garment?.colorHex || '#C53030';
  const bottomHex = bottom?.colorHex || '#F8F9FA';
  const colorHarmony = evaluateColorHarmonyServer(garmentHex, bottomHex);

  if (colorHarmony === 'conflict') {
    score -= 10;
    stylistNotes.push('Sắc độ giữa áo và quần có độ chỏi gắt, thiếu màu trung tính chuyển tiếp mềm mại.');
  } else if (colorHarmony === 'tone_sur_tone') {
    score += 15;
    stylistNotes.push('Phối màu tone-sur-tone liền mạch tạo hiệu ứng kéo dài đôi chân cực kỳ thanh thoát.');
  } else if (colorHarmony === 'complementary') {
    score += 10;
    stylistNotes.push('Bảng màu tương sinh/bổ trợ giúp tà áo nổi bật mà vẫn hòa hợp và dịu mắt.');
  }

  if (!isShortBottom) {
    if (garmentType === 'ao_dai' && (hasSilkBottom || hasMaxiSkirt)) {
      score += 10;
      balanceScore = Math.min(95, balanceScore + 10);
      stylistNotes.push('Tà áo dài buông lướt trên nền quần lụa suông/váy maxi tạo dòng chảy thị giác mềm mại kinh điển.');
    } else if (garmentType === 'ngu_than' && (hasSilkBottom || hasTailoredTrouser)) {
      score += 10;
      balanceScore = Math.min(95, balanceScore + 10);
      stylistNotes.push('Áo ngũ thân tay chẽn phối cùng quần âu/lụa đứng dáng mang lại thần thái đĩnh đạc, quý phái.');
    } else if (garmentType === 'ba_ba' && hasSilkBottom) {
      score += 10;
      stylistNotes.push('Áo bà ba xẻ tà phối quần lụa suông mềm mại, tôn trọn nét duyên dáng Nam Bộ.');
    } else if (garmentType === 'tu_than' && (hasSilkBottom || hasMaxiSkirt)) {
      score += 10;
      stylistNotes.push('Vạt áo tứ thân buộc chéo trên nền quần suông rủ giữ trọn vẹn nét e ấp Kinh Bắc.');
    }
  }

  if (garmentType === 'ao_dai' && isWhiteSneaker) {
    score += 8;
    stylistNotes.push('Điểm xuyết sneaker trắng tối giản vừa bảo vệ gấu tà khi du xuân dạo phố vừa tạo vibe Gen Z cực năng động!');
  } else if (garmentType === 'ao_dai' && hasDenim) {
    score += 8;
    stylistNotes.push('Combo áo dài truyền thống với quần jeans ống đứng tạo sự giao thoa độc đáo giữa nét thướt tha và streetwear.');
  } else if (isTraditionalShoes && (isFormalRoyal || garmentType === 'ao_dai' || garmentType === 'tu_than')) {
    score += 8;
    balanceScore = Math.min(98, balanceScore + 8);
    stylistNotes.push('Đôi guốc mộc sơn mài nâng gót mộc mạc, tôn trọn cốt cách đoan trang truyền thống.');
  } else if (isLoaferOrBoots && (garmentType === 'ngu_than' || garmentType === 'ao_dai')) {
    score += 7;
    stylistNotes.push('Giày loafer/chelsea boots đem lại vẻ đẹp tân thời, lịch thiệp và chỉn chu cho set cổ phục.');
  }

  const finalMatchScore = Math.min(98, Math.max(45, score));
  const finalBalanceScore = Math.min(100, Math.max(10, balanceScore));

  let finalComment = stylistNotes.join(' ');
  if (!finalComment) {
    finalComment = `Bản phối ${garmentName} cùng ${bottomName} và ${footwearName} đạt độ cân đối ổn định, giữ được nét thanh nhã du xuân.`;
  }

  let fact = 'Hệ 5 cúc khuy cài lệch bên phải của áo ngũ thân tượng trưng cho Ngũ Thường: Nhân, Lễ, Nghĩa, Trí, Tín.';
  if (garmentType === 'ao_dai') {
    fact = 'Đường xẻ tà áo dài ngang hông bắt nguồn từ áo ngũ thân, giúp cử động thoải mái mà vẫn giữ vẻ thanh thoát.';
  } else if (garmentType === 'ba_ba') {
    fact = 'Áo bà ba xẻ tà hông với hai túi đắp tiện dụng là biểu tượng phóng khoáng gắn bó với miền sông nước Nam Bộ.';
  } else if (garmentType === 'nhat_binh') {
    fact = 'Cổ áo hình chữ nhật của áo Nhật Bình được ghép từ các dải màu ngũ sắc tượng trưng cho Ngũ Hành tương sinh.';
  } else if (garmentType === 'giao_linh') {
    fact = 'Áo Giao Lĩnh cổ chéo là dáng áo tôn nghiêm thịnh hành suốt thời Lý - Trần - Hậu Lê của nước ta.';
  } else if (garmentType === 'tu_than') {
    fact = 'Áo Tứ Thân gồm 4 vạt, 2 vạt sau may sống lưng và 2 vạt trước buộc chéo tạo nét duyên dáng của phụ nữ Kinh Bắc.';
  }

  return {
    matchScore: finalMatchScore,
    balanceScore: finalBalanceScore,
    stylistComment: finalComment,
    culturalFact: fact,
  };
}

// 3. Evaluate Outfit Realtime Endpoint
app.post('/api/gemini/evaluate-outfit', async (req, res) => {
  const { outfit, context } = req.body;
  const garmentName = outfit?.garment?.name || 'Áo Cổ Phục';
  const bottomName = outfit?.bottom?.name || 'Quần Lụa';

  const defaultEvaluation = computeServerInstantHeuristic(outfit);

  if (isQuotaCurrentlyExhausted() || !process.env.GEMINI_API_KEY) {
    return res.status(200).json({ success: true, data: defaultEvaluation });
  }

  try {
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: { headers: { 'User-Agent': 'aistudio-build' } },
    });

    const prompt = `Stylist Gen Z đánh giá nhanh:
- Áo: ${garmentName}
- Quần: ${bottomName}
- Bối cảnh: ${context || 'Du xuân'}
JSON:
{
  "matchScore": number (0-100),
  "balanceScore": number (0-100),
  "stylistComment": "string ngắn 1 câu",
  "culturalFact": "string 1 câu"
}`;

    const response = await generateContentWithServerFallback(ai, {
      contents: prompt,
      config: { responseMimeType: 'application/json' },
    });

    const parsed = JSON.parse(response.text || '{}');
    if (typeof parsed.matchScore === 'number') {
      return res.status(200).json({ success: true, data: parsed });
    }
    return res.status(200).json({ success: true, data: defaultEvaluation });
  } catch (err: any) {
    if (err?.status === 429 || err?.message?.includes('quota') || err?.message?.includes('429')) {
      markQuotaExhausted(600);
    }
    return res.status(200).json({ success: true, data: defaultEvaluation });
  }
});

// 4. Garment Story Endpoint
app.post('/api/gemini/garment-story', async (req, res) => {
  const { garmentName } = req.body;
  const curatedStory = getCuratedStory(garmentName);

  if (isQuotaCurrentlyExhausted() || !process.env.GEMINI_API_KEY) {
    return res.status(200).json({ success: true, story: curatedStory });
  }

  try {
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: { headers: { 'User-Agent': 'aistudio-build' } },
    });

    const response = await generateContentWithServerFallback(ai, {
      contents: `Kể câu chuyện truyền cảm hứng (3 đoạn ngắn) cho Gen Z về cổ phục "${garmentName}".`,
    });

    return res.status(200).json({
      success: true,
      story: response.text?.trim() || curatedStory,
    });
  } catch (err: any) {
    if (err?.status === 429 || err?.message?.includes('quota') || err?.message?.includes('429')) {
      markQuotaExhausted(600);
    }
    return res.status(200).json({ success: true, story: curatedStory });
  }
});

// 5. Quick Ask Stylist Endpoint
app.post('/api/gemini/quick-ask', async (req, res) => {
  const { question, outfitSummary } = req.body;
  if (!question) {
    return res.status(400).json({ success: false, error: 'Thiếu câu hỏi' });
  }

  const fallbackAnswer = getContextualOfflineAnswer(question, outfitSummary);

  if (isQuotaCurrentlyExhausted() || !process.env.GEMINI_API_KEY) {
    return res.status(200).json({
      success: true,
      data: fallbackAnswer,
      source: 'curated_fallback',
    });
  }

  try {
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: { headers: { 'User-Agent': 'aistudio-build' } },
    });

    const prompt = `Bạn là Stylist thời trang Gen Z kiêm Chuyên gia Cổ phục Việt Nam. Trả lời đúng trọng tâm câu hỏi của người dùng bằng tiếng Việt tự nhiên, súc tích trong 2-3 câu, đưa ra lời khuyên thực tế theo vóc dáng, địa điểm hoặc bối cảnh.
Bối cảnh trang phục hiện tại: ${outfitSummary || 'Áo Cổ Phục Việt Nam'}.
Câu hỏi của người dùng: "${question}".

Nếu có gợi ý một món đồ phù hợp (áo, quần, giày, khăn vấn, trang sức, túi xách...), hãy trả về tên món và id nếu có.
Trả về đúng JSON:
{
  "answer": "câu trả lời 2-3 câu súc tích",
  "suggestedItemName": "Tên món đồ (nếu có)",
  "suggestedItemId": "id hoặc để trống"
}`;

    const response = await generateContentWithServerFallback(ai, {
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        systemInstruction:
          'Bạn là Stylist thời trang Gen Z kiêm Chuyên gia Cổ phục Việt Nam. Trả lời đúng trọng tâm câu hỏi của người dùng bằng tiếng Việt tự nhiên, súc tích trong 2-3 câu, đưa ra lời khuyên thực tế theo vóc dáng, địa điểm hoặc bối cảnh.',
      },
    });

    const raw = response.text?.trim() || '';
    let parsed: any = {};
    try {
      parsed = JSON.parse(raw);
    } catch {
      const match = raw.match(/\{[\s\S]*\}/);
      if (match) {
        try {
          parsed = JSON.parse(match[0]);
        } catch {
          // Ignore
        }
      }
    }

    const answer = parsed.answer || (raw && !raw.startsWith('{') ? raw : null);

    if (answer) {
      return res.status(200).json({
        success: true,
        data: {
          answer,
          suggestedItemId: parsed.suggestedItemId || fallbackAnswer.suggestedItemId,
          suggestedItemName: parsed.suggestedItemName || fallbackAnswer.suggestedItemName,
        },
        source: 'gemini_api',
      });
    }

    return res.status(200).json({
      success: true,
      data: fallbackAnswer,
      source: 'curated_fallback',
    });
  } catch (err: any) {
    if (err?.status === 429 || err?.message?.includes('quota') || err?.message?.includes('429')) {
      markQuotaExhausted(600);
    }
    return res.status(200).json({
      success: true,
      data: fallbackAnswer,
      source: 'curated_fallback',
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Việt Phục Remix server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
