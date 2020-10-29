// Listen for chrome messages
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    // Fetch content of URL in request
    fetch(request.url).then(r => r.text()).then(result => {
        // Send response back to requester
        sendResponse({'content':result});
    });
    return true;
});