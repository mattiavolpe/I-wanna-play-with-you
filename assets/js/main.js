const mainPageButton = document.querySelector("#main_page > button");
const mainPage = document.getElementById("main_page");
const palindromePage = document.getElementById("palindrome");
const palindromeWordContainer = document.getElementById("palindrome_word_container");
const palindromeButton = document.querySelector("#palindrome_word_container > button");
const palindromeResultContainer = document.getElementById("palindrome_result_container");
const palindromeResult = document.querySelector("#palindrome_result_container > h2");
const palindromePageButton = document.querySelector("#palindrome_result_container > button");
const evenOddPage = document.getElementById("even_odd");
const evenOddChoiceContainer = document.getElementById("even_odd_choice_container");
const evenOddButton = document.querySelector("#even_odd_choice_container > button");
const evenChoiceButton = document.getElementById("even");
const oddChoiceButton = document.getElementById("odd");
let evenOddChoice = "";
const evenOddResultContainer = document.getElementById("even_odd_result_container");
const evenOddResult = document.querySelector("#even_odd_result_container > h2");
const restartButton = document.querySelector("#even_odd_result_container > button");

mainPageButton.addEventListener("click", function() {
  palindromePage.style.visibility = "visible";
  mainPage.style.left = "-2.08%";
  mainPage.style.transform = "translate(-100%, 0)";
  palindromePage.style.right = "0";
  palindromePage.style.transform = "translate(0, 0)";
  setTimeout(() => {
    mainPage.style.visibility = "hidden";
  }, 1000);
});


palindromeButton.addEventListener("click", startPalindromeGame);

palindromePageButton.addEventListener("click", function() {
  evenOddPage.style.visibility = "visible";
  palindromePage.style.right = "102.8%";
  evenOddPage.style.right = "0";
  evenOddPage.style.transform = "translate(0, 0)";
  setTimeout(() => {
    palindromePage.style.visibility = "hidden";
  }, 1000);
});

evenChoiceButton.addEventListener("click", function() {
  evenOddChoice = "pari";
  oddChoiceButton.style.color = "#f5f5dc66";
  evenChoiceButton.style.color = "#c1150d";
});

oddChoiceButton.addEventListener("click", function() {
  evenOddChoice = "dispari";
  evenChoiceButton.style.color = "#f5f5dc66";
  oddChoiceButton.style.color = "#c1150d";
});

evenOddButton.addEventListener("click", startEvenOddGame);

restartButton.addEventListener("click", function() {
  location.reload();
});

function startPalindromeGame() {

  // EXTRACT THE WORD FROM THE DOM
  let word = document.querySelector("#palindrome_word_container > input").value;

  // CHECK IF THERE'S MORE THAN ONE WORD OR AN EMPTY INPUT
  if (checkIfSingleNonEmptyWord(word)) {
    return;
  }

  // CONVERT THE WORD TO LOWERCASE FOR NOT CASE SENSITIVE CHECKING
  const wordLowerCase = word.toLowerCase();

  // CYCLE THROUGH HALF THE WORD TO CHECK IF EACH LETTER MATCHES ITS "SAME INDEXED LETTER WHEN STARTING COUNTING FROM THE END"
  let isPalindrome = checkIfPalindrome(wordLowerCase);

  palindromeWordContainer.classList.add("goes_down");
  palindromeResultContainer.style.visibility = "visible";

  // CHECK VALUE OF ISPALINDROME
  isPalindrome ? palindromeResult.innerHTML = `HAI VINTO<br>La parola ${word} è palindroma` : palindromeResult.innerHTML = `HAI PERSO<br>La parola ${word} non è palindroma`;

  palindromeResultContainer.classList.add("goes_up");

  setTimeout(() => {
    palindromeWordContainer.style.visibility = "hidden";
  }, 1000);

  // <---------- FUNCTIONS ---------->

  // FUNCTION TO CHECK IF THERE'S MORE THAN ONE WORD OR AN EMPTY INPUT
  function checkIfSingleNonEmptyWord(insertedWord) {
    if (insertedWord == "") {
      alert("Inserisci un'unica parola e non lasciare il campo vuoto");
      return true;
    } else {
      for (let i = 0; i < insertedWord.length; i++) {
        if (insertedWord[i] == " ") {
          alert("Inserisci un'unica parola e non lasciare il campo vuoto");
          return true;
        }
      }
    }
  }

  // FUNCTION TO CYCLE THROUGH HALF THE WORD TO CHECK IF EACH LETTER MATCHES ITS "SAME INDEXED LETTER WHEN STARTING COUNTING FROM THE END"
  function checkIfPalindrome(wordToCheck) {
    for (let i = 0; i < wordToCheck.length / 2; i++) {
      if (wordToCheck[i] != wordToCheck[wordToCheck.length - 1 - i]) {
        return false;
      }
    }
    return true;
  }

}

function startEvenOddGame() {

  // CHECK IF THERE'S NO EVEN OR ODD CHOICE
  if (checkIfNoEvenOdd(evenOddChoice)) {
    return;
  }

  // ASK THE USER TO INSERT A NUMBER
  let userNumber = Number(document.querySelector("#even_odd_choice_container > input").value);

  // REPEAT PROMPT IF INSERTED NUMBER IS NOT IN THE RANGE
  if (userNumber < 1 || userNumber > 10 || (isNaN(userNumber))) {
    alert("Assicurati di inserire un numero tra 1 e 10, estremi inclusi");
    return;
  }

  // GENERATE A RANDOM NUMBER FOR THE PC
  const pcNumber = pcNumberGenerator();

  // SUM THE NUMBER
  const sum = userNumber + pcNumber;

  // DECLARE THE WINNER
  declareWinner(evenOddChoice, userNumber, pcNumber, sum);

  evenOddChoiceContainer.classList.add("goes_down");
  evenOddResultContainer.style.visibility = "visible";

  evenOddResultContainer.classList.add("goes_up");
  setTimeout(() => {
    evenOddChoiceContainer.style.visibility = "hidden";
  }, 1000);


  // <---------- FUNCTIONS ---------->

  // FUNCTION TO CHECK IF NO SELECTION OF EVEN / ODD WAS MADE
  function checkIfNoEvenOdd(choice) {
    if (choice == "") {
      alert("Assicurati di scegliere tra pari o dispari");
      return true;
    }
  }

  // FUNCTION TO GENERATE THE RANDOM PC NUMBER
  function pcNumberGenerator() {
    return Math.floor(Math.random() * 10) + 1;
  }

  // FUNCTION TO DECLARE THE WINNER
  function declareWinner(userChoice, userChoicedNumber, pcChoicedNumber, sum) {
    if ((userChoice == "pari" && sum % 2 == 0) || (userChoice == "dispari" && sum % 2 != 0)) {
      evenOddResult.innerHTML = `Tu hai scelto ${userChoice} ed hai inserito ${userChoicedNumber}. Il PC ha scelto ${pcChoicedNumber}. La somma è ${sum}, quindi HAI VINTO`;
    } else {
      evenOddResult.innerHTML = `Tu hai scelto ${userChoice} ed hai inserito ${userChoicedNumber}. Il PC ha scelto ${pcChoicedNumber}. La somma è ${sum}, quindi HAI PERSO`;
    }
  }
}