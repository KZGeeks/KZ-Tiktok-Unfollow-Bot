const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const readlineSync = require("readline-sync");
const chalk = require("chalk");
const figlet = require("figlet");

puppeteer.use(StealthPlugin());

// Display a stylish banner
console.log(chalk.blueBright(figlet.textSync("KZ Degenerate", { horizontalLayout: "fitted" })));
console.log(chalk.green.bold("🔥 TikTok Auto-Unfollow Script 🔥"));
console.log(chalk.yellow("⚡ Developed by KZ Degenerate"));
console.log(chalk.cyan("📢 Automating with Puppeteer - Stay Safe!\n"));

// User inputs
const email = readlineSync.question("📧 Enter your TikTok email: ");
const password = readlineSync.question("🔑 Enter your TikTok password: ", { hideEchoBack: true });
const maxUnfollows = parseInt(readlineSync.question("🤖 How many people do you want to unfollow? "), 10);
const minSpeed = parseInt(readlineSync.question("🐢 Enter minimum delay (ms) between actions: "), 10);
const maxSpeed = parseInt(readlineSync.question("⚡ Enter maximum delay (ms) between actions: "), 10);

const TIKTOK_URL = "https://www.tiktok.com/login";

// Random delay function
const delay = (min, max) => new Promise(resolve => setTimeout(resolve, Math.random() * (max - min) + min));

(async () => {
    const browser = await puppeteer.launch({
        headless: true,  // Headless mode enabled
        args: [
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--disable-blink-features=AutomationControlled",
            "--disable-infobars",
            "--window-size=1280,800"
        ]
    });

    const page = await browser.newPage();

    // Set a mobile-like user agent to bypass bot detection
    await page.setUserAgent("Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Mobile Safari/537.36");
    
    // Go to TikTok login page with increased timeout
    console.log(chalk.magentaBright("\n🚀 Logging into TikTok..."));
    await page.goto(TIKTOK_URL, { waitUntil: "networkidle2", timeout: 90000 });

    // **Handle login popup variations**
    try {
        console.log(chalk.yellow("🔍 Checking for login form..."));

        // Wait for either the "email login" or "username login" field
        await Promise.race([
            page.waitForXPath('//input[@type="text"]', { timeout: 30000 }),
            page.waitForXPath('//input[@name="username"]', { timeout: 30000 }),
            page.waitForXPath('//input[@name="email"]', { timeout: 30000 })
        ]);

        console.log(chalk.green("✅ Login form found!"));

        // Check which input field exists
        let emailInput = await page.$x('//input[@type="text"] | //input[@name="email"] | //input[@name="username"]');
        if (emailInput.length > 0) {
            await emailInput[0].type(email, { delay: 100 });
        }

        // Type password
        let passwordInput = await page.$x('//input[@type="password"]');
        if (passwordInput.length > 0) {
            await passwordInput[0].type(password, { delay: 100 });
        }

        // Click login button
        let loginButton = await page.$x('//button[@type="submit"]');
        if (loginButton.length > 0) {
            await loginButton[0].click();
        }

        console.log(chalk.blue("🔄 Waiting for login confirmation..."));
        await page.waitForNavigation({ waitUntil: "networkidle2", timeout: 90000 });

        console.log(chalk.greenBright("✅ Logged in successfully!"));

    } catch (error) {
        console.error(chalk.red("❌ Login failed! Please check your credentials."));
        await browser.close();
        process.exit(1);
    }

    // Navigate to Following page
    await page.goto("https://www.tiktok.com/following", { waitUntil: "networkidle2", timeout: 90000 });
    await page.waitForSelector("div[title='Following']", { visible: true });

    console.log(chalk.cyan("\n🔄 Scanning for accounts to unfollow..."));
    let unfollowCount = 0;

    while (unfollowCount < maxUnfollows) {
        await page.waitForSelector('button[data-e2e="follow-button"]', { visible: true });
        const buttons = await page.$$('button[data-e2e="follow-button"]');
        
        if (buttons.length === 0) {
            console.log(chalk.red("\n🚨 No more people to unfollow."));
            break;
        }

        for (let button of buttons) {
            if (unfollowCount >= maxUnfollows) break;

            const buttonText = await page.evaluate(el => el.innerText, button);
            if (buttonText.toLowerCase().includes("following")) {
                console.log(chalk.yellow(`\n👋 Unfollowing user ${unfollowCount + 1}...`));
                await button.click();
                await page.waitForSelector("button[data-e2e='confirm-button']", { visible: true });
                const confirmBtn = await page.$("button[data-e2e='confirm-button']");
                if (confirmBtn) await confirmBtn.click();

                unfollowCount++;
                await delay(minSpeed, maxSpeed);
            }
        }

        await page.evaluate(() => window.scrollBy(0, 500));
        await delay(minSpeed, maxSpeed);
    }

    console.log(chalk.green(`\n✅ Successfully unfollowed ${unfollowCount} users. Exiting...`));
    await browser.close();
})();
