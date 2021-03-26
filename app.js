let allTodos, allChecked, numberOfUnchecked;

const updateNumberOfUnchecked = () => {
  allTodos = document.querySelectorAll("li");
  allChecked = document.querySelectorAll(".checkedItem");
  numberOfUnchecked = allTodos.length - allChecked.length;
  document.querySelector(
    "#numberOfUnchecked"
  ).innerHTML = `${numberOfUnchecked}`;
};

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

const toggleCheck = (e) => {
  e.preventDefault();
  let item = e.target.parentNode;
  let checkbox = item.querySelector("input");
  let todo = item.querySelector("span");
  todo.classList.toggle("checkedItem");
  checkbox.checked = !checkbox.checked;
  updateNumberOfUnchecked();
};

// array with all items, all unchecked items, all checked items

console.log(numberOfUnchecked);

//add variable counter for all unchecked items

//hide all checked

//hide all unchecked

//remove all checked

document.querySelector("form").addEventListener("submit", handleSubmitForm);
document.querySelector("ul").addEventListener("click", toggleCheck);
