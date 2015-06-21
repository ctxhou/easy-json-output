json_loop = (function() {
    var init = function(json, options, schema) {

        var settings = $.extend({
            'appendTo': 'body',
            'list_id': 'json',
            'id_prefix': 'cn',
            'input_class': 'test',
            'text_class': 'test2'
        }, options);

        var path = "";

        traverse = function(o, deep) {
            for (var i in o) {
                var savepath = path;
                path = path ? (path + "." + i) : i;
                if (o[i] !== null && typeof(o[i]) == "object") {
                    display_key([i, deep]);
                    traverse(o[i], deep + 1);
                } else {
                    display([i, path, o[i], deep]);
                }
                path = savepath;
            }
        },

        display_key = function(output) {
            var p = document.createElement('p');
            p.innerHTML = String(output[0]);
            document.body.appendChild(p);
        },

        display = function(output) {
            var key = output[0]
            var path = output[1];
            var value = output[2];
            var p = document.createElement('p');
            // if (type === "text") {
            //   return '<textarea rows="4" cols="50" class="'+ settings.input_class +'" cn-data-path="'+path+'">'+val+'</textarea>'
            // } else {
              var text = '<input class="' + settings.input_class + '"value="' + value + '" cn-data-path="'+path+'">'        
            // }
            p.innerHTML = String(key + ":" + text);
            document.body.appendChild(p);
        }

        traverse(json, 1);
    }
    return {
        format: function(json, options, schema) {
            init(json, options, schema);
        }
    }
})();
