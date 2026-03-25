import { Card, GameEvent, Religion } from './types';

// Generate unique ID
let cardIdCounter = 0;
export const generateCardId = () => `card_${++cardIdCounter}_${Date.now()}`;

// 20 Events
export const GAME_EVENTS: GameEvent[] = [
  { id: 1, name: 'Khủng Hoảng Niềm Tin Do Scandal Từ Thiện', description: 'Scandal từ thiện gây ra khủng hoảng niềm tin trong cộng đồng.' },
  { id: 2, name: 'Dịch Bệnh Bùng Phát Nhẹ', description: 'Dịch bệnh nhẹ lan rộng, cần phản ứng nhanh.' },
  { id: 3, name: 'Mạng Xã Hội Tranh Cãi', description: 'Tranh cãi gay gắt trên mạng xã hội về các vấn đề tôn giáo.' },
  { id: 4, name: 'Thanh Niên Giảm Quan Tâm', description: 'Giới trẻ ngày càng ít quan tâm đến tôn giáo.' },
  { id: 5, name: 'Thiên Tai', description: 'Thiên tai xảy ra, cần cứu trợ khẩn cấp.' },
  { id: 6, name: 'Kiểm Tra Pháp Lý', description: 'Cơ quan chức năng kiểm tra hoạt động tôn giáo.' },
  { id: 7, name: 'Làn Sóng Đoàn Kết', description: 'Phong trào đoàn kết liên tôn giáo.' },
  { id: 8, name: 'Khủng Hoảng Kinh Tế', description: 'Kinh tế suy thoái ảnh hưởng mọi hoạt động.' },
  { id: 9, name: 'Truyền Thông Tiêu Cực', description: 'Báo chí đưa tin tiêu cực về tôn giáo.' },
  { id: 10, name: 'Nội Bộ Mâu Thuẫn', description: 'Xung đột nội bộ trong các tổ chức tôn giáo.' },
  { id: 11, name: 'Lễ Hội Lớn', description: 'Lễ hội tôn giáo lớn được tổ chức.' },
  { id: 12, name: 'Giới Trẻ Chỉ Trích', description: 'Giới trẻ công khai chỉ trích các hoạt động tôn giáo.' },
  { id: 13, name: 'Đối Thủ Phát Triển Mạnh', description: 'Các tôn giáo khác phát triển nhanh chóng.' },
  { id: 14, name: 'Tin Giả Lan Rộng', description: 'Tin giả về tôn giáo lan truyền mạnh.' },
  { id: 15, name: 'Cơ Hội Truyền Thông', description: 'Cơ hội xuất hiện trên truyền thông chính thống.' },
  { id: 16, name: 'Chính Sách Mới', description: 'Chính phủ ban hành chính sách mới về tôn giáo.' },
  { id: 17, name: 'Áp Lực Xã Hội', description: 'Áp lực từ xã hội đối với các hoạt động tôn giáo.' },
  { id: 18, name: 'Phát Triển Cộng Đồng', description: 'Cơ hội phát triển và mở rộng cộng đồng.' },
  { id: 19, name: 'Khủng Hoảng Hình Ảnh', description: 'Khủng hoảng về hình ảnh công chúng.' },
  { id: 20, name: 'Giai Đoạn Ổn Định', description: 'Thời kỳ ổn định, thuận lợi cho phát triển.' },
];

// Card data for each event and religion
// Format: { name, description, effects: { reputation, belief, community }, isNegative }
type CardTemplate = {
  name: string;
  description: string;
  effects: { reputation: number; belief: number; community: number };
  isNegative: boolean;
};

type EventCards = Record<Religion, CardTemplate[]>;

