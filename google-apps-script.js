/**
 * @NotOnlyCurrentDoc
 * ============================================================
 * 🟢 การตั้งค่าระบบ (CONFIG)
 * ============================================================
 */
const CONFIG = {
  SHEET_ID: '1v94m0VqOKIxsHWEz5jtSLfuEIOkpIIyI0ts2JijxBUY', // ID ของ Google Sheet
  SHEET_NAME: 'Responses', // ชื่อแผ่นงาน
  DRIVE_FOLDER_ID: '1XQEBuZlEyBfXaXP8m-FtfmTxoGxqWDhN', // โฟลเดอร์ Google Drive สำหรับเก็บไฟล์แนบ
  
  // ตั้งค่า LINE Messaging API
  LINE: {
    TOKEN: 'gO4jKibyErifY3FCLV3BH3jpqyD2lEWf51F+MNLGdbKhBjSjOp+MBQwlh4Ey4U4juY+OEWkEEiX1P0Ph++Jx1px60U95CjzwGNLagIB8+bOcThlMQJ1cF955Io+hUQyfiF0OiU32Jvx1cLhXnc6uswdB04t89/1O/w1cDnyilFU=',
    GROUP_ID: 'Cd2e82b8aad6eb265ae9d0156eaa77f69'
  },

  // ลิงก์ระบบตรวจสอบเรื่องร้องเรียนหลังบ้าน (Admin)
  ADMIN_URL: 'https://gusmalllex-alt.github.io/nhh-request/admin/'
};

/**
 * ⚡ ฟังก์ชันสำหรับรันเพื่อขอสิทธิ์การเข้าถึง (สำคัญมาก!)
 * ให้เลือกฟังก์ชันนี้ด้านบน แล้วกด "เรียกใช้" (Run) 1 ครั้ง เพื่อกดยอมรับสิทธิ์ Drive, Sheet, Mail
 */
function setupSystem() {
  SpreadsheetApp.openById(CONFIG.SHEET_ID);
  const folder = DriveApp.getFolderById(CONFIG.DRIVE_FOLDER_ID);
  const dummyFile = folder.createFile('dummy.txt', 'This is a test file for authorization.', MimeType.PLAIN_TEXT);
  dummyFile.setTrashed(true);
  MailApp.getRemainingDailyQuota();
  UrlFetchApp.fetch("https://www.google.com");
  Logger.log("✅ ระบบได้รับสิทธิ์การเข้าถึงแบบเต็มรูปแบบ (อ่าน/เขียน) เรียบร้อยแล้ว");
}

/**
 * 🌐 API GET: ให้บริการทั้งหน้าเดิม (HTML Template) และดึงข้อมูลสำหรับหน้า Admin (Next.js)
 */
