# jQuery Behance

A simple plugin to display [Behance](http://behance.net) projects on your web site. 

## Requirements

* jQuery 1.9.x
* Behance application registration for your web site.
* [Colorbox jQuery lightbox plugin](http://www.jacklmoore.com/colorbox/) for slideshows (included). 


## Installation

1. [Register the web site](http://www.behance.net/dev/register) you'll use the plugin with Behance.

  Application Name: Behance jQuery plugin
  Website: http://yoursite.com
  Redirect URI (for OAuth): http://www.yoursite.com/path
  Description: Display my Behance projects on my web site.

2. Add an empty HTML element to contain your portfolio.

```html
<div id="#be-grid"></div>
```

3. Add jQuery and Colorbox. Use an existing colorbox theme or create your own. 

```html
<link rel="stylesheet" href="../lib/colorbox/example3/colorbox.css">
<link rel="stylesheet" href="jquery.behance.css">
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
<script>
if (!window.jQuery) {
    document.write('<script src="../lib/jquery-1.9.1.min.js"><\/script>');
}
</script>
<script src="../lib/colorbox/colorbox/jquery.colorbox-min.js"></script>
```

4. Add the plugin to your page, enter your Behance API key and user ID. Change [colorbox settings](http://www.jacklmoore.com/colorbox/) to suit your taste. 

```html
<script src="../jquery.behance.js"></script>
<script>
  $(document).ready(function() {

    $('#be-grid').behance({
      apiKey: 'R@ND0M5TRINGFROM8EHANC3',
      user: 'username',
      sort: 'featured_date',
      gridID: '#be-grid',
      cssItem: 'be-item group',
      cssTitle: 'green',
      cssMore: 'button',
      colorbox:  {
        slideshow: false,
        transition: 'elastic'
      }
    });
  });
</script>
```

## To Do List

* Switch from Colorbox to Magnific Popup.
* Display project text in slideshows.
* Restore endless page feature (load more).
* Show loading indicator for paged project display.
* Investigate caching options.
* Handle/display errors.
* Display Works in Progress.
* Document all plugin options (sort, css options, etc.).

## Credits

* [Behance API team](http://blog.behance.net/dev/introducing-the-behance-api).
* [John Ressig](http://ejohn.org/) and the [jQuery team](https://jquery.org/team/).
* [Jack Moore](http://www.jacklmoore.com), creator of colorbox.

## License

Copyright (c) 2013 [Chad Kieffer](http://2tbsp.com). Licensed under the [MIT license](http://opensource.org/licenses/MIT).