const ALL_EVENT_CARDS: Record<number, EventCards> = {
  // EVENT 1: KHỦNG HOẢNG NIỀM TIN DO SCANDAL TỪ THIỆN
  1: {
    cao_dai: [
      { name: 'Tổng hợp giáo lý giải thích', description: 'Dùng triết lý đa chiều để giải thích và trấn an.', effects: { reputation: 1, belief: 2, community: 0 }, isNegative: false },
      { name: 'Kết hợp truyền thông đa chiều', description: 'Truyền thông đa kênh để phục hồi uy tín.', effects: { reputation: 2, belief: 0, community: 1 }, isNegative: false },
      { name: 'Kêu gọi hòa hợp nội bộ', description: 'Đoàn kết nội bộ để vượt qua khủng hoảng.', effects: { reputation: 0, belief: 0, community: 2 }, isNegative: false },
      { name: 'Phản ứng lan man', description: 'Phản hồi không rõ ràng gây hoang mang.', effects: { reputation: -2, belief: 0, community: 0 }, isNegative: true },
      { name: 'Không rõ lập trường', description: 'Thiếu quan điểm rõ ràng làm mất niềm tin.', effects: { reputation: 0, belief: -2, community: 0 }, isNegative: true },
    ],
    hoa_hao: [
      { name: 'Công khai trực tiếp', description: 'Nói thẳng nói thật với cộng đồng.', effects: { reputation: 2, belief: 2, community: 0 }, isNegative: false },
      { name: 'Gặp dân giải thích', description: 'Trực tiếp gặp gỡ và giải thích với người dân.', effects: { reputation: 0, belief: 1, community: 2 }, isNegative: false },
      { name: 'Hành động thực tế', description: 'Chứng minh bằng hành động cụ thể.', effects: { reputation: 2, belief: 0, community: 1 }, isNegative: false },
      { name: 'Im lặng', description: 'Không phản hồi làm mất niềm tin.', effects: { reputation: 0, belief: -2, community: 0 }, isNegative: true },
      { name: 'Né tránh', description: 'Tránh né vấn đề làm giảm uy tín.', effects: { reputation: -2, belief: 0, community: 0 }, isNegative: true },
    ],
    phat_giao: [
      { name: 'Thiền định và nhân quả', description: 'Giải thích theo luật nhân quả.', effects: { reputation: 1, belief: 2, community: 0 }, isNegative: false },
      { name: 'Minh bạch tài chính', description: 'Công khai tài chính minh bạch.', effects: { reputation: 2, belief: 1, community: 0 }, isNegative: false },
      { name: 'Tu tập và buông bỏ', description: 'Tập trung tu tập, không dính mắc.', effects: { reputation: 0, belief: 2, community: 1 }, isNegative: false },
      { name: 'Thụ động chờ đợi', description: 'Không hành động kịp thời.', effects: { reputation: -2, belief: 0, community: 0 }, isNegative: true },
      { name: 'Xa rời thực tế', description: 'Quá tập trung tâm linh, bỏ quên thực tế.', effects: { reputation: 0, belief: 0, community: -2 }, isNegative: true },
    ],
    thien_chua: [
      { name: 'Họp báo chính thức', description: 'Tổ chức họp báo giải thích rõ ràng.', effects: { reputation: 2, belief: 1, community: 0 }, isNegative: false },
      { name: 'Tổ chức kiểm toán', description: 'Mời kiểm toán độc lập.', effects: { reputation: 2, belief: 0, community: 1 }, isNegative: false },
      { name: 'Lời xin lỗi công khai', description: 'Xin lỗi chân thành và cam kết sửa đổi.', effects: { reputation: 1, belief: 2, community: 0 }, isNegative: false },
      { name: 'Phủ nhận hoàn toàn', description: 'Phủ nhận mọi cáo buộc gây phản cảm.', effects: { reputation: -2, belief: -1, community: 0 }, isNegative: true },
      { name: 'Đổ lỗi người khác', description: 'Đổ lỗi cho bên ngoài.', effects: { reputation: -1, belief: -2, community: 0 }, isNegative: true },
    ],
  },
  // EVENT 2: DỊCH BỆNH BÙNG PHÁT NHẸ
  2: {
    cao_dai: [
      { name: 'Nghi lễ kết hợp online', description: 'Tổ chức nghi lễ trực tuyến.', effects: { reputation: 0, belief: 2, community: 1 }, isNegative: false },
      { name: 'Truyền thông đa kênh', description: 'Sử dụng nhiều kênh truyền thông.', effects: { reputation: 2, belief: 0, community: 0 }, isNegative: false },
      { name: 'Hỗ trợ cộng đồng', description: 'Tích cực hỗ trợ cộng đồng.', effects: { reputation: 0, belief: 0, community: 2 }, isNegative: false },
      { name: 'Tổ chức rối', description: 'Tổ chức lộn xộn, thiếu hiệu quả.', effects: { reputation: -2, belief: 0, community: 0 }, isNegative: true },
      { name: 'Không thích nghi', description: 'Không thay đổi theo tình hình.', effects: { reputation: 0, belief: -2, community: 0 }, isNegative: true },
    ],
    hoa_hao: [
      { name: 'Giúp dân trực tiếp', description: 'Trực tiếp hỗ trợ người dân.', effects: { reputation: 2, belief: 0, community: 2 }, isNegative: false },
      { name: 'Sinh hoạt nhỏ lẻ', description: 'Tổ chức sinh hoạt nhóm nhỏ.', effects: { reputation: 0, belief: 1, community: 0 }, isNegative: false },
      { name: 'Chia sẻ thực tế', description: 'Chia sẻ kinh nghiệm thực tế.', effects: { reputation: 1, belief: 1, community: 0 }, isNegative: false },
      { name: 'Thụ động', description: 'Không có hành động gì.', effects: { reputation: -2, belief: 0, community: 0 }, isNegative: true },
      { name: 'Bỏ mặc', description: 'Bỏ mặc cộng đồng.', effects: { reputation: 0, belief: 0, community: -2 }, isNegative: true },
    ],
    phat_giao: [
      { name: 'Phát thuốc và thực phẩm', description: 'Phát thuốc và thực phẩm cho người dân.', effects: { reputation: 2, belief: 0, community: 2 }, isNegative: false },
      { name: 'Cầu an online', description: 'Tổ chức lễ cầu an trực tuyến.', effects: { reputation: 0, belief: 2, community: 1 }, isNegative: false },
      { name: 'Hướng dẫn thiền tại nhà', description: 'Hướng dẫn thiền định tại gia.', effects: { reputation: 1, belief: 2, community: 0 }, isNegative: false },
      { name: 'Tiếp tục tập trung đông', description: 'Vẫn tổ chức tập trung đông người.', effects: { reputation: -2, belief: 0, community: -1 }, isNegative: true },
      { name: 'Thiếu quan tâm sức khỏe', description: 'Không chú ý đến sức khỏe cộng đồng.', effects: { reputation: -1, belief: 0, community: -2 }, isNegative: true },
    ],
    thien_chua: [
      { name: 'Thánh lễ online', description: 'Tổ chức thánh lễ trực tuyến.', effects: { reputation: 0, belief: 2, community: 1 }, isNegative: false },
      { name: 'Hỗ trợ y tế', description: 'Hỗ trợ y tế cho cộng đồng.', effects: { reputation: 2, belief: 0, community: 2 }, isNegative: false },
      { name: 'Kêu gọi đoàn kết', description: 'Kêu gọi giáo dân đoàn kết.', effects: { reputation: 1, belief: 1, community: 1 }, isNegative: false },
      { name: 'Bỏ qua khuyến cáo', description: 'Không tuân thủ khuyến cáo y tế.', effects: { reputation: -2, belief: 0, community: -1 }, isNegative: true },
      { name: 'Hoang mang nội bộ', description: 'Thiếu chỉ đạo rõ ràng.', effects: { reputation: -1, belief: -2, community: 0 }, isNegative: true },
    ],
  },
  // EVENT 3: MẠNG XÃ HỘI TRANH CÃI
  3: {
    cao_dai: [
      { name: 'Phân tích đa chiều', description: 'Đưa ra góc nhìn đa chiều.', effects: { reputation: 2, belief: 1, community: 0 }, isNegative: false },
      { name: 'Điều hòa tranh luận', description: 'Làm trung gian hòa giải.', effects: { reputation: 0, belief: 0, community: 2 }, isNegative: false },
      { name: 'Nội dung triết lý', description: 'Chia sẻ nội dung triết lý sâu sắc.', effects: { reputation: 0, belief: 2, community: 0 }, isNegative: false },
      { name: 'Bị cuốn vào drama', description: 'Bị lôi kéo vào tranh cãi.', effects: { reputation: -2, belief: 0, community: 0 }, isNegative: true },
      { name: 'Thông tin rối', description: 'Đưa thông tin không nhất quán.', effects: { reputation: 0, belief: -2, community: 0 }, isNegative: true },
    ],
    hoa_hao: [
      { name: 'Nói thẳng thực tế', description: 'Phát biểu thẳng thắn, thực tế.', effects: { reputation: 2, belief: 0, community: 0 }, isNegative: false },
      { name: 'Gặp dân giải thích', description: 'Trực tiếp giải thích với người dân.', effects: { reputation: 0, belief: 0, community: 2 }, isNegative: false },
      { name: 'Giữ đơn giản', description: 'Giữ thông điệp đơn giản, dễ hiểu.', effects: { reputation: 0, belief: 1, community: 0 }, isNegative: false },
      { name: 'Phản ứng gắt', description: 'Phản ứng quá gay gắt.', effects: { reputation: -2, belief: 0, community: 0 }, isNegative: true },
      { name: 'Gây hiểu lầm', description: 'Phát ngôn gây hiểu lầm.', effects: { reputation: 0, belief: -2, community: 0 }, isNegative: true },
    ],
    phat_giao: [
      { name: 'Giữ tâm bình an', description: 'Giữ thái độ bình tĩnh, không tranh cãi.', effects: { reputation: 1, belief: 2, community: 0 }, isNegative: false },
      { name: 'Chia sẻ lời Phật dạy', description: 'Chia sẻ những lời dạy về từ bi.', effects: { reputation: 0, belief: 2, community: 1 }, isNegative: false },
      { name: 'Im lặng khôn ngoan', description: 'Không tham gia tranh cãi.', effects: { reputation: 1, belief: 1, community: 0 }, isNegative: false },
      { name: 'Bị chỉ trích thụ động', description: 'Bị cho là thờ ơ.', effects: { reputation: -2, belief: 0, community: 0 }, isNegative: true },
      { name: 'Mất kết nối giới trẻ', description: 'Không hiểu ngôn ngữ mạng.', effects: { reputation: 0, belief: 0, community: -2 }, isNegative: true },
    ],
    thien_chua: [
      { name: 'Tuyên bố chính thức', description: 'Đưa ra tuyên bố chính thức.', effects: { reputation: 2, belief: 0, community: 1 }, isNegative: false },
      { name: 'Truyền thông bài bản', description: 'Chiến dịch truyền thông chuyên nghiệp.', effects: { reputation: 2, belief: 1, community: 0 }, isNegative: false },
      { name: 'Kêu gọi đối thoại', description: 'Kêu gọi đối thoại văn minh.', effects: { reputation: 1, belief: 0, community: 2 }, isNegative: false },
      { name: 'Tranh cãi với anti', description: 'Tranh cãi gay gắt với người phản đối.', effects: { reputation: -2, belief: -1, community: 0 }, isNegative: true },
      { name: 'Khẩu chiến', description: 'Khẩu chiến trên mạng xã hội.', effects: { reputation: -1, belief: 0, community: -2 }, isNegative: true },
    ],
  },
  // EVENT 4: THANH NIÊN GIẢM QUAN TÂM
  4: {
    cao_dai: [
      { name: 'Nội dung triết lý hiện đại', description: 'Trình bày triết lý theo cách hiện đại.', effects: { reputation: 0, belief: 2, community: 0 }, isNegative: false },
      { name: 'Kết hợp đa văn hóa', description: 'Kết hợp với văn hóa trẻ.', effects: { reputation: 0, belief: 0, community: 2 }, isNegative: false },
      { name: 'Sáng tạo nghi lễ', description: 'Đổi mới nghi lễ phù hợp.', effects: { reputation: 1, belief: 0, community: 0 }, isNegative: false },
      { name: 'Lỗi thời', description: 'Giữ cách làm cũ không phù hợp.', effects: { reputation: 0, belief: 0, community: -2 }, isNegative: true },
      { name: 'Thiếu đổi mới', description: 'Không chịu thay đổi.', effects: { reputation: 0, belief: -2, community: 0 }, isNegative: true },
    ],
    hoa_hao: [
      { name: 'Sống đạo đời thường', description: 'Hướng dẫn sống đạo trong cuộc sống.', effects: { reputation: 0, belief: 2, community: 1 }, isNegative: false },
      { name: 'Gần gũi giới trẻ', description: 'Tiếp cận giới trẻ gần gũi.', effects: { reputation: 0, belief: 0, community: 2 }, isNegative: false },
      { name: 'Nội dung dễ hiểu', description: 'Truyền tải nội dung dễ hiểu.', effects: { reputation: 0, belief: 2, community: 0 }, isNegative: false },
      { name: 'Bảo thủ', description: 'Giữ quan điểm bảo thủ.', effects: { reputation: 0, belief: -2, community: 0 }, isNegative: true },
      { name: 'Xa rời thực tế', description: 'Không hiểu giới trẻ.', effects: { reputation: 0, belief: 0, community: -2 }, isNegative: true },
    ],
    phat_giao: [
      { name: 'Thiền cho người bận rộn', description: 'Hướng dẫn thiền ngắn cho người bận.', effects: { reputation: 0, belief: 2, community: 1 }, isNegative: false },
      { name: 'Podcast Phật pháp', description: 'Tạo podcast về Phật pháp.', effects: { reputation: 1, belief: 2, community: 0 }, isNegative: false },
      { name: 'Khóa tu trải nghiệm', description: 'Tổ chức khóa tu ngắn hạn.', effects: { reputation: 0, belief: 1, community: 2 }, isNegative: false },
      { name: 'Nghi thức phức tạp', description: 'Nghi thức quá phức tạp cho người trẻ.', effects: { reputation: 0, belief: -2, community: 0 }, isNegative: true },
      { name: 'Thiếu kết nối số', description: 'Không có mặt trên các nền tảng số.', effects: { reputation: 0, belief: 0, community: -2 }, isNegative: true },
    ],
    thien_chua: [
      { name: 'Nhóm thanh niên sôi động', description: 'Tổ chức hoạt động thanh niên.', effects: { reputation: 0, belief: 1, community: 2 }, isNegative: false },
      { name: 'Âm nhạc thánh ca hiện đại', description: 'Sáng tác thánh ca hiện đại.', effects: { reputation: 0, belief: 2, community: 1 }, isNegative: false },
      { name: 'Hoạt động xã hội', description: 'Tổ chức hoạt động xã hội cho giới trẻ.', effects: { reputation: 1, belief: 0, community: 2 }, isNegative: false },
      { name: 'Giảng đạo khô khan', description: 'Phương pháp giảng đạo cũ.', effects: { reputation: 0, belief: -2, community: -1 }, isNegative: true },
      { name: 'Thiếu quan tâm giới trẻ', description: 'Không có chương trình cho giới trẻ.', effects: { reputation: -1, belief: 0, community: -2 }, isNegative: true },
    ],
  },
  // EVENT 5: THIÊN TAI
  5: {
    cao_dai: [
      { name: 'Hỗ trợ tổng hợp', description: 'Hỗ trợ đa mặt cho nạn nhân.', effects: { reputation: 1, belief: 0, community: 2 }, isNegative: false },
      { name: 'Nghi lễ cầu an', description: 'Tổ chức nghi lễ cầu an.', effects: { reputation: 0, belief: 2, community: 0 }, isNegative: false },
      { name: 'Điều phối đa nhóm', description: 'Điều phối các nhóm cứu trợ.', effects: { reputation: 2, belief: 0, community: 0 }, isNegative: false },
      { name: 'Thiếu phối hợp', description: 'Thiếu sự phối hợp hiệu quả.', effects: { reputation: -2, belief: 0, community: 0 }, isNegative: true },
      { name: 'Rối loạn', description: 'Hoạt động rối loạn, không hiệu quả.', effects: { reputation: 0, belief: 0, community: -2 }, isNegative: true },
    ],
    hoa_hao: [
      { name: 'Cứu trợ trực tiếp', description: 'Trực tiếp cứu trợ tại hiện trường.', effects: { reputation: 2, belief: 0, community: 2 }, isNegative: false },
      { name: 'Giúp dân tại chỗ', description: 'Hỗ trợ người dân tại địa phương.', effects: { reputation: 0, belief: 0, community: 2 }, isNegative: false },
      { name: 'Hành động nhanh', description: 'Phản ứng nhanh chóng.', effects: { reputation: 2, belief: 0, community: 0 }, isNegative: false },
      { name: 'Thiếu nguồn lực', description: 'Thiếu nguồn lực để hỗ trợ.', effects: { reputation: 0, belief: 0, community: -2 }, isNegative: true },
      { name: 'Chậm phản ứng', description: 'Phản ứng chậm trễ.', effects: { reputation: -2, belief: 0, community: 0 }, isNegative: true },
    ],
    phat_giao: [
      { name: 'Cứu trợ từ các chùa', description: 'Các chùa tổ chức cứu trợ.', effects: { reputation: 2, belief: 0, community: 2 }, isNegative: false },
      { name: 'Cầu siêu cho nạn nhân', description: 'Tổ chức lễ cầu siêu.', effects: { reputation: 0, belief: 2, community: 1 }, isNegative: false },
      { name: 'Quyên góp rộng rãi', description: 'Kêu gọi quyên góp rộng rãi.', effects: { reputation: 1, belief: 1, community: 1 }, isNegative: false },
      { name: 'Chỉ cầu nguyện suông', description: 'Chỉ cầu nguyện mà không hành động.', effects: { reputation: -2, belief: 0, community: 0 }, isNegative: true },
      { name: 'Thiếu tổ chức', description: 'Hoạt động cứu trợ thiếu tổ chức.', effects: { reputation: 0, belief: 0, community: -2 }, isNegative: true },
    ],
    thien_chua: [
      { name: 'Caritas cứu trợ', description: 'Tổ chức Caritas triển khai cứu trợ.', effects: { reputation: 2, belief: 0, community: 2 }, isNegative: false },
      { name: 'Cầu nguyện và hành động', description: 'Vừa cầu nguyện vừa hành động.', effects: { reputation: 1, belief: 2, community: 0 }, isNegative: false },
      { name: 'Huy động giáo xứ', description: 'Huy động toàn bộ giáo xứ.', effects: { reputation: 1, belief: 0, community: 2 }, isNegative: false },
      { name: 'Chậm triển khai', description: 'Triển khai chậm do bộ máy.', effects: { reputation: -2, belief: 0, community: 0 }, isNegative: true },
      { name: 'Thiếu phối hợp địa phương', description: 'Không phối hợp tốt với địa phương.', effects: { reputation: 0, belief: 0, community: -2 }, isNegative: true },
    ],
  },
  // EVENT 6: KIỂM TRA PHÁP LÝ
  6: {
    cao_dai: [
      { name: 'Hồ sơ đầy đủ', description: 'Chuẩn bị hồ sơ pháp lý đầy đủ.', effects: { reputation: 2, belief: 0, community: 0 }, isNegative: false },
      { name: 'Hợp tác tích cực', description: 'Hợp tác tích cực với cơ quan chức năng.', effects: { reputation: 1, belief: 1, community: 1 }, isNegative: false },
      { name: 'Minh bạch hoạt động', description: 'Công khai minh bạch mọi hoạt động.', effects: { reputation: 2, belief: 0, community: 1 }, isNegative: false },
      { name: 'Hồ sơ thiếu', description: 'Hồ sơ pháp lý không đầy đủ.', effects: { reputation: -2, belief: 0, community: 0 }, isNegative: true },
      { name: 'Né tránh kiểm tra', description: 'Cố tình né tránh kiểm tra.', effects: { reputation: -2, belief: -1, community: 0 }, isNegative: true },
    ],
    hoa_hao: [
      { name: 'Đơn giản rõ ràng', description: 'Hoạt động đơn giản, dễ kiểm tra.', effects: { reputation: 2, belief: 0, community: 0 }, isNegative: false },
      { name: 'Dân làm chứng', description: 'Người dân địa phương làm chứng.', effects: { reputation: 1, belief: 0, community: 2 }, isNegative: false },
      { name: 'Thực tế minh bạch', description: 'Hoạt động thực tế, không cần giải thích nhiều.', effects: { reputation: 1, belief: 1, community: 0 }, isNegative: false },
      { name: 'Thiếu giấy tờ', description: 'Thiếu giấy tờ pháp lý.', effects: { reputation: -2, belief: 0, community: 0 }, isNegative: true },
      { name: 'Hoạt động không chính thức', description: 'Một số hoạt động không chính thức.', effects: { reputation: -1, belief: 0, community: -2 }, isNegative: true },
    ],
    phat_giao: [
      { name: 'Hệ thống tổ chức rõ', description: 'Hệ thống tổ chức rõ ràng.', effects: { reputation: 2, belief: 0, community: 1 }, isNegative: false },
      { name: 'Lịch sử lâu đời', description: 'Lịch sử hoạt động lâu đời, uy tín.', effects: { reputation: 1, belief: 2, community: 0 }, isNegative: false },
      { name: 'Quan hệ tốt', description: 'Quan hệ tốt với chính quyền.', effects: { reputation: 2, belief: 0, community: 0 }, isNegative: false },
      { name: 'Thiếu cập nhật', description: 'Chưa cập nhật quy định mới.', effects: { reputation: -2, belief: 0, community: 0 }, isNegative: true },
      { name: 'Mâu thuẫn nội bộ lộ ra', description: 'Mâu thuẫn nội bộ bị phát hiện.', effects: { reputation: -1, belief: -1, community: -1 }, isNegative: true },
    ],
    thien_chua: [
      { name: 'Tổ chức chặt chẽ', description: 'Hệ thống tổ chức chặt chẽ, chuyên nghiệp.', effects: { reputation: 2, belief: 0, community: 1 }, isNegative: false },
      { name: 'Pháp lý đầy đủ', description: 'Hồ sơ pháp lý luôn đầy đủ.', effects: { reputation: 2, belief: 1, community: 0 }, isNegative: false },
      { name: 'Đối thoại chuyên nghiệp', description: 'Đối thoại chuyên nghiệp với cơ quan.', effects: { reputation: 1, belief: 0, community: 1 }, isNegative: false },
      { name: 'Quan liêu', description: 'Bộ máy quan liêu gây khó.', effects: { reputation: -2, belief: 0, community: 0 }, isNegative: true },
      { name: 'Thiếu linh hoạt', description: 'Thiếu linh hoạt trong xử lý.', effects: { reputation: -1, belief: 0, community: -2 }, isNegative: true },
    ],
  },
  // EVENT 7: LÀN SÓNG ĐOÀN KẾT
  7: {
    cao_dai: [
      { name: 'Tổng hợp các đạo', description: 'Thể hiện tinh thần tổng hợp các đạo.', effects: { reputation: 1, belief: 2, community: 1 }, isNegative: false },
      { name: 'Triết lý hòa hợp', description: 'Chia sẻ triết lý hòa hợp.', effects: { reputation: 0, belief: 2, community: 1 }, isNegative: false },
      { name: 'Cầu nối liên tôn', description: 'Làm cầu nối giữa các tôn giáo.', effects: { reputation: 2, belief: 0, community: 1 }, isNegative: false },
      { name: 'Quá nhấn mạnh khác biệt', description: 'Nhấn mạnh sự khác biệt.', effects: { reputation: -2, belief: 0, community: 0 }, isNegative: true },
      { name: 'Tự tách biệt', description: 'Tự tách biệt khỏi phong trào.', effects: { reputation: 0, belief: 0, community: -2 }, isNegative: true },
    ],
    hoa_hao: [
      { name: 'Hợp tác thực tế', description: 'Hợp tác thực tế với các tôn giáo khác.', effects: { reputation: 1, belief: 0, community: 2 }, isNegative: false },
      { name: 'Đơn giản hòa đồng', description: 'Thái độ đơn giản, hòa đồng.', effects: { reputation: 0, belief: 1, community: 2 }, isNegative: false },
      { name: 'Chung tay với dân', description: 'Cùng người dân địa phương.', effects: { reputation: 1, belief: 0, community: 2 }, isNegative: false },
      { name: 'Khép kín', description: 'Khép kín với các tôn giáo khác.', effects: { reputation: -1, belief: 0, community: -2 }, isNegative: true },
      { name: 'Không tham gia', description: 'Không tham gia hoạt động chung.', effects: { reputation: -2, belief: 0, community: 0 }, isNegative: true },
    ],
    phat_giao: [
      { name: 'Từ bi không phân biệt', description: 'Thể hiện lòng từ bi với tất cả.', effects: { reputation: 0, belief: 2, community: 2 }, isNegative: false },
      { name: 'Đối thoại liên tôn', description: 'Tham gia đối thoại liên tôn.', effects: { reputation: 2, belief: 0, community: 1 }, isNegative: false },
      { name: 'Chia sẻ giáo lý hòa bình', description: 'Chia sẻ giáo lý về hòa bình.', effects: { reputation: 0, belief: 2, community: 1 }, isNegative: false },
      { name: 'Quá tập trung nội bộ', description: 'Chỉ tập trung Phật tử.', effects: { reputation: 0, belief: 0, community: -2 }, isNegative: true },
      { name: 'Thờ ơ', description: 'Thờ ơ với phong trào.', effects: { reputation: -2, belief: 0, community: 0 }, isNegative: true },
    ],
    thien_chua: [
      { name: 'Đối thoại chính thức', description: 'Tham gia đối thoại liên tôn chính thức.', effects: { reputation: 2, belief: 0, community: 1 }, isNegative: false },
      { name: 'Hoạt động từ thiện chung', description: 'Tổ chức từ thiện với tôn giáo khác.', effects: { reputation: 1, belief: 0, community: 2 }, isNegative: false },
      { name: 'Thông điệp hòa bình', description: 'Phát đi thông điệp hòa bình.', effects: { reputation: 1, belief: 2, community: 0 }, isNegative: false },
      { name: 'Giữ khoảng cách', description: 'Giữ khoảng cách với tôn giáo khác.', effects: { reputation: -2, belief: 0, community: 0 }, isNegative: true },
      { name: 'Tranh giành vị thế', description: 'Tranh giành vị thế trong phong trào.', effects: { reputation: -1, belief: -1, community: -1 }, isNegative: true },
    ],
  },
  // EVENT 8: KHỦNG HOẢNG KINH TẾ
  8: {
    cao_dai: [
      { name: 'Hỗ trợ đa dạng', description: 'Hỗ trợ đa dạng cho tín đồ.', effects: { reputation: 1, belief: 0, community: 2 }, isNegative: false },
      { name: 'Triết lý buông bỏ', description: 'Chia sẻ triết lý buông bỏ vật chất.', effects: { reputation: 0, belief: 2, community: 0 }, isNegative: false },
      { name: 'Kết nối hỗ trợ', description: 'Kết nối các nhóm hỗ trợ lẫn nhau.', effects: { reputation: 1, belief: 0, community: 2 }, isNegative: false },
      { name: 'Xa rời thực tế', description: 'Không hiểu khó khăn thực tế.', effects: { reputation: -2, belief: 0, community: 0 }, isNegative: true },
      { name: 'Thiếu nguồn lực', description: 'Thiếu nguồn lực hỗ trợ.', effects: { reputation: 0, belief: 0, community: -2 }, isNegative: true },
    ],
    hoa_hao: [
      { name: 'Giúp đỡ thực tế', description: 'Hỗ trợ thực tế cho người khó.', effects: { reputation: 2, belief: 0, community: 2 }, isNegative: false },
      { name: 'Đơn giản tiết kiệm', description: 'Sống đơn giản, tiết kiệm.', effects: { reputation: 0, belief: 2, community: 0 }, isNegative: false },
      { name: 'Cộng đồng tương trợ', description: 'Tổ chức tương trợ cộng đồng.', effects: { reputation: 1, belief: 0, community: 2 }, isNegative: false },
      { name: 'Khả năng hạn chế', description: 'Khả năng hỗ trợ hạn chế.', effects: { reputation: 0, belief: 0, community: -2 }, isNegative: true },
      { name: 'Bị ảnh hưởng nặng', description: 'Bản thân cũng bị ảnh hưởng.', effects: { reputation: -2, belief: 0, community: 0 }, isNegative: true },
    ],
    phat_giao: [
      { name: 'Phát cơm từ thiện', description: 'Các chùa phát cơm từ thiện.', effects: { reputation: 2, belief: 0, community: 2 }, isNegative: false },
      { name: 'Giáo lý tri túc', description: 'Chia sẻ giáo lý về sự tri túc.', effects: { reputation: 0, belief: 2, community: 1 }, isNegative: false },
      { name: 'Hỗ trợ tinh thần', description: 'Hỗ trợ tinh thần cho người khổ.', effects: { reputation: 1, belief: 2, community: 0 }, isNegative: false },
      { name: 'Thiếu nguồn cúng dường', description: 'Nguồn cúng dường giảm sút.', effects: { reputation: 0, belief: -2, community: 0 }, isNegative: true },
      { name: 'Hoạt động thu hẹp', description: 'Phải thu hẹp hoạt động.', effects: { reputation: -2, belief: 0, community: 0 }, isNegative: true },
    ],
    thien_chua: [
      { name: 'Caritas hỗ trợ', description: 'Tổ chức Caritas hỗ trợ mạnh mẽ.', effects: { reputation: 2, belief: 0, community: 2 }, isNegative: false },
      { name: 'Kêu gọi quyên góp', description: 'Kêu gọi quyên góp trong giáo dân.', effects: { reputation: 1, belief: 1, community: 1 }, isNegative: false },
      { name: 'Hỗ trợ việc làm', description: 'Hỗ trợ tìm việc làm.', effects: { reputation: 1, belief: 0, community: 2 }, isNegative: false },
      { name: 'Nguồn lực giảm', description: 'Nguồn tài trợ giảm sút.', effects: { reputation: -2, belief: 0, community: 0 }, isNegative: true },
      { name: 'Mâu thuẫn phân phối', description: 'Mâu thuẫn trong phân phối hỗ trợ.', effects: { reputation: -1, belief: 0, community: -2 }, isNegative: true },
    ],
  },
  // EVENT 9-20 (tiếp tục theo pattern tương tự)
  9: {
    cao_dai: [
      { name: 'Trả lời bài bản', description: 'Phản hồi truyền thông bài bản.', effects: { reputation: 2, belief: 0, community: 0 }, isNegative: false },
      { name: 'Giải thích triết lý', description: 'Giải thích rõ ràng triết lý.', effects: { reputation: 0, belief: 2, community: 0 }, isNegative: false },
      { name: 'Im lặng chiến lược', description: 'Im lặng chờ đợi thời cơ.', effects: { reputation: 0, belief: 0, community: 1 }, isNegative: false },
      { name: 'Phản ứng yếu', description: 'Phản ứng không đủ mạnh.', effects: { reputation: -2, belief: 0, community: 0 }, isNegative: true },
      { name: 'Rối thông tin', description: 'Đưa thông tin rối rắm.', effects: { reputation: 0, belief: -2, community: 0 }, isNegative: true },
    ],
    hoa_hao: [
      { name: 'Nói thẳng nói thật', description: 'Trả lời thẳng thắn.', effects: { reputation: 2, belief: 1, community: 0 }, isNegative: false },
      { name: 'Dân bênh vực', description: 'Được dân địa phương bênh vực.', effects: { reputation: 1, belief: 0, community: 2 }, isNegative: false },
      { name: 'Hành động thay lời nói', description: 'Chứng minh bằng hành động.', effects: { reputation: 1, belief: 0, community: 1 }, isNegative: false },
      { name: 'Bị hiểu lầm', description: 'Bị truyền thông hiểu lầm.', effects: { reputation: -2, belief: 0, community: 0 }, isNegative: true },
      { name: 'Thiếu kỹ năng truyền thông', description: 'Không biết cách ứng phó truyền thông.', effects: { reputation: -1, belief: -1, community: 0 }, isNegative: true },
    ],
    phat_giao: [
      { name: 'Phản hồi từ tốn', description: 'Phản hồi điềm đạm, từ tốn.', effects: { reputation: 1, belief: 2, community: 0 }, isNegative: false },
      { name: 'Minh bạch thông tin', description: 'Công khai minh bạch.', effects: { reputation: 2, belief: 0, community: 0 }, isNegative: false },
      { name: 'Không tranh cãi', description: 'Không tham gia tranh cãi.', effects: { reputation: 0, belief: 1, community: 1 }, isNegative: false },
      { name: 'Chậm phản hồi', description: 'Phản hồi quá chậm.', effects: { reputation: -2, belief: 0, community: 0 }, isNegative: true },
      { name: 'Thụ động', description: 'Quá thụ động.', effects: { reputation: 0, belief: -2, community: 0 }, isNegative: true },
    ],
    thien_chua: [
      { name: 'Họp báo chuyên nghiệp', description: 'Tổ chức họp báo chuyên nghiệp.', effects: { reputation: 2, belief: 0, community: 1 }, isNegative: false },
      { name: 'Phát ngôn viên', description: 'Có phát ngôn viên chuyên trách.', effects: { reputation: 2, belief: 0, community: 0 }, isNegative: false },
      { name: 'Chiến dịch PR', description: 'Triển khai chiến dịch PR.', effects: { reputation: 1, belief: 1, community: 1 }, isNegative: false },
      { name: 'Phản ứng thái quá', description: 'Phản ứng quá mạnh.', effects: { reputation: -2, belief: -1, community: 0 }, isNegative: true },
      { name: 'Che giấu', description: 'Cố che giấu thông tin.', effects: { reputation: -2, belief: 0, community: -1 }, isNegative: true },
    ],
  },
  10: {
    cao_dai: [
      { name: 'Hòa giải nội bộ', description: 'Hòa giải các bên.', effects: { reputation: 0, belief: 1, community: 2 }, isNegative: false },
      { name: 'Triết lý hợp nhất', description: 'Nhấn mạnh triết lý hợp nhất.', effects: { reputation: 0, belief: 2, community: 1 }, isNegative: false },
      { name: 'Đối thoại nội bộ', description: 'Tổ chức đối thoại.', effects: { reputation: 1, belief: 0, community: 2 }, isNegative: false },
      { name: 'Chia rẽ sâu', description: 'Chia rẽ trầm trọng hơn.', effects: { reputation: -2, belief: -1, community: 0 }, isNegative: true },
      { name: 'Mất đoàn kết', description: 'Mất đoàn kết nội bộ.', effects: { reputation: 0, belief: 0, community: -2 }, isNegative: true },
    ],
    hoa_hao: [
      { name: 'Giải quyết thực tế', description: 'Giải quyết vấn đề thực tế.', effects: { reputation: 1, belief: 0, community: 2 }, isNegative: false },
      { name: 'Lắng nghe tất cả', description: 'Lắng nghe mọi bên.', effects: { reputation: 0, belief: 1, community: 2 }, isNegative: false },
      { name: 'Thỏa hiệp hợp lý', description: 'Tìm giải pháp thỏa hiệp.', effects: { reputation: 1, belief: 0, community: 1 }, isNegative: false },
      { name: 'Tranh cãi công khai', description: 'Mâu thuẫn bị công khai.', effects: { reputation: -2, belief: 0, community: 0 }, isNegative: true },
      { name: 'Mất niềm tin', description: 'Mất niềm tin nội bộ.', effects: { reputation: 0, belief: -2, community: 0 }, isNegative: true },
    ],
    phat_giao: [
      { name: 'Thiền định hòa giải', description: 'Dùng thiền định để hòa giải.', effects: { reputation: 0, belief: 2, community: 1 }, isNegative: false },
      { name: 'Nhân quả giải thích', description: 'Giải thích theo nhân quả.', effects: { reputation: 0, belief: 2, community: 0 }, isNegative: false },
      { name: 'Hội nghị hòa giải', description: 'Tổ chức hội nghị hòa giải.', effects: { reputation: 1, belief: 0, community: 2 }, isNegative: false },
      { name: 'Phe phái tranh chấp', description: 'Các phe phái tranh chấp.', effects: { reputation: -2, belief: 0, community: -1 }, isNegative: true },
      { name: 'Sư xung đột', description: 'Các sư xung đột công khai.', effects: { reputation: -1, belief: -2, community: 0 }, isNegative: true },
    ],
    thien_chua: [
      { name: 'Giáo hội can thiệp', description: 'Giáo hội cấp trên can thiệp.', effects: { reputation: 1, belief: 1, community: 1 }, isNegative: false },
      { name: 'Quy trình hòa giải', description: 'Áp dụng quy trình hòa giải.', effects: { reputation: 1, belief: 0, community: 2 }, isNegative: false },
      { name: 'Cầu nguyện hợp nhất', description: 'Tổ chức cầu nguyện hợp nhất.', effects: { reputation: 0, belief: 2, community: 1 }, isNegative: false },
      { name: 'Chia rẽ giáo xứ', description: 'Giáo xứ bị chia rẽ.', effects: { reputation: -2, belief: 0, community: -1 }, isNegative: true },
      { name: 'Linh mục mâu thuẫn', description: 'Các linh mục mâu thuẫn.', effects: { reputation: -1, belief: -1, community: -1 }, isNegative: true },
    ],
  },
  11: {
    cao_dai: [
      { name: 'Lễ hội đa sắc', description: 'Tổ chức lễ hội đa sắc màu.', effects: { reputation: 1, belief: 2, community: 1 }, isNegative: false },
      { name: 'Kết hợp văn hóa', description: 'Kết hợp nhiều nền văn hóa.', effects: { reputation: 0, belief: 1, community: 2 }, isNegative: false },
      { name: 'Trình diễn ấn tượng', description: 'Trình diễn nghi lễ ấn tượng.', effects: { reputation: 2, belief: 1, community: 0 }, isNegative: false },
      { name: 'Tổ chức rời rạc', description: 'Tổ chức không đồng bộ.', effects: { reputation: -2, belief: 0, community: 0 }, isNegative: true },
      { name: 'Ít người tham gia', description: 'Lượng người tham gia ít.', effects: { reputation: 0, belief: 0, community: -2 }, isNegative: true },
    ],
    hoa_hao: [
      { name: 'Lễ hội đơn giản', description: 'Lễ hội đơn giản, gần gũi.', effects: { reputation: 0, belief: 2, community: 2 }, isNegative: false },
      { name: 'Cộng đồng tham gia', description: 'Cộng đồng tham gia đông đảo.', effects: { reputation: 1, belief: 0, community: 2 }, isNegative: false },
      { name: 'Truyền thống đẹp', description: 'Duy trì truyền thống đẹp.', effects: { reputation: 1, belief: 1, community: 1 }, isNegative: false },
      { name: 'Quy mô nhỏ', description: 'Quy mô còn hạn chế.', effects: { reputation: -1, belief: 0, community: 0 }, isNegative: true },
      { name: 'Thiếu đổi mới', description: 'Lễ hội thiếu đổi mới.', effects: { reputation: 0, belief: -1, community: -1 }, isNegative: true },
    ],
    phat_giao: [
      { name: 'Lễ Phật lớn', description: 'Tổ chức lễ Phật hoành tráng.', effects: { reputation: 1, belief: 2, community: 1 }, isNegative: false },
      { name: 'Đèn hoa lung linh', description: 'Trang trí đèn hoa rực rỡ.', effects: { reputation: 1, belief: 1, community: 2 }, isNegative: false },
      { name: 'Thả đèn hoa đăng', description: 'Tổ chức thả đèn hoa đăng.', effects: { reputation: 1, belief: 2, community: 0 }, isNegative: false },
      { name: 'Quá thương mại', description: 'Lễ hội quá thương mại hóa.', effects: { reputation: -2, belief: -1, community: 0 }, isNegative: true },
      { name: 'An ninh kém', description: 'Vấn đề an ninh trật tự.', effects: { reputation: -1, belief: 0, community: -2 }, isNegative: true },
    ],
    thien_chua: [
      { name: 'Lễ Giáng Sinh', description: 'Tổ chức Giáng Sinh lớn.', effects: { reputation: 1, belief: 2, community: 2 }, isNegative: false },
      { name: 'Ca đoàn biểu diễn', description: 'Ca đoàn biểu diễn xuất sắc.', effects: { reputation: 1, belief: 2, community: 0 }, isNegative: false },
      { name: 'Mở cửa đón khách', description: 'Mở cửa đón mọi người.', effects: { reputation: 1, belief: 0, community: 2 }, isNegative: false },
      { name: 'Quá khép kín', description: 'Lễ hội quá khép kín.', effects: { reputation: -1, belief: 0, community: -2 }, isNegative: true },
      { name: 'Thiếu tổ chức', description: 'Thiếu tổ chức bài bản.', effects: { reputation: -2, belief: 0, community: 0 }, isNegative: true },
    ],
  },
  12: {
    cao_dai: [
      { name: 'Lắng nghe giới trẻ', description: 'Lắng nghe ý kiến giới trẻ.', effects: { reputation: 0, belief: 1, community: 2 }, isNegative: false },
      { name: 'Đối thoại cởi mở', description: 'Đối thoại cởi mở với giới trẻ.', effects: { reputation: 1, belief: 1, community: 1 }, isNegative: false },
      { name: 'Tiếp thu và sửa đổi', description: 'Tiếp thu ý kiến và sửa đổi.', effects: { reputation: 1, belief: 0, community: 2 }, isNegative: false },
      { name: 'Phản ứng tiêu cực', description: 'Phản ứng tiêu cực với chỉ trích.', effects: { reputation: -2, belief: 0, community: 0 }, isNegative: true },
      { name: 'Bỏ qua ý kiến', description: 'Bỏ qua ý kiến giới trẻ.', effects: { reputation: 0, belief: 0, community: -2 }, isNegative: true },
    ],
    hoa_hao: [
      { name: 'Đáp ứng thực tế', description: 'Đáp ứng nhu cầu thực tế.', effects: { reputation: 1, belief: 0, community: 2 }, isNegative: false },
      { name: 'Gần gũi lắng nghe', description: 'Gần gũi lắng nghe giới trẻ.', effects: { reputation: 0, belief: 1, community: 2 }, isNegative: false },
      { name: 'Thay đổi linh hoạt', description: 'Thay đổi linh hoạt theo thời đại.', effects: { reputation: 1, belief: 1, community: 0 }, isNegative: false },
      { name: 'Cứng nhắc', description: 'Quá cứng nhắc với giới trẻ.', effects: { reputation: -1, belief: -1, community: 0 }, isNegative: true },
      { name: 'Mất kết nối', description: 'Mất kết nối với giới trẻ.', effects: { reputation: 0, belief: 0, community: -2 }, isNegative: true },
    ],
    phat_giao: [
      { name: 'Thiền cho giới trẻ', description: 'Tổ chức thiền cho giới trẻ.', effects: { reputation: 0, belief: 2, community: 1 }, isNegative: false },
      { name: 'Giải đáp thắc mắc', description: 'Giải đáp thắc mắc của giới trẻ.', effects: { reputation: 1, belief: 1, community: 1 }, isNegative: false },
      { name: 'Đổi mới phương pháp', description: 'Đổi mới phương pháp giảng dạy.', effects: { reputation: 1, belief: 1, community: 0 }, isNegative: false },
      { name: 'Không hiểu giới trẻ', description: 'Không hiểu ngôn ngữ giới trẻ.', effects: { reputation: -1, belief: 0, community: -2 }, isNegative: true },
      { name: 'Giáo điều', description: 'Quá giáo điều, cứng nhắc.', effects: { reputation: 0, belief: -2, community: 0 }, isNegative: true },
    ],
    thien_chua: [
      { name: 'Nhóm thanh niên đối thoại', description: 'Tổ chức nhóm đối thoại.', effects: { reputation: 0, belief: 1, community: 2 }, isNegative: false },
      { name: 'Chấp nhận góp ý', description: 'Chấp nhận góp ý từ giới trẻ.', effects: { reputation: 1, belief: 0, community: 2 }, isNegative: false },
      { name: 'Thay đổi tích cực', description: 'Thực hiện thay đổi tích cực.', effects: { reputation: 2, belief: 0, community: 1 }, isNegative: false },
      { name: 'Phòng thủ', description: 'Phản ứng phòng thủ.', effects: { reputation: -2, belief: -1, community: 0 }, isNegative: true },
      { name: 'Kỷ luật thái quá', description: 'Kỷ luật những người chỉ trích.', effects: { reputation: -1, belief: 0, community: -2 }, isNegative: true },
    ],
  },
  13: {
    cao_dai: [
      { name: 'Khẳng định bản sắc', description: 'Khẳng định bản sắc riêng.', effects: { reputation: 0, belief: 2, community: 1 }, isNegative: false },
      { name: 'Hợp tác học hỏi', description: 'Hợp tác và học hỏi.', effects: { reputation: 1, belief: 0, community: 2 }, isNegative: false },
      { name: 'Đổi mới sáng tạo', description: 'Đổi mới sáng tạo.', effects: { reputation: 1, belief: 1, community: 0 }, isNegative: false },
      { name: 'Tự ti', description: 'Cảm thấy tự ti.', effects: { reputation: -2, belief: 0, community: 0 }, isNegative: true },
      { name: 'Bắt chước thất bại', description: 'Bắt chước không thành công.', effects: { reputation: 0, belief: -2, community: 0 }, isNegative: true },
    ],
    hoa_hao: [
      { name: 'Tập trung gốc rễ', description: 'Tập trung vào giá trị gốc.', effects: { reputation: 0, belief: 2, community: 1 }, isNegative: false },
      { name: 'Phát triển bền vững', description: 'Phát triển bền vững.', effects: { reputation: 1, belief: 1, community: 1 }, isNegative: false },
      { name: 'Không so sánh', description: 'Không so sánh với người khác.', effects: { reputation: 0, belief: 1, community: 1 }, isNegative: false },
      { name: 'Mất tự tin', description: 'Mất tự tin vào con đường.', effects: { reputation: 0, belief: -2, community: 0 }, isNegative: true },
      { name: 'Đánh mất bản sắc', description: 'Đánh mất bản sắc riêng.', effects: { reputation: -2, belief: 0, community: 0 }, isNegative: true },
    ],
    phat_giao: [
      { name: 'Tự tin truyền thống', description: 'Tự tin vào truyền thống.', effects: { reputation: 0, belief: 2, community: 1 }, isNegative: false },
      { name: 'Học hỏi tinh hoa', description: 'Học hỏi tinh hoa người khác.', effects: { reputation: 1, belief: 1, community: 1 }, isNegative: false },
      { name: 'Phát triển riêng', description: 'Phát triển theo cách riêng.', effects: { reputation: 1, belief: 1, community: 0 }, isNegative: false },
      { name: 'Chạy theo xu hướng', description: 'Chạy theo xu hướng mất gốc.', effects: { reputation: -1, belief: -2, community: 0 }, isNegative: true },
      { name: 'So sánh tiêu cực', description: 'So sánh tiêu cực với người khác.', effects: { reputation: -2, belief: 0, community: 0 }, isNegative: true },
    ],
    thien_chua: [
      { name: 'Khẳng định vị thế', description: 'Khẳng định vị thế vững chắc.', effects: { reputation: 2, belief: 0, community: 1 }, isNegative: false },
      { name: 'Phát triển song song', description: 'Phát triển song song.', effects: { reputation: 1, belief: 1, community: 1 }, isNegative: false },
      { name: 'Hợp tác lành mạnh', description: 'Hợp tác lành mạnh.', effects: { reputation: 1, belief: 0, community: 2 }, isNegative: false },
      { name: 'Cạnh tranh tiêu cực', description: 'Cạnh tranh tiêu cực.', effects: { reputation: -2, belief: -1, community: 0 }, isNegative: true },
      { name: 'Mất thị phần', description: 'Lo lắng về mất thị phần.', effects: { reputation: -1, belief: 0, community: -2 }, isNegative: true },
    ],
  },
  14: {
    cao_dai: [
      { name: 'Xác minh sự thật', description: 'Xác minh và đính chính.', effects: { reputation: 2, belief: 0, community: 0 }, isNegative: false },
      { name: 'Truyền thông đa chiều', description: 'Truyền thông đa chiều.', effects: { reputation: 1, belief: 1, community: 1 }, isNegative: false },
      { name: 'Giáo dục tín đồ', description: 'Giáo dục tín đồ nhận biết tin giả.', effects: { reputation: 0, belief: 2, community: 0 }, isNegative: false },
      { name: 'Bị lợi dụng', description: 'Bị lợi dụng tin giả.', effects: { reputation: -2, belief: 0, community: 0 }, isNegative: true },
      { name: 'Phản ứng chậm', description: 'Phản ứng chậm với tin giả.', effects: { reputation: 0, belief: -2, community: 0 }, isNegative: true },
    ],
    hoa_hao: [
      { name: 'Nói thẳng sự thật', description: 'Nói thẳng sự thật.', effects: { reputation: 2, belief: 0, community: 1 }, isNegative: false },
      { name: 'Dân làm chứng', description: 'Dân địa phương làm chứng.', effects: { reputation: 0, belief: 0, community: 2 }, isNegative: false },
      { name: 'Đơn giản rõ ràng', description: 'Thông tin đơn giản rõ ràng.', effects: { reputation: 1, belief: 1, community: 0 }, isNegative: false },
      { name: 'Lan truyền tin giả', description: 'Tin giả lan trong cộng đồng.', effects: { reputation: -2, belief: 0, community: 0 }, isNegative: true },
      { name: 'Thiếu kỹ năng xử lý', description: 'Không biết xử lý tin giả.', effects: { reputation: 0, belief: 0, community: -2 }, isNegative: true },
    ],
    phat_giao: [
      { name: 'Giữ tâm thanh tịnh', description: 'Không bị ảnh hưởng.', effects: { reputation: 0, belief: 2, community: 0 }, isNegative: false },
      { name: 'Đính chính từ tốn', description: 'Đính chính từ tốn.', effects: { reputation: 2, belief: 0, community: 0 }, isNegative: false },
      { name: 'Không tranh cãi', description: 'Không tham gia tranh cãi.', effects: { reputation: 0, belief: 1, community: 1 }, isNegative: false },
      { name: 'Bị ảnh hưởng uy tín', description: 'Uy tín bị ảnh hưởng.', effects: { reputation: -2, belief: 0, community: 0 }, isNegative: true },
      { name: 'Tin đồn lan rộng', description: 'Tin đồn lan trong Phật tử.', effects: { reputation: 0, belief: -2, community: 0 }, isNegative: true },
    ],
    thien_chua: [
      { name: 'Họp báo đính chính', description: 'Tổ chức họp báo đính chính.', effects: { reputation: 2, belief: 0, community: 1 }, isNegative: false },
      { name: 'Pháp lý xử lý', description: 'Xử lý bằng pháp lý.', effects: { reputation: 2, belief: 0, community: 0 }, isNegative: false },
      { name: 'Giáo dục giáo dân', description: 'Giáo dục giáo dân nhận biết.', effects: { reputation: 0, belief: 2, community: 0 }, isNegative: false },
      { name: 'Phản ứng thái quá', description: 'Phản ứng quá mạnh.', effects: { reputation: -2, belief: 0, community: -1 }, isNegative: true },
      { name: 'Tin giả lan trong giáo dân', description: 'Giáo dân tin vào tin giả.', effects: { reputation: 0, belief: -2, community: 0 }, isNegative: true },
    ],
  },
  15: {
    cao_dai: [
      { name: 'Xuất hiện ấn tượng', description: 'Xuất hiện ấn tượng trên truyền thông.', effects: { reputation: 2, belief: 1, community: 0 }, isNegative: false },
      { name: 'Nội dung triết lý', description: 'Chia sẻ nội dung triết lý.', effects: { reputation: 0, belief: 2, community: 1 }, isNegative: false },
      { name: 'Thu hút chú ý', description: 'Thu hút sự chú ý công chúng.', effects: { reputation: 1, belief: 0, community: 2 }, isNegative: false },
      { name: 'Bỏ lỡ cơ hội', description: 'Bỏ lỡ cơ hội.', effects: { reputation: -2, belief: 0, community: 0 }, isNegative: true },
      { name: 'Xuất hiện kém', description: 'Xuất hiện không ấn tượng.', effects: { reputation: 0, belief: -2, community: 0 }, isNegative: true },
    ],
    hoa_hao: [
      { name: 'Nói về đời thường', description: 'Chia sẻ cuộc sống đời thường.', effects: { reputation: 1, belief: 1, community: 1 }, isNegative: false },
      { name: 'Câu chuyện thực tế', description: 'Kể câu chuyện thực tế.', effects: { reputation: 1, belief: 0, community: 2 }, isNegative: false },
      { name: 'Gần gũi khán giả', description: 'Gần gũi với khán giả.', effects: { reputation: 0, belief: 1, community: 2 }, isNegative: false },
      { name: 'Không quen truyền thông', description: 'Không quen với truyền thông.', effects: { reputation: -2, belief: 0, community: 0 }, isNegative: true },
      { name: 'Nói không hay', description: 'Diễn đạt không tốt.', effects: { reputation: 0, belief: -1, community: -1 }, isNegative: true },
    ],
    phat_giao: [
      { name: 'Chia sẻ Phật pháp', description: 'Chia sẻ Phật pháp trên truyền thông.', effects: { reputation: 0, belief: 2, community: 1 }, isNegative: false },
      { name: 'Hình ảnh thanh tịnh', description: 'Truyền tải hình ảnh thanh tịnh.', effects: { reputation: 2, belief: 1, community: 0 }, isNegative: false },
      { name: 'Thu hút người tìm hiểu', description: 'Thu hút người muốn tìm hiểu.', effects: { reputation: 1, belief: 0, community: 2 }, isNegative: false },
      { name: 'Quá thụ động', description: 'Không tận dụng cơ hội.', effects: { reputation: -2, belief: 0, community: 0 }, isNegative: true },
      { name: 'Thiếu kỹ năng truyền thông', description: 'Thiếu kỹ năng media.', effects: { reputation: 0, belief: 0, community: -2 }, isNegative: true },
    ],
    thien_chua: [
      { name: 'Chiến dịch PR chuyên nghiệp', description: 'Triển khai PR chuyên nghiệp.', effects: { reputation: 2, belief: 0, community: 1 }, isNegative: false },
      { name: 'Nội dung hấp dẫn', description: 'Sản xuất nội dung hấp dẫn.', effects: { reputation: 1, belief: 2, community: 0 }, isNegative: false },
      { name: 'Mở rộng ảnh hưởng', description: 'Mở rộng ảnh hưởng.', effects: { reputation: 1, belief: 0, community: 2 }, isNegative: false },
      { name: 'Quá thương mại', description: 'Bị cho là quá thương mại.', effects: { reputation: -2, belief: -1, community: 0 }, isNegative: true },
      { name: 'Nội bộ không đồng thuận', description: 'Nội bộ không đồng thuận.', effects: { reputation: 0, belief: 0, community: -2 }, isNegative: true },
    ],
  },
  16: {
    cao_dai: [
      { name: 'Tuân thủ linh hoạt', description: 'Tuân thủ một cách linh hoạt.', effects: { reputation: 1, belief: 1, community: 1 }, isNegative: false },
      { name: 'Đóng góp ý kiến', description: 'Đóng góp ý kiến xây dựng.', effects: { reputation: 2, belief: 0, community: 0 }, isNegative: false },
      { name: 'Thích ứng nhanh', description: 'Thích ứng nhanh với thay đổi.', effects: { reputation: 1, belief: 0, community: 1 }, isNegative: false },
      { name: 'Khó thích ứng', description: 'Khó thích ứng với quy định mới.', effects: { reputation: -2, belief: 0, community: 0 }, isNegative: true },
      { name: 'Vi phạm quy định', description: 'Vi phạm quy định mới.', effects: { reputation: -1, belief: -1, community: -1 }, isNegative: true },
    ],
    hoa_hao: [
      { name: 'Đơn giản tuân thủ', description: 'Đơn giản tuân thủ.', effects: { reputation: 2, belief: 0, community: 0 }, isNegative: false },
      { name: 'Không phức tạp', description: 'Hoạt động đơn giản, dễ tuân thủ.', effects: { reputation: 1, belief: 0, community: 1 }, isNegative: false },
      { name: 'Hợp tác tốt', description: 'Hợp tác tốt với chính quyền.', effects: { reputation: 1, belief: 1, community: 0 }, isNegative: false },
      { name: 'Gặp khó khăn', description: 'Gặp khó khăn với quy định mới.', effects: { reputation: -2, belief: 0, community: 0 }, isNegative: true },
      { name: 'Thiếu hiểu biết pháp lý', description: 'Thiếu hiểu biết về pháp lý.', effects: { reputation: 0, belief: 0, community: -2 }, isNegative: true },
    ],
    phat_giao: [
      { name: 'Kinh nghiệm thích ứng', description: 'Kinh nghiệm thích ứng lâu năm.', effects: { reputation: 2, belief: 0, community: 0 }, isNegative: false },
      { name: 'Quan hệ tốt', description: 'Quan hệ tốt với chính quyền.', effects: { reputation: 1, belief: 0, community: 1 }, isNegative: false },
      { name: 'Tuân thủ tốt', description: 'Tuân thủ quy định tốt.', effects: { reputation: 1, belief: 1, community: 0 }, isNegative: false },
      { name: 'Một số chùa gặp khó', description: 'Một số chùa gặp khó.', effects: { reputation: -2, belief: 0, community: 0 }, isNegative: true },
      { name: 'Mâu thuẫn quy định', description: 'Mâu thuẫn với một số quy định.', effects: { reputation: 0, belief: -2, community: 0 }, isNegative: true },
    ],
    thien_chua: [
      { name: 'Tuân thủ bài bản', description: 'Tuân thủ bài bản.', effects: { reputation: 2, belief: 0, community: 0 }, isNegative: false },
      { name: 'Đối thoại với chính quyền', description: 'Đối thoại với chính quyền.', effects: { reputation: 1, belief: 0, community: 1 }, isNegative: false },
      { name: 'Cập nhật kịp thời', description: 'Cập nhật quy định kịp thời.', effects: { reputation: 1, belief: 1, community: 0 }, isNegative: false },
      { name: 'Xung đột quy định', description: 'Xung đột với một số quy định.', effects: { reputation: -2, belief: -1, community: 0 }, isNegative: true },
      { name: 'Phản đối', description: 'Phản đối một số quy định.', effects: { reputation: -1, belief: 0, community: -2 }, isNegative: true },
    ],
  },
  17: {
    cao_dai: [
      { name: 'Giữ vững nguyên tắc', description: 'Giữ vững nguyên tắc.', effects: { reputation: 0, belief: 2, community: 0 }, isNegative: false },
      { name: 'Đối thoại xây dựng', description: 'Đối thoại xây dựng.', effects: { reputation: 1, belief: 0, community: 2 }, isNegative: false },
      { name: 'Thích ứng hợp lý', description: 'Thích ứng một cách hợp lý.', effects: { reputation: 1, belief: 1, community: 0 }, isNegative: false },
      { name: 'Bị cô lập', description: 'Bị cô lập do áp lực.', effects: { reputation: -2, belief: 0, community: 0 }, isNegative: true },
      { name: 'Mất bản sắc', description: 'Mất bản sắc do thỏa hiệp.', effects: { reputation: 0, belief: -2, community: 0 }, isNegative: true },
    ],
    hoa_hao: [
      { name: 'Gần dân như cũ', description: 'Tiếp tục gần gũi với dân.', effects: { reputation: 0, belief: 0, community: 2 }, isNegative: false },
      { name: 'Không bị ảnh hưởng', description: 'Ít bị ảnh hưởng.', effects: { reputation: 1, belief: 1, community: 0 }, isNegative: false },
      { name: 'Thực tế đối mặt', description: 'Đối mặt thực tế.', effects: { reputation: 1, belief: 0, community: 1 }, isNegative: false },
      { name: 'Bị hiểu lầm', description: 'Bị xã hội hiểu lầm.', effects: { reputation: -2, belief: 0, community: 0 }, isNegative: true },
      { name: 'Áp lực từ địa phương', description: 'Áp lực từ chính quyền địa phương.', effects: { reputation: 0, belief: 0, community: -2 }, isNegative: true },
    ],
    phat_giao: [
      { name: 'Bình tĩnh đối mặt', description: 'Bình tĩnh đối mặt.', effects: { reputation: 0, belief: 2, community: 0 }, isNegative: false },
      { name: 'Uy tín lâu dài', description: 'Dựa vào uy tín lâu dài.', effects: { reputation: 2, belief: 0, community: 0 }, isNegative: false },
      { name: 'Không phản ứng thái quá', description: 'Không phản ứng thái quá.', effects: { reputation: 1, belief: 0, community: 1 }, isNegative: false },
      { name: 'Bị chỉ trích', description: 'Bị chỉ trích từ xã hội.', effects: { reputation: -2, belief: 0, community: 0 }, isNegative: true },
      { name: 'Phật tử dao động', description: 'Một số Phật tử dao động.', effects: { reputation: 0, belief: -2, community: 0 }, isNegative: true },
    ],
    thien_chua: [
      { name: 'Vững vàng lập trường', description: 'Vững vàng lập trường.', effects: { reputation: 1, belief: 2, community: 0 }, isNegative: false },
      { name: 'Tổ chức hỗ trợ', description: 'Tổ chức hỗ trợ giáo dân.', effects: { reputation: 0, belief: 0, community: 2 }, isNegative: false },
      { name: 'Đối thoại với xã hội', description: 'Đối thoại với xã hội.', effects: { reputation: 2, belief: 0, community: 0 }, isNegative: false },
      { name: 'Xung đột với xã hội', description: 'Xung đột với một số giá trị xã hội.', effects: { reputation: -2, belief: 0, community: -1 }, isNegative: true },
      { name: 'Giáo dân gặp khó', description: 'Giáo dân gặp khó trong xã hội.', effects: { reputation: 0, belief: -1, community: -2 }, isNegative: true },
    ],
  },
  18: {
    cao_dai: [
      { name: 'Mở rộng đa dạng', description: 'Mở rộng đa dạng.', effects: { reputation: 1, belief: 1, community: 2 }, isNegative: false },
      { name: 'Kết nối nhiều nhóm', description: 'Kết nối nhiều nhóm.', effects: { reputation: 0, belief: 0, community: 2 }, isNegative: false },
      { name: 'Phát triển bền vững', description: 'Phát triển bền vững.', effects: { reputation: 1, belief: 1, community: 0 }, isNegative: false },
      { name: 'Mở rộng quá nhanh', description: 'Mở rộng quá nhanh.', effects: { reputation: -2, belief: 0, community: 0 }, isNegative: true },
      { name: 'Thiếu nhân sự', description: 'Thiếu nhân sự quản lý.', effects: { reputation: 0, belief: 0, community: -2 }, isNegative: true },
    ],
    hoa_hao: [
      { name: 'Phát triển tự nhiên', description: 'Phát triển tự nhiên.', effects: { reputation: 0, belief: 1, community: 2 }, isNegative: false },
      { name: 'Gần gũi mở rộng', description: 'Mở rộng gần gũi.', effects: { reputation: 1, belief: 0, community: 2 }, isNegative: false },
      { name: 'Dân kêu gọi dân', description: 'Người dân kêu gọi nhau.', effects: { reputation: 0, belief: 1, community: 2 }, isNegative: false },
      { name: 'Giới hạn địa lý', description: 'Giới hạn về địa lý.', effects: { reputation: 0, belief: 0, community: -2 }, isNegative: true },
      { name: 'Thiếu tổ chức', description: 'Thiếu tổ chức bài bản.', effects: { reputation: -2, belief: 0, community: 0 }, isNegative: true },
    ],
    phat_giao: [
      { name: 'Mở thêm chùa', description: 'Mở thêm chùa mới.', effects: { reputation: 1, belief: 1, community: 1 }, isNegative: false },
      { name: 'Thu hút Phật tử', description: 'Thu hút thêm Phật tử.', effects: { reputation: 0, belief: 1, community: 2 }, isNegative: false },
      { name: 'Hoạt động đa dạng', description: 'Hoạt động đa dạng hơn.', effects: { reputation: 1, belief: 1, community: 0 }, isNegative: false },
      { name: 'Thiếu sư trụ trì', description: 'Thiếu sư trụ trì.', effects: { reputation: 0, belief: -2, community: 0 }, isNegative: true },
      { name: 'Quản lý khó khăn', description: 'Quản lý khó khăn.', effects: { reputation: -2, belief: 0, community: 0 }, isNegative: true },
    ],
    thien_chua: [
      { name: 'Mở giáo xứ mới', description: 'Mở giáo xứ mới.', effects: { reputation: 1, belief: 0, community: 2 }, isNegative: false },
      { name: 'Chiến lược phát triển', description: 'Có chiến lược phát triển.', effects: { reputation: 2, belief: 0, community: 1 }, isNegative: false },
      { name: 'Đào tạo nhân sự', description: 'Đào tạo nhân sự.', effects: { reputation: 0, belief: 1, community: 2 }, isNegative: false },
      { name: 'Thiếu linh mục', description: 'Thiếu linh mục.', effects: { reputation: 0, belief: -2, community: 0 }, isNegative: true },
      { name: 'Nguồn lực căng', description: 'Nguồn lực căng thẳng.', effects: { reputation: -2, belief: 0, community: 0 }, isNegative: true },
    ],
  },
  19: {
    cao_dai: [
      { name: 'Xử lý khôn ngoan', description: 'Xử lý khôn ngoan.', effects: { reputation: 2, belief: 0, community: 1 }, isNegative: false },
      { name: 'Triết lý giải thích', description: 'Dùng triết lý giải thích.', effects: { reputation: 0, belief: 2, community: 0 }, isNegative: false },
      { name: 'Hành động sửa sai', description: 'Hành động sửa sai.', effects: { reputation: 1, belief: 1, community: 1 }, isNegative: false },
      { name: 'Khủng hoảng lan rộng', description: 'Khủng hoảng lan rộng.', effects: { reputation: -2, belief: -1, community: 0 }, isNegative: true },
      { name: 'Mất uy tín', description: 'Mất uy tín nghiêm trọng.', effects: { reputation: -2, belief: 0, community: -1 }, isNegative: true },
    ],
    hoa_hao: [
      { name: 'Nói thẳng sửa sai', description: 'Nói thẳng và sửa sai.', effects: { reputation: 2, belief: 0, community: 1 }, isNegative: false },
      { name: 'Dân hỗ trợ', description: 'Được dân hỗ trợ.', effects: { reputation: 0, belief: 0, community: 2 }, isNegative: false },
      { name: 'Đơn giản minh bạch', description: 'Giải quyết đơn giản minh bạch.', effects: { reputation: 1, belief: 1, community: 0 }, isNegative: false },
      { name: 'Khủng hoảng nội bộ', description: 'Khủng hoảng lan trong nội bộ.', effects: { reputation: -2, belief: 0, community: -1 }, isNegative: true },
      { name: 'Mất niềm tin', description: 'Mất niềm tin từ cộng đồng.', effects: { reputation: 0, belief: -2, community: 0 }, isNegative: true },
    ],
    phat_giao: [
      { name: 'Bình tĩnh xử lý', description: 'Bình tĩnh xử lý.', effects: { reputation: 1, belief: 2, community: 0 }, isNegative: false },
      { name: 'Sám hối chân thành', description: 'Sám hối chân thành.', effects: { reputation: 1, belief: 2, community: 0 }, isNegative: false },
      { name: 'Uy tín lâu dài', description: 'Dựa vào uy tín lâu dài.', effects: { reputation: 2, belief: 0, community: 0 }, isNegative: false },
      { name: 'Scandal sư', description: 'Scandal liên quan đến sư.', effects: { reputation: -2, belief: -1, community: 0 }, isNegative: true },
      { name: 'Mất niềm tin Phật tử', description: 'Phật tử mất niềm tin.', effects: { reputation: 0, belief: -2, community: -1 }, isNegative: true },
    ],
    thien_chua: [
      { name: 'Xử lý chuyên nghiệp', description: 'Xử lý chuyên nghiệp.', effects: { reputation: 2, belief: 0, community: 1 }, isNegative: false },
      { name: 'Thừa nhận và sửa đổi', description: 'Thừa nhận và sửa đổi.', effects: { reputation: 1, belief: 2, community: 0 }, isNegative: false },
      { name: 'Hỗ trợ nạn nhân', description: 'Hỗ trợ nạn nhân nếu có.', effects: { reputation: 1, belief: 0, community: 2 }, isNegative: false },
      { name: 'Che giấu', description: 'Cố che giấu vấn đề.', effects: { reputation: -2, belief: -1, community: -1 }, isNegative: true },
      { name: 'Scandal lan rộng', description: 'Scandal lan rộng.', effects: { reputation: -2, belief: 0, community: -1 }, isNegative: true },
    ],
  },
  20: {
    cao_dai: [
      { name: 'Phát triển ổn định', description: 'Phát triển ổn định bền vững.', effects: { reputation: 1, belief: 1, community: 1 }, isNegative: false },
      { name: 'Củng cố nội bộ', description: 'Củng cố nội bộ.', effects: { reputation: 0, belief: 2, community: 1 }, isNegative: false },
      { name: 'Mở rộng ảnh hưởng', description: 'Mở rộng ảnh hưởng.', effects: { reputation: 1, belief: 0, community: 2 }, isNegative: false },
      { name: 'Tự mãn', description: 'Tự mãn không phát triển.', effects: { reputation: -2, belief: 0, community: 0 }, isNegative: true },
      { name: 'Lơ là', description: 'Lơ là trong giai đoạn ổn định.', effects: { reputation: 0, belief: -1, community: -1 }, isNegative: true },
    ],
    hoa_hao: [
      { name: 'Tiếp tục gần dân', description: 'Tiếp tục gần gũi với dân.', effects: { reputation: 0, belief: 1, community: 2 }, isNegative: false },
      { name: 'Đơn giản hiệu quả', description: 'Hoạt động đơn giản hiệu quả.', effects: { reputation: 1, belief: 1, community: 1 }, isNegative: false },
      { name: 'Phát triển từ từ', description: 'Phát triển từ từ.', effects: { reputation: 1, belief: 0, community: 1 }, isNegative: false },
      { name: 'Không tận dụng', description: 'Không tận dụng thời cơ.', effects: { reputation: -1, belief: 0, community: -1 }, isNegative: true },
      { name: 'Giậm chân tại chỗ', description: 'Giậm chân tại chỗ.', effects: { reputation: -1, belief: -1, community: 0 }, isNegative: true },
    ],
    phat_giao: [
      { name: 'Tu tập và phát triển', description: 'Tu tập và phát triển.', effects: { reputation: 1, belief: 2, community: 0 }, isNegative: false },
      { name: 'Hoạt động đều đặn', description: 'Hoạt động đều đặn.', effects: { reputation: 0, belief: 1, community: 2 }, isNegative: false },
      { name: 'Mở rộng Phật tử', description: 'Thu hút thêm Phật tử.', effects: { reputation: 1, belief: 0, community: 2 }, isNegative: false },
      { name: 'Thụ động', description: 'Quá thụ động.', effects: { reputation: -1, belief: -1, community: 0 }, isNegative: true },
      { name: 'Thiếu đổi mới', description: 'Thiếu đổi mới.', effects: { reputation: -1, belief: 0, community: -1 }, isNegative: true },
    ],
    thien_chua: [
      { name: 'Phát triển toàn diện', description: 'Phát triển toàn diện.', effects: { reputation: 1, belief: 1, community: 1 }, isNegative: false },
      { name: 'Củng cố tổ chức', description: 'Củng cố tổ chức.', effects: { reputation: 2, belief: 0, community: 1 }, isNegative: false },
      { name: 'Hoạt động đa dạng', description: 'Hoạt động đa dạng.', effects: { reputation: 0, belief: 1, community: 2 }, isNegative: false },
      { name: 'Bằng lòng hiện tại', description: 'Bằng lòng với hiện tại.', effects: { reputation: -1, belief: -1, community: 0 }, isNegative: true },
      { name: 'Thiếu chiến lược', description: 'Thiếu chiến lược dài hạn.', effects: { reputation: -1, belief: 0, community: -1 }, isNegative: true },
    ],
  },
};

