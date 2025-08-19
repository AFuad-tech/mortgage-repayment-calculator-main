const morgage_amount = document.getElementById("morgage_amount");
const morgage_term_field = document.getElementById("morgage_term_field");
const interest_rate_field = document.getElementById("interest_rate_field");
let Final_result_monthly = document.getElementById("Final_result_monthly");
let Final_result_total = document.getElementById("Final_result_total");

const error = document.getElementsByClassName("error");
const error_txt1 = document.getElementById("error_txt1");
const error_txt2 = document.getElementById("error_txt2");
const error_txt3 = document.getElementById("error_txt3");
const error_txt4 = document.getElementById("error_txt4");

let morgageAmountfinal = 0;
let morgageTermfinal = 0;
let morgageRatefinal = 0;
let finalResult = 0;

let isChecked = false;
let isClicked = false;

const morgage_types_repayment_choice = document.getElementById(
  "morgage_types_repayment_choice"
);
const morgage_types_interest_choice = document.getElementById(
  "morgage_types_interest_choice"
);
const radio1 = morgage_types_repayment_choice.querySelector(
  'input[type="radio"]'
);
const radio2 = morgage_types_interest_choice.querySelector(
  'input[type="radio"]'
);
morgage_types_repayment_choice.addEventListener("click", () => {
  radio1.checked = true;
  radio2.checked = false; // uncheck the other
  isChecked = true;
});

morgage_types_interest_choice.addEventListener("click", () => {
  radio2.checked = true;
  radio1.checked = false; // uncheck the other
  isChecked = true;
});

function calculateMortgageRepayment(mortgageAmount, years, annualInterestRate) {
  const principal = mortgageAmount;
  const monthlyInterestRate = annualInterestRate / 100 / 12;
  const totalPayments = years * 12;

  // Avoid divide-by-zero or zero interest special case
  let monthlyPayment;
  if (monthlyInterestRate === 0) {
    monthlyPayment = principal / totalPayments;
  } else {
    monthlyPayment =
      (principal *
        (monthlyInterestRate *
          Math.pow(1 + monthlyInterestRate, totalPayments))) /
      (Math.pow(1 + monthlyInterestRate, totalPayments) - 1);
  }

  const totalRepayment = monthlyPayment * totalPayments;

  return {
    monthlyPayment: monthlyPayment.toFixed(2),
    totalRepayment: totalRepayment.toFixed(2),
  };
}

function calculateInterestOnlyMortgage(
  mortgageAmount,
  years,
  annualInterestRate
) {
  const principal = mortgageAmount;
  const monthlyInterestRate = annualInterestRate / 100 / 12;
  const totalPayments = years * 12;

  const monthlyPayment = principal * monthlyInterestRate; // interest only
  const totalRepayment = monthlyPayment * totalPayments + principal; // total interest + full principal

  return {
    monthlyPayment: monthlyPayment.toFixed(2),
    totalRepayment: totalRepayment.toFixed(2),
  };
}

