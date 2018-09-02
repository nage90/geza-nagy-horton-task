
var http = require('@angular/http');
const SERVER_URL = "https://api.github.com/search";


/**
 * ApiService - this service includes Github API call
 */

function ApiService(http) {

    this.searchRepositories = function (searchText) {
        return http.get(SERVER_URL + "/repositories?q=" + searchText);
    };

    this.getIssuesByRepository = function (userName, repositoryName) {
        return http.get(SERVER_URL + "/issues?q=repo:" + userName + "/" + repositoryName);
    }
}

ApiService.prototype = {
    constructor: ApiService
};

ApiService.parameters = [
    http.Http
];



module.exports = ApiService;
