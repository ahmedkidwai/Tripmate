async function getBudgetSummary(targetBudget) {
  let availableFund = 0;
  let plannedFund = 0;
  const targetExpenses = targetBudget.expenses;

  for (let i = 0; i < targetExpenses.length; i += 1) {
    plannedFund += targetExpenses[i].amount;
  }
  availableFund = targetBudget.budget - plannedFund;
  return {available: availableFund, planned: plannedFund};
}

module.exports = {getBudgetSummary};
