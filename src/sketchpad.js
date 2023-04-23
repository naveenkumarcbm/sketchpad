import { downloadSketch } from "./download";
import { draw } from "./draw";

class Sketchpad {
  constructor(
    container = document.querySelector("#drwaContainer"),
    size = 500
  ) {
    this.canvas = document.createElement("canvas");
    this.canvas.height = size;
    this.canvas.width = size;
    container.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");
    this.#addEventListeners();
    this.session = Date.now();
  }
  paths = [];
  isDrawing = false;

  getBoundingRect() {
    return this.canvas.getBoundingClientRect();
  }

  getCanvasCoordinatesForTheEvent(evt) {
    const boundingRect = this.getBoundingRect();
    return [
      Math.round(evt.clientX - boundingRect.x),
      Math.round(evt.clientY - boundingRect.y),
    ];
  }

  #addEventListeners() {
    this.canvas.onpointerdown = (evt) => {
      const drawStartCoordinate = this.getCanvasCoordinatesForTheEvent(evt);
      // for multipath initializing the path array with array of arrays
      this.paths.push([drawStartCoordinate]);
      this.isDrawing = true;
    };

    this.canvas.onpointermove = (evt) => {
      if (this.isDrawing) {
        const drawCoOrdinates = this.getCanvasCoordinatesForTheEvent(evt);
        const currentPath = this.paths[this.paths.length - 1];
        currentPath.push(drawCoOrdinates);
        this.#redraw();
      }
    };
    this.canvas.onpointerup = () => {
      this.isDrawing = false;
    };

    // handling event listener ouside canvas
    document.onpointerup = () => {
      this.isDrawing = false;
    };

    // handle download
    document.querySelector("#download").addEventListener("click", () => {
      const student = document.querySelector("#student").value;
      const _sketchObj = {
        student,
        session: this.session,
        sketch: this.paths,
      };
      downloadSketch(_sketchObj, this.session);
      this.session = Date.now();
    });
  }

  #redraw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    draw.allPaths(this.ctx, this.paths);
  }
}

export default Sketchpad;
