import angular from 'angular'
import 'angular-ui-router'
angular.module('stamenoApp', ['ui.router'])
    .config(($stateProvider, $urlRouterProvider) => {
        var index = 0;
        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('main', {
                url: '/',
                templateUrl: 'views/main.html',
                resolve: {
                    movieService: function ($http) {
                        return $http.get('/movie/' + index);
                    },
                    movieCount: function ($http){
                        return $http.get('/moviecount');
                    }
                },
                controller: function (movieService, movieCount, $location, $state, $http) {
                    this.stopNext = true;
                    this.stopPrevious = true;
                    this.movie = movieService.data;
                    this.movieCount = movieCount.data.count;
                    console.log('index: ' + index);
                    console.log('count: ' + this.movieCount);
                    if(index == this.movieCount - 1)
                    {
                        this.stopNext = false;
                    }

                    if(index == 0){
                        this.stopPrevious = false;
                    }
                    this.refresh = function () {
                        $state.reload();
                    };
                    this.next = function () {
                        index++;
                        $state.reload();
                    }
                    this.previous = function () {
                        index--;
                        $state.reload();
                    }
                    this.backClass = "bk-bookdefault";
                    var val = 'default';
                    this.toggleView = function () {
                        if (val == 'default') {
                            this.backClass = "bk-viewback";
                            val = 'back';
                        } else {
                            this.backClass = "bk-bookdefault";
                            val = 'default';
                        }

                    }
                },
                controllerAs: 'movieCtrl'
            });
    });

angular.module('stamenoApp')
    .controller('TestController', function () {
        var vm = this;
        // vm.test = 'Lan va Diep';
    })