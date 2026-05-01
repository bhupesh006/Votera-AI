import dotenv from 'dotenv';
dotenv.config();

async function testServices() {
    console.log("--- Testing Google Services ---");

    // Test Gemini
    const geminiKey = process.env.VITE_GEMINI_API_KEY;
    if (geminiKey) {
        console.log("✅ Gemini API Key found.");
        try {
            const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiKey}`;
            const res = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ contents: [{ parts: [{ text: "Hello" }] }] })
            });
            if (res.ok) console.log("✅ Gemini API Call: SUCCESS");
            else console.log("❌ Gemini API Call: FAILED", res.status);
        } catch (e) {
            console.log("❌ Gemini API Error:", e.message);
        }
    } else {
        console.log("❌ Gemini API Key NOT FOUND in .env");
    }

    // Test Firebase (Check if project ID is there)
    const firebaseId = process.env.VITE_FIREBASE_PROJECT_ID;
    if (firebaseId) {
        console.log(`✅ Firebase Project ID found: ${firebaseId}`);
    } else {
        console.log("❌ Firebase Project ID NOT FOUND in .env");
    }

    console.log("--- End of Test ---");
}

testServices();
