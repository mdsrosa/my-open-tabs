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
    var i, $ul = $('ul#tabs');

    for(i = 0; i < tabs.length; i++){
      tab = tabs[i];
      tab_id = tab.id
      tab_favicon_url = tab.favIconUrl
      tab_title = tab.title

      $li = $('<li></li>');
      $li.attr({class: 'list-group-item'});

      $link = $('<a></a>');
      $link.attr({href: '#', id: tab_id});
      $favicon = $('<img />');
      $favicon.attr({src: tab_favicon_url, id: 'favicon'});
      
      $link.append($favicon);
      $link.append(tab_title);

      $li.append($link);
      $ul.append($li);
    }

    $('ul#tabs li a').each(function(index){
      $(this).click(function(){
        go_to_tab(parseInt($(this).attr('id')));
      });
    });
  });
});
