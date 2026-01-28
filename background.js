chrome.runtime.onMessage.addListener((message) => {
  if (message.action === 'download') {
    addVideoToList(message.url, message.type);
  }
});

// Monitor all network requests for videos
chrome.webRequest.onCompleted.addListener(
  (details) => {
    if (isVideoRequest(details)) {
      addVideoToList(details.url, 'network');
    }
  },
  { urls: ["<all_urls>"] },
  ["responseHeaders"]
);

function isVideoRequest(details) {
  const url = details.url;

  // Check URL for video extensions
  const videoExtensions = ['.mp4', '.avi', '.mkv', '.webm', '.m3u8', '.ts', '.mov', '.wmv', '.flv'];
  const hasVideoExt = videoExtensions.some(ext => url.includes(ext));

  // Check content-type
  let hasVideoContentType = false;
  if (details.responseHeaders) {
    const contentType = details.responseHeaders.find(h => h.name.toLowerCase() === 'content-type');
    if (contentType && contentType.value.startsWith('video/')) {
      hasVideoContentType = true;
    }
  }

  return hasVideoExt || hasVideoContentType;
}

function addVideoToList(url, type) {
  chrome.storage.local.get(['detectedVideos'], (result) => {
    const videos = result.detectedVideos || [];
    
    // Check if already exists
    if (videos.some(v => v.url === url)) {
      return;
    }

    // Extract filename
    const urlObj = new URL(url);
    const pathname = urlObj.pathname;
    const filename = pathname.split('/').pop() || 'video.mp4';

    videos.push({ url, filename, type, detectedAt: Date.now() });

    // Keep only last 10 videos
    if (videos.length > 10) {
      videos.shift();
    }

    chrome.storage.local.set({ detectedVideos: videos });
  });
}