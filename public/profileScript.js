if (!sessionStorage.getItem("user")) window.location.assign("../");
if ((new Date().getTime() - parseInt(sessionStorage.getItem("issued"))) >= (60 * 1000)) {
    sessionStorage.clear(); location.reload();
};

setTimeout(() => {
    if (sessionStorage.getItem("user") && ((new Date().getTime() - parseInt(sessionStorage.getItem("issued"))) >= (30 * 1000))) {
        const password = prompt("Enter password:");
        if (password) {
            axios.post("../api/login", {
                email: JSON.parse(sessionStorage.getItem("user")).email,
                password: btoa(password)
            });
        } else {
            sessionStorage.clear(); location.reload();
        }
    }
}, 1000);

const setStorage = res => {
    sessionStorage.setItem("token", res.data.access_token);
    sessionStorage.setItem("issued", new Date().getTime());
    sessionStorage.setItem("user", JSON.stringify(res.data.user));
};

for (let key of Object.keys(JSON.parse(sessionStorage.getItem("user")))) {
    if (key !== "id") {
        const listItem = document.createElement("div");
        listItem.classList.add("col");
        listItem.classList.add("s12");
        listItem.innerHTML = `
                <strong>${key.toUpperCase()}</strong>: ${JSON.parse(sessionStorage.getItem("user"))[key]}
        `;
        document.getElementById("userdata").appendChild(listItem);
    }
}


document.getElementById("del-profile").addEventListener("click", () => {
    axios.delete("../api/delete", {
        headers: { Authorization: "Bearer " + sessionStorage.getItem("token") },
        data: {
            email: JSON.parse(sessionStorage.getItem("user")).email,
            password: btoa(prompt("Enter your password:"))
        }
    }).then(res => {
        alert(res.data.message);
        sessionStorage.clear();
        window.location.assign("../");
    }).catch(err => alert("DeleteError: " + err));
});

document.getElementById("name-profile").addEventListener("click", () => {
    axios.put("../api/update", {
        email: JSON.parse(sessionStorage.getItem("user")).email,
        newName: prompt("Enter new name:"),
        password: btoa(prompt("Enter your password:"))
    }, { headers: { Authorization: "Bearer " + sessionStorage.getItem("token") } },
    ).then(res => {
        setStorage(res);
        location.reload();
    }).catch(err => alert("UpdateError: " + err));
});

document.getElementById("email-profile").addEventListener("click", () => {
    axios.put("../api/update", {
        email: JSON.parse(sessionStorage.getItem("user")).email,
        newEmail: prompt("Enter new e-mail:"),
        password: btoa(prompt("Enter your password:"))
    }, { headers: { Authorization: "Bearer " + sessionStorage.getItem("token") } },
    ).then(res => {
        setStorage(res);
        location.reload();
    }).catch(err => alert("UpdateError: " + err));
});

let i = 58 - (Math.floor((new Date().getTime() - parseInt(sessionStorage.getItem("issued"))) / 1000));
setInterval(() => {
    document.getElementById("timer").innerHTML = i-- + "s";
    if (i <= 5) {
        document.getElementById("timer").innerHTML = "<i class='fa fa-reload'></i>";
        sessionStorage.clear();
        location.reload();
    }
}, 1000);