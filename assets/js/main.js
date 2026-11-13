/* Điện Lạnh Minh Thương Phát — main.js (chỉ tăng trải nghiệm, nội dung đã có sẵn trong HTML) */
(function(){
  "use strict";

  /* Menu mobile */
  var menuBtn = document.getElementById("menuBtn");
  var mainNav = document.getElementById("mainNav");
  if (menuBtn && mainNav) {
    menuBtn.addEventListener("click", function(){
      mainNav.classList.toggle("open");
    });
  }

  /* FAQ accordion */
  document.querySelectorAll(".faq-q").forEach(function(btn){
    btn.addEventListener("click", function(){
      var item = btn.parentElement;
      var wasOpen = item.classList.contains("open");
      document.querySelectorAll(".faq-item.open").forEach(function(el){ el.classList.remove("open"); });
      if (!wasOpen) item.classList.add("open");
    });
  });

  /* Công cụ dự toán giá — giá lấy đúng bảng giá công khai trên trang */
  var est = document.getElementById("estimator");
  if (est) {
    var boxes = est.querySelectorAll("input[type=checkbox][data-price]");
    var totalEl = document.getElementById("estTotal");
    var countEl = document.getElementById("estCount");
    function recalc(){
      var sum = 0, n = 0;
      boxes.forEach(function(b){ if (b.checked) { sum += parseInt(b.dataset.price, 10); n++; } });
      var discount = 0;
      if (n >= 2) discount = Math.round(sum * 0.05);
      var final = sum - discount;
      countEl.textContent = n;
      totalEl.innerHTML = n === 0
        ? "Hãy chọn hạng mục cần làm để xem dự toán."
        : (discount > 0
            ? '<span class="old">' + sum.toLocaleString("vi-VN") + " đ</span>" + final.toLocaleString("vi-VN") + " đ" +
              ' <span class="save">— đã giảm 5% (' + discount.toLocaleString("vi-VN") + " đ) vì làm từ 2 hạng mục trở lên</span>"
            : final.toLocaleString("vi-VN") + " đ");
    }
    boxes.forEach(function(b){ b.addEventListener("change", recalc); });
    recalc();
  }

  /* Công cụ chẩn đoán nhanh — chỉ gợi ý nguyên nhân thường gặp, giá theo bảng giá công khai */
  var diagForm = document.getElementById("diagForm");
  if (diagForm) {
    var resultBox = document.getElementById("diagResult");
    var DATA = {
      "ml-khong-lanh": ["Máy lạnh chạy nhưng không lạnh", "Nguyên nhân thường gặp nhất là thiếu gas hoặc dàn lạnh quá bẩn làm giảm khả năng trao đổi nhiệt.", "Sạc gas bổ sung R32/R410A: 150.000đ/bộ. Vệ sinh máy lạnh treo tường: 150.000đ/bộ. Thợ kiểm tra tận nhà miễn phí rồi mới báo giá chính xác."],
      "ml-chay-nuoc": ["Máy lạnh bị chảy nước trong nhà", "Thường do đường thoát nước bị tắc, nghẹt rong rêu.", "Thông đường thoát nước dột + xịt thông rong rêu: 100.000đ/lần."],
      "ml-keu-to": ["Máy lạnh kêu to, rung khi chạy", "Có thể do quạt dàn lạnh bám bụi, ốc vít lỏng hoặc tụ đề block yếu.", "Thay tụ đề block: 350.000đ/cái. Thợ kiểm tra tận nhà miễn phí để xác định đúng lỗi trước khi sửa."],
      "ml-khong-chay": ["Máy lạnh không chạy, không lên nguồn", "Có thể do hỏng board mạch, chết tụ hoặc mất nguồn cấp.", "Thay tụ đề block: 350.000đ/cái. Lỗi board mạch cần thợ kiểm tra trực tiếp để báo giá."],
      "tl-khong-lanh": ["Tủ lạnh không lạnh hoặc kém lạnh", "Có thể do xì gas, hỏng block hoặc quạt dàn lạnh không chạy.", "Thợ kiểm tra tận nhà miễn phí, báo giá trước khi sửa. Gọi 0979 628 168 để đặt lịch kiểm tra."],
      "tl-dong-tuyet": ["Tủ lạnh đóng tuyết dày, rỉ nước gầm tủ", "Thường do hỏng cảm biến xả đá, xì giàn lạnh hoặc gioăng cửa hở.", "Thợ kiểm tra tận nhà miễn phí, báo giá trước khi sửa. Gọi 0979 628 168 để đặt lịch kiểm tra."],
      "mg-rung-lac": ["Máy giặt rung lắc mạnh khi vắt", "Thường do kê máy không cân bằng, hỏng phuộc giảm xóc hoặc lồng giặt lệch tâm.", "Thợ kiểm tra tận nhà miễn phí, báo giá trước khi sửa. Gọi 0979 628 168 để đặt lịch kiểm tra."],
      "mg-khong-xa": ["Máy giặt không xả nước / kẹt van xả", "Thường do van xả bị kẹt, bơm xả hỏng hoặc đường ống thoát bị tắc.", "Thợ kiểm tra tận nhà miễn phí, báo giá trước khi sửa. Gọi 0979 628 168 để đặt lịch kiểm tra."]
    };
    diagForm.addEventListener("submit", function(e){
      e.preventDefault();
      var sel = document.getElementById("diagSymptom");
      var d = DATA[sel.value];
      if (!d) return;
      resultBox.innerHTML = "<h4>" + d[0] + "</h4><p>" + d[1] + "</p><p><strong>" + d[2] + "</strong></p>" +
        '<p><a class="btn" href="tel:0979628168">Gọi thợ ngay: 0979 628 168</a></p>';
      resultBox.classList.remove("hidden");
      resultBox.scrollIntoView({behavior:"smooth", block:"nearest"});
    });
  }

  /* Form đặt lịch — chỉ xử lý phía trình duyệt (chưa có backend) */
  var bookForm = document.getElementById("bookingForm");
  if (bookForm) {
    bookForm.addEventListener("submit", function(e){
      e.preventDefault();
      var ok = true;
      var name = document.getElementById("bkName");
      var phone = document.getElementById("bkPhone");
      var addr = document.getElementById("bkAddress");
      var date = document.getElementById("bkDate");
      var phoneErr = document.getElementById("phoneErr");
      phoneErr.textContent = "";
      [name, phone, addr, date].forEach(function(f){ f.style.borderColor = ""; });
      if (!name.value.trim()) { name.style.borderColor = "#dc2626"; ok = false; }
      var p = phone.value.replace(/[\s.]/g, "");
      if (!/^0\d{9}$/.test(p)) {
        phone.style.borderColor = "#dc2626";
        phoneErr.textContent = "Số điện thoại chưa đúng. Vui lòng nhập 10 số, bắt đầu bằng số 0 (ví dụ 0979 628 168).";
        ok = false;
      }
      if (!addr.value.trim()) { addr.style.borderColor = "#dc2626"; ok = false; }
      if (!date.value) { date.style.borderColor = "#dc2626"; ok = false; }
      if (!ok) return;
      var service = document.getElementById("bkService");
      var time = document.getElementById("bkTime");
      var note = document.getElementById("bkNote");
      var summary = document.getElementById("bookSummary");
      summary.innerHTML =
        "<h4>Đã ghi nhận yêu cầu đặt lịch của bạn!</h4>" +
        "<p><strong>Họ tên:</strong> " + esc(name.value) + "<br>" +
        "<strong>Số điện thoại:</strong> " + esc(phone.value) + "<br>" +
        "<strong>Dịch vụ:</strong> " + esc(service.options[service.selectedIndex].text) + "<br>" +
        "<strong>Ngày hẹn:</strong> " + esc(date.value) + " — " + esc(time.options[time.selectedIndex].text) + "<br>" +
        "<strong>Địa chỉ:</strong> " + esc(addr.value) + "</p>" +
        "<p>Nhân viên Minh Thương Phát sẽ gọi lại xác nhận trong 5–10 phút (giờ làm việc 08:00–20:30). " +
        "Nếu cần gấp, bạn gọi thẳng hotline để được xếp thợ ngay.</p>" +
        '<p><a class="btn red" href="tel:0979628168">Gọi ngay 0979 628 168</a> ' +
        '<a class="btn ghost" href="https://zalo.me/0979628168" target="_blank" rel="noopener">Nhắn Zalo</a></p>';
      summary.classList.remove("hidden");
      summary.scrollIntoView({behavior:"smooth", block:"nearest"});
    });
    function esc(s){
      return s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
    }
  }

  /* Đặt ngày tối thiểu cho ô chọn ngày là hôm nay */
  var dateInput = document.getElementById("bkDate");
  if (dateInput) {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0");
    dateInput.min = today.getFullYear() + "-" + mm + "-" + dd;
  }
})();
