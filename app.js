let allTodos, allChecked, numberOfUnchecked;

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
    </label>
    `;
  li.classList.add("todo-list-item");
  ul.appendChild(li);
  updateNumberOfUnchecked();
};

// check/uncheck to do list items
const toggleCheck = (e) => {
  e.preventDefault();
  let item = e.target.parentNode;
  let checkbox = item.querySelector("input");
  item.classList.toggle("checkedItem");
  checkbox.checked = !checkbox.checked;
  updateNumberOfUnchecked();
};

// hide all checked items
const hideChecked = () => {
  if (document.querySelectorAll(".element-hidden").length > 0) {
    document
      .querySelectorAll(".element-hidden")
      .classList.remove(".element-hidden");
  }

  if (document.querySelectorAll(".checkedItem").length > 0) {
    allChecked = document.querySelectorAll(".checkedItem");
    allChecked[0].classList.add("element-hidden");
  }
};

// hide all unchecked items
const hideUnchecked = () => {};

// show all items
const showAll = () => {};

// remove all checked items
const removeChecked = () => {};

document.querySelector("form").addEventListener("submit", handleSubmitForm);
document.querySelector("ul").addEventListener("click", toggleCheck);
document.querySelector(".show-all").addEventListener("click", showAll);
document.querySelector(".show-active").addEventListener("click", hideUnchecked);
document
  .querySelector(".show-completed")
  .addEventListener("click", hideChecked);
document
  .querySelector(".clear-completed")
  .addEventListener("click", removeChecked);
