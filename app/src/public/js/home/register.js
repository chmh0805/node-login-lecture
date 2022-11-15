"use strict";

const id = document.querySelector("#userId");
const username = document.querySelector("#username");
const pwd = document.querySelector("#userPwd");
const confirmPwd = document.querySelector("#confirm-userPwd");
const registerBtn = document.querySelector("#register-btn");

registerBtn.addEventListener("click", register);

function register() {
  const reqBody = {
    id: id.value,
    name: username.value,
    pwd: pwd.value,
    confirmPwd: confirmPwd.value,
  };
  console.log(reqBody);

  fetch("/register", {
    body: JSON.stringify(reqBody),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      if (res.success) {
        alert("register success");
        window.location.href = "/login";
      } else {
        if (res.msg) {
          alert(res.msg);
        } else {
          alert("Failed to register...");
        }
        window.location.reload(true);
      }
    })
    .catch((err) => {
      console.error(new Error("register Error"));
    });
}
