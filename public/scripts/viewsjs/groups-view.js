import AbstractView from "../../../../untitled/public/scripts/viewsjs/AbstractView.js";

import { loadNavbar } from "../../../../untitled/public/scripts/navbar.js";
import {loadGroups} from "../groups.js";
export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Группы");
        this.pathName = '/public/views/groups.html';
    }

    start() {
        loadNavbar();
        loadGroups();
    }
}