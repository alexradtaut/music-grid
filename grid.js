export class Grid {
  constructor(options) {
    this.rootId = options.rootId;
    this.noOfRows = options.noOfRows;
    this.noOfCells = options.noOfCells;
    this.rowClass = options.rowClass;
    this.cellClass = options.cellClass;
    this.gridContainer = document.getElementById(this.rootId);
    this.currentPlayedRow = 0;
    this.isPlaying = false;
  }

  init() {
    this.addDocumentMouseListeners();
    this.draw();
  }

  startPlaying(playBtn) {
    this.currentPlayedRow = 0;
    playBtn.innerText = 'Stop';
    this.isPlaying = true;
    this.play();
  }

  stopPlaying(playBtn) {
    playBtn.innerText = 'Play';
    this.isPlaying = false;
  }

  addPlayBtn() {
    const playBtn = document.createElement('div');
    playBtn.setAttribute('id', 'play-btn');
    playBtn.classList.add('grid-play-btn');
    playBtn.innerText = 'Play';
    playBtn.addEventListener('click', () => {
      if (this.isPlaying) {
        this.stopPlaying(playBtn);
      } else if (
        this.gridContainer.getElementsByClassName('grid-cell active').length > 0
      ) {
        this.startPlaying(playBtn);
      }
    });
    this.gridContainer.append(playBtn);
  }

  addResetBtn() {
    const resetBtn = document.createElement('div');
    resetBtn.classList.add('grid-reset-btn');
    resetBtn.innerText = 'Reset';
    resetBtn.addEventListener('click', () => {
      const cells =
        this.gridContainer.getElementsByClassName('grid-cell active');
      [...cells].forEach((cell) => {
        cell.classList.remove('active');
      });
      this.stopPlaying(document.getElementById('play-btn'));
    });
    this.gridContainer.append(resetBtn);
  }

  draw() {
    for (let i = 0; i < this.noOfRows; i++) {
      const row = document.createElement('div');
      row.classList.add(this.rowClass);
      this.addCellsToRow(row);
      this.gridContainer.append(row);
    }
    this.addPlayBtn();
    this.addResetBtn();
  }

  toggleCellState(cell) {
    cell.classList.toggle('active');
  }

  addCellsToRow(row) {
    for (let j = 0; j < this.noOfCells; j++) {
      const cell = document.createElement('div');
      cell.classList.add(this.cellClass);
      cell.addEventListener('click', () => {
        this.toggleCellState(cell);
      });
      cell.addEventListener('mouseenter', () => {
        if (this.isMouseDown) this.toggleCellState(cell);
      });
      row.append(cell);
    }
  }
  addDocumentMouseListeners() {
    document.addEventListener('mousedown', () => {
      this.isMouseDown = true;
    });
    document.addEventListener('mouseup', () => {
      this.isMouseDown = false;
    });
  }

  play() {
    if (!this.isPlaying) return;
    const row = this.gridContainer.getElementsByClassName(this.rowClass)[
      this.currentPlayedRow
    ];
    const cells = row.getElementsByClassName('grid-cell active');
    [...cells].forEach((cell) => {
      cell.classList.add('animate');
      setTimeout(() => cell.classList.remove('animate'), 400);
    });

    if (this.currentPlayedRow === this.noOfRows - 1) {
      this.currentPlayedRow = 0;
    } else {
      this.currentPlayedRow++;
    }

    setTimeout(() => this.play(), 400);
  }
}
