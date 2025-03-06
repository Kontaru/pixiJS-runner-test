import "./style.css";
import { Application } from "pixi.js";
import { MediaRecorder, load } from "@zappar/mediarecorder";
import { Config } from "./scripts/game/Config";
import { App } from "./scripts/system/App";

const app = new Application();
await app.init({ background: "#1099bb", resizeTo: window });

App.run(Config);

await load();



document.body.appendChild(app.canvas);
const supported = MediaRecorder.isTypeSupported("video/mp4");
if (!supported) throw new Error("video/mp4 is not supported");

const stream = app.canvas.captureStream(30);
const chunks: Blob[] = [];
const recorder = new MediaRecorder(stream, { mimeType: "video/mp4" });

recorder.addEventListener("dataavailable", (event) => {
  if (event.data.size > 0) chunks.push(event.data);

});



recorder.start();

recorder.onstart = () => {
  console.log("start recorder", recorder);
  setTimeout(() => {
    console.log(recorder.stop);
    recorder.stop();
    console.log("stopping recorder", recorder);
  }, 5000);
}


const OnStop = () => {
  console.log("create recording");
  const blob = new Blob(chunks, { type: "video/mp4" });
  
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.style.display = "none";
  a.href = url;
  a.download = "pixijs-recording.mp4";
  document.body.appendChild(a);
  console.log("download recording");
  a.click();
}

// recorder.onstop = OnStop;
recorder.addEventListener("stop", OnStop)
