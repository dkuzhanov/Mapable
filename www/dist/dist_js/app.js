// Ionic Starter App

angular.module('underscore', [])
.factory('_', function() {
  return window._; // assumes underscore has already been loaded on the page
});

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('MapAble', ['ionic', 'angularMoment', 'leaflet-directive', 'MapAble.controllers', 'MapAble.directives', 'MapAble.filters', 'MapAble.services', 'MapAble.factories', 'MapAble.config', 'underscore', 'ngMap', 'ngResource', 'ngCordova', 'templates', 'slugifier'])

.run(['$ionicPlatform', 'PushNotificationsService', function($ionicPlatform, PushNotificationsService) {

  $ionicPlatform.on("deviceready", function(){
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

    PushNotificationsService.register();
  });

  $ionicPlatform.on("resume", function(){
    PushNotificationsService.register();
  });
}])


.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $stateProvider

  // //INTRO
//   .state('walkthrough', {
//     url: "/",
//     templateUrl: "walkthrough.html",
//     controller: 'WalkthroughCtrl'
//   })
//
//   .state('login', {
//     url: "/login",
//     templateUrl: "login.html",
//     controller: 'LoginCtrl'
//   })
//
//   .state('signup', {
//     url: "/signup",
//     templateUrl: "signup.html",
//     controller: 'SignupCtrl'
//   })
//
//   .state('forgot-password', {
//     url: "/forgot-password",
//     templateUrl: "forgot-password.html",
//     controller: 'ForgotPasswordCtrl'
//   })

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "side-menu.html",
    controller: 'AppCtrl'
  })

  //LAYOUTS
  .state('app.main', {
    url: "/main",
    views: {
      'menuContent': {
        templateUrl: "main.html",
        controller: 'MapController'
      }
    }
  })

  //LAYOUTS
  .state('app.layouts', {
    url: "/layouts",
    views: {
      'menuContent': {
        templateUrl: "layouts.html",
        controller: 'MapController'
      }
    }
  })

  //LAYOUTS
  .state('app.population', {
    url: "/layouts",
    views: {
      'menuContent': {
        templateUrl: "Population_layout.html"
      }
    }
  })


  .state('app.nationalities', {
    url: "/layouts/slider",
    views: {
      'menuContent': {
        templateUrl: "Map2.html",
        controller: 'MapController'
      }
    }
  })



  //FEEDS
  .state('app.feeds-categories', {
    url: "/feeds-categories",
    views: {
      'menuContent': {
        templateUrl: "feeds-categories.html",
        controller: 'FeedsCategoriesCtrl'
      }
    }
  })

  .state('app.category-feeds', {
    url: "/category-feeds/:categoryId",
    views: {
      'menuContent': {
        templateUrl: "category-feeds.html",
        controller: 'CategoryFeedsCtrl'
      }
    }
  })

  .state('app.feed-entries', {
    url: "/feed-entries/:categoryId/:sourceId",
    views: {
      'menuContent': {
        templateUrl: "feed-entries.html",
        controller: 'FeedEntriesCtrl'
      }
    }
  })


  //WORDPRESS
  .state('app.wordpress', {
    url: "/wordpress",
    views: {
      'menuContent': {
        templateUrl: "wordpress.html",
        controller: 'WordpressCtrl'
      }
    }
  })

  .state('app.post', {
    url: "/wordpress/:postId",
    views: {
      'menuContent': {
        templateUrl: "wordpress_post.html",
        controller: 'WordpressPostCtrl'
      }
    }
  })


  //OTHERS
  .state('app.settings', {
    url: "/settings",
    views: {
      'menuContent': {
        templateUrl: "settings.html",
        controller: 'SettingsCtrl'
      }
    }
  })

  .state('app.forms', {
    url: "/forms",
    views: {
      'menuContent': {
        templateUrl: "forms.html",
        controller: 'FormsCtrl'
      }
    }
  })

  .state('app.profile', {
    url: "/profile",
    views: {
      'menuContent': {
        templateUrl: "profile.html",
        controller: 'ProfileCtrl'
      }
    }
  })

  .state('app.bookmarks', {
    url: "/bookmarks",
    views: {
      'menuContent': {
        templateUrl: "bookmarks.html",
        controller: 'BookMarksCtrl'
      }
    }
  })

;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/main');
}]);

angular.module('MapAble.controllers', [])

// APP
.controller('AppCtrl', ['$scope', function($scope) {

}])
// WALKTHROUGH
.controller('WalkthroughCtrl', ['$scope', '$state', function($scope, $state) {
	$scope.goToLogIn = function(){
		$state.go('login');
	};

	$scope.goToSignUp = function(){
		$state.go('signup');
	};
}])

.controller('LoginCtrl', ['$scope', '$state', '$templateCache', '$q', '$rootScope', function($scope, $state, $templateCache, $q, $rootScope) {
	$scope.goToSignUp = function(){
		$state.go('signup');
	};

	$scope.goToForgotPassword = function(){
		$state.go('forgot-password');
	};

	$scope.doLogIn = function(){
		$state.go('app.feeds-categories');
	};

	$scope.user = {};

	$scope.user.email = "john@doe.com";
	$scope.user.pin = "12345";

	// We need this for the form validation
	$scope.selected_tab = "";

	$scope.$on('my-tabs-changed', function (event, data) {
		$scope.selected_tab = data.title;
	});

}])

.controller('SignupCtrl', ['$scope', '$state', function($scope, $state) {
	$scope.user = {};

	$scope.user.email = "john@doe.com";

	$scope.doSignUp = function(){
		$state.go('app.feeds-categories');
	};

	$scope.goToLogIn = function(){
		$state.go('login');
	};
}])

.controller('ForgotPasswordCtrl', ['$scope', '$state', function($scope, $state) {
	$scope.recoverPassword = function(){
		$state.go('app.feeds-categories');
	};

	$scope.goToLogIn = function(){
		$state.go('login');
	};

	$scope.goToSignUp = function(){
		$state.go('signup');
	};

	$scope.user = {};
}])


.controller('RateApp', ['$scope', function($scope) {
	$scope.rateApp = function(){
		if(ionic.Platform.isIOS()){
			//you need to set your own ios app id
			AppRate.preferences.storeAppURL.ios = '1234555553>';
			AppRate.promptForRating(true);
		}else if(ionic.Platform.isAndroid()){
			//you need to set your own android app id
			AppRate.preferences.storeAppURL.android = 'market://details?id=ionFB';
			AppRate.promptForRating(true);
		}
	};
}])

.controller('SendMailCtrl', ['$scope', function($scope) {
	$scope.sendMail = function(){
		cordova.plugins.email.isAvailable(
			function (isAvailable) {
				// alert('Service is not available') unless isAvailable;
				cordova.plugins.email.open({
					to:      'envato@startapplabs.com',
					cc:      'hello@startapplabs.com',
					// bcc:     ['john@doe.com', 'jane@doe.com'],
					subject: 'Greetings',
					body:    'How are you? Nice greetings from IonFullApp'
				});
			}
		);
	};
}])


.controller('AdsCtrl', ['$scope', '$ionicActionSheet', 'AdMob', 'iAd', function($scope, $ionicActionSheet, AdMob, iAd) {

	$scope.manageAdMob = function() {

		// Show the action sheet
		var hideSheet = $ionicActionSheet.show({
			//Here you can add some more buttons
			buttons: [
				{ text: 'Show Banner' },
				{ text: 'Show Interstitial' }
			],
			destructiveText: 'Remove Ads',
			titleText: 'Choose the ad to show',
			cancelText: 'Cancel',
			cancel: function() {
				// add cancel code..
			},
			destructiveButtonClicked: function() {
				console.log("removing ads");
				AdMob.removeAds();
				return true;
			},
			buttonClicked: function(index, button) {
				if(button.text == 'Show Banner')
				{
					console.log("show banner");
					AdMob.showBanner();
				}

				if(button.text == 'Show Interstitial')
				{
					console.log("show interstitial");
					AdMob.showInterstitial();
				}

				return true;
			}
		});
	};

	$scope.manageiAd = function() {

		// Show the action sheet
		var hideSheet = $ionicActionSheet.show({
			//Here you can add some more buttons
			buttons: [
			{ text: 'Show iAd Banner' },
			{ text: 'Show iAd Interstitial' }
			],
			destructiveText: 'Remove Ads',
			titleText: 'Choose the ad to show - Interstitial only works in iPad',
			cancelText: 'Cancel',
			cancel: function() {
				// add cancel code..
			},
			destructiveButtonClicked: function() {
				console.log("removing ads");
				iAd.removeAds();
				return true;
			},
			buttonClicked: function(index, button) {
				if(button.text == 'Show iAd Banner')
				{
					console.log("show iAd banner");
					iAd.showBanner();
				}
				if(button.text == 'Show iAd Interstitial')
				{
					console.log("show iAd interstitial");
					iAd.showInterstitial();
				}
				return true;
			}
		});
	};
}])

