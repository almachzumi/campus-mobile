module.exports = {

	/* APP CONFIG */
	APP_NAME: 'Campus Mobile',
	GOOGLE_ANALYTICS_ID: 'UA-XXXXXXXX-X',

	/* APIs / FEEDS */
	WEATHER_API_URL: 'https://w3wyps9yje.execute-api.us-west-2.amazonaws.com/prod/forecast?',
	SURF_API_URL: 'https://kusyfng6mg.execute-api.us-west-2.amazonaws.com/prod/v1/surf',
	SHUTTLE_STOPS_API_URL: 'https://ies4wyrlx9.execute-api.us-west-2.amazonaws.com/prod/v2/stops/',
	SHUTTLE_VEHICLES_API_URL: 'https://hjr84cay81.execute-api.us-west-2.amazonaws.com/prod?route=',
	DINING_API_URL: 'https://pg83tslbyi.execute-api.us-west-2.amazonaws.com/prod/v3/dining',
	EVENTS_API_URL: 'https://2jjml3hf27.execute-api.us-west-2.amazonaws.com/prod/events/student',
	QUICKLINKS_API_URL: 'https://s3-us-west-2.amazonaws.com/ucsd-its-wts/now_ucsandiego/v1/quick_links/ucsd-quicklinks-v3.json',
	NEWS_API_URL: 'https://s3-us-west-2.amazonaws.com/ucsd-its-wts/now_ucsandiego/v1/allstories.json',
	MAP_SEARCH_API_URL: 'https://xgu9qa7gx4.execute-api.us-west-2.amazonaws.com/prod/v2/map/search?region=0&query=',
	SCHEDULE_API_URL: 'https://api-qa.ucsd.edu:8243/student/my/academic_history/v1/class_list?term_code=WI18&academic_level=UN',
	SPECIAL_EVENT_API_URL: 'https://2jjml3hf27.execute-api.us-west-2.amazonaws.com/prod/events/special',

	/* RESOURCES */
	SHUTTLE_SCHEDULE_URL: 'https://transportation.ucsd.edu/shuttles/',
	FEEDBACK_URL: 'https://eforms.ucsd.edu/view.php?id=175631',
	NODE_MARKERS_BASE_URL: 'https://s3-us-west-2.amazonaws.com/ucsd-its-wts/now_ucsandiego/v1/nearby_markers/',
	WEATHER_ICON_BASE_URL: 'https://s3-us-west-2.amazonaws.com/ucsd-its-wts/images/v1/weather-icons/',
	SHUTTLE_ROUTES_MASTER: 'https://s3-us-west-2.amazonaws.com/ucsd-its-wts/now_ucsandiego/v1/shuttle_routes_master_map.json',
	SHUTTLE_STOPS_MASTER: 'https://s3-us-west-2.amazonaws.com/ucsd-its-wts/now_ucsandiego/v1/shuttle_stops_master_map.json',
	SHUTTLE_STOPS_MASTER_NO_ROUTES: 'https://s3-us-west-2.amazonaws.com/ucsd-its-wts/now_ucsandiego/v1/shuttle_stops_master_map_no_routes.json',
	FORGOT_PASSWORD_URL: 'https://acms.ucsd.edu/students/gpasswd.html',

	/* SSO */
	// DEV ENDPOINT - Needs to be updated to PROD
	SSO_ENDPOINT: 'https://3hepzvdimd.execute-api.us-west-2.amazonaws.com/dev/v1/authentication-service',
	SSO_CREDENTIALS_ERROR: 'orchestration failed(Error: IDP returned status was not success)',

	/* RETRIES */
	SSO_REFRESH_MAX_RETRIES: 3,
	SSO_REFRESH_RETRY_INCREMENT: 5000, // 5 seconds
	SSO_REFRESH_RETRY_MULTIPLIER: 3, // Multiplies increment by this amount for next try

	/* TTLs */
	WEATHER_API_TTL: 1800000, // 30 minutes
	SURF_API_TTL: 1800000, // 30 minutes
	EVENTS_API_TTL: 3600000, // 1 hour
	NEWS_API_TTL: 3600000, // 1 hour
	DINING_API_TTL: 3600000, // 1 hour
	DINING_MENU_API_TTL: 3600000, // 1 hour
	QUICKLINKS_API_TTL: 86400000, // 1 day
	SHUTTLE_API_TTL: 15000, // 15 seconds
	SHUTTLE_MASTER_TTL: 86400000, // 1 day
	SSO_TTL: 15000, // 15 seconds
	SCHEDULE_TTL: 60000,  // 1 minute
	SPECIAL_EVENTS_TTL: 3600000, // 1 hour
	DATA_SAGA_TTL: 60000, // 1 minute
	LOCATION_TTL: 15000, // 15 seconds
	HTTP_REQUEST_TTL: 10000, // 10 seconds
}
