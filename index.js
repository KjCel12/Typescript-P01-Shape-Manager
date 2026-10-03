let shapeType;
let circleProps;
let rectangleProps;
let triangleProps;
let radiusInput;
let widthInput;
let heightInput;
let baseInput;
let triangleHeightInput;
let resultText;
let resultCard;
let allInputs;
const getElementById = (id) => {
    const element = document.getElementById(id);
    if (!element) {
        throw new Error(`Element not found: ${id}`);
    }
    return element;
};
const handleShapeTypeChange = (e) => {
    e.preventDefault();
    clearInputFields();
    clearPreviousShapeForm();
    const userSelectedShape = e.target;
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
const toggleResultCard = (hasSelection) => {
    if (hasSelection) {
        resultCard.classList.add("visible");
    }
    else {
        resultCard.classList.remove("visible");
    }
};
const displayShapeForm = (userSelectedShape) => {
    if (userSelectedShape === "circle") {
        circleProps.classList.remove("hidden");
    }
    else if (userSelectedShape === "rectangle") {
        rectangleProps.classList.remove("hidden");
    }
    else if (userSelectedShape === "triangle") {
        triangleProps.classList.remove("hidden");
    }
};
const updateResultText = () => {
    const shapeTypeValue = shapeType.value;
    let result = "";
    if (shapeTypeValue === "circle") {
        const radius = Number(radiusInput.value);
        result = `Area of Circle: ${(Math.PI * radius ** 2).toFixed(2)}`;
    }
    else if (shapeTypeValue === "rectangle") {
        const width = Number(widthInput.value);
        const height = Number(heightInput.value);
        result = `Area of Rectangle: ${width * height}`;
    }
    else if (shapeTypeValue === "triangle") {
        const base = Number(baseInput.value);
        const height = Number(triangleHeightInput.value);
        result = `Area of Triangle: ${0.5 * base * height}`;
    }
    resultText.textContent = result;
};
const initializeApp = () => {
    shapeType = getElementById("shape-type");
    circleProps = getElementById("circle-props");
    rectangleProps = getElementById("rectangle-props");
    triangleProps = getElementById("triangle-props");
    radiusInput = getElementById("radius");
    widthInput = getElementById("width");
    heightInput = getElementById("height");
    baseInput = getElementById("base");
    triangleHeightInput = getElementById("triangle-height");
    resultCard = getElementById("result-card");
    resultText = getElementById("result-text");
    shapeType.oninput = handleShapeTypeChange;
    allInputs = [radiusInput, widthInput, heightInput, baseInput, triangleHeightInput];
    allInputs.forEach(input => {
        input.oninput = updateResultText;
    });
};
document.addEventListener("DOMContentLoaded", initializeApp);
export {};
