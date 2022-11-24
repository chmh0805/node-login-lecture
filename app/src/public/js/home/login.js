"use strict";

const id = document.querySelector("#userId");
const pwd = document.querySelector("#userPwd");
const loginBtn = document.querySelector("#login-btn");

window.addEventListener("keypress", enterEventListenerToLogin);
loginBtn.addEventListener("click", login);

function enterEventListenerToLogin(e) {
  if (e.charCode === 13) {
    e.preventDefault();
    login();
  }
}

function login() {
  if (!id.value) {
    alert("Please Enter ID.");
    return;
  }
  if (!pwd.value) {
    alert("Please Enter Password.");
    return;
  }
  const reqBody = {
    id: id.value,
    pwd: pwd.value,
  };

  fetch("/login", {
    body: JSON.stringify(reqBody),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      if (res.success === true) {
        alert("login success");
        window.location.href = "/";
      } else {
        if (res.msg) {
          alert(res.msg);
        } else {
          if (res.err) {
            console.log(res.err);
          }
          alert("Failed to Login...");
        }
        window.location.reload(true);
      }
    })
    .catch((err) => {
      console.error(new Error("login Error"));
    });
}
