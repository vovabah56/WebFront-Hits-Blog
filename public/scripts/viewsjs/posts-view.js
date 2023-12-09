import AbstractView from "./AbstractView.js";
import { loadNavbar } from "../navbar.js";
import {loadPosts, submitFilterForm} from "../posts.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Посты");
        this.pathName = "/public/views/posts.html"
    }

    start() {
        loadNavbar();
        console.log(this.params);
        loadPosts(this.params.pageNum ? parseInt(this.params.pageNum) : 1);
        submitFilterForm()
    }
}