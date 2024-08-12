var config = (function () {

	var module = {}
	module.lang = "uk"	
	module.sony = "uk"
	module.blizzard = "uk"
	module.rating = "pegi"
	module.logo = "standard"

	module.launchDate = new Date("Nov 13 2020 00:00:00 GMT+0000")

	module.date = 'NOVEMBER 13'

	module.button = {
		pre: 'PRE-ORDER NOW',
		pre2lines: 'PRE-ORDER\nNOW',
		post: 'BUY NOW',
		post2lines: 'BUY\nNOW',
	}

	module.dateFontSizes = {
		_120x600:  13,	
		_160x600:  23,
		_300x50:   13,	
		_320x50:   13,	
		_300x250:  16,
		_300x600:  23,	
		_300x1050: 28,	
		_728x90:   23,
		_970x250:  23,
		_takeover_1260x250: 34,		
	}

	module.buttonFontSizes = {
		pre: {
			_120x600:  10,
		    _160x600:  18,
		    _300x50:   10,
		    _320x50:   10,
		    _300x250:  12,
		    _300x600:  18,
		    _300x1050: 22,
		    _728x90:   18,
		    _970x250:  18,
		    _takeover_1260x250: 25,
		},
		post: {
			_120x600:  15,
		    _160x600:  18,
		    _300x50:   13,
		    _320x50:   13,
		    _300x250:  15,
		    _300x600:  24,
		    _300x1050: 28,
		    _728x90:   18,
		    _970x250:  18,
		    _takeover_1260x250: 32,
		}
	}

	return module
})();