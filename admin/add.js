document.getElementById('novelForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const title = document.getElementById('novelTitle').value;
    const image = document.getElementById('novelImage').value;

    if (title && image) {
        const novelData = { title, image, action: 'addNovel' };
        fetch('https://script.google.com/macros/s/AKfycbyaCi_XOzCe7GXXsq-3BcgvQsxVNB-Yz_NS8msDfQJ-F6gkTW6X5qBZ3Pnccf5EsPcv/exec', {
            method: 'POST',
            body: JSON.stringify(novelData),
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                alert('Novel added successfully!');
                document.getElementById('novelForm').reset();
            } else {
                alert('Error adding novel. Please try again.');
            }
        })
        .catch(error => {
            alert('Error adding novel. Please try again.');
            console.error('Error:', error);
        });
    }
});

document.getElementById('packageForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const title = document.getElementById('packageTitle').value;
    const image = document.getElementById('packageImage').value;

    if (title && image) {
        const packageData = { title, image, action: 'addPackage' };
        fetch('https://script.google.com/macros/s/AKfycbyaCi_XOzCe7GXXsq-3BcgvQsxVNB-Yz_NS8msDfQJ-F6gkTW6X5qBZ3Pnccf5EsPcv/exec', {
            method: 'POST',
            body: JSON.stringify(packageData),
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                alert('Package added successfully!');
                document.getElementById('packageForm').reset();
            } else {
                alert('Error adding package. Please try again.');
            }
        })
        .catch(error => {
            alert('Error adding package. Please try again.');
            console.error('Error:', error);
        });
    }
});
