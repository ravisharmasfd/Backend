const input = document.getElementById("username");
const form = document.getElementById("form");
form.onsubmit = function (e) {
  e.preventDefault();
  const username = input.value;
  localStorage.setItem("username", username);
  window.location.href = "/";
};
