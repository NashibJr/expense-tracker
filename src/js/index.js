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
  });
})();
