var NUM_TAGS = 1;

$(document).ready(function() {
	$("#title").animate({opacity: '0', left: '10vw'}, 0);
	$(".form").animate({opacity: '0'}, 0);
	$("#title").animate({opacity: '1.0', left: '20vw'}, 1000);
	$(".form").animate({opacity: '1.0'}, 2000);
	var database = new Firebase("https://sizzling-heat-578.firebaseio.com/");
	$("#tagButton").click(function() {
		NUM_TAGS++;
		$("form").append("<input type='text' class='tag1' id='tag" + NUM_TAGS.toString() + "''>");
	});
	$("#submit").click(function() {
		if($("#name").val() != false && $("#link").val() != false && $("#tag").val() != false) {
			var name = $("#name").val();
			var link = $("#link").val();
			var tag = $("#tag").val().toLowerCase();
			var extraTag = []
			for(var i = 2; i <= NUM_TAGS; i++) {
				if($("#tag" + i.toString()).val() != false) {
					extraTag.push($("#tag" + i.toString()).val().toLowerCase());
				}
			}
			database.child(tag).push({
				"name" : name,
				"link" : link,
				"likes" : 10,
			});
			for(var i = 0; i < extraTag.length; i++) {
				database.child(extraTag[i]).push({
				"name" : name,
				"link" : link,
				"likes" : 10,
				});
			}
			$("#name").val('');
			$("#link").val('');
			$("#tag").val('');
			$(".tag1").remove();
		}
	});
});