.controller('InAppBrowserCtrl', ['$scope', function($scope) {
	$scope.openBrowser = function(){
		window.open('http://www.google.com', '_blank', 'location=yes');
	};
}])

// FEED
//brings all feed categories
.controller('FeedsCategoriesCtrl', ['$scope', '$http', function($scope, $http) {
	$scope.feeds_categories = [];

	$http.get('feeds-categories.json').success(function(response) {
		$scope.feeds_categories = response;
	});
}])

//bring specific category providers
.controller('CategoryFeedsCtrl', ['$scope', '$http', '$stateParams', function($scope, $http, $stateParams) {
	$scope.category_sources = [];

	$scope.categoryId = $stateParams.categoryId;

	$http.get('feeds-categories.json').success(function(response) {
		var category = _.find(response, {id: $scope.categoryId});
		$scope.categoryTitle = category.title;
		$scope.category_sources = category.feed_sources;
	});
}])

//this method brings posts for a source provider
.controller('FeedEntriesCtrl', ['$scope', '$stateParams', '$http', 'FeedList', '$q', '$ionicLoading', 'BookMarkService', function($scope, $stateParams, $http, FeedList, $q, $ionicLoading, BookMarkService) {
	$scope.feed = [];

	var categoryId = $stateParams.categoryId,
			sourceId = $stateParams.sourceId;

	$scope.doRefresh = function() {

		$http.get('feeds-categories.json').success(function(response) {

			$ionicLoading.show({
				template: 'Loading entries...'
			});

			var category = _.find(response, {id: categoryId }),
					source = _.find(category.feed_sources, {id: sourceId });

			$scope.sourceTitle = source.title;

			FeedList.get(source.url)
			.then(function (result) {
				$scope.feed = result.feed;
				$ionicLoading.hide();
				$scope.$broadcast('scroll.refreshComplete');
			}, function (reason) {
				$ionicLoading.hide();
				$scope.$broadcast('scroll.refreshComplete');
			});
		});
	};

	$scope.doRefresh();

	$scope.readMore = function(link){
		window.open(link, '_blank', 'location=yes');
	};

	$scope.bookmarkPost = function(post){
		$ionicLoading.show({ template: 'Post Saved!', noBackdrop: true, duration: 1000 });
		BookMarkService.bookmarkFeedPost(post);
	};
}])


// Multimedia
.controller('MultimediaCtrl', ['$scope', function($scope) {

}])

// SETTINGS
.controller('SettingsCtrl', ['$scope', '$ionicActionSheet', '$state', function($scope, $ionicActionSheet, $state) {
	$scope.airplaneMode = true;
	$scope.wifi = false;
	$scope.bluetooth = true;
	$scope.personalHotspot = true;

	$scope.checkOpt1 = true;
	$scope.checkOpt2 = true;
	$scope.checkOpt3 = false;

	$scope.radioChoice = 'B';

	// Triggered on a the logOut button click
	$scope.showLogOutMenu = function() {

		// Show the action sheet
		var hideSheet = $ionicActionSheet.show({
			//Here you can add some more buttons
			// buttons: [
			// { text: '<b>Share</b> This' },
			// { text: 'Move' }
			// ],
			destructiveText: 'Logout',
			titleText: 'Are you sure you want to logout? This app is awsome so I recommend you to stay.',
			cancelText: 'Cancel',
			cancel: function() {
				// add cancel code..
			},
			buttonClicked: function(index) {
				//Called when one of the non-destructive buttons is clicked,
				//with the index of the button that was clicked and the button object.
				//Return true to close the action sheet, or false to keep it opened.
				return true;
			},
			destructiveButtonClicked: function(){
				//Called when the destructive button is clicked.
				//Return true to close the action sheet, or false to keep it opened.
				$state.go('login');
			}
		});

	};
}])

// FORMS
.controller('FormsCtrl', ['$scope', function($scope) {

}])

// PROFILE
.controller('ProfileCtrl', ['$scope', function($scope) {

}])


// BOOKMARKS
.controller('BookMarksCtrl', ['$scope', '$rootScope', 'BookMarkService', '$state', function($scope, $rootScope, BookMarkService, $state) {

	$scope.bookmarks = BookMarkService.getBookmarks();

	// When a new post is bookmarked, we should update bookmarks list
	$rootScope.$on("new-bookmark", function(event){
		$scope.bookmarks = BookMarkService.getBookmarks();
	});

	$scope.goToFeedPost = function(link){
		window.open(link, '_blank', 'location=yes');
	};
	$scope.goToWordpressPost = function(postId){
		$state.go('app.post', {postId: postId});
	};
}])

// SLIDER
.controller('SliderCtrl', ['$scope', '$http', '$ionicSlideBoxDelegate', function($scope, $http, $ionicSlideBoxDelegate) {

}])

// WORDPRESS
.controller('WordpressCtrl', ['$scope', '$http', '$ionicLoading', 'PostService', 'BookMarkService', function($scope, $http, $ionicLoading, PostService, BookMarkService) {
	$scope.posts = [];
	$scope.page = 1;
	$scope.totalPages = 1;

	$scope.doRefresh = function() {
		$ionicLoading.show({
			template: 'Loading posts...'
		});

		//Always bring me the latest posts => page=1
		PostService.getRecentPosts(1)
		.then(function(data){

			$scope.totalPages = data.pages;
			$scope.posts = PostService.shortenPosts(data.posts);

			$ionicLoading.hide();
			$scope.$broadcast('scroll.refreshComplete');
		});
	};

	$scope.loadMoreData = function(){
		$scope.page += 1;

		PostService.getRecentPosts($scope.page)
		.then(function(data){
			//We will update this value in every request because new posts can be created
			$scope.totalPages = data.pages;
			var new_posts = PostService.shortenPosts(data.posts);
			$scope.posts = $scope.posts.concat(new_posts);

			$scope.$broadcast('scroll.infiniteScrollComplete');
		});
	};

	$scope.moreDataCanBeLoaded = function(){
		return $scope.totalPages > $scope.page;
	};

	$scope.bookmarkPost = function(post){
		$ionicLoading.show({ template: 'Post Saved!', noBackdrop: true, duration: 1000 });
		BookMarkService.bookmarkWordpressPost(post);
	};

	$scope.doRefresh();
}])

// WORDPRESS POST
.controller('WordpressPostCtrl', ['$scope', '$http', '$stateParams', 'PostService', '$ionicLoading', function($scope, $http, $stateParams, PostService, $ionicLoading) {

	$ionicLoading.show({
		template: 'Loading post...'
	});

	var postId = $stateParams.postId;
	PostService.getPost(postId)
	.then(function(data){
		$scope.post = data.post;
		$ionicLoading.hide();
	});

	$scope.sharePost = function(link){
		window.plugins.socialsharing.share('Check this post here: ', null, null, link);
	};
}])


.controller('ImagePickerCtrl', ['$scope', '$rootScope', '$cordovaCamera', function($scope, $rootScope, $cordovaCamera) {

	$scope.images = [];

	$scope.selImages = function() {

		window.imagePicker.getPictures(
			function(results) {
				for (var i = 0; i < results.length; i++) {
					console.log('Image URI: ' + results[i]);
					$scope.images.push(results[i]);
				}
				if(!$scope.$$phase) {
					$scope.$apply();
				}
			}, function (error) {
				console.log('Error: ' + error);
			}
		);
	};

	$scope.removeImage = function(image) {
		$scope.images = _.without($scope.images, image);
	};

	$scope.shareImage = function(image) {
		window.plugins.socialsharing.share(null, null, image);
	};

	$scope.shareAll = function() {
		window.plugins.socialsharing.share(null, null, $scope.images);
	};
}])


// LAYOUTS
.controller('LayoutsCtrl', ['$scope', function($scope) {

}])


