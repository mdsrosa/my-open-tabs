/**
 * popup.js
 *
 */

var TITLE_LENGTH_LIMIT = 50;

// labels
var $pinned_label = $('<span class="label label-default">pinned</span>');
var $active_label = $('<span class="label label-success">active</span>');
var $audible_label = $('<span class="label label-primary">audible</span>');

function go_to_tab(tab_id){
  chrome.tabs.update(tab_id, {
    active: true
  }, function(tab_updated){
    console.log('tab updated: ' + tab_id);
  });
}

function close_tab(tab_id){
 chrome.tabs.remove(tab_id);
}

function apply_label_to_tab(li, tab){
  if(tab.pinned == true)
    $li.append($pinned_label);
  
  if(tab.active == true)
    $li.append($active_label);
  
  if(tab.audible == true)
    $li.append($audible_label);
}

function add_close_button_to_li(li, tab_id){
  $button = $('<button></button>');
  $button.attr({class: 'btn btn-danger btn-xs', id: tab_id, style: 'float: right', title: 'Close tab'});
  $span = $('<span></span>');
  $span.attr({class: 'glyphicon glyphicon-remove'});
  $button.append($span);
  
  $button.click(function(){
    close_tab(tab_id);
    li.fadeOut();
  });

  li.append($button);
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
  if(tab.title.length > TITLE_LENGTH_LIMIT){
    $link.append(tab.title.substring(0, TITLE_LENGTH_LIMIT) + '...');
  }else{
    $link.append(tab.title);
  }

  $li.append($link);
  
  apply_label_to_tab($li, tab);
  add_close_button_to_li($li, tab.id);

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
