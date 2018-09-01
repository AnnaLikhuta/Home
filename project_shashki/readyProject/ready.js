var utils = {
	create: function(tagName, attrs, parentNode) {
		var node = document.createElement(tagName);
		attrs = attrs || {};
		for (var name in attrs) {
			var value = attrs[name];
			if(name == "innerHTML") {
				node.innerHTML = value;
				continue;
			}
			if(name == "className") {
				utils.addClass(node, value);
				continue;
			}
			node.setAttribute(name, value);
		}
		if(parentNode) {
			parentNode.appendChild(node);
		}
		return (node);
	},
	removeClass: function(node, className) {
		var removedClass = node.className;
		var pattern = new RegExp("(^| )" + className + "( |$)");
		removedClass = removedClass.replace(pattern, "$1");
		removedClass = removedClass.replace(/ $/, "");
		node.className = removedClass;
		return (true);
	},
	addClass: function(node, className) {
		if(!utils.hasClass(node, className)) {
			if(node.className == "") {
				node.className = className;
			} else {
				node.className += " " + className;
			}
		}
		return (true);
	},
	toggleClass: function(node, className) {
		return (utils[utils.hasClass(node, className) ? "removeClass" : "addClass"](node, className));
	},
	hasClass: function(node, className) {
		var pattern = new RegExp("(^| )" + className + "( |$)");
		return (!!node.className.match(pattern));
	},
	addEvent: function(el, eventName, callback, useCapture) {
		if(el.addEventListener) {
			el.addEventListener(eventName, callback, useCapture);
		} else if(el.attachEvent) {
			el.attachEvent('on' + eventName, callback);
		}
	},
	stopevent: function(event) {
		if(event) {
			if(event.stopPropagation) event.stopPropagation(); else event.cancelBubble = true;
		}
	},
	"event": {
		"events": [],
		"getEvent": function(id) {
			for (var i = 0, l = this.events.length; i < l; i++) if(this.events[i].id == id) return i;
			return false;
		},
		"addEvent": function(id) {
			this.events.push({ "id": id, "handlers": [] });
		},
		"listen": function(eventName, callback) {
			if(!this.getEvent(eventName)) this.addEvent(eventName);
			var index = this.getEvent(eventName);
			if(index || index === 0) this.events[index].handlers.push(callback);
		},
		"trigger": function(eventName, data) {
			var index = this.getEvent(eventName);
			if(index || index === 0) for (var i = 0, m = this.events[index], l = m.handlers.length; i < l; i++) {
				var callback = (function(index, data) {
					return function() {
						try {
							m.handlers[index](data);
						} catch (e) {
						}
					}
				})(i, data)
				setTimeout(callback, 5);
			}
		}
	}
};

function resizeBoard() {
	var w = getwindowWidth() * 0.9;
	var h = getwindowHeight() * 0.9;
	var node = document.getElementById("board");
	if(w > h) {
		w = h;
	} else {
		h = w;
	}
	node.style.width = w + "px";
	node.style.height = h + "px";
	hideAddressBar();
}
function hideAddressBar() {
	document.body.style.minHeight = "1000px"; // to ensure enough height for scrollTo to work
	scrollTo(0, 1);
	setTimeout(function() {
		document.body.style.minHeight = getwindowHeight() + "px";
		document.body.style.height = getwindowHeight() + "px";
		scrollTo(0, 1);
	}, 1000);
}

function getwindowWidth() {
	if(window.innerWidth) {
		windowWidth = window.innerWidth;
	} else if(document.documentElement && document.documentElement.clientWidth) {
		windowWidth = document.documentElement.clientWidth;
	} else if(document.body.clientWidth) {
		windowWidth = document.body.clientWidth;
	}
	return windowWidth;
}
function getwindowHeight() {
	if(window.innerHeight) {
		windowHeight = window.innerHeight;
	} else if(document.documentElement && document.documentElement.clientHeight) {
		windowHeight = document.documentElement.clientHeight;
	} else if(document.body.clientHeight) {
		windowHeight = document.body.clientHeight;
	}
	return windowHeight;
}




function load() {
	renderBoard();
	resizeBoard();
	hideAddressBar();
}

