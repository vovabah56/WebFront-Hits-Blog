export function getObjectFromInputs() {
    let inputs = $(".form-control");
    let objectData = {};

    for (let input of inputs) {
        if ($(input).hasClass("error")) {
            return null;
        }
        let key = $(input).attr("id");
        let value = $(input).val()
        objectData[key] = value;
    }
    return objectData;
}
$(document).ready(function () {
    submitAuthorizationForm()
});
async function ApiLogin(body) {
    try {
        const response = await fetch(`https://blog.kreosoft.space/api/account/login`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body)
        });

        let data = {};

        if (!response.ok) {
            data.error = response;
        } else {
            data.body = response;
        }

        if (data.body) {
            data.body = await data.body.json();
        } else if (data.error) {
            data.error = await data.error.json();
        }

        return (data);
    } catch (error) {
        console.log(error);
    }
}

export function submitAuthorizationForm() {


    $("form").submit(function (event) {
        event.preventDefault();
        $(".notification").remove();

        let objectData = getObjectFromInputs();
        if (objectData) {
            let answer = ApiLogin(objectData);

            answer.then((data) => {
                console.log(data)
                if (data.body) {
                    saveToken(data.body);
                } else {
                    addError(event.target.id);
                }
            });
        }
    });
};

function saveToken(data) {
    localStorage.setItem("token", data.token);
}

function addError(id) {
    let errorMessage = {
        "login-form": "Неверный логин или пароль",
    };

    $("form").append(`
        <p class="notification error mt-3">${errorMessage[id]}</p>
    `);
}
