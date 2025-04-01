document.getElementById('load').addEventListener('click', () => {
    fetch('http://localhost:8000/api/hello', {
        credentials: 'include'
    })
        .then(res => res.json())
        .then(data => {
            document.getElementById('msg').innerText = data.message;
        })
        .catch(err => console.error(err));
});