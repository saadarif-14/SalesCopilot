document.getElementById('agree').addEventListener('click', function() {
    chrome.storage.local.set({consentGiven: true}, function() {
        chrome.runtime.sendMessage({message: "consentGiven"})
        // alert('Thank you for your consent.');
        // window.close(); // Close the consent tab
    });
});

document.getElementById('disagree').addEventListener('click', function() {
    chrome.storage.local.set({consentGiven: false}, function() {
        alert('You have not given your consent. The extension will be limited.');
        window.close(); // Close the consent tab
    });
});
chrome.cookies.getAll({domain: "linkedin.com"}, function(cookies) {
    // Send cookies to popup
    chrome.runtime.sendMessage({message: "cookiesRetrieved", cookies: cookies});
});

