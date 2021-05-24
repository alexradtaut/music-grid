import RightHand from './rightHand.js';
export default class HandDetection {
  constructor(grid) {
    this.grid = grid;
  }
  init() {
    this.initializeElements();
    this.initializeHolistic();
    this.initializeCamera();
    this.rightHand = new RightHand(this.grid);
  }
  initializeElements() {
    this.videoElement = document.getElementById('video-input');
    this.canvasElement = document.getElementById('canvas-output');
    this.canvasCtx = this.canvasElement.getContext('2d');
  }
  initializeHolistic() {
    this.holistic = new Holistic({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/holistic/${file}`;
      },
    });
    this.holistic.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });
    this.holistic.onResults(this.onResults.bind(this));
  }
  initializeCamera() {
    const camera = new Camera(this.videoElement, {
      onFrame: async () => {
        await this.holistic.send({ image: this.videoElement });
      },
      width: 780,
      height: 439,
    });
    camera.start();
  }
  onResults(results) {
    this.canvasCtx.save();
    this.canvasCtx.clearRect(
      0,
      0,
      this.canvasElement.width,
      this.canvasElement.height
    );
    this.canvasCtx.drawImage(
      results.image,
      0,
      0,
      this.canvasElement.width,
      this.canvasElement.height
    );
    this.rightHand.updateLandmarks(results.rightHandLandmarks);
    this.rightHand.draw(this.canvasCtx);
    // drawConnectors(
    //   this.canvasCtx,
    //   results.leftHandLandmarks,
    //   HAND_CONNECTIONS,
    //   {
    //     color: '#CC0000',
    //     lineWidth: 5,
    //   }
    // );
    // drawLandmarks(this.canvasCtx, results.leftHandLandmarks, {
    //   color: '#00FF00',
    //   lineWidth: 2,
    // });
    // drawConnectors(
    //   this.canvasCtx,
    //   results.rightHandLandmarks,
    //   HAND_CONNECTIONS,
    //   {
    //     color: '#00CC00',
    //     lineWidth: 5,
    //   }
    // );
    // drawLandmarks(this.canvasCtx, results.rightHandLandmarks, {
    //   color: '#FF0000',
    //   lineWidth: 2,
    // });
    this.canvasCtx.restore();
  }
}
