/**
 * popup.js
 *
 */

// labels
var $pinned_label = $('<span class="label label-default">pinned</span>');
var $active_label = $('<span class="label label-success">active</span>');
var $audible_label = $('<span class="label label-primary">audible</span>');

function go_to_tab(tab_id){
  return chrome.tabs.update(tab_id, {
    active: true
  }, function(tab_updated){
    console.log('tab updated: ' + tab_id);
  });
}

function create_tab_link(tab){
    $ul = $('ul#tabs');
    
    $li = $('<li></li>');
    $li.attr({class: 'list-group-item'});

    $link = $('<a></a>');
    $link.attr({href: '#', id: tab.id});
    $favicon = $('<img />');
    $favicon.attr({src: tab.favIconUrl, id: 'favicon'});
    
    $link.append($favicon);
    $link.append(tab.title);

    $li.append($link);
    
    // applying labels
    if(tab.pinned == true){
      $li.append($pinned_label);
    }
    
    if(tab.active == true){
      $li.append($active_label);
    }
    
    if(tab.audible == true){
      $li.append($audible_label);
    }

   $ul.append($li);
}

$(document).ready(function(){
  chrome.tabs.query({
    currentWindow: true
  }, function(tabs) {
    var i;

    for(i = 0; i < tabs.length; i++){
      tab = tabs[i];
      create_tab_link(tab);
    }

    $('ul#tabs li a').each(function(index){
      $(this).click(function(){
        tab_id = parseInt($(this).attr('id'));
        go_to_tab(tab_id);
      });
    });

  });
});
