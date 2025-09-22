const { Plugin } = require('powercord/entities');
const { getModule, React } = require('powercord/webpack');
const { inject, uninject } = require('powercord/injector');

class AnimeBackgroundPlugin extends Plugin {
    async startPlugin() {
        this.addVideoBackground();
        this.injectMusicControls();
    }

    addVideoBackground() {
        // Create video element
        const video = document.createElement('video');
        video.id = 'anime-background-video';
        video.loop = true;
        video.muted = false;
        video.autoplay = true;
        
        // Add video source (using your YouTube music)
        const source = document.createElement('source');
        source.src = 'https://www.youtube.com/embed/L-nAGIdox9c?autoplay=1&loop=1&playlist=L-nAGIdox9c'; // You'll need to convert this to direct video URL
        source.type = 'video/mp4';
        video.appendChild(source);
        
        // Create music controls
        const controls = document.createElement('div');
        controls.id = 'anime-music-controls';
        controls.innerHTML = `
            <button id="music-toggle" style="background: #ff6bc9; border: none; border-radius: 50%; width: 40px; height: 40px; color: white; cursor: pointer;">♪</button>
            <input type="range" id="volume-control" min="0" max="100" value="50" style="margin-left: 10px; vertical-align: middle;">
        `;
        
        document.body.appendChild(video);
        document.body.appendChild(controls);
        
        // Add event listeners
        document.getElementById('music-toggle').addEventListener('click', () => {
            video.muted = !video.muted;
            document.getElementById('music-toggle').style.background = video.muted ? '#666' : '#ff6bc9';
        });
        
        document.getElementById('volume-control').addEventListener('input', (e) => {
            video.volume = e.target.value / 100;
        });
        
        this.video = video;
    }

    pluginWillUnload() {
        if (this.video) {
            this.video.remove();
        }
        const controls = document.getElementById('anime-music-controls');
        if (controls) {
            controls.remove();
        }
    }
}

module.exports = AnimeBackgroundPlugin;
