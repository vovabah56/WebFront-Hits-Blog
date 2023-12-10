import Login from './viewsjs/login-view.js';
import signupView from "./viewsjs/signup-view.js";
import groupsView from "./viewsjs/groups-view.js";
import authorsView from "./viewsjs/autors-view.js";
import postsView from "./viewsjs/posts-view.js";
import profileView from "./viewsjs/profile-view.js";
import postView from "./viewsjs/post-view.js";


$(window).bind('popstate', router);


$(document).ready(function () {
    preventDefaultLinksBehaviour();
    router();
});

function navigateTo(url) {
    history.pushState(null, null, url);
    router();
}

function pathToRegex(path) {
    return new RegExp(
        '^' +
        path
            .replace(/\//g, '\\/')
            .replace(':pageNum', '([1-9]+[0-9]*)')
            .replace(':id', '([0-9a-f-]*)') +
        '$',
    );
}

function getParams(match) {

    const values = match.resultMatch.slice(1);
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map((result) => result[1]);


    return Object.fromEntries(
        keys.map((key, i) => {
            return [key, values[i]];
        }),
    );
}

const routes = [
    { path: '/login', view: Login },
    {path: '/register', view: signupView},
    {path: '/groups', view: groupsView},
    {path: '/authors', view: authorsView},
    {path: '/:pageNum', view: postsView},
    {path: '/profile', view: profileView},
    {path: '/post/:id', view:postView}



];
async function router() {

    const potentialMatches = routes.map((route) => {
        return {
            route: route,
            resultMatch: location.pathname.match(pathToRegex(route.path)),
        };
    });

    let match = potentialMatches.find((potentialMatch) => potentialMatch.resultMatch != null);

    if (!match) {
        match = {
            route: routes[0],
            resultMatch: location.pathname,
        };
    }

    let view = new match.route.view(getParams(match));
    let html = await view.getHtml();
    $('main').html(html);
    view.start();
}

function preventDefaultLinksBehaviour() {
    $('body').click((e) => {
        if (e.target.matches('[data-link]')) {
            e.preventDefault();
            navigateTo(e.target.href);
        }

        if ($(e.target).hasClass('nav-link')) {
            $('.nav-link').removeClass('active');
            $(e.target).addClass('active');
        }
    });
}