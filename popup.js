document.getElementById('consentYes').addEventListener('click', function() {
    // Store consent status
    chrome.storage.local.set({consentGiven: true}, function() {
        document.getElementById('consent').style.display = 'none';
        // Check if the user is logged in to LinkedIn
        checkLoginStatus();
    });
});

document.getElementById('consentNo').addEventListener('click', function() {
    // Handle the case where consent is not given
    alert('Consent not given. The extension will not access your LinkedIn cookies.');
});

document.getElementById('getCookies').addEventListener('click', () => {
    chrome.runtime.sendMessage({action: "getLinkedInCookies"}, function(response) {
        console.log("LinkedIn Cookies:", response);
    });
});

document.getElementById('loginLinkedIn').addEventListener('click', () => {
    // Redirect user to LinkedIn login page
    chrome.tabs.create({url: "https://www.linkedin.com/login"});

    

});

// Function to check if user is logged into LinkedIn
function checkLoginStatus() {
    chrome.cookies.get({url: "https://www.linkedin.com", name: "li_at"}, function(cookie) {
        alert(cookie)
        if (cookie) {
            document.getElementById('getCookies').style.display = 'block';
        } else {
            document.getElementById('loginLinkedIn').style.display = 'block';
        }
    });
}

// On popup load, check if consent has been given

