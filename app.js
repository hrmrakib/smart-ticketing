// utilities function
function setBackgroundColor(elementId) {
  let element = document.getElementById(elementId);
  element.classList.add("bg-green-500");
}
function setBackgroundColorBlur(elementId) {
  let element = document.getElementById(elementId);
  element.classList.remove("bg-green-500");
}
function getElementTextById(elementId) {
  let element = document.getElementById(elementId);
  return parseInt(element.innerText);
}
function setElementTextById(elementId, value) {
  let element = document.getElementById(elementId);
  element.innerText = value;
}
function getInputValueById(elementId) {
  let element = document.getElementById(elementId);
  return element.value;
}
function showElementById(elementId) {
  let element = document.getElementById(elementId);
  element.classList.remove("hidden");
}
function hideElementById(elementId) {
  let element = document.getElementById(elementId);
  element.classList.add("hidden");
}

// main functionality

const cart = [];
let totalPurchased = 0;
let totalPrice = 0;

function common(event) {
  let element = event.target;
  let id = element.id;
  const ticketLists = document.getElementById("buyed-ticket-list");

  if (!cart.includes(id) && cart.length < 4) {
    let div = document.createElement("div");
    let p = document.createElement("p");
    cart.push(id);
    let availableSeats = getElementTextById("available-seats");
    let currentSeats = availableSeats - 1;
    setBackgroundColor(id);
    setElementTextById("buyed-tickets", (totalPurchased += 1));
    setElementTextById("available-seats", currentSeats);
    p.textContent = id;
    div.innerHTML = p.outerText + "<p> Economy </p>" + "<p> 550 </p>";
    ticketLists.appendChild(div);

    // ticket pricing
    totalPrice = totalPrice + 550;
    setElementTextById("total-price", totalPrice);
    setElementTextById("grand-total", totalPrice);
  } else {
    return;
  }
}

// input & apply button
document
  .getElementById("coupon-input")
  .addEventListener("keyup", function (event) {
    let input = event.target.value;
    console.log("event ", input);
    let applyBtn = document.getElementById("apply-btn");

    if ((input === "NEW15" || input === "Couple 20") && totalPurchased === 4) {
      setBackgroundColor("apply-btn");
      applyBtn.removeAttribute("disabled");
      console.log("give me discount", input);
    } else {
      setBackgroundColorBlur("apply-btn");
      applyBtn.setAttribute("disabled", "true");
    }
  });

// apply to get discount
function discount() {
  let ticketNumber = getElementTextById("buyed-tickets");
  let couponInput = document.getElementById("coupon-input").value;

  if (ticketNumber === 4) {
    if (couponInput === "NEW15") {
      let subtotal = 550 * 4;
      let discount = (subtotal * 15) / 100;
      let total = subtotal - discount;
      setElementTextById("discount", discount);
      setElementTextById("total-price", subtotal);
      setElementTextById("grand-total", total);
      showElementById("discount-element");
      hideElementById("coupon-element");
    } else if (couponInput === "Couple 20") {
      let subtotal = 550 * 4;
      let discount = (subtotal * 20) / 100;
      let total = subtotal - discount;
      setElementTextById("discount", discount);
      setElementTextById("total-price", subtotal);
      setElementTextById("grand-total", total);
      showElementById("discount-element");
      hideElementById("coupon-element");
    }
  }
}

function handleChange() {
  let nameInput = document.getElementById("name-input").value.trim();
  let numberInput = document.getElementById("number-input").value.trim();
  let emailInput = document.getElementById("email-input").value.trim();

  let nameValid = nameInput.length > 4;
  let numberValid = numberInput.length > 11;
  let emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput);

  let nextBtn = document.getElementById("next-btn");
  if (nameValid && numberValid && emailValid) {
    nextBtn.removeAttribute("disabled");
    setBackgroundColor("next-btn");
  } else {
    nextBtn.setAttribute("disabled", true);
  }
}

let inputElements = document.getElementsByClassName("form-input");

for (var i = 0; i < inputElements.length; i++) {
  inputElements[i].addEventListener("change", handleChange);
}
