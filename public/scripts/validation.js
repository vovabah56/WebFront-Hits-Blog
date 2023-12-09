export function validateForm() {
    $.validator.addMethod('dateLessCurrent', function(date) {
        return new Date(date) < new Date();
    }, 'Введите корректную дату');

    $.validator.addMethod('correct', function(name) {
        return name.match(/[a-zA-Z0-9]+/);
    }, 'Разрешено вводить только латинские символы');

    $("form").validate({
        rules: {
            fullName: {
                required: true,
                correct: true,
            },
            signupPassword: {
                required: true,
                minlength: 6
            },
            loginPassword: "required",
            phoneNumber: {
                required: true,
            },
            email: {
                required: true,
                email: true
            },
            name: "required",
            birthDate: {
                required: true,
                dateLessCurrent: true
            },
            reviewText: "required",
        },
        messages: {
            fullName: {
                required: "Введите имя",
            },
            signupPassword: {
                required: "Введите пароль",
                minlength: "Минимальная длина пароля - 6 символов"
            },
            loginPassword: "Введите пароль",
            phoneNumber:{
                required: "Введите номер телефона"
            },
            email: {
                required: "Введите email",
                email: "Введите корректный email"
            },
            name: "Введите ФИО",
            birthDate: {
                required: "Введите дату рождения",
            },
            reviewText: "Введите текст отзыва",
        }
    });
}
