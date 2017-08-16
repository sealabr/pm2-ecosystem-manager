angular.module('app', ['ngRoute'])
    .config(function($locationProvider) {
        $locationProvider
            .html5Mode({
                enabled: true, // set HTML5 mode
                requireBase: false // I removed this to keep it simple, but you can set your own base url
            });
    })
    .config(function($routeProvider) {
        $routeProvider
            .when('/test', {templateUrl: 'test.html', controller: function() {
                console.log('On /test.');
            }})
            .when('/', {templateUrl: 'main.html', controller: 'MyTestCtrl'})
            .when('/firebase', {templateUrl: 'firebase.html', controller: 'FirebaseCtrl'})
            .otherwise('/');
    })
    .controller('MyTestCtrl', function ($scope) {
        self = $scope;
        self.val = 'TeSt';
        self.counter = 0;
        var self = self;
        self.clicked = function() {
            self.counter++;
        };
    })
    .controller('FirebaseCtrl', ['$scope','$http', function($scope,$http) {

         $http.get('/config/data.json')
            .then(function(res){
                $scope.formInfo.apiKey = res.data.apiKey;
                $scope.formInfo.authDomain = res.data.authDomain;  
                $scope.formInfo.databaseURL = res.data.databaseURL;  
                $scope.formInfo.projectId = res.data.projectId;  
                $scope.formInfo.storageBucket = res.data.storageBucket;  
                $scope.formInfo.messagingSenderId = res.data.messagingSenderId;  
                $scope.formInfo.projectId = res.data.projectId;  
        });

        $scope.formInfo = {};
        $scope.saveData = function() {

            var req = {
                method: 'GET',
                url: '/home/firebase',
                params: {
                    apiKey              : $scope.formInfo.apiKey,
                    authDomain          : $scope.formInfo.authDomain,
                    databaseURL         : $scope.formInfo.databaseURL,
                    projectId           : $scope.formInfo.projectId,
                    storageBucket       : $scope.formInfo.storageBucket,
                    messagingSenderId   : $scope.formInfo.messagingSenderId,
                    projectId           : $scope.formInfo.projectId
                }
            }

            // Simple GET request example:
            $http(req).then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available
              }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
              });

        };

    }]);