import {ProfileService} from "../services/profile-service.js";

export default class ProfileAdapter {
    static create() {
        return new ProfileAdapter();
    }

    constructor() {
        this.profileService = ProfileService.create()
    }

    me() {
        return this.profileService.me()
    }

    search(text) {
        return this.profileService.search(text)
    }

}