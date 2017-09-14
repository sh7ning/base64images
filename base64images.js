/**
 * base64images.js
 *
 * @author sh7ning
 * 2017.9.14
 */
function base64images(ele, callback) {
    function getBase64Image(img) {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, img.width, img.height);
        var ext = img.src.substring(img.src.lastIndexOf(".")+1).toLowerCase();
        return canvas.toDataURL("image/"+ext);
    }

    var length = $(ele).length;
    if (length == 0) {
        callback();
        return
    }
    var loadedImgs = 0;
    function imgLoadPost() {
        loadedImgs++;
        if (loadedImgs == length) {
            callback();
        }
    }

    $(ele).each(function() {
        var imgObj = new Image();
        imgObj.setAttribute('crossOrigin', 'anonymous');
        imgObj.src = $(this).attr('src');
        imgObj.onload = function() {
            if ($(this).attr('data-load')) { //avoid repeated loading
                return;
            }
            var dataUrl = getBase64Image(imgObj);
            //console.log(dataUrl);
            $(this).attr('src', dataUrl);
            $(this).attr('data-load', true)
            imgLoadPost();
        }.bind(this);
        imgObj.onerror = function(){
            imgLoadPost();
        };
    });
}