function preload() {
	this.length = preload.arguments.length;
	for (var i = 0; i < this.length; i++) {
		this[i] = new Image();
		this[i].src = "../images/" + preload.arguments[i];
	}
}
var pics = new preload("black.jpg", "white.jpg",
	"you1.png", "you2.png", "you1k.png", "you2k.png",
	"me1.png", "me2.png", "me1k.png", "me2k.png");

var black = -1; // computer is black
var red = 1; // visitor is red
var square_dim = 35;
var piece_toggled = false;
var my_turn = false;
var double_jump = false;
var comp_move = false;
var game_is_over = false;
var safe_from = safe_to = null;
var toggler = null;
var togglers = 0;

function Board() {
	board = new Array();
	for (var i = 0; i < 8; i++) {
		board[i] = new Array();
		for (var j = 0; j < 8; j++)
			board[i][j] = Board.arguments[8 * j + i];
	}
	board[-2] = new Array(); // prevents errors
	board[-1] = new Array(); // prevents errors
	board[8] = new Array(); // prevents errors
	board[9] = new Array(); // prevents errors
}
var board;
Board(1, 0, 1, 0, 1, 0, 1, 0,
	0, 1, 0, 1, 0, 1, 0, 1,
	1, 0, 1, 0, 1, 0, 1, 0,
	0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0,
	0, -1, 0, -1, 0, -1, 0, -1,
	-1, 0, -1, 0, -1, 0, -1, 0,
	0, -1, 0, -1, 0, -1, 0, -1);

function message(str) {
	if(!game_is_over) utils.event.trigger("message_show", str);
}
function moveable_space(i, j) {
	// calculates whether it is a gray (moveable)
	// or black (non-moveable) space
	return (((i % 2) + j) % 2 == 0);
}
function Coord(x, y) {
	this.x = x;
	this.y = y;
}
function coord(x, y) {
	c = new Coord(x, y);
	return c;
}

function renderBoard() {
	var content = [];
	content.push("<table border=0 cellspacing=0 cellpadding=0 id='board'>");
	for (var j = 0; j < 8; j++) {
		content.push("<tr>");
		for (var i = 0; i < 8; i++) {
			var style = "";
			var onClickEvent = "";
			if(moveable_space(i, j)) {
				style = "white";
				onClickEvent = generateFunction(i, j);
			}
			content.push("<td class='" + style + "' " + onClickEvent + ">");
			var contentInCell = generateImage(i, j);
			content.push(contentInCell);
			content.push("</td>");
		}
		content.push("</tr>");
	}
	content.push("</table>");

	document.getElementById("board_containter").innerHTML = content.join("");
}
function generateImage(i, j) {
	var imageSrc = "";
	var imageName = "space" + i + "" + j;
	if(board[i][j] == 1) imageSrc = "you1.png";
	else if(board[i][j] == -1) imageSrc = "me1.png";
	else if(moveable_space(i, j))imageSrc = "white.jpg";
	else imageSrc = "black.jpg";
	var contentInCell = "<img src='./images/" + imageSrc + "' name='" + imageName + "' border=0>";
	return  contentInCell;
}
function generateFunction(i, j) {
	content = " onClick='clicked(" + i + "," + j + ")'";
	return content;
}

