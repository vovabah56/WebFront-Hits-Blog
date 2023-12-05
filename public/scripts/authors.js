import {ApiService} from "./ApiService.js";

export function loadAuthors() {
    const apiService = new ApiService();

    let answer = apiService.getAuthors();


    answer.then((data) => {
        if (data.body) {
            $("#authors").empty();
            addAuthorsCards($("#authors"), data.body, $("#author-card-template"));
        }
    })
}

function createBasicAuthorCard(author, template) {
    let authorCard = template.clone();

    authorCard.removeAttr("id");
    authorCard.removeClass("d-none");
    if (author.fullName) authorCard.find(".fullname").text(author.fullName);
    if (author.created) authorCard.find(".created").text(moment(new Date(author.created)).format('DD.MM.YYYY HH:mm'));
    if (author.birthDate) authorCard.find(".birth-date").text(moment(new Date(author.birthDate)).format('DD.MM.YYYY'));
    if (author.posts) authorCard.find(".post-value").text(author.posts);
    if (author.likes) authorCard.find(".like-value").text(author.likes);
    if (author.gender.toString() === "Male") {
        authorCard.find(".author-avatar").attr("src", "/public/images/man.jpg");
    } else {
        authorCard.find(".author-avatar").attr("src", "/public/images/womann.jpg");
    }


    return authorCard;
}

function addAuthorsCards(container, authors, template) {
    for (let author of authors) {
        let authorCard = createBasicAuthorCard(author, template);
        container.append(authorCard);
    }
}