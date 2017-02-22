define({
	config : (function(){
		var protocol = location.protocol,
			hostArray = location.host.split('.'),
			hostSuffix = hostArray[hostArray.length-1];
		return {
			protocol: protocol+'//',
			domain: '.ypzdw.'+hostSuffix,
			pass: protocol+'//pass.ypzdw.'+hostSuffix,
			shop: protocol+'//www.ypzdw.'+hostSuffix,
			saler: protocol+'//sales.ypzdw.'+hostSuffix,
			resource: protocol+'//static2.ypzdw.'+hostSuffix,
			manage: 'http://m.ypzdw.'+hostSuffix,
			pur: protocol+'//pur.ypzdw.'+hostSuffix,
			activity: protocol+'//activity.ypzdw.'+hostSuffix,
			tracker: 'https://maidian.ypzdw.com/da/log/log?'
		}
	})()
});