function clicked(i, j) {
	if(my_turn) {
		if(integ(board[i][j]) == 1) toggle(i, j);
		else if(piece_toggled) move(selected, coord(i, j));
	} else {
		message("Not your turn!");
	}
}
function toggle(x, y) {
	if(my_turn) {
		if(piece_toggled)
			draw(selected.x, selected.y, "you1" + ((board[selected.x][selected.y] == 1.1) ? "k" : "") + ".png");
		if(piece_toggled && (selected.x == x) && (selected.y == y)) {
			piece_toggled = false;
			if(double_jump) {
				my_turn = double_jump = false;
				computer();
			}
		} else {
			piece_toggled = true;
			draw(x, y, "you2" + ((board[x][y] == 1.1) ? "k" : "") + ".png");
		}
		selected = coord(x, y);
	} else {
		if((piece_toggled) && (integ(board[selected_c.x][selected_c.y]) == -1))
			draw(selected_c.x, selected_c.y, "me1" + ((board[selected_c.x][selected_c.y] == -1.1) ? "k" : "") + ".png");
		if(piece_toggled && (selected_c.x == x) && (selected_c.y == y)) {
			piece_toggled = false;
		} else {
			piece_toggled = true;
			draw(x, y, "me2" + ((board[x][y] == -1.1) ? "k" : "") + ".png");
		}
		selected_c = coord(x, y);
	}
}
function draw(x, y, name) {
	document.images["space" + x + "" + y].src = "./images/" + name;
}
function integ(num) {
	if(num != null)
		return Math.round(num);
	else
		return null;
}
function abs(num) {
	return Math.abs(num);
}
function sign(num) {
	if(num < 0) return -1;
	else return 1;
}
function concatenate(arr1, arr2) {
	// function tacks the second array onto the end of the first and returns result
	for (var i = 0; i < arr2.length; i++)
		arr1[arr1.length + i] = arr2[i];
	return arr1;
}
function legal_move(from, to) {
	if((to.x < 0) || (to.y < 0) || (to.x > 7) || (to.y > 7)) return false;
	piece = board[from.x][from.y];
	distance = coord(to.x - from.x, to.y - from.y);
	if((distance.x == 0) || (distance.y == 0)) {
		message("You may only move diagonally");
		return false;
	}
	if(abs(distance.x) != abs(distance.y)) {
		message("Invalid move");
		return false;
	}
	if(abs(distance.x) > 2) {
		message("Invalid move");
		return false;
	}
	if((abs(distance.x) == 1) && double_jump) {
		return false;
	}
	if((board[to.x][to.y] != 0) || (piece == 0)) {
		return false;
	}
	if((abs(distance.x) == 2)
		&& (integ(piece) != -integ(board[from.x + sign(distance.x)][from.y + sign(distance.y)]))) {
		return false;
	}
	if((integ(piece) == piece) && (sign(piece) != sign(distance.y))) {
		return false;
	}

	return true;
}
function move(from, to) {
	my_turn = true;
	if(legal_move(from, to)) {
		piece = board[from.x][from.y];
		distance = coord(to.x - from.x, to.y - from.y);
		if((abs(distance.x) == 1) && (board[to.x][to.y] == 0)) {
			swap(from, to);
		} else if((abs(distance.x) == 2)
			&& (integ(piece) != integ(board[from.x + sign(distance.x)][from.y + sign(distance.y)]))) {
			double_jump = false;
			swap(from, to);
			remove(from.x + sign(distance.x), from.y + sign(distance.y));
			if((legal_move(to, coord(to.x + 2, to.y + 2)))
				|| (legal_move(to, coord(to.x + 2, to.y - 2)))
				|| (legal_move(to, coord(to.x - 2, to.y - 2)))
				|| (legal_move(to, coord(to.x - 2, to.y + 2)))) {
				double_jump = true;
				message("You may complete the double jump or<br> click on your piece to stay still.");
			}
		}
		if((board[to.x][to.y] == 1) && (to.y == 7)) king_me(to.x, to.y);
		selected = to;
		if(game_over() && !double_jump) {
			setTimeout("toggle(" + to.x + "," + to.y + ");my_turn = double_jump = false;computer();", 800);
		}
	}
	return true;
}
function king_me(x, y) {
	if(board[x][y] == 1) {
		board[x][y] = 1.1; // king you
		draw(x, y, "you2k.png");
	} else if(board[x][y] == -1) {
		board[x][y] = -1.1; // king me
		draw(x, y, "me2k.png");
	}
}

function swap(from, to) {
	if(my_turn || comp_move) {
		dummy_src = document.images["space" + to.x + "" + to.y].src;
		document.images["space" + to.x + "" + to.y].src = document.images["space" + from.x + "" + from.y].src;
		document.images["space" + from.x + "" + from.y].src = dummy_src;
	}
	dummy_num = board[from.x][from.y];
	board[from.x][from.y] = board[to.x][to.y];
	board[to.x][to.y] = dummy_num;
}
function remove(x, y) {
	if(my_turn || comp_move)
		draw(x, y, "white.jpg");
	board[x][y] = 0;
}
function Result(val) {
	this.high = val;
	this.dir = new Array();
}
function move_comp(from, to) {
	toggle(from.x, from.y);
	comp_move = true;
	swap(from, to);
	if(abs(from.x - to.x) == 2) {
		remove(from.x + sign(to.x - from.x), from.y + sign(to.y - from.y));
	}
	if((board[to.x][to.y] == -1) && (to.y == 0)) king_me(to.x, to.y);
	setTimeout("selected_c = coord(" + to.x + "," + to.y + ");piece_toggled = true;", 700);
	setTimeout("bak=my_turn;my_turn=false;toggle(" + to.x + "," + to.y + ");my_turn=bak;", 800);
	if(game_over()) {
		setTimeout("comp_move = false;my_turn = true;togglers=0;", 600);
	}
	return true;
}
function game_over() { // make sure game is not over (return false if game is over)
	comp = you = false;
	for (var i = 0; i < 8; i++) {
		for (var j = 0; j < 8; j++) {
			if(integ(board[i][j]) == -1) comp = true;
			if(integ(board[i][j]) == 1) you = true;
		}
	}
	if(!comp) message("You win!");
	if(!you) message("Game over");
	game_is_over = (!comp || !you)
	return (!game_is_over);
}

