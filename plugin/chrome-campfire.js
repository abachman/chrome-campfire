var VISITOR;

function visit_rooms() {
  clearTimeout(VISITOR);
  $('a.chat').each(function () {
    var target = $(this).attr('href');
    $.getJSON(
      target + '/transcript.json',
      function (data) {
        console.log("attended to " + target);
      }
    );
  });
  $('#chrome-campfire').html($('a.chat').length + " rooms pinged at " + (new Date).toString());
  $('#chrome-campfire').css({'background-color': "#ffff00"});
  VISITOR = setTimeout('visit_rooms()', 60000);
}

$(document).ready(function () {
  // reset tab timeout every minute by pinging the rooms you have open
  //
  // in Prototype:
  //   $$('a.chat').each(function (el) {
  //     new Ajax.Request(el.href, {success: function() {console.log("request returned")}})
  //   })
  //
  VISITOR = setTimeout('visit_rooms()', 60000);
  $('#Sidebar').append('<div id="chrome-campfire-container"><h3>Chrome Campfire <a href="#">refresh</a></h3>' +
                       '<div id="chrome-campfire"><strong>LOADED PLUGIN</strong></div></div>');
  // attach behavior to refresh link
  $('#chrome-campfire-container h3 a').click(function () {
    visit_rooms();
    console.log("DONE CLICKIN");
  });
});
