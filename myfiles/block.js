$(document).ready(function() {
	$('body').bind('cut copy paste', function (e) {
		e.preventDefault();
	})
	$("main").on("contextmenu", function(e) {
		return false;
    })
    $("p").on("contextmenu", function(e) {
		return false;
	})
})
