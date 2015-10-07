var CURRENT_SEARCH;
var RESULTS = [];
var RESULT_LIKE = [];

$(document).ready(function() {
	var database = new Firebase("https://sizzling-heat-578.firebaseio.com/");
	$("#search").click(function() {
		if($("#query").val() != '') {
			CURRENT_SEARCH = $("#query").val();
			RESULTS = [];
			RESULT_LIKE = [];
			database.child($("#query").val().toLowerCase()).on("value", function(snapshot) {
				$(".result").remove();
				var a = snapshot.val();
				var i = 0;
				for(member in a) {
					RESULTS.push(member);
					//$("body").append("<div class='result' id="+ member +">");
					for(thing in a[member]) {
						console.log(thing + ": " + a[member][thing]);
						if(thing == "likes") {
							var like = a[member][thing] * 3 + 100;
							if(like > 500) {
								like = 500;
							}
							RESULT_LIKE.push(a[member][thing]);
						} else if(thing == "link") {
							var link = a[member][thing];
						} else if(thing == "name") {
							var name = a[member][thing];
						}
						//$("#" + member).append("<p>" + thing + ":" + a[member][thing] + "</p> <br>");
					}
					$("body").append("<a href='"+ link +"' class='result' id="+ member +">" + i.toString() + ": " + name + "</a>");
					$("#" + member).animate({width: like.toString()+"px", height: like.toString() +"px"}, 0);
					//$("body").append("</div>");
					i++;
				}
			});
		}
	});
	$("#like").click(function() {
		if($("#number").val() >= 0 && $("#number").val() != "" && CURRENT_SEARCH != null && RESULTS.length > $("#number").val()) {
			console.log("like!");
			database.child(CURRENT_SEARCH).child(RESULTS[$("#number").val()]).update({
				"likes" : RESULT_LIKE[$("#number").val()] + 1
			});
			RESULT_LIKE[$("#number").val()]++;
		}
		$("#number").val('');
	});
	
});