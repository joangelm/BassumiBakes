function insertHTMLAndScripts(element, html) {
    element.innerHTML = html;
    const scripts = element.getElementsByTagName('script');
    for (let i = 0; i < scripts.length; i++) {
        if (scripts[i].innerText) {
            eval(scripts[i].innerText);
        } else {
            eval(scripts[i].textContent);
        }
    }
}

// Fetch and insert header
fetch('header.html')
    .then(response => response.text())
    .then(html => insertHTMLAndScripts(document.getElementById('header'), html));

// Fetch and insert footer
fetch('footer.html')
    .then(response => response.text())
    .then(html => document.getElementById('footer').innerHTML = html);


function login() {
    location.href = '/login.html';
}


function logout() {
    // Clear accessToken from localStorage
    localStorage.removeItem('token');
    // Reload the page to update the header
    location.reload();
}

    // Get the token from localStorage
const token = JSON.parse(localStorage.getItem('token'));
const accessToken = token?.accessToken;
// Parse the token to extract the isAdmin field
const isAdmin = token && token.isAdmin;