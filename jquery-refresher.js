/**
* @project                              - JQuery AJAX Updater.
* @purpose                              - Update page elements.
* @author                               - Oshane Bailey
* @email                                - b4.oshany@gmail.com
*/
$.fn.extend({
    refresh: function(page, remote, fn){
        $page = $(page);
        $target = $page.find(this.selector);
        if(typeof(remote) == "function")
            fn = remote;
        else{
            $.get(remote, function(data){
                $($target).refresh(data, fn);
            });
        }
        if(fn != undefined)
           fn($target, this, $page);
        else{
           this.html($target.html());
        }
    }
});
