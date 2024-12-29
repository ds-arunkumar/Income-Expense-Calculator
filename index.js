const expenseList = document.querySelector(".expenseList");

let editModeEnable = false;
let editModeIndex = -1;

expenseList.addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log(expenseList.elements);
  const Item = expenseList.elements.expenseItem.value;
  const amount = expenseList.elements.expenseAmount.value;
  const category = expenseList.elements.expenseCategory.value;

  const expense = {
    Item,
    amount,
    category,
  };

  // localStorage.setItem(expense)
  let expenses;
  try {
    expenses = localStorage.getItem("expenses")
      ? JSON.parse(localStorage.getItem("expenses"))
      : [];
    if (editModeEnable) {
      expenses.splice(editModeIndex, 1, expense);
      editModeEnable = false;
      editModeIndex = -1;
    } else {
      expenses.push(expense);
    }

    localStorage.setItem("expenses", JSON.stringify(expenses));
  } catch (error) {}
  loadTable();
  calculate();
});

function loadTable() {
  let expenses;

  try {
    expenses = localStorage.getItem("expenses")
      ? JSON.parse(localStorage.getItem("expenses"))
      : [];
  } catch (error) {}
  const tBody = document.querySelector("#expense-list");
  tBody.innerHTML = "";
  for (let i = 0; i < expenses.length; i++) {
    let tRow = document.createElement("tr");
    let tData = document.createElement("td");
    tData.textContent = expenses[i].Item;
    tRow.append(tData);
    let tData1 = document.createElement("td");
    tData1.textContent = expenses[i].amount;
    tRow.append(tData1);
    let tData2 = document.createElement("td");
    tData2.textContent = expenses[i].category;
    tRow.append(tData2);
    let tData3 = document.createElement("td");
    let editButton = document.createElement("button");
    editButton.classList.add("editButton");
    editButton.innerHTML = `Edit`;
    editButton.addEventListener("click", function () {
      editItem(i);
    });
    tData3.append(editButton);
    tRow.append(tData3);

    let tData4 = document.createElement("td");
    let deleteButton = document.createElement("button");
    deleteButton.classList.add("deleteButton");
    deleteButton.innerHTML = `Delete`;
    deleteButton.addEventListener("click", function () {
      deleteItem(i);
    });
    tData4.append(deleteButton);
    tRow.append(tData4);
    tBody.append(tRow);
  }
}

function editItem(editIndex) {
  editModeEnable = true;
  editModeIndex = editIndex;
  let expenses;
  try {
    expenses = localStorage.getItem("expenses")
      ? JSON.parse(localStorage.getItem("expenses"))
      : [];
  } catch (error) {}
  expenseList.elements.expenseItem.value = expenses[editIndex].Item;
  expenseList.elements.expenseAmount.value = expenses[editIndex].amount;
  expenseList.elements.expenseCategory.value = expenses[editIndex].category;
}

function deleteItem(deleteIndex) {
  let expenses;
  try {
    expenses = localStorage.getItem("expenses")
      ? JSON.parse(localStorage.getItem("expenses"))
      : [];
    expenses.splice(deleteIndex, 1);

    localStorage.setItem("expenses", JSON.stringify(expenses));
  } catch (error) {}
  loadTable();
}
function calculate() {
  const total = document.querySelector("#total-amount");
  let expenses;
  try {
    expenses = localStorage.getItem("expenses")
      ? JSON.parse(localStorage.getItem("expenses"))
      : [];
  } catch (error) {}
  let sum = 0;
  for (let i = 0; i < expenses.length; i++) {
    sum = sum + Number(expenses[i].amount);
  }
  total.textContent = sum;
}

loadTable();
calculate();