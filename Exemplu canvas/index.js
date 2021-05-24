const canvasElement = document.getElementById('canvas');
const canvasCtx = canvasElement.getContext('2d');

canvasCtx.fillRect(10, 10, 100, 100);
canvasCtx.clearRect(
  0,
  0,
  canvasElement.clientWidth,
  canvasElement.clientHeight
);
