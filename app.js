// Function to get video IDs from URL parameters
function getVideoIDs() {
    const params = new URLSearchParams(window.location.search);
    const v = params.get('v');
    return v ? v.split(',') : [];
}

// Function to open the headless popup immediately
function openHeadlessWindow() {
    const videoIDs = getVideoIDs();
    if (videoIDs.length === 0) {
        alert('No video IDs provided in the URL.');
        return;
    }

    // Construct the HTML for the popup content
    const popupContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>YouTube Headless Player</title>
        <style>
            body, html {
                margin: 0;
                padding: 0;
                width: 100%;
                height: 100%;
                overflow: hidden;
            }
            #player {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
            }
        </style>
        <script src="https://www.youtube.com/iframe_api"></script>
        <script>
            let player;
            let videoIDs = ${JSON.stringify(videoIDs)};
            let currentIndex = 0;

            function onYouTubeIframeAPIReady() {
                if (videoIDs.length > 0) {
                    player = new YT.Player('player', {
                        height: '100%',
                        width: '100%',
                        videoId: videoIDs[currentIndex],
                        events: {
                            'onStateChange': onPlayerStateChange
                        }
                    });
                }
            }

            function onPlayerStateChange(event) {
                if (event.data === YT.PlayerState.ENDED && currentIndex < videoIDs.length - 1) {
                    currentIndex++;
                    player.loadVideoById(videoIDs[currentIndex]);
                }
            }
        </script>
    </head>
    <body>
        <div id="player"></div>
    </body>
    </html>
    `;

    // Open the popup window with the player embedded
    const playerWindow = window.open('', 'YouTubePlayer', 'width=640,height=390,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no');
    playerWindow.document.write(popupContent);
    playerWindow.document.close();  // Close the document stream to start rendering
}

// Open the popup automatically when the page loads
window.onload = openHeadlessWindow;
