# Speed Fighter PWA

A professional speed fighting game converted to a Progressive Web App (PWA) with offline capability.

## Features

- 🎮 **Full Game Experience**: Complete vector graphics fighting game
- 📱 **PWA Ready**: Installable on mobile/desktop
- 🌐 **Offline Play**: Works without internet after installation
- 🖥️ **Full Screen Landscape**: Optimized for landscape gameplay
- 🔥 **Boss Battles**: Fight powerful bosses at each level
- ⚡ **Fast Performance**: Smooth 60FPS gameplay

## Installation

### For Players:
1. Visit the game website on your device
2. Look for "Add to Home Screen" or "Install" option
3. Install the game
4. Play anytime, even offline!

### For Developers:
1. Clone this repository
2. Create game icons (192x192 and 512x512 PNG)
3. Place icons in the `icons/` folder
4. Host on any static web server
5. Game will auto-cache for offline use

## Game Controls

- **Joystick**: Drag to move your fighter
- **Red Button**: Shoot rapid bullets
- **Yellow Button**: Fire attack (area damage, 6s cooldown)
- **Green Button**: Dash (quick movement, 3s cooldown)

## Browser Support

- Chrome 60+
- Firefox 63+
- Safari 11.3+ (iOS 11.3+)
- Edge 79+

## Offline Functionality

The game caches all necessary files on first load. Once installed:
- Play without internet connection
- High scores saved locally
- All upgrades and progress saved

## Development

To modify the game:
- Edit `index.html` for game content
- Update `manifest.json` for PWA settings
- Modify `service-worker.js` for caching rules

## Credits

Game by Richard Nzembe
PWA Conversion for offline play

## License

This game is provided for personal use. All game assets and code are property of the original author.