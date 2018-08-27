var app = angular.module('app', ['ngMaterial', 'ngYoutubeEmbed'])

app.config(['$mdThemingProvider', function ($mdThemingProvider) {
	$mdThemingProvider.theme('default')
		.primaryPalette('red', {
			'default': '800'
		})
		.accentPalette('grey', {
			'default': '600'
		})
		.warnPalette('red');
}]);
app.controller('controller', ['$scope', '$rootScope', '$mdSidenav', '$mdDialog', 'dataservice', '$http', '$timeout', '$anchorScroll', '$location', function ($scope, $rootScope, $mdSidenav, $mdDialog, dataservice, $http, $timeout, $anchorScroll, $location) {
	$scope.Loaded = false;
	$scope.page = $scope.page || 1;
	$scope.dataservice = dataservice;

	$scope.loadMovies = function (dir) {
		if (dir == 'pre')
			$scope.page--;
		else if (dir == 'next')
			$scope.page++;
		else
			$scope.page = 1;
		$scope.dataservice.getLatestMovies($scope.page).then(function (r) {
			$location.hash('scrollToDivID');
			$anchorScroll();
			$scope.currMovies = r.results;
			if (r.results) {
				$scope.Loaded = true;
			}
		});
	}

	$scope.loadMovies();

	$scope.showDetails = function (ev, movie) {
		$mdDialog.show({
			locals: { movie: movie },
			controller: 'details',
			templateUrl: './views/details.html',
			parent: angular.element(document.body),
			targetEvent: ev,
			clickOutsideToClose: true,
			fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
		}).then(function (answer) {
			$scope.status = 'You said the information was "' + answer + '".';
		}, function () {
			$scope.status = 'You cancelled the dialog.';
		});
	}

	$scope.$watch('searchStr', function (nVal, oVal) {
		if (nVal !== oVal && nVal != "") {
			$scope.Loaded = false;
			$timeout(function () {
				if (nVal === $scope.searchStr) {
					$scope.dataservice.getSearchResults(nVal).then(function (r) {
						$scope.currMovies = r.results;
						if (r.results) {
							$scope.Loaded = true;
						}
					})
				}
			}, 1000);
		}
		if (nVal == "") {
			$scope.Loaded = false;
			$scope.dataservice.getLatestMovies(1).then(function (r) {
				$scope.currMovies = r.results;
				if (r.results) {
					$scope.Loaded = true;
				}
			});
		}
	});
}]);