function doGet(e) {
  // ดึงข้อมูลสำหรับระบบ Admin (Next.js)
  if (e && e.parameter && e.parameter.action === 'getData') {
    const data = getSheetData();
    return ContentService.createTextOutput(JSON.stringify(data))
      .setMimeType(ContentService.MimeType.JSON);
  }

  // เปลี่ยนเป็นใช้ Template เพื่อส่งตัวแปร id จาก URL ไปยัง HTML
  const template = HtmlService.createTemplateFromFile('index');
  template.targetId = (e && e.parameter && e.parameter.id) ? e.parameter.id : '';
  
  return template.evaluate()
    .setTitle('แจ้งข้อร้องเรียน เสนอแนะ แนะนำบริการ')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

/**
 * 📩 API POST: รองรับทั้งการส่งข้อมูลจากแบบฟอร์มภายนอก และการสั่งการจากหน้า Admin
 */
function doPost(e) {
  try {
    let payload = {};
    if (e.postData && e.postData.contents) {
      payload = JSON.parse(e.postData.contents);
    } else if (e.parameter) {
      payload = e.parameter;
    }

    // กรณีอัปเดตจาก Admin
    if (payload.action === 'update') {
      const res = updateComplaintData(payload);
      return ContentService.createTextOutput(JSON.stringify(res))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // กรณีลบจาก Admin
    if (payload.action === 'delete') {
      const res = deleteComplaintRow(payload);
      return ContentService.createTextOutput(JSON.stringify(res))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // กรณีกดปุ่มแจ้งเตือน LINE จากหน้า Admin โดยตรง
    if (payload.action === 'sendLineNotify') {
      const msg = `📢 แจ้งเตือนข้อร้องเรียน (Admin)\n` +
                  `-----------------------------\n` +
                  `📌 เรื่อง: ${payload.title || '-'}\n` +
                  `📂 ประเภท: ${payload.category || '-'}\n` +
                  `📝 รายละเอียด: ${payload.details || '-'}\n` +
                  `👤 ผู้แจ้ง: ${payload.name || '-'}\n` +
                  `📞 โทร: ${payload.phone || '-'}\n` +
                  `📊 สถานะ: ${payload.status || '-'}\n` +
                  `🏢 หน่วยงาน: ${payload.department || '-'}\n` +
                  `💬 หมายเหตุ: ${payload.notes || '-'}\n` +
                  `-----------------------------\n` +
                  `🔗 ตรวจสอบรายละเอียด (Admin):\n${CONFIG.ADMIN_URL}`;
      sendLineNotify(msg);
      return ContentService.createTextOutput(JSON.stringify({ success: true }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // กรณีส่งข้อมูลเข้ามาจากหน้าแบบฟอร์ม
    const res = submitForm(payload);
    return ContentService.createTextOutput(JSON.stringify(res))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    Logger.log('🔴 Error in doPost: ' + error.toString());
    return ContentService.createTextOutput(JSON.stringify({ success: false, message: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * 🟢 รับข้อมูลจากหน้าฟอร์มประชาชน
 */
function submitForm(formData) {
  try {
    const sheet = getSheet();
    let fileUrl = '';
    
    // ถ้ารับไฟล์แนบมาจากหน้าฟอร์ม ให้อัปโหลดเข้า Drive
    if (formData.fileInfo && formData.fileInfo.base64) {
      try {
        fileUrl = uploadFileToDrive(formData.fileInfo);
      } catch (e) {
        throw new Error('บันทึกไฟล์ลง Google Drive ไม่สำเร็จ: ' + e.message + ' (โปรดตรวจสอบว่าตอน Deploy ตั้งค่า Execute As เป็น "ฉัน/Me" แล้วหรือยัง)');
      }
    }

    const timestampObj = new Date();
    const timestampISO = timestampObj.toISOString();

    const newRow = [
      timestampObj, // บันทึกเป็น Date Object ตามปกติ
      formData.papade,
      formData.type,
      formData.detail,
      formData.name,
      formData.tel,
      formData.line,
      formData.email,
      'รอดำเนินการ', '', '', fileUrl // 11=หมายเหตุ, 12=ไฟล์แนบ
    ];
    sheet.appendRow(newRow);

    // ปรับรูปแบบข้อความ LINE: แสดงรายละเอียดทั้งหมด + ตัดข้อความยาวเดิมออก + ลิงก์ตรงไป Admin
    const msg = `📣 มีเรื่องร้องเรียนใหม่!\n` +
                `-----------------------------\n` +
                `📌 เรื่อง: ${formData.papade || '-'}\n` +
                `📂 ประเภท: ${formData.type || '-'}\n` +
                `📝 รายละเอียด: ${formData.detail || '-'}\n` +
                `👤 ผู้แจ้ง: ${formData.name || '-'}\n` +
                `📞 โทร: ${formData.tel || '-'}\n` +
                `🆔 Line: ${formData.line || '-'}\n` +
                `📧 Email: ${formData.email || '-'}\n` +
                `-----------------------------\n` +
                `🔗 ตรวจสอบรายละเอียด (Admin):\n${CONFIG.ADMIN_URL}` +
                (fileUrl ? `\n📎 มีไฟล์แนบในระบบ` : ``);
    
    sendLineNotify(msg);

    return { success: true, message: 'ส่งข้อมูลสำเร็จแล้ว' };
  } catch (error) {
    Logger.log('🔴 Error in submitForm: ' + error.toString());
    return { success: false, message: 'เกิดข้อผิดพลาด: ' + error.message };
  }
}

/**
 * 🟢 ดึงข้อมูลไปแสดงหน้า Admin
 */
function getSheetData() {
  try {
    const sheet = getSheet();
    if (sheet.getLastRow() < 1) return [];
    const values = sheet.getDataRange().getValues();
    const header = values.shift(); 
    const processedValues = values.map(row => {
      if (row[0] instanceof Date) row[0] = row[0].toISOString();
      return row;
    });
    // เรียงล่าสุดขึ้นก่อน
    processedValues.sort((a, b) => {
      const dateA = a[0] ? new Date(a[0]) : null;
      const dateB = b[0] ? new Date(b[0]) : null;
      if (!dateB || isNaN(dateB.getTime())) return -1; 
      if (!dateA || isNaN(dateA.getTime())) return 1;
      return dateB.getTime() - dateA.getTime();
    });
    processedValues.unshift(header);
    return processedValues;
  } catch (error) {
    throw new Error('ไม่สามารถดึงข้อมูลได้: ' + error.message);
  }
}

/**
 * 🟢 อัปเดตข้อมูลสถานะ (จาก Admin)
 */
function updateComplaintData(payload) {
  try {
    const sheet = getSheet();
    const rowIndex = findRowIndexByTimestamp(sheet, payload.timestampISO);
    if (rowIndex === -1) return { success: false, message: 'ไม่พบรายการนี้ในฐานข้อมูล' };

    let uploadedFileUrl = "";
    
    // ถ้าเจ้าหน้าที่แนบไฟล์มาเพิ่ม ให้อัปโหลดเข้า Drive
    if (payload.fileInfo && payload.fileInfo.base64) {
      try {
        uploadedFileUrl = uploadFileToDrive(payload.fileInfo);
      } catch (e) {
        return { success: false, message: 'บันทึกไฟล์ลง Google Drive ไม่สำเร็จ: ' + e.message };
      }
    }

    sheet.getRange(rowIndex, 9).setValue(payload.status);
    sheet.getRange(rowIndex, 10).setValue(payload.department);
    sheet.getRange(rowIndex, 11).setValue(payload.notes);

    if (uploadedFileUrl) {
      sheet.getRange(rowIndex, 12).setValue(uploadedFileUrl);
    }

    // ส่งแจ้งเตือนการเปลี่ยนสถานะ
    handleStatusChangeNotification(sheet, rowIndex, payload.status);

    return { success: true, message: 'บันทึกข้อมูลเรียบร้อยแล้ว' };
  } catch (error) {
    return { success: false, message: 'เกิดข้อผิดพลาด: ' + error.message };
  }
}

/**
 * 📁 อัปโหลดไฟล์เข้า Google Drive
 */
function uploadFileToDrive(fileInfo) {
  const folder = DriveApp.getFolderById(CONFIG.DRIVE_FOLDER_ID);
  const blob = Utilities.newBlob(Utilities.base64Decode(fileInfo.base64), fileInfo.mimeType, fileInfo.filename);
  const file = folder.createFile(blob);
  // เปิดสิทธิ์ให้ทุกคนที่มีลิงก์ดูได้ เพื่อให้กดดูในหน้ารายละเอียดได้
  file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  return file.getUrl();
}

/**
 * 🗑️ ลบรายการข้อร้องเรียน
 */
function deleteComplaintRow(data) {
  try {
    const sheet = getSheet();
    const rowIndex = findRowIndexByTimestamp(sheet, data.timestampISO);
    if (rowIndex === -1) return { success: false, message: 'ไม่พบรายการ' };
    sheet.deleteRow(rowIndex);
    return { success: true, message: 'ลบข้อมูลเรียบร้อย' };
  } catch (error) {
    return { success: false, message: 'เกิดข้อผิดพลาด: ' + error.message };
  }
}

// ──────────────────────────────────────────────────────────────────────────
// 🛠️ Helper Functions
// ──────────────────────────────────────────────────────────────────────────

/**
 * 📢 ส่งข้อความเข้า LINE กลุ่ม/ผู้รับ
 */
function sendLineNotify(message) {
  if (!CONFIG.LINE.TOKEN || !CONFIG.LINE.GROUP_ID) return false;
  const url = 'https://api.line.me/v2/bot/message/push';
  const payload = {
    to: CONFIG.LINE.GROUP_ID,
    messages: [{ type: 'text', text: message }]
  };
  const options = {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + CONFIG.LINE.TOKEN
    },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  };
  try {
    UrlFetchApp.fetch(url, options); 
    return true;
  } catch (e) {
    Logger.log('🔴 Line Push Error: ' + e.toString());
    return false;
  }
}

/**
 * ✉️ จัดการการแจ้งเตือนเมื่อสถานะเปลี่ยน (Email + LINE)
 */
function handleStatusChangeNotification(sheet, rowIndex, newStatus) {
  try {
    const rowData = sheet.getRange(rowIndex, 1, 1, sheet.getLastColumn()).getValues()[0];
    const userEmail = rowData[7]; 
    const userName = rowData[4]; 
    const complaintIssue = rowData[1];
    const complaintType = rowData[2];
    const complaintDetail = rowData[3];

    // ส่งอีเมลถ้ามีอีเมลผู้แจ้ง
    if (userEmail && userEmail.includes('@')) {
      MailApp.sendEmail({
        to: userEmail,
        subject: `[ระบบร้องเรียน] สถานะเรื่อง "${complaintIssue}" มีการเปลี่ยนแปลง`,
        htmlBody: `<p>เรียน คุณ${userName},</p><p>เรื่อง "${complaintIssue}" ได้รับการปรับปรุงสถานะเป็น: <strong>${newStatus}</strong></p><p>โรงพยาบาลหนองหานขอขอบพระคุณสำหรับข้อมูล</p>`
      });
    }
    
    // ส่งแจ้งเตือนเข้า LINE
    const lineMsg = `🔄 อัปเดตสถานะเรื่องร้องเรียน\n` +
                    `-----------------------------\n` +
                    `📌 เรื่อง: ${complaintIssue}\n` +
                    `📂 ประเภท: ${complaintType || '-'}\n` +
                    `📝 รายละเอียด: ${complaintDetail || '-'}\n` +
                    `👤 ผู้แจ้ง: ${userName}\n` +
                    `📊 สถานะใหม่: ${newStatus}\n` +
                    `-----------------------------\n` +
                    `🔗 ตรวจสอบรายละเอียด (Admin):\n${CONFIG.ADMIN_URL}`;
    sendLineNotify(lineMsg);
  } catch (e) {
    Logger.log('🔴 handleStatusChangeNotification error: ' + e.toString());
  }
}

function getSheet() {
  const ss = SpreadsheetApp.openById(CONFIG.SHEET_ID);
  let sheet = ss.getSheetByName(CONFIG.SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(CONFIG.SHEET_NAME);
    sheet.appendRow(['Timestamp', 'ประเด็น', 'ประเภท', 'รายละเอียด', 'ชื่อ-นามสกุล', 'เบอร์โทรศัพท์', 'ID Line', 'Email', 'สถานะ', 'หน่วยงานที่เกี่ยวข้อง', 'หมายเหตุ', 'ไฟล์แนบ']);
  }
  return sheet;
}

function findRowIndexByTimestamp(sheet, timestampISO) {
  const targetDate = new Date(timestampISO);
  if (isNaN(targetDate.getTime())) return -1;
  const format = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'";
  const targetFormatted = Utilities.formatDate(targetDate, "GMT", format);
  const data = sheet.getRange("A:A").getValues();
  for (let i = 1; i < data.length; i++) { 
    if (data[i][0]) {
      try {
        const rowDate = new Date(data[i][0]);
        if (!isNaN(rowDate.getTime())) {
          const rowFormatted = Utilities.formatDate(rowDate, "GMT", format);
          if (rowFormatted === targetFormatted) return i + 1; 
        }
      } catch (e) {}
    }
  }
  return -1; 
}
