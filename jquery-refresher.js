/**
* @project                              - JQuery AJAX Updater.
* @purpose                              - Update page elements.
* @author                               - Oshane Bailey
* @email                                - b4.oshany@gmail.com
*/
$.fn.extend({
    swap: function(page, fn){
        $page = $(page);
        $target = $page.find(this.selector);
        if(fn != undefined)
           fn($target, $page);
        else{
           $(this).html($target.html());
        }
    },
    refresh: function(remote, fn){
        $target = $(this);
        $.get(remote, function(page){
            if(fn != undefined)
                fn($target, page);
            else
                $target.swap(page);
        });
    }
});
