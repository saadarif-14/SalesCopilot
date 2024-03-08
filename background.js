chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if(request.message === "consentGiven") {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            var currentTab = tabs[0];
            if(currentTab.url.includes("linkedin.com")) {
                // Use the Chrome cookies API to get cookies for LinkedIn
                chrome.cookies.getAll({domain: "linkedin.com"}, function(cookies) {
                    // Handle the cookies object as needed
                    console.log(cookies); 
                    alert("This is called", cookies);
// For demonstration; in real usage, handle appropriately
                });
            }
        });
        alert("Thank you for giving consent.");

        sendResponse({message: "success"});
    }
});
chrome.runtime.onInstalled.addListener(function(details) {
    if (details.reason === "install") {
        chrome.tabs.create({url: chrome.runtime.getURL("consent.html")});
    }
});

// Assuming this code runs after user consent is confirmed

// Function to fetch and print LinkedIn cookies
function fetchAndPrintLinkedInCookies() {
    chrome.cookies.getAll({url: "www.linkedin.com"}, function(cookies) {
        if (cookies.length === 0) {
            console.log("No cookies found for LinkedIn.");
            return;
        }
        
        console.log("LinkedIn Cookies:", cookies);
        // Optionally, loop through cookies and print specific details
        cookies.forEach(function(cookie) {
            console.log(`Name: ${cookie.name}, Value: ${cookie.value}, Domain: ${cookie.domain}`);
        });
    }, function(e) {
        console.error(e)
    } );
}

// Example usage:
// Call this function when appropriate in your extension's flow, such as after confirming user consent and detecting a successful LinkedIn login.
fetchAndPrintLinkedInCookies();
