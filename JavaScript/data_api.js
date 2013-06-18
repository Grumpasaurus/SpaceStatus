function list_spaces() {  
  $.ajax({
    url: "https://raw.github.com/SpaceApi/OpenSpaceDirectory/master/directory.json",
    dataType: "json",
    success: function(list_of_spaces){
      show_head_message("Chose a space...", "welcome_message");
      var options = $("#list_of_spaces");
      $.each(list_of_spaces, function(key, value) {
        var option_value = attache_prefix(value, "source_link");
        options.append($("<option />").val(option_value).text(key));
      });
      chose_option();
    },
    error: function(){
      show_head_message("Connection error...", "connection_error");
    }
  });
}

function chose_option() {
  $('#option_input').change(function() {
    var option_value = $(this).find(':selected').val();
    determ_prefix(option_value);
  });
}
function attache_prefix(value, prefix_name) {
  var option_value = prefix_name + "__:__" + value;
  return option_value;
}
function determ_prefix(option_value) {
  var prefix = option_value.split("__:__");
  switch (prefix[0]) {
    case "source_link":
      get_status(prefix[1]);
      break;
    case "connection_error":
        update_message(
          "Sorry!",
          "We could not establish a connection to the source. Please try later again.!",
          "red",
          false
        );
      break;
    case "welcome_message":
      update_message(
        "Go, check it out!",
        "Is my local space open?",
        "green",
        false
      );
      break;
    default:
      break;
    }
}
function get_status(source_url) {
  $.ajax({
    url: source_url,
    dataType: "json",
    success: function(source){
      if (source.open == true) {
        update_message("has open!", source.space, "green", source.url);
      }
      else if (source.open == false) {
        update_message("has closed!", source.space, "red", source.url);
      }
      else {
        update_message("unknow", source.space, "blue", "");
      }
    },
    error: function(){
      //show_head_message("Connection error...", "connection_error");
    }
  });
}

function update_message(message_title, message_subtitle, message_color, target_url) {
  $(".message_title").text(message_title).attr('id', message_color);
  $(".message_subtitle").text(message_subtitle);
  if (target_url == false) {
    $("#data_url").css("display","none");
  }
  else {
    $("#data_url").css("display","block");
    $("#data_url a").attr('href', target_url);
  }
}

function show_head_message(message, type) {
  var options = $("#placeholder");
  var option_value = attache_prefix(message, type);
  options.append($("<option />").val(option_value).text(message));
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