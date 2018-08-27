app.controller('details', ['$scope', 'movie', 'dataservice', function ($scope, movie, dataservice) {
    $scope.movie = movie;
    dataservice.getGenres().then(function (r) {
        $scope.genres = r.genres;
        $scope.getGenreNames();
    });
    $scope.genreNames = [];
    /*$scope.getGenreNames = function () {
        if ($scope.genres) {
            for (var i = 0; i < $scope.movie.genre_ids.length; i++) {
                for (var j = 0; j < $scope.genres.length; j++) {
                    if ($scope.genres[j].id == $scope.movie.genre_ids[i])
                        $scope.genreNames.push($scope.genres[j].name);
                }
            }
        }
    }*/
    $scope.getGenreNames = function(){
        if ($scope.genres) {
            $scope.genreNames = $scope.genres.filter(c=>$scope.movie.genre_ids.indexOf(c.id)!=-1).map(c=>c.name);
        }
    }
    dataservice.getVideos($scope.movie.id).then(function(r){
        if(r){
            $scope.trailer = r;
            $scope.trailerSrc = 'https://www.youtube.com/watch?v=' + $scope.trailer[0].key
        }
        else
            $scope.trailer = null;
    })
    dataservice.getReviews($scope.movie.id).then(function(r){
        if(r){
            $scope.reviews = r;
        }
        else
            $scope.reviews = false;
    })
    
    dataservice.getSimilar($scope.movie.id).then(function(r){
        if(r){
            $scope.similar = [];
            for(var i = 0; i < 4; i++)
                $scope.similar.push(r[i]);
        }
        else
            $scope.similar = false;
    })
}]);