document.addEventListener('DOMContentLoaded', () => {

    const img = document.querySelector('#screen');
    const urlCreator = window.URL || window.webkitURL;
    const createObjectURL = urlCreator.createObjectURL;
    const revokeObjectURL = urlCreator.revokeObjectURL;

    let lastFrame = null;
    const updateFrame = function () {
        img.src = createObjectURL(lastFrame);
        lastFrame = null;
    }

    img.onload = function () {
        revokeObjectURL(img.src);
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
