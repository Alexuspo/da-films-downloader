// Monitor video resources using Performance API
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    if (isVideoResource(entry)) {
      chrome.runtime.sendMessage({
        action: 'download',
        url: entry.name,
        type: entry.initiatorType
      });
    }
  }
});

observer.observe({ entryTypes: ['resource'] });

// Also check existing entries that were loaded before the script ran
const existingEntries = performance.getEntriesByType('resource');
existingEntries.forEach((entry) => {
  if (isVideoResource(entry)) {
    chrome.runtime.sendMessage({
      action: 'download',
      url: entry.name,
      type: entry.initiatorType
    });
  }
});

function isVideoResource(entry) {
  // Check if URL contains video extensions
  const videoExtensions = ['.mp4', '.avi', '.mkv', '.webm', '.m3u8', '.ts', '.mov', '.wmv', '.flv'];
  const hasVideoExt = videoExtensions.some(ext => entry.name.includes(ext));

  // Check if it's a video element request
  const isVideoInitiator = entry.initiatorType === 'video' || entry.initiatorType === 'audio';

  // Check for large files that might be videos
  const isLargeFile = entry.transferSize > 1000000; // 1MB+

  return hasVideoExt || isVideoInitiator || (isLargeFile && entry.name.match(/\.(mp4|avi|mkv|webm|m3u8|ts|mov|wmv|flv)/i));
}

// Also monitor for video elements being added to the page
const videoObserver = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      if (node.tagName === 'VIDEO' && node.src) {
        chrome.runtime.sendMessage({
          action: 'download',
          url: node.src,
          type: 'video_element'
        });
      } else if (node.tagName === 'SOURCE' && node.parentElement.tagName === 'VIDEO' && node.src) {
        chrome.runtime.sendMessage({
          action: 'download',
          url: node.src,
          type: 'video_source'
        });
      }
    });
  });
});

videoObserver.observe(document.body, {
  childList: true,
  subtree: true
});

// Check for existing video elements on page load
document.addEventListener('DOMContentLoaded', () => {
  const videos = document.querySelectorAll('video');
  videos.forEach((video) => {
    if (video.src) {
      chrome.runtime.sendMessage({
        action: 'download',
        url: video.src,
        type: 'existing_video'
      });
    }
    const sources = video.querySelectorAll('source');
    sources.forEach((source) => {
      if (source.src) {
        chrome.runtime.sendMessage({
          action: 'download',
          url: source.src,
          type: 'existing_source'
        });
      }
    });
  });
});