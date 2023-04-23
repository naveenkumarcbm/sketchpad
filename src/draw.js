export const draw = {};

const pathChecker = (ary = []) => {
  if (!ary.length) {
    return;
  }
};

draw.paint = (ctx, path = []) => {
  pathChecker(path);
  ctx.strokeStyle = "#000000";
  ctx.lineWidth = "4px";
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(...path[0]);
  for (let index = 1; index < path.length; index++) {
    ctx.lineTo(...path[index]);
    ctx.stroke();
  }
};

draw.allPaths = (ctx, paths = []) => {
  pathChecker(paths);
  paths.forEach((path) => draw.paint(ctx, path));
};
