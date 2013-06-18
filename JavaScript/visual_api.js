function update_message(message_title, message_subtitle, message_color, target_url) {
	$(".message_title").text(message_title).attr('id', message_color);
	$(".message_subtitle").text(message_subtitle);
  $("#data_links a").attr('href', target_url);
}

function show_head_message(message) {
	var options = $("#placeholder");
	options.append($("<option />").val("").text(message));
}

function show_notification(title, subtitle, image_source, link_address) {
  var permission = window.webkitNotifications.checkPermission();
  if (permission == 0) {
    // 0 is PERMISSION_ALLOWED
    var notification = window.webkitNotifications.createNotification(
      image_source,
      title,
      subtitle
    );
    notification.onclick = function () {
      window.open(link_address);
      notification.close();
    }
    notification.show();
    setTimeout(function() {notification.close();}, 10000);
  } else {window.webkitNotifications.requestPermission();}
}