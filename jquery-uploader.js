/**
* @project                              - JQuery AJAX Uploader
* @purpose                              - Upload files to server, via JQuery Ajax.
* @author                               - Oshane Bailey
* @email                                - b4.oshany@gmail.com
*
* Represent a Drag and Drop interface for file uploader.
* @class FileUploader
* @property {int} rowCount              - num of bits.
* @property {HTMLElement} dropper       - Drag and Drop container.
* @property {string} formData           - form data.
* @property {double} status             - percentage completed.
* @property {XMLHttpResponse} response  - http response object from the server.
* @property {string[]} responseData     - response data from the server.
* @proeprty {string} url                - url of the server.
*/
function FileUploader(options, url, fn){
    this.rowCount = 0;
    this.status = null;
    this.responseData = [];
    this.response = undefined;
    this.url = url;
    this.files = [];
    this.targetName = "files";
    this.fn = fn;
    this.options = {
        "target": undefined,
        "dragArea": undefined,
        "trigger": "onAttach",
        "showProgress": false
    };

    this.enable_drag_drop = function(){
        var uploader = this;
        this.dropper.on('dragenter', function (e){
            e.stopPropagation();
            e.preventDefault();
            $(this).css('border', '2px solid #0B85A1');
        });
        this.dropper.on('dragover', function (e){
             e.stopPropagation();
             e.preventDefault();
        });
        this.dropper.on('drop', function (e){
            $(this).css('border', '2px dotted #0B85A1');
            e.preventDefault();
            var files = e.originalEvent.dataTransfer.files;
            uploader.fileEventHandler(files);
        });
    }
    
    this.fileEventHandler = function(files){        
        //We need to send dropped files to Server.
        switch(this.options.trigger){
            case "onAttach":
                this.handleFileUpload(files);
                break;
            case "onSubmit":
                this.files = this.files.concat(files);
                break;
        }
    }
    
    this.submit = function(form){
        if(this.options.trigger = "onSubmit")
            this.handleFileUpload(this.files, form);
        if(this.response != undefined)
            return this.response
    }

    this.init = function(options){
        $.extend(this.options, options);
        var dragArea = this.options["dragArea"];
        var obj = this;
        if(dragArea != undefined){
            this.dropper = $(dragArea);
            if(this.dropper != undefined)
                this.enable_drag_drop();
        }
        if(this.options["target"] != undefined){
            $(this.options["target"]).on('change', function(e){
                obj.targetName = $(e.delegateTarget).attr("name");
                obj.handleTarget(e);
            });
        }
        if(this.url == undefined)
            this.url = ".";
    }

    this.handleTarget = function(e){
        var files = e.target.files || e.originalEvent.dataTransfer.files;
        this.fileEventHandler(files);
    }

    this.handleFileUpload = function(files, form){
        var formData = new FormData();
        var showProgress = this.options.showProgress;
        var status = (showProgress)? new this.createStatusbar(this) : undefined;
        if(files instanceof Array){
            $.each(files, function(key, file){
                uploader.handleFileUpload(file, form);
            });
        }else{
            if(form != undefined){
                $.each($(form)[0].elements, function(index, element){
                    formData.append(element.name, element.value);
                });
            }
            var targetName = this.targetName;
            $.each(files, function(key, file){
                formData.append(targetName, file);                
                if(showProgress)
                    status.setFileNameSize(file.name, file.size);
            });
            this.sendFileToServer(this.url, formData, status);
        }
    }

    this.sendFileToServer = function(url, formData, status){
        var current_object = this;
        var uploadURL = url; //Upload URL
        var extraData ={}; //Extra Data.
        var jqXHR=$.ajax({
                xhr: function() {
                var xhrobj = $.ajaxSettings.xhr();
                if (xhrobj.upload) {
                        xhrobj.upload.addEventListener('progress', function(event) {
                            var percent = 0;
                            var position = event.loaded || event.position;
                            var total = event.total;
                            if (event.lengthComputable) {
                                percent = Math.ceil(position / total * 100);
                            }
                            
                            //Set progress
                            if(current_object.options.showProgress)
                                status.setProgress(percent);
                        }, false);
                    }
                return xhrobj;
            },
        url: uploadURL,
        type: "POST",
        contentType:false,
        processData: false,
            cache: false,
            data: formData,
            success: function(data){
                if(current_object.options.showProgress)
                    status.setProgress(100);
                if(typeof fn === "function")
                    fn(data);
                current_object.responseData.push(data);
                $("#status1").append("File upload Done<br>");
            }
        });
        if(this.options.showProgress)
            status.setAbort(jqXHR);
        this.response = jqXHR;
    }

    this.createStatusbar = function(obj){
        this.response = [];
         obj.rowCount++;
         var row="odd";
         if(obj.rowCount %2 ==0) row ="even";
         this.statusbar = $("<div class='statusbar "+row+"'></div>");
         this.filename = $("<div class='filename'></div>").appendTo(this.statusbar);
         this.size = $("<div class='filesize'></div>").appendTo(this.statusbar);
         this.progressBar = $("<div class='progressBar'><div></div></div>").appendTo(this.statusbar);
         this.abort = $("<div class='abort'>Abort</div>").appendTo(this.statusbar);
         obj.dropper.after(this.statusbar);

        this.setFileNameSize = function(name,size)
        {
            var sizeStr="";
            var sizeKB = size/1024;
            if(parseInt(sizeKB) > 1024)
            {
                var sizeMB = sizeKB/1024;
                sizeStr = sizeMB.toFixed(2)+" MB";
            }
            else
            {
                sizeStr = sizeKB.toFixed(2)+" KB";
            }

            this.filename.html(name);
            this.size.html(sizeStr);
        }
        this.setProgress = function(progress)
        {
            var progressBarWidth =progress*this.progressBar.width()/ 100;
            this.progressBar.find('div').animate({ width: progressBarWidth }, 10).html(progress + "% ");
            if(parseInt(progress) >= 100)
            {
                this.abort.hide();
            }
        }
        this.setAbort = function(jqxhr)
        {
            var sb = this.statusbar;
            this.abort.click(function()
            {
                jqxhr.abort();
                sb.hide();
            });
        }
    }

    this.init(options);
}
