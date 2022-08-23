const audioPlayer = document.querySelector(".audio-player");

document.querySelector("input").addEventListener("change", function () {
    audioPlayer.src = window.URL.createObjectURL(this.files[0]);
    start();
  }
);

const canvas = document.querySelector("canvas");
canvas.width = 511;
canvas.height = 255;

const ctx = canvas.getContext("2d");

const start = () => {
  const audioContext = new AudioContext();

  const analyser = audioContext.createAnalyser();
  analyser.smoothingTimeConstant = 0;
  analyser.fftSize = 1024;
  
  const dataArray = new Uint8Array(analyser.frequencyBinCount);

  const source = audioContext.createMediaElementSource(audioPlayer);
  source.connect(analyser);
  source.connect(audioContext.destination);

  const draw = () => {
    analyser.getByteTimeDomainData(dataArray);
    //analyser.getByteFrequencyData(dataArray);
  
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.moveTo(0, dataArray[0]);
    for (let i = 1; i < analyser.frequencyBinCount; i++) {
      ctx.lineTo(i, dataArray[i]);
    };
    ctx.stroke();
  
    requestAnimationFrame(draw);
  };
  
  draw();
};
