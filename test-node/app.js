const employeesURL = "http://localhost:3100/employees";
const authURL = "http://localhost:3100/auth";
const logoutURL = "http://localhost:3100/logout";
const credentials = { user: "Muammar", pwd: "Muammar.jsx@12" };
let accessToken;

document.addEventListener("DOMContentLoaded", () => auth(authURL, credentials));

const auth = async (URL, data) => {
  const formData = new FormData();
  formData.append("user", credentials.user);
  formData.append("pwd", credentials.pwd);

  const res = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const resData = await res.json();

  accessToken = `Bearer ${resData?.accessToken}`;
  localStorage.setItem("accessToken", accessToken);
};

const test = async (URL, data) => {
  const res = await fetch(URL, {
    method: "GET",
    headers: {
      authorization: localStorage.getItem("accessToken"),
    },
  });

  console.log(res);
  const resData = await res.json();
  document.querySelector("div").innerHTML = JSON.stringify(resData);
};

const testLogout = async (URL, data) => {
  const res = await fetch(URL);

  console.log(res);
};

document
  .querySelector(".btn-1")
  .addEventListener("click", () => test(employeesURL));

document
  .querySelector(".btn-2")
  .addEventListener("click", () => testLogout(logoutURL));
