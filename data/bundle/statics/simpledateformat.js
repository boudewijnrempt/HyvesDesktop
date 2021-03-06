/**
 * Copyright 2006 Tim Down.
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *      http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
 
/**
 * simpledateformat.js
 *
 * A faithful JavaScript implementation of Java's SimpleDateFormat's format
 * method. All pattern layouts present in the Java implementation are
 * implemented here except for z, the text version of the date's time zone.
 * 
 * See the official Sun documentation for the Java version:
 * http://java.sun.com/j2se/1.5.0/docs/api/java/text/SimpleDateFormat.html
 *
 * Author: Tim Down <tim@timdown.co.uk>
 * Last modified: 6/9/2006
 * Website: http://www.timdown.co.uk/code/simpledateformat.php
 */
 
/* ------------------------------------------------------------------------- */

var SimpleDateFormat;

(function() {
	function isUndefined(obj) {
		return typeof obj == "undefined";
	}

	var regex = /('[^']*')|(G+|y+|M+|w+|W+|D+|d+|F+|E+|a+|H+|k+|K+|h+|m+|s+|S+|Z+)|([a-zA-Z]+)|([^a-zA-Z']+)/;
	var monthNames = ["januari", "february", "maart", "april", "mei", "juni",
		"july", "augustus", "september", "oktober", "november", "december"];
	var dayNames = ["zondag", "maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag"];
	var TEXT2 = 0, TEXT3 = 1, NUMBER = 2, YEAR = 3, MONTH = 4, TIMEZONE = 5;
	var types = {
		G : TEXT2,
		y : YEAR,
		Y : YEAR,
		M : MONTH,
		w : NUMBER,
		W : NUMBER,
		D : NUMBER,
		d : NUMBER,
		F : NUMBER,
		E : TEXT3,
		a : TEXT2,
		H : NUMBER,
		k : NUMBER,
		K : NUMBER,
		h : NUMBER,
		m : NUMBER,
		s : NUMBER,
		S : NUMBER,
		Z : TIMEZONE
	};
	var ONE_DAY = 24 * 60 * 60 * 1000;
	var ONE_WEEK = 7 * ONE_DAY;
	var DEFAULT_MINIMAL_DAYS_IN_FIRST_WEEK = 1;

	Date.prototype.getDifference = function(date) {
		return this.getTime() - date.getTime();
	};

	Date.prototype.isBefore = function(d) {
		return this.getTime() < d.getTime();
	};

	Date.prototype.getWeekInYear = function(minimalDaysInFirstWeek) {
		if (isUndefined(this.minimalDaysInFirstWeek)) {
			minimalDaysInFirstWeek = DEFAULT_MINIMAL_DAYS_IN_FIRST_WEEK;
		}
		var previousSunday = new Date(this.getTime() - this.getDay() * ONE_DAY);
		previousSunday = new Date(previousSunday.getFullYear(), previousSunday.getMonth(), previousSunday.getDate());
		var startOfYear = new Date(this.getFullYear(), 0, 1);
		var numberOfSundays = previousSunday.isBefore(startOfYear) ? 
			0 : 1 + Math.floor((previousSunday.getTime() - startOfYear.getTime()) / ONE_WEEK);
		var numberOfDaysInFirstWeek =  7 - startOfYear.getDay();
		var weekInYear = numberOfSundays;
		if (numberOfDaysInFirstWeek >= minimalDaysInFirstWeek) {
			weekInYear++;
		}
		return weekInYear;
	};

	Date.prototype.getWeekInMonth = function(minimalDaysInFirstWeek) {
		if (isUndefined(this.minimalDaysInFirstWeek)) {
			minimalDaysInFirstWeek = DEFAULT_MINIMAL_DAYS_IN_FIRST_WEEK;
		}
		var previousSunday = new Date(this.getTime() - this.getDay() * ONE_DAY);
		previousSunday = new Date(previousSunday.getFullYear(), previousSunday.getMonth(), previousSunday.getDate());
		var startOfMonth = new Date(this.getFullYear(), this.getMonth(), 1);
		var numberOfSundays = previousSunday.isBefore(startOfMonth) ? 
			0 : 1 + Math.floor((previousSunday.getTime() - startOfMonth.getTime()) / ONE_WEEK);
		var numberOfDaysInFirstWeek =  7 - startOfMonth.getDay();
		var weekInMonth = numberOfSundays;
		if (numberOfDaysInFirstWeek >= minimalDaysInFirstWeek) {
			weekInMonth++;
		}
		return weekInMonth;
	};

	Date.prototype.getDayInYear = function() {
		var startOfYear = new Date(this.getFullYear(), 0, 1);
		return 1 + Math.floor((this.getTime() - startOfYear.getTime()) / ONE_DAY);
	};

	/* ----------------------------------------------------------------- */

	SimpleDateFormat = function(formatString) {
		this.formatString = formatString;
	};

	/**
	 * Sets the minimum number of days in a week in order for that week to
	 * be considered as belonging to a particular month or year
	 */
	SimpleDateFormat.prototype.setMinimalDaysInFirstWeek = function(days) {
		this.minimalDaysInFirstWeek = days;
	};

	SimpleDateFormat.prototype.getMinimalDaysInFirstWeek = function(days) {
		return isUndefined(this.minimalDaysInFirstWeek)	?
			DEFAULT_MINIMAL_DAYS_IN_FIRST_WEEK : this.minimalDaysInFirstWeek;
	};

	SimpleDateFormat.prototype.format = function(date) {
		var formattedString = "";
		var result;

		var padWithZeroes = function(str, len) {
			while (str.length < len) {
				str = "0" + str;
			}
			return str;
		};

		var formatText = function(data, numberOfLetters, minLength) {
			return (numberOfLetters >= 4) ? data : data.substr(0, Math.max(minLength, numberOfLetters));
		};

		var formatNumber = function(data, numberOfLetters) {
			var dataString = "" + data;
			// Pad with 0s as necessary
			return padWithZeroes(dataString, numberOfLetters);
		};

		var searchString = this.formatString;
		while ((result = regex.exec(searchString))) {
			var matchedString = result[0];
			var quotedString = result[1];
			var patternLetters = result[2];
			var otherLetters = result[3];
			var otherCharacters = result[4];

			// If the pattern matched is quoted string, output the text between the quotes
			if (quotedString) {
				if (quotedString == "''") {
					formattedString += "'";
				} else {
					formattedString += quotedString.substring(1, quotedString.length - 1);
				}
			} else if (otherLetters) {
				// Swallow non-pattern letters by doing nothing here
			} else if (otherCharacters) {
				// Simply output other characters
				formattedString += otherCharacters;
			} else if (patternLetters) {
				// Replace pattern letters
				var patternLetter = patternLetters.charAt(0);
				var numberOfLetters = patternLetters.length;
				var rawData = "";
				switch (patternLetter) {
					case "G":
						rawData = "AD";
						break;
					case "y":
						rawData = date.getFullYear();
						break;
					case "M":
						rawData = date.getMonth();
						break;
					case "w":
						rawData = date.getWeekInYear(this.getMinimalDaysInFirstWeek());
						break;
					case "W":
						rawData = date.getWeekInMonth(this.getMinimalDaysInFirstWeek());
						break;
					case "D":
						rawData = date.getDayInYear();
						break;
					case "d":
						rawData = date.getDate();
						break;
					case "F":
						rawData = 1 + Math.floor((date.getDate() - 1) / 7);
						break;
					case "E":
						rawData = dayNames[date.getDay()];
						break;
					case "a":
						rawData = (date.getHours() >= 12) ? "PM" : "AM";
						break;
					case "H":
						rawData = date.getHours();
						break;
					case "k":
						rawData = 1 + date.getHours();
						break;
					case "K":
						rawData = date.getHours() % 12;
						break;
					case "h":
						rawData = 1 + (date.getHours() % 12);
						break;
					case "m":
						rawData = date.getMinutes();
						break;
					case "s":
						rawData = date.getSeconds();
						break;
					case "S":
						rawData = date.getMilliseconds();
						break;
					case "Z":
						rawData = date.getTimezoneOffset(); // This is returns the number of minutes since GMT was this time.
						break;
				}
				// Format the raw data depending on the type
				switch (types[patternLetter]) {
					case TEXT2:
						formattedString += formatText(rawData, numberOfLetters, 2);
						break;
					case TEXT3:
						formattedString += formatText(rawData, numberOfLetters, 3);
						break;
					case NUMBER:
						formattedString += formatNumber(rawData, numberOfLetters);
						break;
					case YEAR:
						if (numberOfLetters <= 2) {
							// Output a 2-digit year
							var dataString = "" + rawData;
							formattedString += dataString.substr(2, 2);
						} else {
							formattedString += formatNumber(rawData, numberOfLetters);
						}
						break;
					case MONTH:
						if (numberOfLetters >= 3) {
							formattedString += formatText(monthNames[rawData], numberOfLetters, numberOfLetters);
						} else {
							// NB. Months returned by getMonth are zero-based
							formattedString += formatNumber(rawData + 1, numberOfLetters);
						}
						break;
					case TIMEZONE:
						var isPositive = (rawData > 0);
						// The following line looks like a mistake but isn't
						// because of the way getTimezoneOffset measures.
						var prefix = isPositive ? "-" : "+";
						var absData = Math.abs(rawData);

						// Hours
						var hours = "" + Math.floor(absData / 60);
						hours = padWithZeroes(hours, 2);
						// Minutes
						var minutes = "" + (absData % 60);
						minutes = padWithZeroes(minutes, 2);

						formattedString += prefix + hours + minutes;
						break;
				}
			}
			searchString = searchString.substr(result.index + result[0].length);
		}
		return formattedString;
	};
})();

if(window.jsloaded) {jsloaded('/statics/simpledateformat.js')}