.controller("MapController", [ '$scope', '$log', '$http', 'leafletData', function($scope, $log, $http, leafletData) {

			angular.extend($scope, {
				center: {
				    lat: 40,
				    lng: 20,
				    zoom: 4
				},
				layers: {

				},
				defaults: {
					zoomAnimation: false,
					zoomControl: false
				}
			});

			angular.extend($scope, {
				center2: {
					 lat: 40,
					 lng: -60,
					 zoom: 4
				},
				layers2: {

				},
				defaults2: {
					zoomAnimation: false,
					zoomControl: false
				}
			});

		  //Setting variables
			var tileOptions = {
				tilesize: 128,
				maxZoom: 15,  // max zoom to preserve detail on
				tolerance: 5, // simplification tolerance (higher means simpler)
				extent: 4096, // tile extent (both width and height)
				buffer: 128,   // tile buffer on each side
				debug: 0,      // logging level (0 to disable, 1 or 2)
				indexMaxZoom: 0,        // max zoom in the initial tile index
				indexMaxPoints: 10, // max number of points per tile in the index
			};

			var _BaseCountryLayer = geojsonvt(countriesData, tileOptions);
			var _BaselandScapeLayer = geojsonvt(usSatesData, tileOptions);
			var pad = 0;

			CenterMap(_BaseCountryLayer, "CountriesBase", "map1")
			CenterMap(_BaselandScapeLayer, "LandscapeBase", "map2")

			function CenterMap(rawData, layerName, mapid) {

				var _layer;
				_layer = getGeojsonVectorTiles(rawData, layerName);

				leafletData.getMap(mapid).then(function(map) {
					//window.alert(1)
					_layer.addTo(map)
			   });
			};

			function getGeojsonVectorTiles (rawData, layerName) {
					return  L.canvasTiles()
							.params({ debug: false, padding: 5 , layer: rawData, LayerName: layerName })
							.drawing(drawingOnCanvas);
			};

      }
	]
)


function drawingOnCanvas(canvasOverlay, params) {
	var pad = 0;
	var bounds = params.bounds;
	params.tilePoint.z = params.zoom;
	var _canvas = params.canvas;
	var ctx = params.canvas.getContext('2d');
	ctx.globalCompositeOperation = 'source-over';

	if ('devicePixelRatio' in window) {
	  if (window.devicePixelRatio > 1) {
		  _canvas.style.width = _canvas.width + 'px';
		  _canvas.style.height = _canvas.height + 'px';
		  _canvas.width *=2;
		  _canvas.height *=2;
		  ctx.scale(2,2);
	  }
  };
	var tile = params.layer.getTile(params.tilePoint.z, params.tilePoint.x, params.tilePoint.y);
	if (!tile) {
			return;
	}
			ctx.clearRect(0, 0, params.canvas.width, params.canvas.height);
			ctx.strokeStyle = '#d1f7ff';
			ctx.lineWidth = 0.5;

			var features = tile.features;

			for (var i = 0; i < features.length; i++) {
				var feature = features[i],
				type = feature.type;

				ctx.beginPath();

				for (var j = 0; j < feature.geometry.length; j++) {
					//window.alert(feature.tags.FIPS_CNTRY)
					var color = GetFeatureColor(params.layerName, feature.tags)
					ctx.fillStyle = feature.tags.color ? feature.tags.color :  color;//'rgba( 12,155,155,0.5)';

					var geom = feature.geometry[j];
					if (type === 1) {
							ctx.arc(geom[0] * ratio + pad, geom[1] * ratio + pad, 2, 0, 2 * Math.PI, false);
							continue;
					}
					for (var k = 0; k < geom.length; k++) {
							var p = geom[k];
							var extent = 4096;
							var x = p[0] / extent * 256;
							var y = p[1] / extent * 256;
							if (k) ctx.lineTo(x  + pad, y   + pad);
							else ctx.moveTo(x  + pad, y  + pad);
					}
				}
				if (type === 3 || type === 1) ctx.fill('evenodd');
				ctx.stroke();
			}
	};

//apply styles
function GetFeatureColor(LayerName, tags){
	var color
	//window.alert(tags.FIPS_CNTRY);
	if (LayerName === "CountriesBase") {
		switch(tags.FIPS_CNTRY){
			 case "US":
				  color = 'rgba(250,0,0,1)';
				  break;
			 case "UK":
					color = 'rgba(0,250,0,1)';
					break;
			 case "CA":
				 color = 'rgba(0,250,124,1)';
				 break;
			 case "AU":
				 color = 'rgba(0,25,250,1)';
				 break;
			 case "AS":
				 color = 'rgba(120,25,250,1)';
				 break;
			 case "KZ":
				 color = 'rgba(120,125,250,1)';
				 break;
			 case "UZ":
				color = 'rgba(120,125,25,1)';
				break;
			 default:
				 color = 'rgba(160,160,160,1)';
				 break;
		}
	}
	return color;
}

angular.module('MapAble.directives', [])

.directive('myTabs', function() {
	return {
		restrict: 'E',
		transclude: true,
		scope: {},
		controller: ['$scope', function($scope) {
			var tabs = $scope.tabs = [];

			$scope.select = function(tab) {
				angular.forEach(tabs, function(tab) {
					tab.selected = false;
				});
				tab.selected = true;
				$scope.$emit('my-tabs-changed', tab);
			};

			this.addTab = function(tab) {
				if (tabs.length === 0) {
					$scope.select(tab);
				}
				tabs.push(tab);
			};
		}],
		templateUrl: 'partials/my-tabs.html'
	};
})

.directive('myTab', function() {
	return {
		require: '^myTabs',
		restrict: 'E',
		transclude: true,
		scope: {
			title: '@'
		},
		link: function(scope, element, attrs, tabsCtrl) {
			tabsCtrl.addTab(scope);
		},
		templateUrl: 'partials/my-tab.html'
	};
})

.directive('validPin', ['$http', function($http) {
	return {
		require: 'ngModel',
		link: function(scope, ele, attrs, c) {
			scope.$watch(attrs.ngModel, function(pinValue) {
				// $http({
				// 	method: 'POST',
				// 	url: '/api/check/' + attrs.validPin,
				// 	data: {'pin': attrs.validPin}
				// }).success(function(data, status, headers, cfg) {
				// 	c.$setValidity('valid-pin', data.isValid);
				// }).error(function(data, status, headers, cfg) {
				// 	c.$setValidity('valid-pin', false);
				// });
				if(pinValue=="12345")
				{
					c.$setValidity('valid-pin', true);
				}
				else
				{
					c.$setValidity('valid-pin', false);
				}
			});
		}
	};
}])


.directive('showHideContainer', function(){
	return {
		scope: {

		},
		controller: ['$scope', '$element', '$attrs', function($scope, $element, $attrs) {
			$scope.show = false;

			$scope.toggleType = function($event){
				$event.stopPropagation();
				$event.preventDefault();

				$scope.show = !$scope.show;

				// Emit event
				$scope.$broadcast("toggle-type", $scope.show);
			};
		}],
		templateUrl: 'partials/show-hide-password.html',
		restrict: 'A',
		replace: false,
		transclude: true
	};
})


.directive('showHideInput', function(){
	return {
		scope: {

		},
		link: function(scope, element, attrs) {
			// listen to event
			scope.$on("toggle-type", function(event, show){
				var password_input = element[0],
						input_type = password_input.getAttribute('type');

				if(!show)
				{
					password_input.setAttribute('type', 'password');
				}

				if(show)
				{
					password_input.setAttribute('type', 'text');
				}
			});
		},
		require: '^showHideContainer',
		restrict: 'A',
		replace: false,
		transclude: false
	};
})


.directive('biggerText', ['$ionicGesture', function($ionicGesture) {
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
			$ionicGesture.on('touch', function(event){
				event.stopPropagation();
				event.preventDefault();

				var text_element = document.querySelector(attrs.biggerText),
						root_element = document.querySelector(".menu-content"),
						current_size_str = window.getComputedStyle(text_element, null).getPropertyValue('font-size'),
						current_size = parseFloat(current_size_str),
						new_size = Math.min((current_size+2), 24),
						new_size_str = new_size + 'px';

				root_element.classList.remove("post-size-"+current_size_str);
				root_element.classList.add("post-size-"+new_size_str);
			}, element);
		}
	};
}])

.directive('smallerText', ['$ionicGesture', function($ionicGesture) {
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
			$ionicGesture.on('touch', function(event){
				event.stopPropagation();
				event.preventDefault();

				var text_element = document.querySelector(attrs.smallerText),
				root_element = document.querySelector(".menu-content"),
				current_size_str = window.getComputedStyle(text_element, null).getPropertyValue('font-size'),
				current_size = parseFloat(current_size_str),
				new_size = Math.max((current_size-2), 12),
				new_size_str = new_size + 'px';

				root_element.classList.remove("post-size-"+current_size_str);
				root_element.classList.add("post-size-"+new_size_str);
			}, element);
		}
	};
}])



