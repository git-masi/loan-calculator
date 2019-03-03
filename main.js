const SUBMIT_BTN = document.querySelector('#loan-details .input-field .btn');
const LOAN_AMOUNT = document.getElementById('loan-amount');
const INTEREST = document.getElementById('interest');
const REPAY = document.getElementById('repay');
const MONTHLY_PAYMENT = document.getElementById('monthly-payment');
const TOTAL_PAYMENT = document.getElementById('total-payment');
const TOTAL_INTEREST = document.getElementById('total-interest');
const PRELOADER_ANIMATION = document.querySelector('.preloader-wrapper').parentElement;
const RESULTS_SECTION = document.getElementById('results-section');

loadEventListeners();

function loadEventListeners(){
  SUBMIT_BTN.addEventListener('click', calculateResults);
}

function calculateResults(e){
  if(!LOAN_AMOUNT.value || !INTEREST.value || !REPAY.value) return;
  
  const PRINCIPAL = Number(LOAN_AMOUNT.value);
  const ANNUAL_INTEREST = Number(INTEREST.value) / 100 / 12;
  const NUMBER_OF_PAYMENTS = Number(REPAY.value) * 12;
  const DISCOUNT_FACTOR = (((1 + ANNUAL_INTEREST) ** NUMBER_OF_PAYMENTS) - 1) / (ANNUAL_INTEREST * (1 + ANNUAL_INTEREST) ** NUMBER_OF_PAYMENTS);
  
  const MONTHLY_PAYMENT_AMOUNT = PRINCIPAL / DISCOUNT_FACTOR;
  const TOTAL_LOAN_COST = (PRINCIPAL * ANNUAL_INTEREST * NUMBER_OF_PAYMENTS) / (1 - ((1 + ANNUAL_INTEREST) ** (-NUMBER_OF_PAYMENTS)))
  const TOTAL_INTEREST_PAID = TOTAL_LOAN_COST - PRINCIPAL;
  
  MONTHLY_PAYMENT.value = MONTHLY_PAYMENT_AMOUNT.toFixed(2);
  TOTAL_PAYMENT.value = TOTAL_LOAN_COST.toFixed(2);
  TOTAL_INTEREST.value = TOTAL_INTEREST_PAID.toFixed(2);
  
  if(!RESULTS_SECTION.classList.contains('hide')) {
    RESULTS_SECTION.classList.add('hide');
  };
  PRELOADER_ANIMATION.classList.remove('hide');
  setTimeout(hidePreloaderShowResults, 2000);
  
  e.preventDefault();
}

function hidePreloaderShowResults(){
  PRELOADER_ANIMATION.classList.add('hide')
  RESULTS_SECTION.classList.remove('hide');
}