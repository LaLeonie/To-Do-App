let allTodos, allChecked, allActive, numberOfUnchecked, allHidden;

//change theme
const changeTheme = () => {
  document.querySelector("html").classList.toggle("light-theme");
  document.querySelector(".theme-icon").src = document
    .querySelector("html")
    .classList.contains("light-theme")
    ? "./images/icon-moon.svg"
    : "./images/icon-sun.svg";
};

document.querySelector(".theme-button").addEventListener("click", changeTheme);

// update counter function
const updateNumberOfUnchecked = () => {
  allTodos = document.querySelectorAll("li");
  allChecked = document.querySelectorAll(".checkedItem");
  numberOfUnchecked = allTodos.length - allChecked.length;
  document.querySelector(
    "#numberOfUnchecked"
  ).innerHTML = `${numberOfUnchecked}`;
};

// add neew todo list item
const handleSubmitForm = (e) => {
  e.preventDefault();
  let input = document.querySelector("input");
  if (input.value != "") {
    addTodo(input.value);
  }
  input.value = "";
};

const addTodo = (value) => {
  const ul = document.querySelector("ul");
  const li = document.createElement("li");
  li.innerHTML = `
    <label class="list-item">
        <input type="checkbox"/>
	    <span>${value}</span>
      <img class="cross" src="./images/icon-cross.svg" alt="cross"/>
  
    </label>
    `;
  li.classList.add("todo-list-item");
  ul.appendChild(li);
  updateNumberOfUnchecked();
};

const toggleHandler = (item) => {
  let checkbox = item.querySelector("input");
  checkbox.classList.toggle("checkbox-tick");
  item.classList.toggle("checkedItem");
  updateNumberOfUnchecked();
};

// check/uncheck to do list items
const toggleCheck = (e) => {
  e.preventDefault();
  let item = e.target.parentNode;
  if (item.classList.contains("list-item")) {
    toggleHandler(item.parentNode);
  }

  if (item.classList.contains("todo-list-item")) {
    toggleHandler(item);
  }
};

const handleModalSelection = (e) => {
  const allSelectors = e.target.parentNode.querySelectorAll("a");
  const selector = e.target;
  allSelectors.forEach((el) => el.classList.remove("active-selection"));
  if (selector.parentNode.classList.contains("filter-group")) {
    selector.classList.add("active-selection");
  }
};

//reset
const reset = () => {
  allHidden = document.querySelectorAll(".element-hidden");
  allHidden.forEach((el) => el.classList.remove("element-hidden"));
};

// hide all checked items
const hideChecked = (e) => {
  reset();
  allChecked = document.querySelectorAll(".checkedItem");
  allChecked.forEach((el) => el.classList.add("element-hidden"));
  handleModalSelection(e);
};

// hide all unchecked items
const hideActive = (e) => {
  reset();
  allElements = document.querySelectorAll("li");
  allElements.forEach((el) => {
    if (!el.classList.contains("checkedItem")) {
      el.classList.add("element-hidden");
    }
  });
  handleModalSelection(e);
};

// show all items
const showAll = (e) => {
  reset();
  handleModalSelection(e);
};

const removeChecked = (e) => {
  let allCompleted = document.querySelectorAll(".checkedItem");
  let list = document.querySelector("ul");
  allCompleted.forEach((el) => list.removeChild(el));
  showAll(e);
};

// remove all checked items
document.querySelector("form").addEventListener("submit", handleSubmitForm);
document.querySelector("ul").addEventListener("click", toggleCheck);
document.querySelector(".show-all").addEventListener("click", showAll);
document.querySelector(".hide-checked").addEventListener("click", hideChecked);
document.querySelector(".hide-active").addEventListener("click", hideActive);
document
  .querySelector(".clear-completed")
  .addEventListener("click", removeChecked);