;


angular.module('MapAble.filters', [])

.filter('rawHtml', ['$sce', function($sce){
  return function(val) {
    return $sce.trustAsHtml(val);
  };
}]);

angular.module('MapAble.services', [])

.service('FeedList', ['$rootScope', 'FeedLoader', '$q', function ($rootScope, FeedLoader, $q){
	this.get = function(feedSourceUrl) {
		var response = $q.defer();
		//num is the number of results to pull form the source
		FeedLoader.fetch({q: feedSourceUrl, num: 20}, {}, function (data){
			response.resolve(data.responseData);
		});
		return response.promise;
	};
}])


// PUSH NOTIFICATIONS
.service('PushNotificationsService', ['$rootScope', '$cordovaPush', 'NodePushServer', 'GCM_SENDER_ID', function ($rootScope, $cordovaPush, NodePushServer, GCM_SENDER_ID){
	/* Apple recommends you register your application for push notifications on the device every time it’s run since tokens can change. The documentation says: ‘By requesting the device token and passing it to the provider every time your application launches, you help to ensure that the provider has the current token for the device. If a user restores a backup to a device other than the one that the backup was created for (for example, the user migrates data to a new device), he or she must launch the application at least once for it to receive notifications again. If the user restores backup data to a new device or reinstalls the operating system, the device token changes. Moreover, never cache a device token and give that to your provider; always get the token from the system whenever you need it.’ */
	this.register = function() {
		var config = {};

		// ANDROID PUSH NOTIFICATIONS
		if(ionic.Platform.isAndroid())
		{
			config = {
				"senderID": GCM_SENDER_ID
			};

			$cordovaPush.register(config).then(function(result) {
				// Success
				console.log("$cordovaPush.register Success");
				console.log(result);
			}, function(err) {
				// Error
				console.log("$cordovaPush.register Error");
				console.log(err);
			});

			$rootScope.$on('$cordovaPush:notificationReceived', function(event, notification) {
				console.log(JSON.stringify([notification]));
				switch(notification.event)
				{
					case 'registered':
						if (notification.regid.length > 0 ) {
							console.log('registration ID = ' + notification.regid);
							NodePushServer.storeDeviceToken("android", notification.regid);
						}
						break;

					case 'message':
						if(notification.foreground == "1")
						{
							console.log("Notification received when app was opened (foreground = true)");
						}
						else
						{
							if(notification.coldstart == "1")
							{
								console.log("Notification received when app was closed (not even in background, foreground = false, coldstart = true)");
							}
							else
							{
								console.log("Notification received when app was in background (started but not focused, foreground = false, coldstart = false)");
							}
						}

						// this is the actual push notification. its format depends on the data model from the push server
						console.log('message = ' + notification.message);
						break;

					case 'error':
						console.log('GCM error = ' + notification.msg);
						break;

					default:
						console.log('An unknown GCM event has occurred');
						break;
				}
			});

			// WARNING: dangerous to unregister (results in loss of tokenID)
			// $cordovaPush.unregister(options).then(function(result) {
			//   // Success!
			// }, function(err) {
			//   // Error
			// });
		}

		if(ionic.Platform.isIOS())
		{
			config = {
				"badge": true,
				"sound": true,
				"alert": true
			};

			$cordovaPush.register(config).then(function(result) {
				// Success -- send deviceToken to server, and store for future use
				console.log("result: " + result);
				NodePushServer.storeDeviceToken("ios", result);
			}, function(err) {
				console.log("Registration error: " + err);
			});

			$rootScope.$on('$cordovaPush:notificationReceived', function(event, notification) {
				console.log(notification.alert, "Push Notification Received");
			});
		}
	};
}])


// BOOKMARKS FUNCTIONS
.service('BookMarkService', ['_', '$rootScope', function (_, $rootScope){

	this.bookmarkFeedPost = function(bookmark_post){

		var user_bookmarks = !_.isUndefined(window.localStorage.ionFullApp_feed_bookmarks) ?
														JSON.parse(window.localStorage.ionFullApp_feed_bookmarks) : [];

		//check if this post is already saved

		var existing_post = _.find(user_bookmarks, function(post){ return post.link == bookmark_post.link; });

		if(!existing_post){
			user_bookmarks.push({
				link: bookmark_post.link,
				title : bookmark_post.title,
				date: bookmark_post.publishedDate,
				excerpt: bookmark_post.contentSnippet
			});
		}

		window.localStorage.ionFullApp_feed_bookmarks = JSON.stringify(user_bookmarks);
		$rootScope.$broadcast("new-bookmark");
	};

	this.bookmarkWordpressPost = function(bookmark_post){

		var user_bookmarks = !_.isUndefined(window.localStorage.ionFullApp_wordpress_bookmarks) ?
														JSON.parse(window.localStorage.ionFullApp_wordpress_bookmarks) : [];

		//check if this post is already saved

		var existing_post = _.find(user_bookmarks, function(post){ return post.id == bookmark_post.id; });

		if(!existing_post){
			user_bookmarks.push({
				id: bookmark_post.id,
				title : bookmark_post.title,
				date: bookmark_post.date,
				excerpt: bookmark_post.excerpt
			});
		}

		window.localStorage.ionFullApp_wordpress_bookmarks = JSON.stringify(user_bookmarks);
		$rootScope.$broadcast("new-bookmark");
	};

	this.getBookmarks = function(){
		return {
			feeds : JSON.parse(window.localStorage.ionFullApp_feed_bookmarks || '[]'),
			wordpress: JSON.parse(window.localStorage.ionFullApp_wordpress_bookmarks || '[]')
		};
	};
}])


// WP POSTS RELATED FUNCTIONS
.service('PostService', ['$rootScope', '$http', '$q', 'WORDPRESS_API_URL', function ($rootScope, $http, $q, WORDPRESS_API_URL){

	this.getRecentPosts = function(page) {
		var deferred = $q.defer();

		$http.jsonp(WORDPRESS_API_URL + 'get_recent_posts/' +
		'?page='+ page +
		'&callback=JSON_CALLBACK')
		.success(function(data) {
			deferred.resolve(data);
		})
		.error(function(data) {
			deferred.reject(data);
		});

		return deferred.promise;
	};


	this.getPost = function(postId) {
		var deferred = $q.defer();

		$http.jsonp(WORDPRESS_API_URL + 'get_post/' +
		'?post_id='+ postId +
		'&callback=JSON_CALLBACK')
		.success(function(data) {
			deferred.resolve(data);
		})
		.error(function(data) {
			deferred.reject(data);
		});

		return deferred.promise;
	};

	this.shortenPosts = function(posts) {
		//we will shorten the post
		//define the max length (characters) of your post content
		var maxLength = 500;
		return _.map(posts, function(post){
			if(post.content.length > maxLength){
				//trim the string to the maximum length
				var trimmedString = post.content.substr(0, maxLength);
				//re-trim if we are in the middle of a word
				trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf("</p>")));
				post.content = trimmedString;
			}
			return post;
		});
	};

	this.sharePost = function(link){
		window.plugins.socialsharing.share('Check this post here: ', null, null, link);
	};

}])


;

angular.module('MapAble.factories', [])

.factory('FeedLoader', ['$resource', function ($resource){
  return $resource('http://ajax.googleapis.com/ajax/services/feed/load', {}, {
    fetch: { method: 'JSONP', params: {v: '1.0', callback: 'JSON_CALLBACK'} }
  });
}])


// Factory for node-pushserver (running locally in this case), if you are using other push notifications server you need to change this
.factory('NodePushServer', ['$http', function ($http){
  // Configure push notifications server address
  // 		- If you are running a local push notifications server you can test this by setting the local IP (on mac run: ipconfig getifaddr en1)
  var push_server_address = "http://192.168.1.102:8000";

  return {
    // Stores the device token in a db using node-pushserver
    // type:  Platform type (ios, android etc)
    storeDeviceToken: function(type, regId) {
      // Create a random userid to store with it
      var user = {
        user: 'user' + Math.floor((Math.random() * 10000000) + 1),
        type: type,
        token: regId
      };
      console.log("Post token for registered device with data " + JSON.stringify(user));

      $http.post(push_server_address+'/subscribe', JSON.stringify(user))
      .success(function (data, status) {
        console.log("Token stored, device is successfully subscribed to receive push notifications.");
      })
      .error(function (data, status) {
        console.log("Error storing device token." + data + " " + status);
      });
    },
    // CURRENTLY NOT USED!
    // Removes the device token from the db via node-pushserver API unsubscribe (running locally in this case).
    // If you registered the same device with different userids, *ALL* will be removed. (It's recommended to register each
    // time the app opens which this currently does. However in many cases you will always receive the same device token as
    // previously so multiple userids will be created with the same token unless you add code to check).
    removeDeviceToken: function(token) {
      var tkn = {"token": token};
      $http.post(push_server_address+'/unsubscribe', JSON.stringify(tkn))
      .success(function (data, status) {
        console.log("Token removed, device is successfully unsubscribed and will not receive push notifications.");
      })
      .error(function (data, status) {
        console.log("Error removing device token." + data + " " + status);
      });
    }
  };
}])


