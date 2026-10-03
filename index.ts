export {};


let shapeType: HTMLSelectElement;
let circleProps: HTMLElement;
let rectangleProps: HTMLElement;
let triangleProps: HTMLElement;
let radiusInput: HTMLInputElement;
let widthInput: HTMLInputElement;
let heightInput: HTMLInputElement;
let baseInput: HTMLInputElement;
let triangleHeightInput: HTMLInputElement;
let resultText: HTMLElement;
let resultCard: HTMLElement;

let allInputs: HTMLInputElement[];

const getElementById = (id: string): HTMLElement => {
    const element = document.getElementById(id);
    if (!element) {
        throw new Error(`Element not found: ${id}`);
    }
    return element;
};

const handleShapeTypeChange = (e: Event) => {
  e.preventDefault();
  clearInputFields();
  clearPreviousShapeForm();

  const userSelectedShape = e.target as HTMLSelectElement;
  const hasSelection = Boolean(userSelectedShape.value);
  toggleResultCard(hasSelection);
  displayShapeForm(userSelectedShape.value);
  
  updateResultText();
  
};

const clearInputFields = () => {
  allInputs.forEach(input => {
    input.value = "";
  });
};

const clearPreviousShapeForm = () => {
  [circleProps, rectangleProps, triangleProps].forEach(group => {
    group.classList.add("hidden");
});
};

const toggleResultCard = (hasSelection: boolean) => {
  if (hasSelection) {
    resultCard.classList.add("visible");
  } else {
    resultCard.classList.remove("visible");
  }
};

const displayShapeForm = (userSelectedShape: string) => {
  if(userSelectedShape === "circle") {
    circleProps.classList.remove("hidden");
  } else if (userSelectedShape === "rectangle") {
    rectangleProps.classList.remove("hidden");
  } else if (userSelectedShape === "triangle") {
    triangleProps.classList.remove("hidden");
  } 
};

const updateResultText = () => {
  const shapeTypeValue = shapeType.value;
  let result: string = "";

  if (shapeTypeValue === "circle") {
    const radius: number = Number(radiusInput.value);
    result = `Area of Circle: ${(Math.PI * radius ** 2).toFixed(2)}`;
  } else if (shapeTypeValue === "rectangle") {
    const width: number = Number(widthInput.value);
    const height: number = Number(heightInput.value);
    result = `Area of Rectangle: ${width * height}`;
  } else if (shapeTypeValue === "triangle") {
    const base: number = Number(baseInput.value);
    const height: number = Number(triangleHeightInput.value);
    result = `Area of Triangle: ${0.5 * base * height}`;
  } 

  resultText.textContent = result;
};

const initializeApp = () => {
    shapeType = getElementById("shape-type") as HTMLSelectElement;

    circleProps = getElementById("circle-props");
    rectangleProps = getElementById("rectangle-props");
    triangleProps = getElementById("triangle-props");

    radiusInput = getElementById("radius") as HTMLInputElement;
    widthInput = getElementById("width") as HTMLInputElement;
    heightInput = getElementById("height") as HTMLInputElement;
    baseInput = getElementById("base") as HTMLInputElement;
    triangleHeightInput = getElementById("triangle-height") as HTMLInputElement;

    resultCard = getElementById("result-card");
    resultText = getElementById("result-text");

    shapeType.oninput = handleShapeTypeChange;

    allInputs = [radiusInput, widthInput, heightInput, baseInput, triangleHeightInput];

    allInputs.forEach(input => {
      input.oninput = updateResultText;
    });
};


document.addEventListener("DOMContentLoaded", initializeApp);