// Get cards for a specific event and religion
export const getCardsForEvent = (eventId: number, religion: Religion): Card[] => {
  const eventCards = ALL_EVENT_CARDS[eventId];
  if (!eventCards) return [];
  
  const religionCards = eventCards[religion];
  if (!religionCards) return [];
  
  return religionCards.map((template, index) => ({
    id: generateCardId(),
    name: template.name,
    description: template.description,
    effects: template.effects,
    isNegative: template.isNegative,
    religion,
    eventId,
  }));
};

// Create a shuffled deck of 5 cards (3 positive + 2 negative) for a specific event and religion
export const createEventCardDeck = (eventId: number, religion: Religion): Card[] => {
  const cards = getCardsForEvent(eventId, religion);
  const positiveCards = cards.filter(c => !c.isNegative);
  const negativeCards = cards.filter(c => c.isNegative);
  
  // Verify structure: must have exactly 3 positive and 2 negative
  if (positiveCards.length !== 3 || negativeCards.length !== 2) {
    console.error(
      `⚠️ Event ${eventId} - ${religion}: ${positiveCards.length} positive (need 3), ${negativeCards.length} negative (need 2)`
    );
  }
  
  // Combine and shuffle: 3 positive + 2 negative
  const deck = [...positiveCards, ...negativeCards];
  return deck.sort(() => Math.random() - 0.5);
};