.factory('AdMob', ['$window', function ($window){
  var admob = $window.AdMob;

  if(admob)
  {
    // Register AdMob events
    // new events, with variable to differentiate: adNetwork, adType, adEvent
    document.addEventListener('onAdFailLoad', function(data){
      console.log('error: ' + data.error +
      ', reason: ' + data.reason +
      ', adNetwork:' + data.adNetwork +
      ', adType:' + data.adType +
      ', adEvent:' + data.adEvent); // adType: 'banner' or 'interstitial'
    });
    document.addEventListener('onAdLoaded', function(data){
      console.log('onAdLoaded: ' + data);
    });
    document.addEventListener('onAdPresent', function(data){
      console.log('onAdPresent: ' + data);
    });
    document.addEventListener('onAdLeaveApp', function(data){
      console.log('onAdLeaveApp: ' + data);
    });
    document.addEventListener('onAdDismiss', function(data){
      console.log('onAdDismiss: ' + data);
    });

    var defaultOptions = {
      // bannerId: admobid.banner,
      // interstitialId: admobid.interstitial,
      // adSize: 'SMART_BANNER',
      // width: integer, // valid when set adSize 'CUSTOM'
      // height: integer, // valid when set adSize 'CUSTOM'
      position: admob.AD_POSITION.BOTTOM_CENTER,
      // offsetTopBar: false, // avoid overlapped by status bar, for iOS7+
      bgColor: 'black', // color name, or '#RRGGBB'
      // x: integer,		// valid when set position to 0 / POS_XY
      // y: integer,		// valid when set position to 0 / POS_XY
      isTesting: true, // set to true, to receiving test ad for testing purpose
      // autoShow: true // auto show interstitial ad when loaded, set to false if prepare/show
    };
    var admobid = {};

    if(ionic.Platform.isAndroid())
    {
      admobid = { // for Android
        banner: 'ca-app-pub-6869992474017983/9375997553',
        interstitial: 'ca-app-pub-6869992474017983/1657046752'
      };
    }

    if(ionic.Platform.isIOS())
    {
      admobid = { // for iOS
        banner: 'ca-app-pub-6869992474017983/4806197152',
        interstitial: 'ca-app-pub-6869992474017983/7563979554'
      };
    }

    admob.setOptions(defaultOptions);

    // Prepare the ad before showing it
    // 		- (for example at the beginning of a game level)
    admob.prepareInterstitial({
      adId: admobid.interstitial,
      autoShow: false,
      success: function(){
        console.log('interstitial prepared');
      },
      error: function(){
        console.log('failed to prepare interstitial');
      }
    });
  }
  else
  {
    console.log("No AdMob?");
  }

  return {
    showBanner: function() {
      if(admob)
      {
        admob.createBanner({
          adId:admobid.banner,
          position:admob.AD_POSITION.BOTTOM_CENTER,
          autoShow:true,
          success: function(){
            console.log('banner created');
          },
          error: function(){
            console.log('failed to create banner');
          }
        });
      }
    },
    showInterstitial: function() {
      if(admob)
      {
        // If you didn't prepare it before, you can show it like this
        // admob.prepareInterstitial({adId:admobid.interstitial, autoShow:autoshow});

        // If you did prepare it before, then show it like this
        // 		- (for example: check and show it at end of a game level)
        admob.showInterstitial();
      }
    },
    removeAds: function() {
      if(admob)
      {
        admob.removeBanner();
      }
    }
  };
}])

.factory('iAd', ['$window', function ($window){
  var iAd = $window.iAd;

  // preppare and load ad resource in background, e.g. at begining of game level
  if(iAd) {
    iAd.prepareInterstitial( { autoShow:false } );
  }
  else
  {
    console.log("No iAd?");
  }

  return {
    showBanner: function() {
      if(iAd)
      {
        // show a default banner at bottom
        iAd.createBanner({
          position:iAd.AD_POSITION.BOTTOM_CENTER,
          autoShow:true
        });
      }
    },
    showInterstitial: function() {
      // ** Notice: iAd interstitial Ad only supports iPad.
      if(iAd)
      {
        // If you did prepare it before, then show it like this
        // 		- (for example: check and show it at end of a game level)
        iAd.showInterstitial();
      }
    },
    removeAds: function() {
      if(iAd)
      {
        iAd.removeBanner();
      }
    }
  };
}])

;

