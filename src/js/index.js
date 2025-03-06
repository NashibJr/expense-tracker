const income = (document.getElementById("income").innerHTML = `$${1500}`);
// localStorage.setItem("expenses", JSON.stringify([]));

const expenses = JSON.parse(localStorage.getItem("expenses"));
console.log(expenses, ">>>");

(() => {
  // This is the functionality for adding an expense.
  document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault();
    const inputs = document.querySelectorAll("form input");
    let expense = {};
    for (let input of inputs) {
      Object.assign(expense, {
        description: input.type === "text" ? input.value : expense.description,
        amount: input.type === "number" ? input.value : expense.amount,
      });
    }
    const date = new Date();
    expenses.push({
      ...expense,
      id: ~~(Math.random() * 1000000),
      date: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
    });

    localStorage.setItem("expenses", JSON.stringify(expenses));
    alert(`${expense.description} is successfully added`);
    inputs.forEach((input) => {
      input.value = "";
    });
    window.location.reload();
  });

  // Functionality that renders the expenses.
  const tbody = document.querySelector("table tbody");

  expenses.forEach((expense) => {
    const row = document.createElement("tr");
    const cell = document.createElement("td");
    const btn = document.createElement("button");
    btn.innerText = "Delete";
    btn.onclick = () => {
      const indexToBeDeleted = expenses?.findIndex(
        (expense_) => expense_.id === expense.id
      );
      expenses.splice(indexToBeDeleted, 1);

      alert(`${expense.description} is successfully deleted!!`);
      localStorage.setItem("expenses", JSON.stringify(expenses));
      window.location.reload();
    };

    cell.appendChild(btn);
    row.innerHTML = `
    <td>${expense.date}</td>
    <td>${expense.description}</td>
    <td>$${expense.amount}</td>
    `;

    row.appendChild(cell);
    tbody.appendChild(row);
  });
  document.getElementById("totalExp").innerHTML =
    "$" +
    expenses
      ?.map((expense) => Number(expense.amount)) //[200, 10, 15]
      ?.reduce((prevValue, currentValue) => prevValue + currentValue);

  document.getElementById("balance").innerHTML = `$${
    Number(-document.getElementById("totalExp").innerHTML.slice(1)) +
    Number(document.getElementById("income").innerHTML.slice(1))
  }`;
})();
