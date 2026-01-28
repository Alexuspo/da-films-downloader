// Load and display detected videos
function loadVideos() {
  chrome.storage.local.get(['detectedVideos'], (result) => {
    const videos = result.detectedVideos || [];
    const container = document.getElementById('videos');
    container.innerHTML = '';

    if (videos.length === 0) {
      container.innerHTML = '<p>No videos detected yet.</p>';
      return;
    }

    videos.forEach((video, index) => {
      const item = document.createElement('div');
      item.className = 'video-item';

      const info = document.createElement('div');
      info.className = 'video-info';
      info.textContent = video.filename || video.url.split('/').pop();

      const button = document.createElement('button');
      button.textContent = 'Download';
      button.onclick = () => downloadVideo(video.url, video.filename);

      item.appendChild(info);
      item.appendChild(button);
      container.appendChild(item);
    });
  });
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