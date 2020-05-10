const $guessField = document.getElementById("guessField");
const $form = document.getElementById("form");
const $lowOrHigh = document.getElementById("lowOrHigh");
const $result = document.getElementById("result");
const $totalGuesses = document.getElementById("totalGuesses");
const $prevGuesses = document.getElementById("prevGuesses");
const $tryAgain = document.getElementById("tryAgain");

let number = getRandomNumber(1, 100);
let guesses = [];

// Get a random number between two values

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * max) + min;
}

// Submit a number

$form.addEventListener("submit", (e) => {
  e.preventDefault(); // To cancel the "normal behaviour" of the browser/event... (in that case, submit = refresh)
  const guess = parseInt($guessField.value);

  // Reject non-numeric characters

  if (isNaN(guess)) {
    $guessField.placeholder = "We said a number!";
    $guessField.value = "";
    $guessField.classList.add("error");
    return;
  }

  // Reject numbers that aren't between 1 and 100

  if (guess > 100) {
    $guessField.placeholder = "We said below 100!";
    $guessField.value = "";
    $guessField.classList.add("error");
    return;
  }

  if (guess < 1) {
    $guessField.placeholder = "We said 1 or higher!";
    $guessField.value = "";
    $guessField.classList.add("error");
    return;
  }

  // remove the error message

  $guessField.placeholder = "Enter a guess...";
  $guessField.classList.remove("error");

  // Reject duplicate guesses

  if (guesses.includes(guess)) {
    $guessField.placeholder = "You're repeating yourself...";
    $guessField.value = "";
    $guessField.classList.add("error");
    return;
  }

  // Compare the input with the number

  const difference = number - guess;
  console.log(guess, number, difference);

  // Show the previous guesses

  const total = guesses.push(guess);
  $prevGuesses.innerText = guesses.join(", ");

  $lowOrHigh.style.display = "block";
  $lowOrHigh.classList.remove("wrong", "correct");

  if (difference > 0) {
    // if positive, the guess was too low (message: "higher")
    $lowOrHigh.innerText = "Higher!";
    $lowOrHigh.classList.add("wrong");
  } else if (difference < 0) {
    // if negative, the guess was too high (message: "lower")
    $lowOrHigh.innerText = "Lower!";

    $lowOrHigh.classList.add("wrong");
  } else {
    // correct
    $lowOrHigh.innerText = "You got it!";
    $lowOrHigh.classList.add("correct");
    $result.style.display = "block";
    $totalGuesses.innerText = total;
  }

  $guessField.value = "";
});

// Try again

$tryAgain.addEventListener("click", () => {
  document.location.reload();
});
