import angular from 'angular'
import 'angular-ui-router'
angular.module('stamenoApp', ['ui.router'])
    .config(($stateProvider, $urlRouterProvider) => {
        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('main', {
                url: '/',
                templateUrl: 'views/main.html',
                resolve: {
                    movieService: function ($http) {
                        return $http.get('/movie');
                    }
                },
                controller: function (movieService, $location, $state) {
                    this.movie = movieService.data;
                    this.refresh = function () {
                        $state.reload();
                    };
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