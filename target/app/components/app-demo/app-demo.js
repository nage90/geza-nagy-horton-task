/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var ngCore = require('@angular/core');
var AppService = require('app/services/app.service.js');
var ApiService = require('app/services/api.service.js');

/**
 * AppDemo constructor.
 *
 * @param AppService            The app service module.
 * @param ApiService            The api service module - responsible for http calls
 * @constructor
 */
function AppDemo(AppService, ApiService) {

    var _self = this;
    this.appService = AppService;
    this.apiService = ApiService;
    this.searchText = "ngx-seed";
    this.searchInProgress = false;
    this.totalCount = 0;
    this.showChart = false;

    this.searchRepositories = function () {

        if(!_self.searchText.length){
            return;
        }

        _self.searchInProgress = true;
        _self.apiService.searchRepositories(_self.searchText).subscribe(function (response) {
            var responseBody = response.json();
            _self.repositories = responseBody.items;
            _self.totalCount = responseBody.total_count;
            _self.searchInProgress = false;
            _self.showChart = false;
        });
    };

    this.searchRepositories();

    this.clearSearch = function(){
        _self.searchText = "";
        _self.repositories = [];
    };

    this.openUrl = function(url){
        window.open(url, '_blank').focus();
    };

    this.getRepositoryIssues = function (repository) {

        if (!repository.owner || !repository.owner.login) {
            return;
        }


        repository.showIssues = true;

        if(repository.issues){
           return;
        }
        repository.getIssuesInProgress = true;

        _self.apiService.getIssuesByRepository(repository.owner.login, repository.name).subscribe(function (response) {
            repository.getIssuesInProgress = false;
            var responseBody = response.json();
            repository.issues = responseBody.items;
        });

    };

    this.toggleChartVisibility = function () {
        _self.showChart = !_self.showChart;
    };

};

AppDemo.prototype = {
    constructor: AppDemo,

    /**
     * Respond after Angular checks the component's views and child views
     */
    ngAfterViewChecked: function () {
        this.appService.inProgress = false;
    }
};

AppDemo.annotations = [
    new ngCore.Component({
        template: require('./app-demo.html!text')
    })
];

AppDemo.parameters = [
    AppService, ApiService
];

module.exports = AppDemo;
