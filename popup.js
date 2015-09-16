/**
 * popup.js
 *
 */

var TITLE_LENGTH_LIMIT = 50;
var favicon_url_regex = /localhost/i

// labels
var $pinned_label = $('<span class="label label-default">pinned</span>');
var $active_label = $('<span class="label label-success">active</span>');
var $audible_label = $('<span class="label label-primary">audible</span>');

// tab functions
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

// list creation functions
function add_favicon(li, favicon_url){
  favicon = $('<img />');
  
  if(favicon_url == undefined || favicon_url_regex.exec(favicon_url))
    favicon_url = "page.png";
  
  favicon.attr({src: favicon_url, id: 'favicon'});
  
  li.append(favicon);
}

function add_title(link, tab_title){
  title = tab_title
  if(tab_title.length > TITLE_LENGTH_LIMIT)
    title = tab_title.substring(0, TITLE_LENGTH_LIMIT) + '...';
  
  link.append(title);
}

function add_link(li, tab_id, tab_title){
  link = $('<a></a>');
  link.attr({href: '#', id: tab_id});
  add_title(link, tab_title);
  li.append(link);
}

function add_label(li, tab){
  if(tab.pinned == true)
    li.append($pinned_label);
  
  if(tab.active == true)
    li.append($active_label);
  
  if(tab.audible == true)
    li.append($audible_label);
}

function add_close_button(li, tab_id){
  var button = $('<button></button>');
  button.attr({class: 'btn btn-danger btn-xs', id: tab_id, style: 'float: right', title: 'Close tab'});
  var span = $('<span></span>');
  span.attr({class: 'glyphicon glyphicon-remove'});
  button.append(span);

  button.click(function(){
    close_tab(tab_id);
    li.fadeOut();
  });

  li.append(button);
}

function create_tab_link(tab){
  ul = $('ul#tabs');
  
  li = $('<li></li>');
  li.attr({class: 'list-group-item'});

  add_favicon(li, tab.favIconUrl);
  add_link(li, tab.id, tab.title);
  add_label(li, tab);
  add_close_button(li, tab.id);

  ul.append(li);
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

    $('#tabs_count').text(tabs.length);

  });
});
