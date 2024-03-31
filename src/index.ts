import { BadorrieLogo } from "./components/BadorrieLogo";

const backgroundColor = { r: 26, g: 29, b: 34 };

document.body.style.backgroundColor = `rgb(${backgroundColor.r}, ${backgroundColor.g}, ${backgroundColor.b})`;

const element = document.getElementById("logo");
if (element) {
  new BadorrieLogo(0.2, backgroundColor, element);
} else {
  console.error("Element not found");
}
