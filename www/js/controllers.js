angular.module('MapAble.controllers', [])

// APP
.controller('AppCtrl', function($scope) {

})
// WALKTHROUGH
.controller('WalkthroughCtrl', function($scope, $state) {
	$scope.goToLogIn = function(){
		$state.go('login');
	};

	$scope.goToSignUp = function(){
		$state.go('signup');
	};
})

.controller('LoginCtrl', function($scope, $state, $templateCache, $q, $rootScope) {
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

})

.controller('SignupCtrl', function($scope, $state) {
	$scope.user = {};

	$scope.user.email = "john@doe.com";

	$scope.doSignUp = function(){
		$state.go('app.feeds-categories');
	};

	$scope.goToLogIn = function(){
		$state.go('login');
	};
})

.controller('ForgotPasswordCtrl', function($scope, $state) {
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
})


.controller('RateApp', function($scope) {
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
})

.controller('SendMailCtrl', function($scope) {
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
})


.controller('AdsCtrl', function($scope, $ionicActionSheet, AdMob, iAd) {

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
})

.controller('InAppBrowserCtrl', function($scope) {
	$scope.openBrowser = function(){
		window.open('http://www.google.com', '_blank', 'location=yes');
	};
})

// FEED
//brings all feed categories
.controller('FeedsCategoriesCtrl', function($scope, $http) {
	$scope.feeds_categories = [];

	$http.get('feeds-categories.json').success(function(response) {
		$scope.feeds_categories = response;
	});
})

//bring specific category providers
.controller('CategoryFeedsCtrl', function($scope, $http, $stateParams) {
	$scope.category_sources = [];

	$scope.categoryId = $stateParams.categoryId;

	$http.get('feeds-categories.json').success(function(response) {
		var category = _.find(response, {id: $scope.categoryId});
		$scope.categoryTitle = category.title;
		$scope.category_sources = category.feed_sources;
	});
})

//this method brings posts for a source provider
.controller('FeedEntriesCtrl', function($scope, $stateParams, $http, FeedList, $q, $ionicLoading, BookMarkService) {
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
})


// Multimedia
.controller('MultimediaCtrl', function($scope) {

})

// SETTINGS
.controller('SettingsCtrl', function($scope, $ionicActionSheet, $state) {
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
})

// FORMS
.controller('FormsCtrl', function($scope) {

})

// PROFILE
.controller('ProfileCtrl', function($scope) {

})


// BOOKMARKS
.controller('BookMarksCtrl', function($scope, $rootScope, BookMarkService, $state) {

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
})

// SLIDER
.controller('SliderCtrl', function($scope, $http, $ionicSlideBoxDelegate) {

})

// WORDPRESS
.controller('WordpressCtrl', function($scope, $http, $ionicLoading, PostService, BookMarkService) {
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
})

// WORDPRESS POST
.controller('WordpressPostCtrl', function($scope, $http, $stateParams, PostService, $ionicLoading) {

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
})


.controller('ImagePickerCtrl', function($scope, $rootScope, $cordovaCamera) {

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
})


// LAYOUTS
.controller('LayoutsCtrl', function($scope) {

})


.controller("MapController", [ '$scope', '$log', '$http', 'leafletData', function($scope, $log, $http, leafletData) {

			angular.extend($scope, {
				center: {
				    lat: 37.26,
				    lng: -97.86,
				    zoom: 5
				},
				layers: {
					scale: true,
					scrollWheelZoom: false//,
				   // baselayers: {
				   // }
				},
				controls: {
					scale: true,
					fullscreen: {
							  position: 'topleft'
					}
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

			CenterMap(_BaseCountryLayer, "CountriesBase")
			//CenterMap(_BaselandScapeLayer, "LandscapeBase")

			function CenterMap(rawData, layerName) {

				var _layer;
				_layer = getGeojsonVectorTiles(rawData, layerName);

				leafletData.getMap("map1").then(function(map) {
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

.controller("MapController2", [ '$scope', '$log', '$http', 'leafletData', function($scope, $log, $http, leafletData) {

			angular.extend($scope, {
				center2: {
				    lat: 37.26,
				    lng: -97.86,
				    zoom: 5
				},
				layers2: {
					scale: true,
					scrollWheelZoom: false
				},
				controls2: {
					scale: true,
					fullscreen: {
							  position: 'topleft'
					}
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

			//CenterMap(_BaseCountryLayer, "CountriesBase")
			CenterMap(_BaselandScapeLayer, "LandscapeBase")

			function CenterMap(rawData, layerName) {

				var _layer;
				_layer = getGeojsonVectorTiles(rawData, layerName);

				leafletData.getMap("map2").then(function(map) {
					//window.alert(2)
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
);


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
};
