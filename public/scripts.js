const setStorage = res => {
    sessionStorage.setItem("token", res.data.access_token);
    sessionStorage.setItem("issued", new Date().getTime());
    sessionStorage.setItem("user", JSON.stringify(res.data.user));
};

document.getElementById("reg-submit").addEventListener("click", e => {
    e.preventDefault();
    axios.post("/api/register", {
        name: document.getElementById("reg-name").value,
        email: document.getElementById("reg-email").value,
        password: btoa(document.getElementById("reg-password").value)
    }).then(res => {
        setStorage(res);
        alert("Registration Successful!");
        window.location.assign("/profile");
    }).catch(err => alert("RegistrationError: " + err));
});

document.getElementById("lg-submit").addEventListener("click", e => {
    e.preventDefault();
    axios.post("/api/login", {
        email: document.getElementById("lg-email").value,
        password: btoa(document.getElementById("lg-password").value)
    }).then(res => {
        setStorage(res);
        alert("Login Successful!");
        window.location.assign("/profile");
    }).catch(err => alert("LoginError: " + err));
});

document.getElementById("reg-show").addEventListener("click", () => {
    document.getElementById("login-form").style.display = "none";
    document.getElementById("register-form").style.display = "block";
});

document.getElementById("lg-show").addEventListener("click", () => {
    document.getElementById("register-form").style.display = "none";
    document.getElementById("login-form").style.display = "block";
});

if (sessionStorage.getItem("user")) window.location.assign("/profile");