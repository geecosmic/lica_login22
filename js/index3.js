const scriptURL = 'https://script.google.com/macros/s/AKfycbzwN-9yX5pburAn-YyNd1TLQgqkLpBmz6U6vUDv0pnbl7q4RsuW1Tn9VXs4jpXFuvrW/exec';

        document.getElementById('fetchForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const keyNumber = document.getElementById('keyNumber').value;
            // const form = document.querySelector('#editForm');
            fetch(scriptURL, {
                method: 'POST',
                body: new URLSearchParams({ action: 'fetchUserData', keyNumber: keyNumber })
            })
            .then(response => response.json())
            .then(data => {
                if (data.result === 'success') {
                    const user = data.user;
                    document.getElementById('editKeyNumber').value = user.keyNumber;
                    document.getElementById('editName').value = user.name;
                    document.getElementById('editDegree').value = user.degree;
                    document.getElementById('editStatus').value = user.status;
                    document.getElementById('editPhone').value = user.phone;
                    document.getElementById('editAddress').value = user.address;
                    document.getElementById('editOffice').value = user.office;
                    document.getElementById('editTAC').value = user.tac;
                    document.getElementById('editHM').value = user.hm;
                } else {
                    alert(data.error);
                }
            })
            .catch(error => alert('Error: ' + error.message));
        });

        document.getElementById('editForm').addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = new FormData(document.getElementById('editForm'));
            formData.append('action', 'updateUserData');

            fetch(scriptURL, {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.result === 'success') {
                    alert('Member updated successfully!');
                    document.getElementById('editForm').reset();
                    document.getElementById('fetchForm').reset();
                } else {
                    alert(data.error);
                }
                // form.reset();
            })
            .catch(error => alert('Error: ' + error.message));
        });