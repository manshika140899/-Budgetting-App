let budgetAmount = 0;
let expenses = 0;
let editElement = null;

const budgetInput = document.getElementById("budget-input");
const budgetButton = document.getElementById("budget-button");

const expenseTitle = document.getElementById("product-title");
const expenseAmount = document.getElementById("user-amount");
const expenseButton = document.getElementById("check-amount");

const totalBudget = document.getElementById("amount");
const totalExpense = document.getElementById("expenditure-value");
const balanceAmount = document.getElementById("balance-amount");

const listContainer = document.getElementById("list-container");

function updateBalance() {
    balanceAmount.textContent = budgetAmount - expenses;
}

/* Set Budget */

budgetButton.addEventListener("click", () => {

    if (budgetInput.value === "") {
        alert("Please Enter Budget");
        return;
    }

    budgetAmount = Number(budgetInput.value);

    totalBudget.textContent = budgetAmount;

    updateBalance();

    budgetInput.value = "";
});

/* Add Expense */

expenseButton.addEventListener("click", () => {

    const title = expenseTitle.value.trim();
    const amount = Number(expenseAmount.value);

    if (title === "" || amount <= 0) {
        alert("Please Enter Valid Data");
        return;
    }

    if (editElement) {

        let oldAmount =
            Number(editElement.getAttribute("data-amount"));

        expenses -= oldAmount;

        editElement.querySelector(".product").textContent = title;
        editElement.querySelector(".amount").textContent = amount;

        editElement.setAttribute("data-amount", amount);

        expenses += amount;

        editElement = null;

        expenseButton.textContent = "Check Amount";

    } else {

        createExpense(title, amount);

        expenses += amount;
    }

    totalExpense.textContent = expenses;

    updateBalance();

    expenseTitle.value = "";
    expenseAmount.value = "";
});

/* Create Expense Item */

function createExpense(title, amount) {

    const element = document.createElement("div");

    element.classList.add("sublist-content");

    element.setAttribute("data-amount", amount);

    element.innerHTML = `
        <p class="product">${title}</p>

        <p class="amount">${amount}</p>

        <div class="icons">

            <i class="fa-solid fa-pen-to-square edit"></i>

            <i class="fa-solid fa-trash delete"></i>

        </div>
    `;

    listContainer.appendChild(element);

    /* Edit */

    element.querySelector(".edit")
    .addEventListener("click", () => {

        expenseTitle.value =
            element.querySelector(".product").textContent;

        expenseAmount.value =
            element.querySelector(".amount").textContent;

        editElement = element;

        expenseButton.textContent = "Update Expense";
    });

    /* Delete */

    element.querySelector(".delete")
    .addEventListener("click", () => {

        expenses -= Number(
            element.getAttribute("data-amount")
        );

        totalExpense.textContent = expenses;

        updateBalance();

        element.remove();
    });
}