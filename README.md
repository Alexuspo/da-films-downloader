# DA Films Downloader
<img width="500" height="500" alt="dflogonb" src="https://github.com/user-attachments/assets/7cf1f147-1f2b-4fd2-bbb7-2570ec97299e" />


Firefox extension to download videos from dafilms.cz.

## Installation

### From Firefox Add-ons

1. Install directly from [Firefox Add-ons](https://addons.mozilla.org/en-US/firefox/addon/da-films-downloader/)
2. Click "Add to Firefox" and confirm the permission prompt

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

## Disclaimer

DA Films Downloader is an open-source project licensed under MIT and its code is distributed for educational and personal use only.

By using this software, you agree to the following terms:

- The software is not intended to facilitate any form of illegal activity, including unauthorized downloading, copying, converting, or distribution of copyrighted material. The software must not be used to bypass, circumvent, or interfere with any digital rights management systems.

- Users are solely responsible for ensuring that their use of DA Films Downloader complies with all applicable laws in their respective jurisdiction.

- DA Films Downloader is not affiliated with, endorsed by, or associated with dafilms.cz or any other video streaming platforms. All mentioned services, trademarks, and images in use by this project remain the property of their respective owners.

- The developers and contributors assume no liability for any misuse of the software or its source code.

- DA Films Downloader is provided "as is", without warranties of any kind, expressed or implied. The software must not be used for commercial purposes without explicit permission.

## License

MIT License - see [LICENSE](LICENSE) file for details
