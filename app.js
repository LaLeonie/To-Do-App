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
};

const toggleCheck = (e) => {
  e.preventDefault();
  let item = e.target.parentNode;
  let checkbox = item.querySelector("input");
  let todo = item.querySelector("span");
  todo.classList.toggle("checkedItem");
  checkbox.checked = !checkbox.checked;
};

document.querySelector("form").addEventListener("submit", handleSubmitForm);
document.querySelector("ul").addEventListener("click", toggleCheck);