// the higher the jump_priority, the more often the computer will take the jump over the safe move
var jump_priority = 10;

function computer() {
	// step one - prevent any jumps
	for (var j = 0; j < 8; j++) {
		for (var i = 0; i < 8; i++) {
			if(integ(board[i][j]) == 1) {
				if((legal_move(coord(i, j), coord(i + 2, j + 2))) && (prevent(coord(i + 2, j + 2), coord(i + 1, j + 1)))) {
					return true;
				}
				if((legal_move(coord(i, j), coord(i - 2, j + 2))) && (prevent(coord(i - 2, j + 2), coord(i - 1, j + 1)))) {
					return true;
				}
			}
			if(board[i][j] == 1.1) {
				if((legal_move(coord(i, j), coord(i - 2, j - 2))) && (prevent(coord(i - 2, j - 2), coord(i - 1, j - 1)))) {
					return true;
				}
				if((legal_move(coord(i, j), coord(i + 2, j - 2))) && (prevent(coord(i + 2, j - 2), coord(i + 1, j - 1)))) {
					return true;
				}
			}
		}
	}
	// step two - if step one not taken, look for jumps
	for (var j = 7; j >= 0; j--) {
		for (var i = 0; i < 8; i++) {
			if(jump(i, j))
				return true;
		}
	}
	safe_from = null;
	// step three - if step two not taken, look for safe single space moves
	for (var j = 0; j < 8; j++) {
		for (var i = 0; i < 8; i++) {
			if(single(i, j))
				return true;
		}
	}
	// if no safe moves, just take whatever you can get
	if(safe_from != null) {
		move_comp(safe_from, safe_to);
	} else {
		message("You beat me!!");
		game_is_over = true;
	}
	safe_from = safe_to = null;
	return false;
}
function jump(i, j) {
	if(board[i][j] == -1.1) {
		if(legal_move(coord(i, j), coord(i + 2, j + 2))) {
			move_comp(coord(i, j), coord(i + 2, j + 2));
			setTimeout("jump(" + (i + 2) + "," + (j + 2) + ");", 500);
			return true;
		}
		if(legal_move(coord(i, j), coord(i - 2, j + 2))) {
			move_comp(coord(i, j), coord(i - 2, j + 2));
			setTimeout("jump(" + (i - 2) + "," + (j + 2) + ");", 500);
			return true;
		}
	}
	if(integ(board[i][j]) == -1) {
		if(legal_move(coord(i, j), coord(i - 2, j - 2))) {
			move_comp(coord(i, j), coord(i - 2, j - 2));
			setTimeout("jump(" + (i - 2) + "," + (j - 2) + ");", 500);
			return true;
		}
		if(legal_move(coord(i, j), coord(i + 2, j - 2))) {
			move_comp(coord(i, j), coord(i + 2, j - 2));
			setTimeout("jump(" + (i + 2) + "," + (j - 2) + ");", 500);
			return true;
		}
	}
	return false;
}
function single(i, j) {
	if(board[i][j] == -1.1) {
		if(legal_move(coord(i, j), coord(i + 1, j + 1))) {
			safe_from = coord(i, j);
			safe_to = coord(i + 1, j + 1);
			if(wise(coord(i, j), coord(i + 1, j + 1))) {
				move_comp(coord(i, j), coord(i + 1, j + 1));
				return true;
			}
		}
		if(legal_move(coord(i, j), coord(i - 1, j + 1))) {
			safe_from = coord(i, j);
			safe_to = coord(i - 1, j + 1);
			if(wise(coord(i, j), coord(i - 1, j + 1))) {
				move_comp(coord(i, j), coord(i - 1, j + 1));
				return true;
			}
		}
	}
	if(integ(board[i][j]) == -1) {
		if(legal_move(coord(i, j), coord(i + 1, j - 1))) {
			safe_from = coord(i, j);
			safe_to = coord(i + 1, j - 1);
			if(wise(coord(i, j), coord(i + 1, j - 1))) {
				move_comp(coord(i, j), coord(i + 1, j - 1));
				return true;
			}
		}
		if(legal_move(coord(i, j), coord(i - 1, j - 1))) {
			safe_from = coord(i, j);
			safe_to = coord(i - 1, j - 1);
			if(wise(coord(i, j), coord(i - 1, j - 1))) {
				move_comp(coord(i, j), coord(i - 1, j - 1));
				return true;
			}
		}
	}
	return false;
}
function possibilities(x, y) {
	if(!jump(x, y))
		if(!single(x, y))
			return true;
		else
			return false;
	else
		return false;
}
function prevent(end, s) {
	i = end.x;
	j = end.y;
	if(!possibilities(s.x, s.y))
		return true;
	else if((integ(board[i - 1][j + 1]) == -1) && (legal_move(coord(i - 1, j + 1), coord(i, j)))) {
		return move_comp(coord(i - 1, j + 1), coord(i, j));
	} else if((integ(board[i + 1][j + 1]) == -1) && (legal_move(coord(i + 1, j + 1), coord(i, j)))) {
		return move_comp(coord(i + 1, j + 1), coord(i, j));
	} else if((board[i - 1][j - 1] == -1.1) && (legal_move(coord(i - 1, j - 1), coord(i, j)))) {
		return move_comp(coord(i - 1, j - 1), coord(i, j));
	} else if((board[i + 1][j - 1] == -1.1) && (legal_move(coord(i + 1, j - 1), coord(i, j)))) {
		return move_comp(coord(i + 1, j - 1), coord(i, j));
	} else {
		return false;
	}
}
function wise(from, to) {
	i = to.x;
	j = to.y;
	n = (j > 0);
	s = (j < 7);
	e = (i < 7);
	w = (i > 0);
	if(n && e) ne = board[i + 1][j - 1]; else ne = null;
	if(n && w) nw = board[i - 1][j - 1]; else nw = null;
	if(s && e) se = board[i + 1][j + 1]; else se = null;
	if(s && w) sw = board[i - 1][j + 1]; else sw = null;
	eval(((j - from.y != 1) ? "s" : "n") + ((i - from.x != 1) ? "e" : "w") + "=0;");
	if((sw == 0) && (integ(ne) == 1)) return false;
	if((se == 0) && (integ(nw) == 1)) return false;
	if((nw == 0) && (se == 1.1)) return false;
	if((ne == 0) && (sw == 1.1)) return false;
	return true;
}

