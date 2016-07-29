import angular from 'angular'
import 'angular-ui-router'
angular.module('stamenoApp', ['ui.router'])
    .config(($stateProvider, $urlRouterProvider) => {
        var index = 0;
        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('main', {
                url: '/',
                templateUrl: 'views/test.html',
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
                    this.backClass = "";
                    var val = 'default';
                    this.toggleView = function () {
                        if (val == 'default') {
                            this.backClass = "flipped";
                            val = 'back';
                        } else {
                            this.backClass = "";
                            val = 'default';
                        }

                    }
                },
                controllerAs: 'movieCtrl'
            });
    });
