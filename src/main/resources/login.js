let accessToken = "";
let form = document.getElementById("formData");
let form1 = document.getElementById("formData1");

function showFormRegister() {
    $('#registerModal').modal('show');

}

function register() {
    let formData = new FormData(form1)
    let user = {
        username: formData.get("username1"),
        password: formData.get("password1"),
        confirmPassword: formData.get("password1"),
    }
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        type: "POST",
        url: "http://localhost:8080/register",
        data: JSON.stringify(user),
        success: function () {
            $('#registerModal').modal('hide');
            showFormLogin();
        },

    })
}

function showFormLogin() {
    $("#loginModal").modal('show');
}


function login() {
    let formData = new FormData(form)
    let user = {
        username: formData.get("username"),
        password: formData.get("password"),
    }
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        type: "POST",
        url: "http://localhost:8080/login",
        data: JSON.stringify(user),
        success: function (data) {
            $('#loginModal').modal('hide');
            alert("ok")
            accessToken = data.accessToken;
            console.log(accessToken);
        },

    })

}
let display = document.getElementById('display');
function findAll(){
    $.ajax({
        headers: {

            'Authorization': 'Bearer ' + accessToken,
        },
        type: "GET",
        url: "http://localhost:8080/users",
        success: function (data) {
            let str = "";
            for (let i = 0; i <data.length; i++) {
                str += `<tr>
                            <th scope="row">${i+1}</th>
                            <td>${data[i].username}</td>
                            <td>${data[i].password}</td>
                        </tr>`;
            }
            console.log(data);
            display.innerHTML = str;
        }, error: function () {
            console.log(accessToken);
        }
    })
}

function checkToken() {
    if (accessToken != "") {
        findAll();
    } else {
        alert("Không có quyền");
    }
}



