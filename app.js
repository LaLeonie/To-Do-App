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
        <input class="checkbox" type="checkbox"/>
	    <span class="todo-text">${value}</span>
      <img class="cross" src="./images/icon-cross.svg" alt="cross"/>
  
    </label>
    `;
  li.classList.add("todo-list-item");
  //event listener for drag and drop
  li.setAttribute("draggable", true);
  li.addEventListener("dragstart", dragStart);
  li.addEventListener("dragend", dragEnd);
  // li.addEventListener("dragleave", dragLeave);
  // li.addEventListener("drop", drop);
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
  let classes = e.target.classList;
  if (classes.contains("cross")) {
    let list = document.querySelector("ul");
    list.removeChild(item.parentNode);
  } else if (classes.contains("list-item")) {
    toggleHandler(item);
  } else if (classes.contains("todo-list-item")) {
    toggleHandler(e.target);
    return;
  } else {
    toggleHandler(item.parentNode);
  }
  updateNumberOfUnchecked();
};

const handleModalSelection = (e) => {
  const allSelectors = e.target.parentNode.querySelectorAll("a");
  const selector = e.target;
  console.log(selector);
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
  console.log("all shown");
  reset();
  handleModalSelection(e);
};

const removeChecked = (e) => {
  let allCompleted = document.querySelectorAll(".checkedItem");
  let list = document.querySelector("ul");
  allCompleted.forEach((el) => list.removeChild(el));
  showAll(e);
};

// adds hover to list item
const hoverListitem = (e) => {
  let item = e.target;
  if (item.classList.contains("cross")) {
    item.src = "./images/icon-cross-white.svg";
  }
};

const unhoverListitem = (e) => {
  let item = e.target;
  if (item.classList.contains("cross")) {
    item.src = "./images/icon-cross.svg";
  }
};

//drag and drop
const container = document.querySelector("ul");

const dragStart = (e) => {
  const item = e.target;
  item.classList.add("dragging");
};

const dragEnd = (e) => {
  e.target.classList.remove("dragging");
};

const dragOver = (e) => {
  e.preventDefault();
  const afterElement = getDragAfterElement(container, e.clientY);
  const draggable = document.querySelector(".dragging");
  if (afterElement == null) {
    container.appendChild(draggable);
  } else {
    container.insertBefore(draggable, afterElement);
  }
};

const getDragAfterElement = (container, y) => {
  const draggableElements = [
    ...container.querySelectorAll("li:not(.dragging)"),
  ];
  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    {
      offset: Number.NEGATIVE_INFINITY,
    }
  ).element;
};

//add event listeners
document.querySelector("form").addEventListener("submit", handleSubmitForm);
document.querySelector("ul").addEventListener("click", toggleCheck);
document.querySelector(".show-all").addEventListener("click", showAll);
document.querySelector(".hide-checked").addEventListener("click", hideChecked);
document.querySelector(".hide-active").addEventListener("click", hideActive);
document
  .querySelector(".clear-completed")
  .addEventListener("click", removeChecked);
document.querySelector("ul").addEventListener("mouseover", hoverListitem);
document.querySelector("ul").addEventListener("mouseout", unhoverListitem);
container.addEventListener("dragover", dragOver);

//media query
const mobileFilterHandler = (e) => {
  let itemClass = e.target.classList;

  if (itemClass.contains("hide-checked")) {
    hideChecked(e);
  }

  if (itemClass.contains("show-all")) {
    showAll(e);
  }

  if (itemClass.contains("hide-active")) {
    hideActive(e);
  }
};

const mediaQuery = window.matchMedia("(max-width: 375px)");

if (mediaQuery.matches) {
  document
    .querySelector(".filter-group.mobile")
    .addEventListener("click", mobileFilterHandler);
}
