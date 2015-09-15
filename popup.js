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
    var i, ul_tabs = $('ul#tabs');

    for(i = 0; i < tabs.length; i++){
      tab_id = tabs[i].id
      tab_favicon_url = tabs[i].favIconUrl
      ul_tabs.append('<li><a href="#" id="'+tab_id+'" class="list-group-item"> '+'<img src="'+tab_favicon_url+'" id="favicon"/> '+ tabs[i].title + '</a></li>');
    }

    $('ul#tabs li a').each(function(index){
      $(this).click(function(){
        go_to_tab(parseInt($(this).attr('id')));
      });
    });
  });
});
