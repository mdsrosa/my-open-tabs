/**
 * popup.js
 *
 */

function go_to_tab(tab_id){
  return chrome.tabs.update(tab_id, {
    active: true
  }, function(tab_updated){
    console.log('tab updated: ' + tab_id);
  });
}

$(document).ready(function(){
  chrome.tabs.query({
    currentWindow: true
  }, function(tabs) {
    console.log('Total tabs: ' + tabs.length);

    var i;
    var $ul_tabs = $('ul#tabs');

    for(i = 0; i < tabs.length; i++){
      tab_id = tabs[i].id
      $ul_tabs.append('<li><a href="#" id="'+tab_id+'">' + tabs[i].title + '</a></li>');
    }

    $('ul#tabs li a').each(function(index){
      console.log('adding eventlistener to <a> ' + index + ' tab id: ' + $(this).attr('id'));
      $(this).click(function(){
        go_to_tab(parseInt($(this).attr('id')));
      });
    });

  });
});
