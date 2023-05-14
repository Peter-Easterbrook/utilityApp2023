const itemForm = document.querySelector('#item-form');
const itemInput = document.querySelector('#item-input');
const itemList = document.querySelector('#item-list');
const clearBtn = document.querySelector('#item-clear');
const itemFilter = document.querySelector('#item-filter');
const formBtn = itemForm.querySelector('button');

let isEditMode = false;

function displayItems() {
  const itemsFromStorage = getItemsFromStorage();
  itemsFromStorage.forEach((item) => addItemToDOM(item));
  checkUI();
}

function onAddItemSubmit(e) {
  e.preventDefault();

  const newItem = itemInput.value.trim();
  // Validate input
  if (newItem === '') {
    alert('Add an item');
    return;
  }

  // CHeck if in edit mode
  if (isEditMode) {
    // Update item in DOM
    const itemToEdit = itemList.querySelector('.edit-mode');

    removeItemFromStorage(itemToEdit.textContent);
    itemToEdit.classList.remove('edit-mode');
    itemToEdit.remove();
    isEditMode = false;
  } else {
    // Check if item already exists
    if (checkIfItemExists(newItem)) {
      alert('Item already exists');
      return;
    }
  }

  // Create new item DOM element
  addItemToDOM(newItem);

  // Add item to local storage
  addItemToStorage(newItem);

  checkUI();
  // Clear input
  itemInput.value = '';
}

function addItemToDOM(item) {
  const li = document.createElement('li');
  li.textContent = item;
  const button = createButton('remove-item btn-link text-red');
  li.appendChild(button);
  itemList.appendChild(li);
}

function createButton(classes) {
  const button = document.createElement('button');
  button.className = classes;
  const icon = createIcon('fas fa-trash-alt');
  button.appendChild(icon);
  return button;
}

function createIcon(classes) {
  const icon = document.createElement('i');
  icon.className = classes;
  return icon;
}

function addItemToStorage(item) {
  const itemsFromStorage = getItemsFromStorage();
  // Add item to array
  itemsFromStorage.push(item);
  // Convert array to string & save to local storage
  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function getItemsFromStorage() {
  const itemsFromStorage = JSON.parse(localStorage.getItem('items')) || [];
  return itemsFromStorage;
}

function onClickItem(e) {
  if (e.target.parentElement.classList.contains('remove-item')) {
    removeItem(e.target.parentElement.parentElement);
  } else {
    setItemToEdit(e.target);
  }
}

function checkIfItemExists(item) {
  const itemsFromStorage = getItemsFromStorage();
  return itemsFromStorage.includes(item);
}
function setItemToEdit(item) {
  isEditMode = true;
  itemList
    .querySelectorAll('li')
    .forEach((i) => i.classList.remove('edit-mode'));

  // Change color of input text
  item.classList.add('edit-mode');
  formBtn.innerHTML =
    '<span class="material-symbols-outlined pencil">edit</span>';
  formBtn.style.backgroundColor = 'rgba(255, 255, 255, 0.25);';
  itemInput.value = item.textContent.trim();
  itemInput.focus();
}

function removeItem(item) {
  if (confirm('Are you sure?')) {
    // Remove from DOM
    item.remove();
    // Remove from local storage
    removeItemFromStorage(item.textContent.trim());
    checkUI();
  }
}

function removeItemFromStorage(item) {
  let itemsFromStorage = getItemsFromStorage();

  // Filter out item being removed
  itemsFromStorage = itemsFromStorage.filter((i) => i !== item);

  // Save new array to local storage
  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function clearItems() {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }
  // Clear from local storage
  localStorage.removeItem('items');
  checkUI();
}

function filterItems() {
  const text = this.value.trim().toLowerCase();
  const items = itemList.querySelectorAll('li');

  items.forEach((item) => {
    const name = item.textContent.trim().toLowerCase();
    item.style.display = name.includes(text) ? 'flex' : 'none';
  });
}
function checkUI() {
  const items = itemList.querySelectorAll('li');

  clearBtn.style.display = items.length ? 'block' : 'none';
  itemFilter.style.display = items.length ? 'block' : 'none';
  itemInput.value = '';
  formBtn.innerHTML =
    '<span class="material-symbols-outlined add">add_circle</span>';
  formBtn.style.backgroundColor = 'rgba(255, 255, 255, 0.25);';
  isEditMode = false;
}

// Initialize App
function init() {
  // Event listeners
  itemForm.addEventListener('submit', onAddItemSubmit);
  itemList.addEventListener('click', onClickItem);
  clearBtn.addEventListener('click', clearItems);
  itemFilter.addEventListener('input', filterItems);
  document.addEventListener('DOMContentLoaded', displayItems);
  checkUI();

  itemInput.focus();
}

init();