angular.module("templates", []).run(["$templateCache", function($templateCache) {$templateCache.put("Map2.html","<ion-view class=\"layouts-view\">\n  <!-- <ion-nav-buttons side=\"left\">\n    <button menu-toggle=\"left\" class=\"button button-icon icon ion-navicon\"></button>\n  </ion-nav-buttons> -->\n  <ion-nav-title>\n    <span>Nationalities</span>\n  </ion-nav-title>\n  <ion-content scroll=false>\n     <div style=\"position: absolute; top: 0px; bottom: 0px; left: 0px; right: 0px;\">\n      <leaflet\n            id=\"map2\"\n            layers=\"layers2\"\n            defaults = \"defaults2\"\n            center = \"center2\"\n            width=\"100%\"\n            height=\"100%\">\n      </leaflet>\n    </div>\n  </ion-content>\n</ion-view>\n");
$templateCache.put("Population_layout.html","<ion-view class=\"layouts-view\">\n  <ion-nav-buttons side=\"left\">\n    <button menu-toggle=\"left\" class=\"button button-icon icon ion-navicon\"></button>\n  </ion-nav-buttons>\n  <ion-nav-title>\n    <span>Population</span>\n  </ion-nav-title>\n  <ion-content>\n    <div class=\"list layouts-functionalities\">\n      <a class=\"item item-icon-left item-icon-right\" ui-sref=\"app.tinder-cards\">\n        <i class=\"icon ion-happy-outline\"></i>\n        <div>\n          <span class=\"title\">Population Density</span>\n          <p class=\"description\">The amount of people per squere km</p>\n        </div>\n        <i class=\"icon ion-arrow-right-c\"></i>\n      </a>\n      <a class=\"item item-icon-left item-icon-right\" ui-sref=\"app.nationalities\">\n        <i class=\"icon ion-arrow-swap\"></i>\n        <div>\n          <span class=\"title\">Nationalities2</span>\n          <p class=\"description\">World\'s Nationalities on the Map</p>\n        </div>\n        <i class=\"icon ion-arrow-right-c\"></i>\n      </a>\n    </div>\n  </ion-content>\n</ion-view>\n");
$templateCache.put("bookmarks.html","<ion-view class=\"bookmarks-view\">\n  <ion-nav-title>\n    <span>Bookmarks</span>\n  </ion-nav-title>\n  <ion-content>\n    <div ng-if=\"(bookmarks.wordpress.length == 0 && bookmarks.feeds.length == 0)\" class=\"row bookmarks-container\">\n      <div class=\"col col-center\">\n        <div class=\"empty-results\">\n          <i class=\"icon ion-bookmark\"></i>\n          <h3 class=\"no-bookmarks\">There\'s nothing here yet. Start exploring!</h3>\n        </div>\n      </div>\n    </div>\n    <ul ng-if=\"(bookmarks.wordpress.length > 0 || bookmarks.feeds.length > 0)\" class=\"bookmarks-list\">\n      <div ng-if=\"bookmarks.feeds.length > 0\" class=\"item item-divider\">\n        Feeds Bookmarks\n      </div>\n      <li class=\"bookmark-item\" ng-repeat=\"bookmark in bookmarks.feeds\">\n        <a ng-click=goToFeedPost(bookmark.link)>\n          <h2 class=\"post-title\" ng-bind-html=\"bookmark.title | rawHtml\"></h2>\n          <p class=\"post-date\">Posted <span class=\"post-time\" am-time-ago=\"bookmark.date\"></span></p>\n        </a>\n      </li>\n      <div ng-if=\"bookmarks.wordpress.length > 0\" class=\"item item-divider\">\n        Wordpress bookmarks\n      </div>\n      <li class=\"bookmark-item\" ng-repeat=\"bookmark in bookmarks.wordpress\">\n        <a ng-click=goToWordpressPost(bookmark.id)>\n          <h2 class=\"post-title\" ng-bind-html=\"bookmark.title | rawHtml\"></h2>\n          <p class=\"post-date\">Posted <span class=\"post-time\" am-time-ago=\"bookmark.date\"></span></p>\n        </a>\n      </li>\n    </ul>\n  </ion-content>\n</ion-view>\n");
$templateCache.put("category-feeds.html","<ion-view class=\"category-feeds-view\">\n  <ion-nav-title>\n    <span>{{categoryTitle}} feeds</span>\n  </ion-nav-title>\n  <ion-content>\n    <div class=\"list category-feeds\">\n      <a ng-repeat=\"source in category_sources\" class=\"item item-icon-right\" ui-sref=\"app.feed-entries({categoryId: categoryId, sourceId: (source.title | slugify)})\">\n        <img class=\"thumbnail\" ng-src=\"{{source.image}}\"/>\n        <div>\n          <span class=\"title\">{{source.title}}</span>\n          <p class=\"description\">{{source.description}}</p>\n        </div>\n        <i class=\"icon ion-arrow-right-c\"></i>\n      </a>\n    </div>\n  </ion-content>\n</ion-view>\n");
$templateCache.put("feed-entries.html","<ion-view class=\"feed-entries-view\">\n  <ion-nav-title>\n    <span>{{sourceTitle}}</span>\n  </ion-nav-title>\n  <ion-content>\n    <!-- Refresh to get the new posts -->\n    <ion-refresher pulling-text=\"Pull to refresh...\" on-refresh=\"doRefresh()\">\n    </ion-refresher>\n\n    <div class=\"entries-list\">\n      <div ng-repeat=\"entry in feed.entries\" class=\"list card entry-item\">\n        <div class=\"entry-heading item item-text-wrap\">\n          <h2 class=\"entry-title\" ng-bind-html=\"entry.title | rawHtml\"></h2>\n          <p class=\"entry-author\">\n            Published <span am-time-ago=\"entry.publishedDate\"></span>\n          </p>\n        </div>\n        <div class=\"entry-content item item-text-wrap\">\n          <p class=\"entry-excerpt\" ng-bind-html=\"entry.contentSnippet | rawHtml\"></p>\n          <div class=\"entry-actions row\">\n            <div class=\"actions col col-center col-66\">\n              <a class=\"button button-icon icon ion-bookmark\" ng-click=\"bookmarkPost(entry)\"></a>\n            </div>\n            <div class=\"read-more col col-center col-33\">\n              <a class=\"button button-small button-block button-assertive\" href=\"#\" ng-click=\"readMore(entry.link)\">\n                Read more\n              </a>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </ion-content>\n</ion-view>\n");
$templateCache.put("feeds-categories.html","<ion-view class=\"feeds-categories-view\">\n  <ion-nav-buttons side=\"left\">\n    <button menu-toggle=\"left\" class=\"button button-icon icon ion-navicon\"></button>\n  </ion-nav-buttons>\n  <ion-nav-title>\n    <span>Feeds Categories</span>\n  </ion-nav-title>\n  <ion-content>\n    <div class=\"row categories-list\">\n      <div ng-repeat=\"category in feeds_categories\" class=\"col col-50\">\n        <a class=\"feed-category\" ui-sref=\"app.category-feeds({categoryId: (category.title | slugify)})\">\n          <img class=\"category-image\" ng-src=\"{{category.image}}\"/>\n          <div class=\"category-bg\"></div>\n          <span class=\"category-title\">{{category.title}}</span>\n        </a>\n      </div>\n    </div>\n  </ion-content>\n</ion-view>\n");
$templateCache.put("forgot-password.html","<ion-view class=\"forgot-password-view\">\n  <ion-content scroll=\"false\">\n    <div class=\"row\">\n      <div class=\"col col-center\">\n        <div class=\"card forgot-password-container\">\n          <form name=\"forgot_password_form\" class=\"\" novalidate>\n            <div class=\"item item-body\">\n              <label class=\"item item-input\">\n                <input type=\"email\" placeholder=\"Email\" name=\"user_email\" ng-model=\"user.email\" required>\n              </label>\n            </div>\n            <div class=\"item item-body bottom-content\">\n              <button type=\"submit\" class=\"button button-positive button-block\" ng-click=\"recoverPassword()\" ng-disabled=\"forgot_password_form.$invalid\">\n                Recover it\n              </button>\n            </div>\n          </form>\n        </div>\n        <div class=\"alternative-actions\">\n          <button class=\"log-in button button-small button-clear button-light\" ng-click=\"goToLogIn()\">\n            Log In\n          </button>\n          <button class=\"sign-up button button-small button-clear button-light\" ng-click=\"goToSignUp()\">\n            Sign Up\n          </button>\n        </div>\n      </div>\n    </div>\n  </ion-content>\n</ion-view>\n");
$templateCache.put("forms.html","<ion-view class=\"forms-view\">\n  <ion-nav-buttons side=\"left\">\n    <button menu-toggle=\"left\" class=\"button button-icon icon ion-navicon\"></button>\n  </ion-nav-buttons>\n  <ion-nav-title>\n    <span>Forms</span>\n  </ion-nav-title>\n  <ion-content>\n    <ul class=\"list\">\n\n      <div class=\"item item-divider\">Inline Labels</div>\n      \n      <label class=\"item item-input\">\n        <span class=\"input-label\">First Name</span>\n        <input type=\"text\">\n      </label>\n      <label class=\"item item-input\">\n        <span class=\"input-label\">Last Name</span>\n        <input type=\"text\">\n      </label>\n      <label class=\"item item-input\">\n        <span class=\"input-label\">Email</span>\n        <input type=\"email\">\n      </label>\n\n      <div class=\"item item-divider\">Floating Labels</div>\n\n      <label class=\"item item-input item-floating-label\">\n        <span class=\"input-label\">Telephone</span>\n        <input type=\"tel\" placeholder=\"Your phone\">\n      </label>\n      <label class=\"item item-input item-floating-label\">\n        <span class=\"input-label\">Number</span>\n        <input type=\"number\" placeholder=\"Some number\">\n      </label>\n\n      <div class=\"item item-divider\">Stacked Labels</div>\n\n      <label class=\"item item-input item-stacked-label\">\n        <span class=\"input-label\">Birth date</span>\n        <input type=\"date\">\n      </label>\n      <label class=\"item item-input item-stacked-label\">\n        <span class=\"input-label\">Month</span>\n        <input type=\"month\">\n      </label>\n\n      <div class=\"item item-divider\">Placeholder Labels</div>\n\n      <label class=\"item item-input\">\n        <textarea placeholder=\"Description\"></textarea>\n      </label>\n      <label class=\"item item-input\">\n        <input type=\"password\" placeholder=\"Your password\">\n      </label>\n\n      <div class=\"item item-divider\">Inset Inputs</div>\n\n      <div class=\"item item-input-inset\">\n        <label class=\"item-input-wrapper\">\n          <input type=\"text\" placeholder=\"Search...\">\n        </label>\n        <button class=\"button button-small\">\n          Submit\n        </button>\n      </div>\n    </ul>\n  </ion-content>\n</ion-view>\n");
$templateCache.put("layouts.html","<ion-view class=\"layouts-view\">\n  <ion-nav-buttons side=\"left\">\n    <button menu-toggle=\"left\" class=\"button button-icon icon ion-navicon\"></button>\n  </ion-nav-buttons>\n  <ion-nav-title>\n    <span>Population</span>\n  </ion-nav-title>\n  <ion-content>\n    <div class=\"list layouts-functionalities\">\n      <a class=\"item item-icon-left item-icon-right\" ui-sref=\"app.tinder-cards\">\n        <i class=\"icon ion-happy-outline\"></i>\n        <div>\n          <span class=\"title\">Population Density</span>\n          <p class=\"description\">The amount of people per squere km</p>\n        </div>\n        <i class=\"icon ion-arrow-right-c\"></i>\n      </a>\n      <a class=\"item item-icon-left item-icon-right\" ui-sref=\"app.slider\">\n        <i class=\"icon ion-arrow-swap\"></i>\n        <div>\n          <span class=\"title\">Nationalities</span>\n          <p class=\"description\">World\'s Nationalities on the Map</p>\n        </div>\n        <i class=\"icon ion-arrow-right-c\"></i>\n      </a>\n    </div>\n  </ion-content>\n</ion-view>\n");
$templateCache.put("login.html","<ion-view class=\"login-view\">\n  <ion-content scroll=\"false\">\n    <div class=\"row\">\n      <div class=\"col col-center\">\n        <div class=\"card login-container\" content-tabs tabsdata=\'tabsdata\'>\n          <form name=\"login_form\" class=\"\" novalidate ng-cloak>\n            <my-tabs>\n              <my-tab title=\"Email\">\n                <div class=\"list\">\n                  <label class=\"item item-input\">\n                    <input type=\"email\" placeholder=\"Email\" name=\"user_email\" ng-model=\"user.email\" required>\n                  </label>\n                  <label class=\"item item-input\" show-hide-container>\n                    <input type=\"password\" placeholder=\"Password\" name=\"user_password\" ng-model=\"user.password\" required show-hide-input>\n                  </label>\n                </div>\n              </my-tab>\n              <my-tab title=\"Phone\">\n                <div class=\"list\">\n                  <label class=\"item item-input\">\n                    <input type=\"text\" placeholder=\"Phone number\" name=\"user_phone\" ng-model=\"user.phone\" required>\n                  </label>\n                  <label class=\"item item-input\" show-hide-container>\n                    <input type=\"password\" placeholder=\"PIN\" name=\"user_pin\" ng-model=\"user.pin\" required valid-pin=\"user.pin\" show-hide-input>\n                  </label>\n                </div>\n              </my-tab>\n            </my-tabs>\n            <div class=\"item item-body bottom-content\">\n              <button type=\"submit\" class=\"button button-positive button-block\" ng-click=\"doLogIn()\" ng-disabled=\"(selected_tab==\'Email\') ? (login_form.user_email.$invalid || login_form.user_password.$invalid) : ((selected_tab==\'Phone\') ? (login_form.user_phone.$invalid || login_form.user_pin.$invalid) : false)\">\n                Log In\n              </button>\n            </div>\n          </form>\n        </div>\n        <div class=\"alternative-actions\">\n          <button class=\"forgot-password button button-small button-clear button-light\" ng-click=\"goToForgotPassword()\">\n            Forgot Password?\n          </button>\n          <button class=\"sign-up button button-small button-clear button-light\" ng-click=\"goToSignUp()\">\n            Sign Up\n          </button>\n        </div>\n      </div>\n    </div>\n  </ion-content>\n</ion-view>\n");
$templateCache.put("main.html","<ion-view class=\"layouts-view\">\n  <ion-nav-buttons side=\"left\">\n    <button menu-toggle=\"left\" class=\"button button-icon icon ion-navicon\"></button>\n  </ion-nav-buttons>\n  <ion-nav-title>\n    <span>Main Page</span>\n  </ion-nav-title>\n  <ion-content scroll=false>\n     <div style=\"position: absolute; top: 0px; bottom: 0px; left: 0px; right: 0px;\">\n      <leaflet\n            id=\"map1\"\n            layers=\"layers\"\n            defaults =\"defaults\"\n            center = \"center\"\n            width=\"100%\"\n            height=\"100%\">\n      </leaflet>\n    </div>\n  </ion-content>\n</ion-view>\n");
$templateCache.put("profile.html","<ion-view class=\"profile-view\">\n  <ion-nav-title>\n    <span>Profile</span>\n  </ion-nav-title>\n  <ion-content>\n    <div class=\"top-content row\">\n      <div class=\"profile-container\">\n        <img class=\"user-image\" ng-src=\"https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg\">\n        <div class=\"user-name\">Brynn Evans</div>\n        <div class=\"user-twitter\">@brynn</div>\n      </div>\n      <div class=\"user-background-image\" style=\"background: url(https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg) no-repeat 0 50%\"></div>\n    </div>\n    <div class=\"bottom-content\">\n      <div class=\"user-bio\">\n        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>\n      </div>\n    </div>\n  </ion-content>\n</ion-view>\n");
$templateCache.put("settings.html","<ion-view class=\"settings-view\">\n  <ion-nav-buttons side=\"left\">\n    <button menu-toggle=\"left\" class=\"button button-icon icon ion-navicon\"></button>\n  </ion-nav-buttons>\n  <ion-nav-title>\n    <span>Settings</span>\n  </ion-nav-title>\n  <ion-content>\n    <ul class=\"list\">\n\n      <div class=\"item item-divider\">TOGGLE</div>\n\n      <ion-toggle ng-model=\"airplaneMode\" toggle-class=\"toggle-assertive\">Airplane Mode</ion-toggle>\n      <ion-toggle ng-model=\"wifi\" toggle-class=\"toggle-positive\">Wi-Fi</ion-toggle>\n      <ion-toggle ng-model=\"bluetooth\" toggle-class=\"toggle-calm\">Bluetooth</ion-toggle>\n      <ion-toggle ng-model=\"personalHotspot\" toggle-class=\"toggle-dark\">Personal Hotspot</ion-toggle>\n\n      <div class=\"item item-divider\">CHECKBOXES</div>\n\n      <ion-checkbox ng-model=\"checkOpt1\">Option 1</ion-checkbox>\n      <ion-checkbox ng-model=\"checkOpt2\">Option 2</ion-checkbox>\n      <ion-checkbox ng-model=\"checkOpt3\">Option 3</ion-checkbox>\n\n      <div class=\"item item-divider\">RADIO</div>\n\n      <ion-radio ng-model=\"radioChoice\" ng-value=\"\'A\'\">Choose A</ion-radio>\n      <ion-radio ng-model=\"radioChoice\" ng-value=\"\'B\'\">Choose B</ion-radio>\n      <ion-radio ng-model=\"radioChoice\" ng-value=\"\'C\'\">Choose C</ion-radio>\n\n      <div class=\"item item-divider\">RANGES</div>\n\n      <div class=\"range\">\n        <i class=\"icon ion-volume-low\"></i>\n        <input type=\"range\" name=\"volume\">\n        <i class=\"icon ion-volume-high\"></i>\n      </div>\n      <div class=\"item range range-positive\">\n        <i class=\"icon ion-ios-sunny-outline\"></i>\n        <input type=\"range\" name=\"volume\" min=\"0\" max=\"100\" value=\"33\">\n        <i class=\"icon ion-ios-sunny\"></i>\n      </div>\n\n      <div class=\"item item-divider\"></div>\n\n      <a class=\"item logout-option\" ng-click=\"showLogOutMenu()\">\n        Logout\n      </a>\n    </ul>\n  </ion-content>\n</ion-view>\n");
$templateCache.put("side-menu.html","<ion-side-menus enable-menu-with-back-views=\"false\">\n  <ion-side-menu-content class=\"post-size-14px\">\n    <ion-nav-bar class=\"bar app-top-bar\">\n      <ion-nav-back-button>\n      </ion-nav-back-button>\n      <ion-nav-buttons side=\"left\">\n        <button class=\"button button-icon button-clear ion-navicon\" menu-toggle=\"left\">\n        </button>\n      </ion-nav-buttons>\n    </ion-nav-bar>\n    <ion-nav-view name=\"menuContent\"></ion-nav-view>\n  </ion-side-menu-content>\n  <ion-side-menu side=\"left\" class=\"main-menu\" expose-aside-when=\"large\">\n    <ion-content>\n      <ion-list>\n        <ion-item class=\"heading-item item item-avatar\" nav-clear menu-close ui-sref=\"app.profile\">\n          <img ng-src=\"https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg\">\n          <h2 class=\"greeting\">Hi Dimka</h2>\n          <p class=\"message\">Welcome to MapAble</p>\n        </ion-item>\n        <!-- <ion-item class=\"item-icon-left\" nav-clear menu-close ui-sref=\"app.wordpress\">\n          <i class=\"icon ion-social-wordpress\"></i>\n          <h2 class=\"menu-text\">MapADay</h2>\n       </ion-item> -->\n       <ion-item class=\"item-icon-left\" nav-clear menu-close ui-sref=\"app.main\">\n         <i class=\"icon ion-wand\"></i>\n         <h2 class=\"menu-text\">Main</h2>\n       </ion-item>\n       <!-- <ion-item class=\"item-icon-left\" nav-clear menu-close ui-sref=\"app.bookmarks\">\n         <i class=\"icon ion-wand\"></i>\n         <h2 class=\"menu-text\">Bookmarks</h2>\n       </ion-item> -->\n        <ion-item class=\"item-icon-left\" nav-clear menu-close ui-sref=\"app.population\">\n          <i class=\"icon ion-wand\"></i>\n          <h2 class=\"menu-text\">Population</h2>\n        </ion-item>\n        <ion-item class=\"item-icon-left\" nav-clear menu-close ui-sref=\"app.feeds-categories\">\n          <i class=\"icon ion-radio-waves\"></i>\n          <h2 class=\"menu-text\">News</h2>\n        </ion-item>\n        <ion-item class=\"item-icon-left\" nav-clear menu-close ui-sref=\"app.forms\">\n          <i class=\"icon ion-document\"></i>\n          <h2 class=\"menu-text\">Forms</h2>\n        </ion-item>\n        <ion-item class=\"item-icon-left\" nav-clear menu-close ui-sref=\"app.settings\">\n          <i class=\"icon ion-gear-a\"></i>\n          <h2 class=\"menu-text\">Settings</h2>\n        </ion-item>\n    </ion-list>\n    </ion-content>\n  </ion-side-menu>\n</ion-side-menus>\n");
$templateCache.put("signup.html","<ion-view class=\"signup-view\">\n  <ion-content scroll=\"false\">\n    <div class=\"row\">\n      <div class=\"col col-center\">\n        <div class=\"card sign-up-container\">\n          <form name=\"signup_form\" class=\"\" novalidate>\n            <div class=\"item item-body\">\n              <label class=\"item item-input\">\n                <input type=\"email\" placeholder=\"Email\" name=\"user_email\" ng-model=\"user.email\" required>\n              </label>\n              <label class=\"item item-input\" show-hide-container>\n                <input type=\"password\" placeholder=\"Password\" name=\"user_password\" ng-model=\"user.password\" required show-hide-input>\n              </label>\n            </div>\n            <div class=\"item item-body bottom-content\">\n              <button type=\"submit\" class=\"button button-positive button-block\" ng-click=\"doSignUp()\" ng-disabled=\"signup_form.$invalid\">\n                Sign Up\n              </button>\n            </div>\n          </form>\n        </div>\n        <div class=\"alternative-actions\">\n          <button class=\"log-in button button-small button-clear button-light\" ng-click=\"goToLogIn()\">\n            Log In\n          </button>\n        </div>\n      </div>\n    </div>\n  </ion-content>\n</ion-view>\n");
$templateCache.put("slider.html","<ion-view class=\"slider-view\">\n  <ion-nav-title>\n    <span>Slider</span>\n  </ion-nav-title>\n  <ion-content scroll=\"false\">\n    <ion-slide-box show-pager=\"true\">\n      <ion-slide ng-repeat=\"i in [1,2,3,4,5]\">\n        <div class=\"list card\">\n          <div class=\"item item-image\">\n            <img ng-src=\"http://lorempixel.com/300/200/nature?v={{i}}\">\n          </div>\n          <div class=\"item item-body\">\n            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>\n          </div>\n        </div>\n      </ion-slide>\n    </ion-slide-box>\n  </ion-content>\n</ion-view>\n");
$templateCache.put("walkthrough.html","<ion-view class=\"walkthrough-view\">\n  <ion-content scroll=\"false\">\n    <div class=\"top-content row\">\n      <div class=\"col col-center\">\n        <img ng-src=\"img/logo.png\">\n      </div>\n    </div>\n    <div class=\"bottom-content row\">\n      <div class=\"col col-center\">\n        <button class=\"login button button-block button-stable\" ng-click=\"goToLogIn()\">\n          Log In\n        </button>\n        <button class=\"sign-up button button-block button-stable\" ng-click=\"goToSignUp()\">\n          Sign Up\n        </button>\n      </div>\n    </div>\n  </ion-content>\n</ion-view>\n");
$templateCache.put("wordpress.html","<ion-view class=\"wordpress-view\">\n  <ion-nav-buttons side=\"left\">\n    <button menu-toggle=\"left\" class=\"button button-icon icon ion-navicon\"></button>\n  </ion-nav-buttons>\n  <ion-nav-title>\n    <span>WordPress</span>\n  </ion-nav-title>\n  <ion-content>\n    <!-- Refresh to get the new posts -->\n    <ion-refresher pulling-text=\"Pull to refresh...\" on-refresh=\"doRefresh()\">\n    </ion-refresher>\n\n    <div class=\"posts-list\">\n      <div ng-repeat=\"post in posts\" class=\"list card post-item\">\n        <div class=\"post-heading item item-text-wrap\">\n          <h2 class=\"post-title\" ng-bind-html=\"post.title | rawHtml\"></h2>\n          <p class=\"post-author\">\n            By <span>{{post.author.nickname}}</span> <span am-time-ago=\"post.date\"></span>\n          </p>\n        </div>\n        <div class=\"post-content item item-text-wrap\">\n          <p class=\"post-excerpt\" ng-bind-html=\"post.content | rawHtml\"></p>\n          <div class=\"post-actions row\">\n            <div class=\"actions col col-center col-66\">\n              <a class=\"button button-icon icon ion-bookmark\" ng-click=\"bookmarkPost(post)\"></a>\n            </div>\n            <div class=\"read-more col col-center col-33\">\n              <a ui-sref=\"app.post({postId: post.id})\" class=\"button button-small button-block button-assertive\">\n                Read more\n              </a>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <!-- Infinit scroll -->\n    <ion-infinite-scroll ng-if=\"moreDataCanBeLoaded()\" on-infinite=\"loadMoreData()\" distance=\"1%\" icon=\"ion-loading-c\">\n    </ion-infinite-scroll>\n  </ion-content>\n</ion-view>\n");
$templateCache.put("wordpress_post.html","<ion-view class=\"post-view\">\n  <ion-content>\n    <div class=\"post-heading item item-text-wrap\">\n      <h1 class=\"post-title\">{{post.title}}</h1>\n      <p class=\"post-author\">\n        By <span>{{post.author.nickname}}</span> <span am-time-ago=\"post.date\"></span>\n      </p>\n    </div>\n    <div class=\"post-content item item-text-wrap\">\n      <p class=\"post-text\" ng-bind-html=\"post.content | rawHtml\"></p>\n    </div>\n    <div class=\"post-tags item item-text-wrap\">\n      <span class=\"post-tag button button-small button-outline button-stable\" ng-repeat=\"category in post.categories\">{{category.title}}</span>\n    </div>\n  </ion-content>\n  <ion-footer-bar class=\"post-footer bar bar-footer bar-dark\">\n    <div class=\"row\">\n      <div class=\"col col-20 col-center\">\n        <a class=\"button button-icon icon icon-right ion-plus\" bigger-text=\".post-view .post-text\">A</a>\n      </div>\n      <div class=\"col col-20 col-center\">\n        <a class=\"button button-icon icon icon-right ion-minus\" smaller-text=\".post-view .post-text\">A</a>\n      </div>\n      <div class=\"col col-20 col-offset-20 col-center\">\n        <a class=\"button button-icon icon ion-heart\"></a>\n      </div>\n      <div class=\"col col-20 col-center\">\n        <a class=\"button button-icon icon ion-android-share-alt\" ng-click=\"sharePost(post.url)\"></a>\n      </div>\n    </div>\n  </ion-footer-bar>\n</ion-view>\n");
$templateCache.put("partials/my-tab.html","<div class=\"tab-content\" ng-show=\"selected\" ng-transclude></div>\n");
$templateCache.put("partials/my-tabs.html","<div class=\"item item-divider card-heding\">\n	<div class=\"tabs-striped tabs-background-dark tabs-color-stable\">\n		<div class=\"tabs\">\n			<a ng-repeat=\"tab in tabs\" ng-click=\"select(tab)\" ng-class=\"{ active: tab.selected }\" class=\"tab-item\">{{tab.title}}</a>\n		</div>\n	</div>\n</div>\n<div class=\"item item-body\">\n	<div class=\"tabs-content\" ng-transclude></div>\n</div>\n");
$templateCache.put("partials/show-hide-password.html","<div class=\"show-hide-input\" ng-transclude>\n</div>\n<a class=\"toggle-view-anchor\" on-touch=\"toggleType($event)\">\n	<span ng-show=\"show\">HIDE</span>\n	<span ng-show=\"!show\">SHOW</span>\n</a>\n");}]);
angular.module('MapAble.config', [])
.constant('WORDPRESS_API_URL', 'http://wordpress.startapplabs.com/blog/api/')
.constant('GCM_SENDER_ID', '574597432927')

;
