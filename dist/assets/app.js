(() => {
  const root = document.querySelector("[data-sma-demo]");
  if (!root) return;

  const shortInput = document.querySelector("#short-window");
  const longInput = document.querySelector("#long-window");
  const svg = document.querySelector("#sma-chart");
  const summary = document.querySelector("#signal-summary");
  const namespace = "http://www.w3.org/2000/svg";

  // Deterministic, browser-generated prices used only to explain moving averages.
  const prices = Array.from({ length: 48 }, (_, i) =>
    45 + i * 0.42 + Math.sin(i * 0.42) * 5 + Math.sin(i * 1.23) * 1.5 - Math.max(0, i - 31) * 0.48
  );

  function movingAverage(values, windowSize) {
    return values.map((_, index) => {
      if (index + 1 < windowSize) return null;
      const sample = values.slice(index - windowSize + 1, index + 1);
      return sample.reduce((sum, value) => sum + value, 0) / windowSize;
    });
  }

  function svgElement(name, attributes = {}) {
    const node = document.createElementNS(namespace, name);
    Object.entries(attributes).forEach(([key, value]) => node.setAttribute(key, value));
    return node;
  }

  function draw() {
    const shortWindow = Number(shortInput.value);
    const longWindow = Number(longInput.value);
    if (!Number.isInteger(shortWindow) || !Number.isInteger(longWindow) || shortWindow < 2 || longWindow < 3 || shortWindow >= longWindow) {
      summary.textContent = "請輸入至少 2 期的短期均線，且短期期間要小於長期期間。";
      return;
    }

    const fast = movingAverage(prices, shortWindow);
    const slow = movingAverage(prices, longWindow);
    const all = [...prices, ...fast.filter(Number.isFinite), ...slow.filter(Number.isFinite)];
    const min = Math.min(...all) - 2;
    const max = Math.max(...all) + 2;
    const width = 760;
    const height = 300;
    const left = 22;
    const right = 12;
    const top = 16;
    const bottom = 24;
    const x = (index) => left + (index / (prices.length - 1)) * (width - left - right);
    const y = (value) => top + ((max - value) / (max - min)) * (height - top - bottom);

    svg.replaceChildren();
    const title = svgElement("title", { id: "chart-title" });
    title.textContent = `合成價格和 ${shortWindow} 期、${longWindow} 期移動平均線`;
    const desc = svgElement("desc", { id: "chart-description" });
    desc.textContent = "由瀏覽器生成的合成教學資料，並非真實市場價格。圖中價格線為白色，短期平均線為綠色，長期平均線為藍色。";
    svg.append(title, desc);

    for (let line = 0; line < 4; line += 1) {
      const yPosition = top + (line / 3) * (height - top - bottom);
      svg.append(svgElement("line", { x1: left, x2: width - right, y1: yPosition, y2: yPosition, class: "chart-gridline" }));
    }

    const pathFor = (values) => values.map((value, index) => value === null ? null : `${index === 0 || values[index - 1] === null ? "M" : "L"}${x(index).toFixed(1)},${y(value).toFixed(1)}`).filter(Boolean).join(" ");
    svg.append(svgElement("path", { d: pathFor(prices), class: "chart-line chart-price" }));
    svg.append(svgElement("path", { d: pathFor(fast), class: "chart-line chart-fast" }));
    svg.append(svgElement("path", { d: pathFor(slow), class: "chart-line chart-slow" }));

    let crossovers = 0;
    for (let index = 1; index < prices.length; index += 1) {
      if (fast[index] === null || slow[index] === null || fast[index - 1] === null || slow[index - 1] === null) continue;
      const previousDifference = fast[index - 1] - slow[index - 1];
      const currentDifference = fast[index] - slow[index];
      if (previousDifference * currentDifference < 0) {
        crossovers += 1;
        svg.append(svgElement("circle", { cx: x(index), cy: y(prices[index]), r: 4.5, class: "chart-cross" }));
      }
    }

    const latest = fast.at(-1) > slow.at(-1) ? "短期均線在長期均線上方" : "短期均線在長期均線下方";
    summary.textContent = `最後一個示意點：${latest}；圖中可見 ${crossovers} 次均線交叉。`;
  }

  [shortInput, longInput].forEach((input) => input.addEventListener("input", draw));
  draw();
})();

