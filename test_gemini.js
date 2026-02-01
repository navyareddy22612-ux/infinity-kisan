const apiKey = 'AIzaSyArwjyiNOVSQvX-jC4XXbjDq4LEWkEQ5wI';

async function testModel(model, version = 'v1beta') {
    console.log(`Testing ${model} on ${version}...`);
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/${version}/models/${model}:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts: [{ text: 'hi' }] }] })
        });
        const data = await response.json();
        if (data.error) {
            console.log(`  Error: ${data.error.message}`);
            return false;
        }
        console.log(`  Success!`);
        return true;
    } catch (e) {
        console.log(`  Fetch failed: ${e.message}`);
        return false;
    }
}

async function run() {
    await testModel('gemini-1.5-flash', 'v1beta');
    await testModel('gemini-1.5-flash', 'v1');
    await testModel('gemini-1.0-pro', 'v1beta');
    await testModel('gemini-pro', 'v1');
}

run();
