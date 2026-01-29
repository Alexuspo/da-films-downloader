// Load and display detected videos
function loadVideos() {
  chrome.storage.local.get(['detectedVideos'], (result) => {
    const videos = result.detectedVideos || [];
    const container = document.getElementById('videos');

    if (videos.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
            <path d="M9 9v6"/>
            <path d="M12 9v6"/>
          </svg>
          <div>No videos detected yet</div>
          <div style="font-size: 12px; margin-top: 4px;">Play a video on dafilms.cz to see it here</div>
        </div>
      `;
      return;
    }

    container.innerHTML = '';
    videos.forEach((video, index) => {
      const item = document.createElement('div');
      item.className = 'video-item';

      const icon = document.createElement('div');
      icon.className = 'video-icon';
      icon.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
      </svg>`;

      const info = document.createElement('div');
      info.className = 'video-info';
      info.innerHTML = `
        <div class="video-filename">${video.filename || video.url.split('/').pop()}</div>
        <div class="video-meta">${formatFileSize(video.size) || 'Unknown size'}</div>
      `;

      const button = document.createElement('button');
      button.className = 'download-btn';
      button.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
          <polyline points="7,10 12,15 17,10"/>
          <line x1="12" y1="15" x2="12" y2="3"/>
        </svg>
        Download
      `;
      button.onclick = () => downloadVideo(video.url, video.filename);

      item.appendChild(icon);
      item.appendChild(info);
      item.appendChild(button);
      container.appendChild(item);
    });
  });
}

// Format file size
function formatFileSize(bytes) {
  if (!bytes) return '';
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  if (bytes === 0) return '0 Bytes';
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
}

// Download video
function downloadVideo(url, filename) {
  chrome.downloads.download({
    url: url,
    filename: filename,
    saveAs: false
  });
}

// Clear list
document.getElementById('clear').addEventListener('click', () => {
  chrome.storage.local.set({ detectedVideos: [] }, () => {
    loadVideos();
  });
});

// Load videos on popup open
loadVideos();