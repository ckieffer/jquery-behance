/*!
 * jQuery Behance Plugin 0.2alpha
 *
 * Copyright 2013 Chad Kieffer
 * Released under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 */

 ; (function($, window, document, undefined) {

   $.fn['behance'] = function(options) {

     var $container, $item, $thumb, $title, $link, ht, prevHt, maxHt,
         defaults = {
           user:      false,
           apiKey:    false,
           // featured_date (default, but must explicitly set), appreciations, views, comments, published_date
           sort:      'featured_date',
           thumbSize: 202,
           xhrError:  'This content failed to load.',
           showMore:  'Show more projects',
           showMoreID:'#be-showmore',
           gridID:    '#be-grid',
           itemTag:   '<div>',
           cssItem:   'be-item',
           cssImg:    'be-image',
           cssTitle:  'be-title',
           cssLink:   'be-lightbox',
           cssMore:   'be-button',
           colorbox:  {
             slideshow: true,
             slideshowSpeed: 3500,
             loop: false,
             transition: 'elastic'
           },
           dataType: 'jsonp' // json
         },
         apiUrl = {
             user:    'http://www.behance.net/v2/users/{user}/projects',
             project: 'http://www.behance.net/v2/projects/{id}'
         },
         page = 1,
         perPage = 12,
         itemCount = 0,
         cssQueued = 'be-justadded',
         $showMore = $('<a/>').attr('id', options.showMoreID).attr('class', 'group'),
         $lbLinks = $(),
         $lbContainer = $('<div>').attr('id', 'be-slideshow').hide();

     options = $.extend(defaults, options);

     // Set required colorbox options
     options.colorbox.open = true;


     // Retrieve and display a project
     var displayProject = function(e) {
       var $anchor, url, projectID,
           $target = $(e.target);

       e.preventDefault();

       if (!$target.is('div')) {
         $anchor = $target.parent();
       } else {
         $anchor = $target.find('a');
       }

       projectID = $anchor.attr('rel');

       $.ajax({
         url: apiUrl.project.replace('{id}', projectID),
         data: {
           api_key: options.apiKey
         },
         dataType: options.dataType,
         success: function(data) {
           $lbContainer.empty();
           $.each(data.project.modules, function(i, m) {
             if (m.type === 'image') {
               $lbContainer.append( $('<a/>').
                       prop('href', m.src).
                       prop('class', 'slides').
                       prop('rel', projectID));
             }
           });

           $lbLinks = $('#be-slideshow').children('a');
           $lbLinks.colorbox(options.colorbox);
         }
       });
     };

     var appendToGrid = function(projects, page) {
       // Set the grid container
       $container = $(options.gridID);

       // Build thumbnail, title, link and append to parent container
       $.each(projects, function(i, p) {
         $thumb = $('<img>').prop('src', p.covers[options.thumbSize]);
         $title = $('<h4>').html(p.name).prop('class', options.cssTitle);
         $link = $('<a/>').prop('href', p.id).prop('class', options.cssLink).prop('rel', p.id).
                 append($thumb).
                 append($title);
         $item = $(options.itemTag).append($link).prop('class', options.cssItem + ' ' + cssQueued).
                 click(displayProject);

         // Add parent item to the grid, but don't show quite yet
         $item.appendTo($container).hide();

         // Track item heights to determine the tallest
         // @todo Replace this hack with something that waits until the first image is loaded.
         //       Can't accurately determine height until we have at least one image loaded.
         ht = $item.height();

         if (ht < 90) {
           if (options.thumbSize === 202) {
             ht = ht + 158;
           } else {
             ht = ht + 90;
           }
         }

         if (ht > prevHt || maxHt === null) {
           maxHt = ht;
         }
         prevHt = ht;

       });

       // If we're showing the first page, do so immediately
       if (page === 1) {
         reveal();
       }
       page++;
       if (projects.length === perPage) {
         getProjects(page);
         setPage(page);
         //reveal();
       }
     };

     var reveal = function() {
       // Remove the just added class from visible items
       $('.' + options.cssItem).removeClass(cssQueued);
       $('.' + cssQueued).height(maxHt).fadeIn();
     };

     var getPage = function() {
       if ($(options.gridID).find(options.showMoreID).length) {
         return $(options.showMoreID[0]).attr('href');
       } else {
         return 1;
       }
     };

     var setPage = function(page) {
       var $showMore = $(options.gridID).find(options.showMoreID);
       $($showMore).prop('href', (page + 1));
     };

     // Get a page of Behance projects for the user
     var getProjects = function(page) {
       var qs = {
         api_key: options.apiKey,
         page: page
       };
       if (options.sort !== 'featured_date') {
         qs.sort = options.sort;
       }
       $.ajax({
         url: apiUrl.user.replace('{user}', options.user),
         //url: apiUrl.user.replace('{user}', options.user) + page,
         data: qs,
         dataType: options.dataType,
         success: function(data) {
           appendToGrid(data.projects, getPage());
         },
         // @todo: handle errors
         error: function(error) {
           alert(error);
         }
       });
     };

     return this.each(function() {
       // Show the first page of projects
       getProjects(getPage());

       // Add container for lightbox items
       $('body').append($lbContainer);
     });
   };

 })(jQuery, window, document);