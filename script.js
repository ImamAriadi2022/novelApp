document.getElementById('orderForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const package = document.getElementById('package').value;
    const pribadi = document.getElementById('pribadi').value;

    let valid = true;
    if (!name) {
        document.getElementById('nameError').textContent = "Masukkan nama anda.";
        valid = false;
    } else {
        document.getElementById('nameError').textContent = "";
    }
    if (!pribadi) {
        document.getElementById('nameError').textContent = "Isilah data pribadi untuk novel";
        valid = false;
    } else {
        document.getElementById('nameError').textContent = "";
    }
    if (!email) {
        document.getElementById('emailError').textContent = "Masukan email anda";
        valid = false;
    } else {
        document.getElementById('emailError').textContent = "";
    }
    if (!package) {
        document.getElementById('packageError').textContent = "Pilihlah paket anda";
        valid = false;
    } else {
        document.getElementById('packageError').textContent = "";
    }

    if (valid) {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        // Header
        doc.setFontSize(18);
        doc.text('Invoice', 105, 20, null, null, 'center');

        // Draw a line under the header
        doc.setLineWidth(0.5);
        doc.line(20, 25, 190, 25);

        // Invoice details
        doc.setFontSize(12);
        doc.text(`Nama Pelanggan: ${name}`, 20, 40);
        doc.text(`Email: ${email}`, 20, 50);
        doc.text(`Paket: ${package}`, 20, 60);
        doc.text(`Data Pribadi: ${pribadi}`, 20, 60);

        // Add more styles, lines or rectangles if needed
        doc.setDrawColor(0, 0, 0);
        doc.setFillColor(230, 230, 230);
        doc.rect(15, 70, 180, 20, 'FD'); // Filled rectangle with border

        doc.text('terima kasih. silahkan kirim kan invoicenya ke admin', 20, 80);

        // Save and download the PDF
        doc.save('invoice.pdf');

        // Optional: Show success message
        document.getElementById('successMessage').textContent = "Pemesanan Berhasil";
        document.getElementById('successMessage').style.opacity = 1;
        setTimeout(() => {
            document.getElementById('successMessage').style.opacity = 0;
        }, 5000);
    }
});


//ini buat burger
// script.js<script>
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.getElementById('navMenu');

    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });
});
