
//           SIGNUP LOGIC

let signupNameInput = document.getElementById("signupName");
let signupEmailInput = document.getElementById("signupEmail");
let signupPassInput = document.getElementById("signupPass");

let signupMsg = document.getElementById("exist");
let signupBtn = document.getElementById("signupbtn");

let users = [];

if (JSON.parse(localStorage.getItem("usercontainer")) != null) {
  users = JSON.parse(localStorage.getItem("usercontainer"));
}

if (signupBtn != null) {
  signupBtn.addEventListener("click", function () {
    if (
        signUpValidation(signupNameInput) &&
        signUpValidation(signupEmailInput) &&
        signUpValidation(signupPassInput)
    ) {
        signup();
        clearInputs();
    }
  });
}

function signup() {
   user = {
    name: signupNameInput.value,
    email: signupEmailInput.value,
    password: signupPassInput.value,
  };

  users.push(user);
  localStorage.setItem("usercontainer", JSON.stringify(users));
  console.log(users);
}

function signUpValidation(input) {
   regex = {
    signupName: /^.+$/,
    signupEmail: /^[a-zA-Z0-9._]+@gmail\.com$/,
    signupPass: /^.+$/,
  };

  let text = input.value;

  if (regex[input.id].test(text)) {
    signupMsg.innerHTML = `Success`;
    signupMsg.style.color = "green";
    signupMsg.classList.remove("d-none");
    return true;
  } else {
    signupMsg.innerHTML = `All inputs are required`;
    signupMsg.style.color = "red";
    signupMsg.classList.remove("d-none");
    return false;
  }
}

function clearInputs() {
  signupNameInput.value = null ;
  signupEmailInput.value = null ;
  signupPassInput.value = null ;
}

//           LOGIN LOGIC

let signinEmailUser = document.getElementById("signinEmail");
let signinPasswordUser = document.getElementById("signinPass");


let loginBtn = document.getElementById("signinBtn");
let loginMsgText = document.getElementById("invalid");


if (localStorage.getItem("usercontainer") != null) {
  users = JSON.parse(localStorage.getItem("usercontainer"));
}

if (loginBtn) {
  loginBtn.addEventListener("click", function () {
    checkLogin();
  });
}

function checkLogin() {
  if (
    signinEmailUser.value.trim() === "" ||
    signinPasswordUser.value.trim() === ""
  ) {
    loginMsgText.innerHTML = `All inputs are required`;
    loginMsgText.style.color = "red";
    loginMsgText.classList.remove("d-none");
    return false;
  }

  for (let i = 0; i < users.length; i++) {
    if (
      users[i].email === signinEmailUser.value &&
      users[i].password === signinPasswordUser.value
    ) {
      let UserName = users[i].name;
      localStorage.setItem("username", JSON.stringify(UserName));
      console.log(UserName);
      window.location.href = "welcome.html"; 
      return true;
    }
  }

  loginMsgText.innerHTML = `Incorrect email or password`;
  loginMsgText.style.color = "red";
  loginMsgText.classList.remove("d-none");
}


//           WELCOME LOGIC

let welcomeMsg = document.getElementById("user-name");

if (welcomeMsg) {
  let userName = localStorage.getItem("username");

  if (!userName) {
    window.location.href = "index.html";
  } else {
    userName = JSON.parse(userName);
    welcomeMsg.innerHTML = `Welcome, ${userName}!`;
  }
}

let logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
  logoutBtn.addEventListener("click", function () {
    localStorage.removeItem("username");
    window.location.href = "index.html";
  });
}