message("You may begin! Select a piece to move.");
my_turn = true;






(function(global) {
	global = global || window;
	var module = {
		node: {},
		set: function(message) {
			var self = this;
			self.node.info.innerHTML = message || "";
			self.show(message);
		},
		show: function(url) {
			utils.removeClass(this.node.table, "hidden");
		},
		hide: function() {
			utils.addClass(this.node.table, "hidden");
		},
		setNode: function() {
			var self = this;
			self.node.table = document.getElementById("message");
			self.node.container = document.getElementById("message_container");
			self.node.close = document.getElementById("message_close");
			self.node.info = document.getElementById("message_info");
		},
		setEvent: function() {
			var self = this;
			utils.addEvent(self.node.table, "click", function() {
				self.hide();
			});
			utils.addEvent(self.node.close, "click", function() {
				self.hide();
			});
			utils.addEvent(self.node.container, "click", function(event) {
				utils.stopevent(event);
			});
		},
		init: function() {
			var self = this;
			self.setNode();
			self.setEvent();
		}
	};

	global.message = {
		show: function(data) {
			module.set(data);
		}
	};

	utils.event.listen("message_show", function(message) {
		module.set(message);
	});

	utils.event.listen("message_hide", function(message) {
		module.hide();
	});

	utils.addEvent(document, "DOMContentLoaded", function() {
		module.init();
	}, false);
})(utils)







