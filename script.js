document.getElementById('orderForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const package = document.getElementById('package').value;

    let valid = true;
    if (!name) {
        document.getElementById('nameError').textContent = "Name is required.";
        valid = false;
    } else {
        document.getElementById('nameError').textContent = "";
    }
    if (!email) {
        document.getElementById('emailError').textContent = "Email is required.";
        valid = false;
    } else {
        document.getElementById('emailError').textContent = "";
    }
    if (!package) {
        document.getElementById('packageError').textContent = "Package is required.";
        valid = false;
    } else {
        document.getElementById('packageError').textContent = "";
    }

    if (valid) {
        const orderData = { name, email, package };
        fetch('https://script.google.com/macros/s/AKfycbyaCi_XOzCe7GXXsq-3BcgvQsxVNB-Yz_NS8msDfQJ-F6gkTW6X5qBZ3Pnccf5EsPcv/exec', {
            method: 'POST',
            body: JSON.stringify(orderData),
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                const { jsPDF } = window.jspdf;
                const doc = new jsPDF();

                doc.text('Invoice', 20, 20);
                doc.text(`Name: ${name}`, 20, 30);
                doc.text(`Email: ${email}`, 20, 40);
                doc.text(`Package: ${package}`, 20, 50);

                doc.save('invoice.pdf');
                
                document.getElementById('successMessage').textContent = "Order submitted successfully!";
                document.getElementById('successMessage').style.opacity = 1;
                setTimeout(() => {
                    document.getElementById('successMessage').style.opacity = 0;
                }, 5000);
            } else {
                alert('Error submitting order. Please try again.');
            }
        })
        .catch(error => {
            alert('Error submitting order. Please try again.');
            console.error('Error:', error);
        });
    }
});
