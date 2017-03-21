var app = angular.module('appClient', []);
app.controller('menuController', ['$scope', '$http', function ($scope, $http) {
    $scope.ClientMenu = [];
    $http.get('/client/GetSiteMenus').then(function (data) {
        $scope.ClientMenu = data.data;
    }, function (error) {
        alert('Error');
    })
}])