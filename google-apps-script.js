/**
 * ══════════════════════════════════════════════════════════════════════════
 * GOOGLE APPS SCRIPT: ระบบศูนย์รับเรื่องร้องเรียนและเสนอแนะ รพ.หนองหาน
 * ══════════════════════════════════════════════════════════════════════════
 * ฟังก์ชันหลัก:
 * 1. รับเรื่องร้องเรียนใหม่และบันทึกข้อมูลลง Google Sheet
 * 2. ส่งแจ้งเตือนไปยัง LINE (รองรับทั้ง Flex Message และ LINE Notify)
 *    - แสดงข้อมูลทั้งหมด (วันเวลา, เรื่อง, หมวดหมู่, ผู้แจ้ง, เบอร์โทร, สถานะ)
 *    - ตัดส่วนข้อความรายละเอียดยาวๆ ออก เพื่อความปลอดภัยและความกระชับ
 *    - ใส่ลิงก์ / ปุ่ม "คลิกดูรายละเอียด" เพื่อเด้งไปยังระบบหลังบ้าน (Admin)
 * 3. ให้บริการ API สำหรับหน้าระบบตรวจสอบเรื่องร้องเรียนหลังบ้าน (Admin)
 */

// ──────────────────────────────────────────────────────────────────────────
// ⚙️ การตั้งค่าระบบ (CONFIGURATION)
// ──────────────────────────────────────────────────────────────────────────

// ลิงก์ระบบตรวจสอบเรื่องร้องเรียนหลังบ้าน (Admin Web App)
const ADMIN_URL = "https://gusmalllex-alt.github.io/nhh-request/admin/";

// 1. ตั้งค่า LINE Messaging API (Flex Message)
// ดูได้จาก LINE Developers Console (Messaging API channel)
const LINE_CHANNEL_ACCESS_TOKEN = "ใส่_LINE_CHANNEL_ACCESS_TOKEN_ที่นี่";
const LINE_TARGET_ID = "ใส่_USER_ID_หรือ_GROUP_ID_ที่นี่"; // Group ID หรือ User ID ของเจ้าหน้าที่

// 2. ตั้งค่า LINE Notify (กรณีต้องการส่งผ่าน LINE Notify Token)
const LINE_NOTIFY_TOKEN = "ใส่_LINE_NOTIFY_TOKEN_ที่นี่"; // หากไม่ใช้ให้เว้นว่างไว้ ""

// ชื่อ Sheet ที่ใช้เก็บข้อมูล
const SHEET_NAME = "แบบฟอร์มตอบกลับ"; 

