angular.module('starter.services', [])


.service('GeolocationService', function ($q, $log, $ionicPlatform, $http, $cordovaGeolocation) {
 
    //현재 위치를 가져오는 것을 실패했을 때, 넘겨주는 좌표값
    var fallbackPositionObject = {
        latitude: '37.541',
        longitude: '126.986',
        accuracy: 0
    };
     
   //현재 위치를 얻는 함수
    this.getCurrentPosition = function (options) {
        var defer = $q.defer();
        options = options || {
            timeout: 10000,
            maximumAge: 0,
            enableHighAccuracy: false
        };
 
        $ionicPlatform.ready(function () {
            $cordovaGeolocation
                .getCurrentPosition(options)
                .then(
 
                    function (position) {
                        $log.debug('Got geolocation');
                        defer.resolve(position);
                    },
                    function (locationError) {
 
                        $log.debug('Did not get geolocation');
                        alert('errorMessage:::' + locationError.message);
                        defer.reject({
                            code: locationError.code,
                            message: locationError.message,
                            coords: fallbackPositionObject
                        });
                    }
                );
        });
 
        return defer.promise;
    };
 
    this.getDefaultPosition = function () {
        return fallbackPositionObject;
    };
 
    return this;
})

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'danger',
    lastText: 'seoul/yangchun',
 
  }, {
    id: 1,
    name: 'safe',
    lastText: 'seoul/gwanak',

  }, {
    id: 2,
    name: 'soso',
    lastText: 'busan/jagalchi',

  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});