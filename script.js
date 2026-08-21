function renderMath(element, source, displayMode = false) {
  window.katex.render(source, element, {
    displayMode,
    output: "htmlAndMathml",
    throwOnError: false,
  });
}

if (window.katex) {
  document.querySelectorAll("[data-tex]").forEach((equation) => {
    renderMath(equation, equation.dataset.tex, true);
  });

  document.querySelectorAll(".essay var").forEach((variable) => {
    renderMath(variable, variable.textContent);
  });

  document.querySelectorAll("[data-math]").forEach((label) => {
    renderMath(label, label.dataset.math);
  });

  const vectorSymbols = {
    "x̂": "\\hat{x}",
    "ŷ": "\\hat{y}",
    "ê": "\\hat{e}",
  };

  document.querySelectorAll(".chatbot strong:not(.term)").forEach((symbol) => {
    renderMath(symbol, vectorSymbols[symbol.textContent] || symbol.textContent);
  });
} else {
  document.querySelectorAll("[data-tex]").forEach((equation) => {
    equation.textContent = equation.dataset.tex;
  });

  document.querySelectorAll("[data-math]").forEach((label) => {
    label.textContent = label.dataset.math;
  });
}
