export const downloadSketch = (sketchPadObj, id) => {
  const downloadAnchorNode = document.createElement("a");
  const sketchPadObjURL =
    "data:text/json;charset=utf-8," +
    encodeURIComponent(JSON.stringify(sketchPadObj));
  downloadAnchorNode.setAttribute("href", sketchPadObjURL);
  downloadAnchorNode.setAttribute("download", id + ".json");
  document.body.appendChild(downloadAnchorNode); // required for firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
};
