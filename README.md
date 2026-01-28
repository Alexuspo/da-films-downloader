# DA Films Downloader

Firefox extension to download videos from dafilms.cz.

## Installation

### From Source

1. Clone this repository
2. Open Firefox and go to `about:debugging`
3. Click "This Firefox" on the left
4. Click "Load Temporary Add-on..."
5. Select the `manifest.json` file from this folder

### From Release

1. Download the latest `.xpi` file from [Releases](https://github.com/yourusername/da-films-downloader/releases)
2. Open Firefox and go to `about:addons`
3. Drag and drop the `.xpi` file into Firefox

## Building

To create a `.xpi` file for distribution:

```bash
npm install
npm run build
```

This will create `da-films-downloader.xpi` in the project root.

## Usage

1. Navigate to dafilms.cz (any page or subpage).
2. The extension automatically detects video streams and adds them to the popup list.
3. Click the extension icon to open the popup.
4. Click "Download" next to any detected video to download it.
5. Use "Clear List" to remove all detected videos.

## How it works

The extension monitors network requests and page content for video files. Detected videos are stored locally and displayed in the popup for manual download.

## Notes

- Works on all pages under dafilms.cz and detects videos from external sources
- Videos are not downloaded automatically - you choose which ones to download
- Downloads are saved to your default download folder
- List keeps up to 10 most recent videos

## License

MIT License - see [LICENSE](LICENSE) file for details
