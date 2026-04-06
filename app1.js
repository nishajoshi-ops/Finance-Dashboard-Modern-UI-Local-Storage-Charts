
 const ctx = document.getElementById('lineChart').getContext('2d');
  new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['Jan','Feb','Mar','Apr','May','Jun'],
    datasets: [{
      label: 'Balance Trend',
      data: [10,20,15,25,22,30],
      borderColor: 'rgba(54,162,235,1)',
      backgroundColor: 'rgba(54,162,235,0.2)',
      fill: true,
      tension: 0.1
    }],
    options: {
  responsive: true,
  maintainAspectRatio: false
}
  }
});
    
    const pc = document.getElementById('pieChart').getContext('2d');
  new Chart(pc, {
  type: 'pie',
  data: {
    labels: ['Groceries','Entertainment','Transport','Other'],
    datasets: [{
      data: [300,150,100,50],
      backgroundColor: [
        'rgba(54,162,235,0.7)',
        'rgba(255,99,132,0.7)',
        'rgba(255,206,86,0.7)',
        'rgba(75,192,192,0.7)'
      ],
  options: {
  responsive: true,
  maintainAspectRatio: false
}
    }]
  }
});


const LOCAL_KEY = "finance_transactions";

let state = {
  role: 'viewer',
  filters: { search: '' },

  transactions: JSON.parse(localStorage.getItem(LOCAL_KEY)) || [
    { date: "12/08/2023", amount: "$2,000", category: "Groceries", type: "Debit" },
    { date: "11/28/2023", amount: "$5,000", category: "Salary", type: "Credit" },
    { date: "11/19/2023", amount: "$1,500", category: "Transport", type: "Debit" }
  ]
};

// Save to LocalStorage
function saveToLocalStorage() {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(state.transactions));
}

// Handle role change
const roleSelector = document.getElementById('roleSelector');
const addBtn = document.getElementById('addTransactionBtn');

roleSelector.addEventListener('change', e => {
  state.role = e.target.value;
  addBtn.style.display = state.role === 'admin' ? 'block' : 'none';
});

// Render table
function renderTransactions() {
  const tbody = document.getElementById('transactionList');
  tbody.innerHTML = '';

  const filtered = state.transactions.filter(t =>
    t.category.toLowerCase().includes(state.filters.search.toLowerCase())
  );

  filtered.forEach(t => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${t.date}</td>
      <td>${t.amount}</td>
      <td>${t.category}</td>
      <td>${t.type}</td>
    `;
    tbody.appendChild(row);
  });

  saveToLocalStorage();
}

// Search filter
document.getElementById('searchInput').addEventListener('input', e => {
  state.filters.search = e.target.value;
  renderTransactions();
});

// Initial render
renderTransactions();