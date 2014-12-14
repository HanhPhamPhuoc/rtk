---
---
$(function() {
	$('#search input.button').on('click', function() {
    return search();
  });
  
  $('#search-query').on('keyup', function() {
    return search();
  });

  function search() {
    var query   = $('#search-query').val();
    var result  = $('#search-results');
    var entries = $('#search-results .entries');

    if (query.length <= 1) {
      result.hide();
      entries.empty();
    } else {
      // retrieve matching result with content
      var results = $.map(idx.search(query), function(result) {
        return $.grep(docs, function(entry) {
          return entry.id === result.ref;
        })[0];
      });

      entries.empty();

      if (results && results.length > 0) {
        $.each(results, function(key, page) {
          entries.append('<article>'+
          '  <h3>'+
          '    <a href="{% if page.type != 'index' %}..{% endif %}'+page.id+'">'+page.title+'</a>'+
          '  </h3>'+
          '</article>');
        });
      } else {
        entries.append('<h4>Không tìm thấy từ :-(</h4>');
      }

      result.show();
    }

    return false;
  }
});
