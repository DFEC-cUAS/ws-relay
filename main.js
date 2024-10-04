document.addEventListener('DOMContentLoaded', () => {

    const img = document.querySelector('#screen');
    const urlCreator = window.URL || window.webkitURL;

    let lastFrame = null;
    const updateFrame = function () {
        img.src = urlCreator.createObjectURL(lastFrame);
        lastFrame = null;
    }

    img.onload = function () {
        urlCreator.revokeObjectURL(img.src);
    };

    const ws = new WebSocket('ws://' + window.location.host + '/ws');
    ws.onclose = () => ws.close();
    ws.onmessage = function (e) {
        if (!lastFrame) {
            requestAnimationFrame(updateFrame);
        }
        lastFrame = e.data;
    }
    ws.onerror = console.error;

}, false);