// ──────────────────────────────────────────────────────────────────────────
// 🌐 API GET: ดึงข้อมูลสำหรับหน้าระบบ Admin
// ──────────────────────────────────────────────────────────────────────────
function doGet(e) {
  try {
    const action = e.parameter.action;
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_NAME) || ss.getSheets()[0];
    
    if (action === "getData") {
      const data = sheet.getDataRange().getValues();
      return ContentService.createTextOutput(JSON.stringify(data))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    return ContentService.createTextOutput(JSON.stringify({ status: "ready" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ──────────────────────────────────────────────────────────────────────────
// 📩 API POST: รับข้อมูลฟอร์ม และ การอัปเดตจากระบบ Admin
// ──────────────────────────────────────────────────────────────────────────
function doPost(e) {
  try {
    let payload = {};
    if (e.postData && e.postData.contents) {
      try {
        payload = JSON.parse(e.postData.contents);
      } catch (err) {
        payload = e.parameter;
      }
    } else {
      payload = e.parameter;
    }

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_NAME) || ss.getSheets()[0];
    const action = payload.action;

    // ── กรณีที่ 1: อัปเดตสถานะจากระบบ Admin ──
    if (action === "update") {
      const ts = payload.timestampISO;
      const newStatus = payload.status;
      const newDept = payload.department;
      const newNotes = payload.notes;
      const fileInfo = payload.fileInfo;
      let fileUrl = "";

      // ถ้ามีไฟล์แนบอัปเดต
      if (fileInfo && fileInfo.base64) {
        const decoded = Utilities.base64Decode(fileInfo.base64);
        const blob = Utilities.newBlob(decoded, fileInfo.mimeType, fileInfo.filename);
        const folder = DriveApp.getRootFolder();
        const file = folder.createFile(blob);
        file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
        fileUrl = file.getUrl();
      }

      const data = sheet.getDataRange().getValues();
      for (let i = 1; i < data.length; i++) {
        const rowTs = data[i][0] ? data[i][0].toString() : "";
        if (rowTs === ts || (new Date(rowTs)).toISOString() === (new Date(ts)).toISOString()) {
          // Column 9 = สถานะ (I), Column 10 = หน่วยงาน (J), Column 11 = หมายเหตุ (K)
          sheet.getRange(i + 1, 9).setValue(newStatus);
          sheet.getRange(i + 1, 10).setValue(newDept);
          sheet.getRange(i + 1, 11).setValue(newNotes);
          if (fileUrl) sheet.getRange(i + 1, 12).setValue(fileUrl);
          break;
        }
      }

      // ถ้าเปิดให้ส่งแจ้งเตือน LINE เมื่ออัปเดต
      if (payload.notifyLine) {
        sendLineAlert({
          isUpdate: true,
          title: payload.title || "อัปเดตสถานะเรื่องร้องเรียน",
          category: payload.category || "-",
          name: payload.name || "เจ้าหน้าที่ Admin",
          phone: payload.phone || "-",
          status: newStatus,
          department: newDept || "-",
          notes: newNotes || "-",
          adminUrl: payload.adminUrl || ADMIN_URL
        });
      }

      return ContentService.createTextOutput(JSON.stringify({ status: "success" }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // ── กรณีที่ 2: กดส่งแจ้งเตือน LINE โดยตรงจากระบบ Admin ──
    if (action === "sendLineNotify") {
      sendLineAlert({
        isUpdate: false,
        title: payload.title || "เรื่องร้องเรียน",
        category: payload.category || "-",
        name: payload.name || "ไม่ระบุชื่อ",
        phone: payload.phone || "-",
        status: payload.status || "รอดำเนินการ",
        department: payload.department || "-",
        notes: payload.notes || "-",
        adminUrl: payload.adminUrl || ADMIN_URL
      });

      return ContentService.createTextOutput(JSON.stringify({ status: "success" }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // ── กรณีที่ 3: รับเรื่องร้องเรียนใหม่จากแบบฟอร์ม ──
    const now = new Date();
    const isoString = now.toISOString();
    const title = payload.title || payload["เรื่องร้องเรียน"] || payload.topic || "-";
    const category = payload.category || payload["หมวดหมู่"] || "-";
    const details = payload.details || payload["รายละเอียด"] || "-";
    const name = payload.name || payload["ชื่อผู้แจ้ง"] || "ไม่ระบุชื่อ";
    const phone = payload.phone || payload["เบอร์โทร"] || "-";
    const lineId = payload.lineId || "-";
    const email = payload.email || "-";
    const status = "รอดำเนินการ";
    const dept = "";
    const notes = "";

    sheet.appendRow([
      isoString, title, category, details, name, phone, lineId, email, status, dept, notes
    ]);

    // ส่งแจ้งเตือน LINE อัตโนมัติ (ตัดส่วนรายละเอียด ให้คลิกดูที่ Admin)
    sendLineAlert({
      isUpdate: false,
      title: title,
      category: category,
      name: name,
      phone: phone,
      status: status,
      department: "-",
      adminUrl: ADMIN_URL
    });

    return ContentService.createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ──────────────────────────────────────────────────────────────────────────
// 📢 ฟังก์ชันส่งแจ้งเตือน LINE (รองรับทั้ง Flex Message และ LINE Notify)
// ──────────────────────────────────────────────────────────────────────────
function sendLineAlert(data) {
  // 1. ส่งแบบ LINE Messaging API (Flex Message) ถ้ามีการระบุ Token
  if (LINE_CHANNEL_ACCESS_TOKEN && LINE_CHANNEL_ACCESS_TOKEN !== "ใส่_LINE_CHANNEL_ACCESS_TOKEN_ที่นี่") {
    try {
      sendFlexMessage(data);
    } catch (e) {
      Logger.log("Error sending Flex Message: " + e.toString());
    }
  }

  // 2. ส่งแบบ LINE Notify ถ้ามีการระบุ Token
  if (LINE_NOTIFY_TOKEN && LINE_NOTIFY_TOKEN !== "ใส่_LINE_NOTIFY_TOKEN_ที่นี่") {
    try {
      sendLineNotify(data);
    } catch (e) {
      Logger.log("Error sending LINE Notify: " + e.toString());
    }
  }
}

// ──────────────────────────────────────────────────────────────────────────
// 🎨 ฟังก์ชันส่ง LINE Flex Message
// ──────────────────────────────────────────────────────────────────────────
function sendFlexMessage(data) {
  const adminLink = data.adminUrl || ADMIN_URL;
  const isUpdate = data.isUpdate === true;
  const headerColor = isUpdate ? "#1e40af" : "#0d5934"; // น้ำเงินถ้าเป็นอัปเดต / เขียวเข้มถ้าเรื่องใหม่
  const headerTitle = isUpdate ? "📢 แจ้งอัปเดตสถานะเรื่องร้องเรียน" : "🔔 มีเรื่องร้องเรียน/เสนอแนะใหม่";

  const flexContent = {
    type: "bubble",
    size: "mega",
    header: {
      type: "box",
      layout: "vertical",
      backgroundColor: headerColor,
      paddingAll: "16px",
      contents: [
        {
          type: "text",
          text: "ศูนย์รับเรื่องร้องเรียนและเสนอแนะ รพ.หนองหาน",
          color: "#e2e8f0",
          size: "xs",
          weight: "bold"
        },
        {
          type: "text",
          text: headerTitle,
          color: "#ffffff",
          size: "lg",
          weight: "bold",
          margin: "xs"
        }
      ]
    },
    body: {
      type: "box",
      layout: "vertical",
      spacing: "md",
      paddingAll: "18px",
      contents: [
        {
          type: "text",
          text: data.title || "ไม่ระบุหัวข้อ",
          weight: "bold",
          size: "md",
          wrap: true,
          color: "#0f172a"
        },
        {
          type: "box",
          layout: "vertical",
          spacing: "sm",
          margin: "sm",
          contents: [
            {
              type: "box",
              layout: "baseline",
              spacing: "sm",
              contents: [
                { type: "text", text: "หมวดหมู่", color: "#64748b", size: "sm", flex: 3 },
                { type: "text", text: data.category || "-", wrap: true, color: "#1e293b", size: "sm", flex: 7, weight: "bold" }
              ]
            },
            {
              type: "box",
              layout: "baseline",
              spacing: "sm",
              contents: [
                { type: "text", text: "ผู้แจ้ง", color: "#64748b", size: "sm", flex: 3 },
                { type: "text", text: data.name || "ไม่ระบุชื่อ", wrap: true, color: "#1e293b", size: "sm", flex: 7 }
              ]
            },
            {
              type: "box",
              layout: "baseline",
              spacing: "sm",
              contents: [
                { type: "text", text: "เบอร์โทร", color: "#64748b", size: "sm", flex: 3 },
                { type: "text", text: data.phone || "-", wrap: true, color: "#0284c7", size: "sm", flex: 7, weight: "bold" }
              ]
            },
            {
              type: "box",
              layout: "baseline",
              spacing: "sm",
              contents: [
                { type: "text", text: "หน่วยงาน", color: "#64748b", size: "sm", flex: 3 },
                { type: "text", text: data.department || "-", wrap: true, color: "#1e293b", size: "sm", flex: 7 }
              ]
            },
            {
              type: "box",
              layout: "baseline",
              spacing: "sm",
              contents: [
                { type: "text", text: "สถานะ", color: "#64748b", size: "sm", flex: 3 },
                { type: "text", text: data.status || "รอดำเนินการ", wrap: true, color: "#d97706", size: "sm", flex: 7, weight: "bold" }
              ]
            }
          ]
        },
        {
          type: "separator",
          margin: "md"
        },
        {
          type: "text",
          text: "🔒 รายละเอียดฉบับเต็มถูกสงวนไว้เพื่อความปลอดภัย",
          size: "xs",
          color: "#94a3b8",
          wrap: true,
          margin: "sm"
        }
      ]
    },
    footer: {
      type: "box",
      layout: "vertical",
      paddingAll: "14px",
      contents: [
        {
          type: "button",
          style: "primary",
          color: headerColor,
          action: {
            type: "uri",
            label: "👉 คลิกดูรายละเอียด (ระบบ Admin)",
            uri: adminLink
          }
        }
      ]
    }
  };

  const url = "https://api.line.me/v2/bot/message/push";
  const options = {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + LINE_CHANNEL_ACCESS_TOKEN
    },
    payload: JSON.stringify({
      to: LINE_TARGET_ID,
      messages: [
        {
          type: "flex",
          altText: isUpdate ? "อัปเดตสถานะ: " + data.title : "เรื่องร้องเรียนใหม่: " + data.title,
          contents: flexContent
        }
      ]
    }),
    muteHttpExceptions: true
  };

  UrlFetchApp.fetch(url, options);
}

// ──────────────────────────────────────────────────────────────────────────
// 💬 ฟังก์ชันส่ง LINE Notify (Text Message + Admin Link)
// ──────────────────────────────────────────────────────────────────────────
function sendLineNotify(data) {
  const adminLink = data.adminUrl || ADMIN_URL;
  const isUpdate = data.isUpdate === true;

  let msg = "\n";
  if (isUpdate) {
    msg += "📢 แจ้งอัปเดตสถานะเรื่องร้องเรียน\n";
  } else {
    msg += "🔔 มีเรื่องร้องเรียน/เสนอแนะใหม่\n";
  }
  msg += "--------------------------------\n";
  msg += "📌 เรื่อง: " + (data.title || "-") + "\n";
  msg += "🏷️ หมวดหมู่: " + (data.category || "-") + "\n";
  msg += "👤 ผู้แจ้ง: " + (data.name || "ไม่ระบุชื่อ") + "\n";
  msg += "📞 เบอร์โทร: " + (data.phone || "-") + "\n";
  msg += "🏢 หน่วยงาน: " + (data.department || "-") + "\n";
  msg += "📊 สถานะ: " + (data.status || "รอดำเนินการ") + "\n";
  if (data.notes && data.notes !== "-") {
    msg += "📝 บันทึกความคืบหน้า: " + data.notes + "\n";
  }
  msg += "--------------------------------\n";
  msg += "👉 คลิกดูรายละเอียดทั้งหมด (ระบบ Admin):\n" + adminLink;

  const url = "https://notify-api.line.me/api/notify";
  const options = {
    method: "post",
    headers: {
      "Authorization": "Bearer " + LINE_NOTIFY_TOKEN
    },
    payload: {
      message: msg
    },
    muteHttpExceptions: true
  };

  UrlFetchApp.fetch(url, options);
}
