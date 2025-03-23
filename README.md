# KZ-Tiktok-Unfollow-Bot
🔥 **Automated Unfollowing Script for TikTok** 🔥 with sequence 

## 📌 About
This script automates the process of unfollowing users on TikTok using **Puppeteer**. It logs into your account, navigates to your following list, and systematically unfollows users at a randomized speed to mimic human behavior.

## ⚠ Disclaimer
This script is for **educational purposes only**. Automating TikTok actions may violate its terms of service. Use at your own risk.

---

## 🚀 Features
✅ Fully **headless** mode for stealth operation  
✅ **Stealth plugin** to bypass bot detection  
✅ **Randomized delays** to avoid detection  
✅ **Handles different login methods** (email, username)  
✅ **Auto-scrolls and continues unfollowing**

---

## 📦 Installation

### 1️⃣ Clone Repository
```bash
git clone https://github.com/yourusername/KZ-TikTok-Unfollow.git
cd KZ-TikTok-Unfollow
```

### 2️⃣ Install Dependencies
```bash
npm install puppeteer-extra puppeteer-extra-plugin-stealth puppeteer readline-sync chalk figlet
```

---

## 🔧 Usage

Run the script with:
```bash
node Kzunfollow.js
```

You'll be prompted to enter:
- **TikTok Email/Username**
- **Password** (hidden input for security)
- **Number of people to unfollow**
- **Minimum delay (ms)** between actions
- **Maximum delay (ms)** between actions

The bot will log in and start unfollowing users based on your input.

---

## 🛠 Troubleshooting
### Common Issues & Fixes
❌ **Timeout Error on Login**  
✔ **Fix:** Increase the timeout in `page.goto()` or check if TikTok changed its login method.  

❌ **Puppeteer not found**  
✔ **Fix:** Run `npm install` again.

❌ **Blocked or CAPTCHA Requested**  
✔ **Fix:** Log in manually and complete verification, then run the script again.

---

## 🔥 Support
For any issues, open an [issue](https://github.com/yourusername/KZ-TikTok-Unfollow/issues) on GitHub.

---

## 📜 License
This project is licensed under the **MIT License**.

