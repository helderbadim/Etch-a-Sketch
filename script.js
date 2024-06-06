"use strict";

const numbSquares = 



const createMultipleDivs = function (parentID, divs) {
  const container = document.getElementById(parentID);
  for (i = 0; i <= divs; i++) {
    const content = document.createElement("div");
    content.style.backgroundColor = "blue";
    content.classList.add("squares");
    return container.appendChild(content);
  }
};

createMultipleDivs("container", 16);
