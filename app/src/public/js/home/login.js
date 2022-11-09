"use strict";

const id = document.querySelector("#userId");
const pwd = document.querySelector("#userPwd");
const loginBtn = document.querySelector("button");

loginBtn.addEventListener("click", login);

function login() {
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
          alert("Failed to Login...");
        }
        window.location.reload(true);
      }
    })
    .catch((err) => {
      console.error(new Error("login Error"));
    });
}
