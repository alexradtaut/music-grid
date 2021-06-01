export default class LeftHand {
  constructor() {
    this.bpm = 50;
  }
  updateLandmarks(landmarks) {
    this.landmarks = landmarks;
    this.indexFinger = landmarks && landmarks[8];
    this.thumbFinger = landmarks && landmarks[4];
    this.updateBpm();
  }

  draw(ctx) {
    drawLandmarks(ctx, this.landmarks, {
      color: 'lightblue',
      lineWidth: 1,
    });
    this.writeBpmInfo(ctx);
  }
  writeBpmInfo(ctx) {
    if (!this.indexFinger) return;
    const { x, y } = this.indexFinger;
    ctx.save();
    ctx.fillStyle = 'lightblue';
    ctx.font = '15px Arial';
    ctx.fillText(`bpm: ${this.bpm}`, x * 780 - 55, y * 439 - 15);
    ctx.restore();
  }
  updateBpm() {
    if (!this.indexFinger && !this.thumbFinger) return;
    const { x: x1, y: y1 } = this.indexFinger;
    const { x: x2, y: y2 } = this.thumbFinger;
    const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    const maxDistance = 0.02;
    if (distance < maxDistance) {
      if (this.lastBpm) {
        if (y2 < this.lastBpm) {
          this.bpm++;
        } else {
          this.bpm--;
        }
      }
      this.lastBpm = y1;
    }
  }
}