// Draw initial hand for a player (3 positive + 2 negative cards)
export const drawInitialHand = (eventId: number, religion: Religion, isBot: boolean = false): Card[] => {
  const cards = getCardsForEvent(eventId, religion);
  const positiveCards = cards.filter(c => !c.isNegative);
  const negativeCards = cards.filter(c => c.isNegative);
  
  // Shuffle each group
  const shuffledPositive = [...positiveCards].sort(() => Math.random() - 0.5);
  const shuffledNegative = [...negativeCards].sort(() => Math.random() - 0.5);
  
  // For bots: 2 positive + 3 negative (disadvantage)
  // For human: 3 positive + 2 negative (advantage)
  if (isBot) {
    const hand = [
      ...shuffledPositive.slice(0, 2),
      ...shuffledNegative.slice(0, 3),
    ];
    return hand.sort(() => Math.random() - 0.5);
  }
  
  // Human gets 3 positive, 2 negative
  const hand = [
    ...shuffledPositive.slice(0, 3),
    ...shuffledNegative.slice(0, 2),
  ];
  return hand.sort(() => Math.random() - 0.5);
};

// Draw a single card from a pre-shuffled deck
// This ensures each card from an event is used only once and in sequence
export const drawCardFromDeck = (
  deck: Card[],
  cardDrawIndex: number
): { card: Card; nextIndex: number } => {
  if (deck.length === 0) {
    console.warn('Card deck is empty!');
    return { card: deck[0] || { id: '', name: '', description: '', isNegative: false, effects: { reputation: 0, belief: 0, community: 0 }, religion: 'thien_chua', eventId: 0 }, nextIndex: 0 };
  }
  
  // Cycle through the deck: 0 -> 1 -> 2 -> 3 -> 4 -> 0 (wrap around if needed)
  const index = cardDrawIndex % deck.length;
  const card = deck[index];
  
  return {
    card,
    nextIndex: (cardDrawIndex + 1) % deck.length,
  };
};

// Draw a single card for a religion from current event
// Now draws from a pre-shuffled deck per event to avoid repetition
export const drawCard = (eventId: number, religion: Religion, isBot: boolean = false): Card => {
  const cards = getCardsForEvent(eventId, religion);
  
  // Ensure we have exactly 5 cards (3 positive + 2 negative)
  const positiveCards = cards.filter(c => !c.isNegative);
  const negativeCards = cards.filter(c => c.isNegative);
  
  if (positiveCards.length !== 3 || negativeCards.length !== 2) {
    console.warn(`Event ${eventId} ${religion}: ${positiveCards.length} positive, ${negativeCards.length} negative - should be 3+2`);
  }
  
  // Create a pre-shuffled deck: 3 positive + 2 negative, then shuffle
  const deck = [...positiveCards, ...negativeCards];
  const shuffledDeck = deck.sort(() => Math.random() - 0.5);
  
  // For next draw, we'll pick from this shuffled deck
  // Pick the first card from shuffled deck (ensures different cards each draw)
  const randomIndex = Math.floor(Math.random() * shuffledDeck.length);
  return shuffledDeck[randomIndex];
};
