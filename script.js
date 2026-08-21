const canvas = document.querySelector("#vector-plot");

if (canvas) {
  const context = canvas.getContext("2d");

  function drawArrow(fromX, fromY, toX, toY, color, width = 2) {
    const angle = Math.atan2(toY - fromY, toX - fromX);
    const head = 13;

    context.beginPath();
    context.moveTo(fromX, fromY);
    context.lineTo(toX, toY);
    context.strokeStyle = color;
    context.lineWidth = width;
    context.stroke();

    context.beginPath();
    context.moveTo(toX, toY);
    context.lineTo(
      toX - head * Math.cos(angle - Math.PI / 7),
      toY - head * Math.sin(angle - Math.PI / 7),
    );
    context.lineTo(
      toX - head * Math.cos(angle + Math.PI / 7),
      toY - head * Math.sin(angle + Math.PI / 7),
    );
    context.closePath();
    context.fillStyle = color;
    context.fill();
  }

  function drawPlot() {
    const width = canvas.clientWidth;
    const height = Math.round(width * 0.46);
    const scale = window.devicePixelRatio || 1;

    canvas.style.height = `${height}px`;
    canvas.width = Math.round(width * scale);
    canvas.height = Math.round(height * scale);
    context.setTransform(scale, 0, 0, scale, 0, 0);
    context.clearRect(0, 0, width, height);

    const ink = "#344650";
    const guide = "#a9bdc8";
    const vector = "#f06a24";
    const originX = width * 0.2;
    const originY = height * 0.78;
    const pointX = width * 0.69;
    const pointY = height * 0.18;

    drawArrow(originX, originY, width * 0.88, originY, ink, 1.5);
    drawArrow(originX, originY, originX, height * 0.08, ink, 1.5);

    context.setLineDash([8, 8]);
    context.strokeStyle = guide;
    context.lineWidth = 1.4;
    context.beginPath();
    context.moveTo(pointX, pointY);
    context.lineTo(pointX, originY);
    context.lineTo(originX, originY);
    context.lineTo(originX, pointY);
    context.lineTo(pointX, pointY);
    context.stroke();
    context.setLineDash([]);

    drawArrow(originX, originY, pointX, pointY, vector, 2.8);

    context.fillStyle = ink;
    context.font = `${Math.max(17, width * 0.026)}px Georgia, serif`;
    context.fillText("O", originX - 26, originY + 30);
    context.fillText("3", pointX - 6, originY + 31);
    context.fillText("7", originX - 29, pointY + 7);
    context.fillText("x", width * 0.9, originY + 7);
    context.fillText("y", originX - 5, height * 0.06);
    context.fillStyle = vector;
    context.fillText("v = (3, 7)", pointX + 18, pointY - 8);
  }

  drawPlot();
  window.addEventListener("resize", drawPlot, { passive: true });
}
