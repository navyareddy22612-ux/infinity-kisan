const apiKey = 'AIzaSyArwjyiNOVSQvX-jC4XXbjDq4LEWkEQ5wI';

async function testModels() {
    try {
        const modelsResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
        const modelsData = await modelsResponse.json();
        const generateModels = modelsData.models.filter(m => m.supportedGenerationMethods.includes('generateContent'));

        console.log(`Testing ${generateModels.length} models...`);

        for (const model of generateModels) {
            const modelName = model.name.split('/').pop();
            try {
                const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ contents: [{ parts: [{ text: 'hi' }] }] })
                });
                const data = await response.json();
                if (response.ok && !data.error) {
                    console.log(`✅ WORKING: ${modelName}`);
                    return; // Stop at first working model
                } else {
                    const errorMsg = data.error?.message || 'Unknown error';
                    console.log(`❌ FAILED: ${modelName} - ${errorMsg.substring(0, 50)}...`);
                }
            } catch (e) {
                console.log(`❌ ERROR: ${modelName} - ${e.message}`);
            }
        }
    } catch (e) {
        console.log(`Fetch failed: ${e.message}`);
    }
}

testModels();
