app.factory("dataservice", ["$http", "$rootScope", function ($http, $rootScope) {
    var factory = {};
    var API_KEY = 'bc50218d91157b1ba4f142ef7baaa6a0';
    factory.getLatestMovies = function (page) {
        return $http.get("https://api.themoviedb.org/3/movie/now_playing?api_key=" + API_KEY + "&page=" + page).then(function (r) {
            return r.data;
        })
    };
    factory.getSearchResults = function (searchText, page) {
        return $http.get('https://api.themoviedb.org/3/search/movie?api_key=' + API_KEY + '&query=' + searchText + '&page=' + page).then(function (r) {
            return r.data;
        })
    };
    factory.getMovieDetails = function (movieId) {
        return $http.get('https://api.themoviedb.org/3/movie/' + movieId + '?api_key=' + API_KEY + '&append_to_response=trailers,reviews,similar').then(function (r) {
            return r.data;
        });
    };
    factory.getGenres = function () {
        return $http.get('https://api.themoviedb.org/3/genre/movie/list' + '?api_key=' + API_KEY).then(function (r) {
            return r.data;
        });
    }
    factory.getVideos = function(movieId){
        return $http.get('https://api.themoviedb.org/3/movie/'+ movieId +'/videos?api_key=' + API_KEY).then(function(r){
            return r.data.results;
        })
    }
    factory.getReviews = function(movieId){
        return $http.get('https://api.themoviedb.org/3/movie/'+ movieId +'/reviews?api_key=' + API_KEY).then(function(r){
            return r.data.results;
        })
    }
    factory.getSimilar = function(movieId){
        return $http.get('https://api.themoviedb.org/3/movie/'+ movieId +'/similar?api_key=' + API_KEY).then(function(r){
            return r.data.results;
        })
    }
    return factory;
}]);

