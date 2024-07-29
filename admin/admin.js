document.addEventListener('DOMContentLoaded', function() {
    fetch('https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec')
        .then(response => response.json())
        .then(data => {
            const ordersTable = document.getElementById('ordersTable').getElementsByTagName('tbody')[0];
            data.orders.forEach((order, index) => {
                const row = ordersTable.insertRow();
                row.setAttribute('data-index', index);
                const cell1 = row.insertCell(0);
                const cell2 = row.insertCell(1);
                const cell3 = row.insertCell(2);
                const cell4 = row.insertCell(3);
                cell1.textContent = order.name;
                cell2.textContent = order.email;
                cell3.textContent = order.package;
                cell4.innerHTML = `
                    <button onclick="editOrder(${index}, '${order.name}', '${order.email}', '${order.package}')">Edit</button>
                    <button onclick="deleteOrder(${index})">Delete</button>
                `;
            });
        })
        .catch(error => console.error('Error:', error));
});

function filterOrders() {
    const searchInput = document.getElementById('search').value.toLowerCase();
    const ordersTable = document.getElementById('ordersTable').getElementsByTagName('tbody')[0];
    const rows = ordersTable.getElementsByTagName('tr');

    for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');
        const name = cells[0].textContent.toLowerCase();
        const email = cells[1].textContent.toLowerCase();
        if (name.includes(searchInput) || email.includes(searchInput)) {
            rows[i].style.display = '';
        } else {
            rows[i].style.display = 'none';
        }
    }
}

function editOrder(index, name, email, package) {
    const newName = prompt('Enter new name:', name);
    const newEmail = prompt('Enter new email:', email);
    const newPackage = prompt('Enter new package:', package);

    if (newName !== null && newEmail !== null && newPackage !== null) {
        fetch('https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec', {
            method: 'POST',
            body: JSON.stringify({ index: index, name: newName, email: newEmail, package: newPackage, action: 'edit' }),
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                location.reload();
            } else {
                alert('Error editing order. Please try again.');
            }
        })
        .catch(error => {
            alert('Error editing order. Please try again.');
            console.error('Error:', error);
        });
    }
}

function deleteOrder(index) {
    fetch('https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec', {
        method: 'POST',
        body: JSON.stringify({ index: index, action: 'delete' }),
        headers: { 'Content-Type': 'application/json' }
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            document.querySelector(`tr[data-index='${index}']`).remove();
        } else {
            alert('Error deleting order. Please try again.');
        }
    })
    .catch(error => {
        alert('Error deleting order. Please try again.');
        console.error('Error:', error);
    });
}
