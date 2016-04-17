Core.addModule((function(){

	var
	routes = [],
	currentRoute,
	dom = document.getElementById('app');

	var init = function(){

		window.onhashchange = function(){
			navigate();
		};

		navigate();

	};

	var addRoute = function(route){
		routes.push(route);
		navigate();
	};

	var getRoute = function(id){
		for(var i = 0; i < routes.length; i++){
			if(id === routes[i].id){ return routes[i] }
		}
		for(var i = 0; i < routes.length; i++){
			if(routes[i].default){ return routes[i] }
		}
		return routes[0] || {};
	}

	var routeTo = function(id){
		var route = getRoute(id);
		if(route && route !== currentRoute){
			currentRoute = route;
			// if(route.dom){
			// 	dom.innerHTML = '';
			// 	dom.appendChild(route.dom);
			// }
			if(route.onRoute){ route.onRoute() }
			window.location.hash = id;
		}
	};

	var navigate = function(){
		var hash = window.location.hash;
		var id = hash.split('/')[0].slice(1);
		routeTo(id);
	};

	init();

	return {
		id: 'router',
		routeTo: routeTo,
		navigate: navigate,
		addRoute: addRoute,
		getRoute: getRoute
	};

})())