const calcualte = document.getElementById("calculate");
calcualte.addEventListener("click", () => {
  isClicked = true;
  const amount = parseFloat(morgage_amount.value);
  const term = parseFloat(morgage_term_field.value);
  const rate = parseFloat(interest_rate_field.value);
  console.log(amount);
  let istrue = false;
  if (amount === 0) {
    error[0].style.borderColor = "red";
    error[1].style.backgroundColor = "red";
    error[1].style.color = "white";
    error_txt1.style.display = "block";
    error_txt1.textContent = "Please enter an amount greater than zero.";
    istrue = false;
  } else if (amount < 0) {
    error[0].style.borderColor = "red";
    error[1].style.backgroundColor = "red";
    error[1].style.color = "white";
    error_txt1.style.display = "block";
    error_txt1.textContent = "The amount must be a positive number.";
    istrue = false;
  } else if (isNaN(amount)) {
    error[0].style.borderColor = "red";
    error[1].style.backgroundColor = "red";
    error[1].style.color = "white";
    error_txt1.style.display = "block";
    error_txt1.textContent = "This field is required.";
    istrue = false;
  } else {
    morgageAmountfinal = amount;
    istrue = true;
  }

  if (term === 0) {
    error[2].style.borderColor = "red";
    error[3].style.backgroundColor = "red";
    error[3].style.color = "white";
    error_txt2.style.display = "block";
    error_txt2.textContent = "Please enter an amount greater than zero.";
    istrue = false;
  } else if (term < 0) {
    error[2].style.borderColor = "red";
    error[3].style.backgroundColor = "red";
    error[3].style.color = "white";
    error_txt2.style.display = "block";
    error_txt2.textContent = "The amount must be a positive number.";
    istrue = false;
  } else if (isNaN(term)) {
    error[2].style.borderColor = "red";
    error[3].style.backgroundColor = "red";
    error[3].style.color = "white";
    error_txt2.style.display = "block";
    error_txt2.textContent = "This field is required.";
    istrue = false;
  } else {
    morgageTermfinal = term;
    istrue = true;
  }

  if (rate === 0) {
    error[4].style.borderColor = "red";
    error[5].style.backgroundColor = "red";
    error[5].style.color = "white";
    error_txt3.style.display = "block";
    error_txt3.textContent = "Please enter an amount greater than zero.";
    istrue = false;
  } else if (rate < 0) {
    error[4].style.borderColor = "red";
    error[5].style.backgroundColor = "red";
    error[5].style.color = "white";
    error_txt3.style.display = "block";
    error_txt3.textContent = "The amount must be a positive number.";
    istrue = false;
  } else if (isNaN(rate)) {
    console.log("does rate wrok");
    error[4].style.borderColor = "red";
    error[5].style.backgroundColor = "red";
    error[5].style.color = "white";
    error_txt3.style.display = "block";
    error_txt3.textContent = "This field is required.";
    istrue = false;
  } else {
    morgageRatefinal = amount;
    istrue = true;
  }

  console.log(istrue);
  if (!isChecked) {
    error_txt4.style.display = "block";
    error_txt4.style.color = "red";

    istrue = false;
    console.log("does this run or not");
  }
  if (istrue) {
    if (radio1) {
      finalResult = calculateMortgageRepayment(amount, term, rate);
      Final_result_monthly.textContent = `£${finalResult.monthlyPayment}`;
      Final_result_total.textContent = `£${finalResult.totalRepayment}`;
      document.getElementById("result_before").style.display = "none";
      document.getElementById("results_after").style.display = "flex";
    } else if (radio2) {
      finalResult = calculateInterestOnlyMortgage(amount, term, rate);
      Final_result_monthly.textContent = `£${finalResult.monthlyPayment}`;
      Final_result_total.textContent = `£${finalResult.totalRepayment}`;
      console.log(finalResult);
    }
  }
});

const clear_all = document.getElementById("clear_all");
if (isClicked) {
  clear_all.addEventListener("click", () => {
    clear_all.style.color = "hsl(200, 24%, 40%)";
    error_txt1.style.display = "none";
    error_txt2.style.display = "none";
    error_txt3.style.display = "none";
    error_txt4.style.display = "none";
    error[0].style.borderColor = "hsl(200, 24%, 40%)";
    error[1].style.backgroundColor = "hsl(61, 70%, 52%)";
    error[1].style.color = "hsl(202, 55%, 16%)";
    error[2].style.borderColor = "hsl(200, 24%, 40%)";
    error[3].style.backgroundColor = "hsl(61, 70%, 52%)";
    error[3].style.color = "hsl(202, 55%, 16%)";
    error[4].style.borderColor = "hsl(200, 24%, 40%)";
    error[5].style.backgroundColor = "hsl(61, 70%, 52%)";
    error[5].style.color = "hsl(202, 55%, 16%)";
    isClicked = false;
  });
} else {
  clear_all.style.color = "hsl(200, 24%, 40%)";
}
