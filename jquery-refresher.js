/**
* @project                              - JQuery AJAX Updater.
* @purpose                              - Update page elements.
* @author                               - Oshane Bailey
* @email                                - b4.oshany@gmail.com
*/
$.fn.extend({
    swap: function(page, fn){
        var $page = $(page);
        var $target = $page.find(this.selector);
        if(fn != undefined)
           fn($target, $page);
        else{
           $(this).html($target.html());
        }
    },
    refresh: function(remote, fn){
        var $target = $(this);
        if(typeof remote === "function"){
            remote = ".";
            fn = remote;
        }else if(remote == undefined){
            remote = ".";
        }
        $.get(remote, function(page){
            if(fn != undefined)
                fn($target, page);
            else
                $target.swap(page);
        });
    }
});
