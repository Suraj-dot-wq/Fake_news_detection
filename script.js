// --- Core Faux-Detection Logic (Client-Side Simulation) ---

/**
 * Checks the news text based on a very simple keyword analysis.
 * In a real-world scenario, this would be an API call to a server
 * running a Machine Learning model (e.g., NLP).
 * * @param {string} text The news text to analyze.
 * @returns {object} An object containing the result: {isFake: boolean, reason: string}
 */
function simpleKeywordCheck(text) {
    const lowerText = text.toLowerCase();

    // 1. High-Suspicion Keywords (Clickbait/Sensationalism)
    const fakeKeywords = [
        "shocking", "you won't believe", "secret truth", "exposed", 
        "must see", "emergency warning", "breaking now", "the liberal agenda"
    ];
    
    // 2. High-Credibility Keywords (Typically associated with verified sources)
    const realKeywords = [
        "according to cdc", "white house report", "official statement",
        "peer-reviewed study", "federal reserve", "statistical data"
    ];
    
    let fakeScore = 0;
    let realScore = 0;

    // Check for fake keywords
    for (const keyword of fakeKeywords) {
        if (lowerText.includes(keyword)) {
            fakeScore++;
        }
    }

    // Check for real keywords
    for (const keyword of realKeywords) {
        if (lowerText.includes(keyword)) {
            realScore++;
        }
    }

    // Determine the result based on the scores
    if (fakeScore > realScore && fakeScore >= 2) {
        return { 
            resultClass: 'fake', 
            title: '❌ HIGHLY SUSPICIOUS', 
            text: 'This text contains sensational and common clickbait phrases. *Verify the source and claims immediately.* (Faux-ML Score: ' + fakeScore + ')' 
        };
    } else if (realScore > fakeScore || text.length > 100) {
        // Longer text is often more detailed (a proxy for better reporting)
        return { 
            resultClass: 'real', 
            title: '✅ MODERATE RELIABILITY', 
            text: 'The language seems non-sensational and may contain references to official bodies. *Always check the source and citations.* (Faux-ML Score: ' + realScore + ')' 
        };
    } else {
        return { 
            resultClass: 'neutral', 
            title: '⚠ ANALYSIS INCONCLUSIVE', 
            text: 'The text is too short, generic, or contains a mix of keywords. *Further analysis is required.* (Faux-ML Score: Low)' 
        };
    }
}


// --- DOM Manipulation ---

function checkNews() {
    const newsInput = document.getElementById('newsInput');
    const resultBox = document.getElementById('resultBox');
    const resultTitle = document.getElementById('resultTitle');
    const resultText = document.getElementById('resultText');
    
    const text = newsInput.value.trim();
    
    // Reset/Clear Previous Results
    resultBox.className = 'result neutral';
    resultTitle.textContent = '... Analyzing ...';
    resultText.textContent = '';

    if (text === "") {
        resultTitle.textContent = 'Please Enter Text';
        resultText.textContent = 'The input field cannot be empty.';
        return;
    }

    // Run the faux-detection algorithm
    const analysis = simpleKeywordCheck(text);

    // Apply results to the DOM
    // The class 'real' or 'fake' determines the styling (color/border)
    resultBox.className = 'result ' + analysis.resultClass; 
    resultTitle.textContent = analysis.title;
    resultText.innerHTML = analysis.text;
    
    // Clear the input after processing (optional)
    newsInput.value = ''; 
}