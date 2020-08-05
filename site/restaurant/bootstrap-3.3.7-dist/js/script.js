$(function(){
    $("#navbarToggle").blur(function(event) {
        var screenwidth = window.innerWidth;
        if(screenwidth < 768) {
            $("#collapsable-nav").collapse('hide');
        }
    });
});

(function(global) {
    var dc = {};
    var homehtml = "snippets/home_snippets.html";
    var allcatagoriesurl = "https://davids-restaurant.herokuapp.com/categories.json";
    var catagoriestitlehtml = "snippets/title_snippets.html";
    var catagoryhtml = "snippets/catagory_snippets.html"

    var inserthtml = function (selector, html) {
        var targetelem = document.querySelector(selector);
        targetelem.innerhtml = html;
    };

    var showloading = function (selector) {
        var html = "<div class='text-center'>";
        html += "<img src='ajax-loader.gif'></div>";
        inserthtml(selector,html);
    };

    //catagory_snipppet theke string hishebe ajx call use kore anbo
    var insertproperty = function (string, propname, propvalue) {
        var proptoreplace = "{{" + propname +"}}";
        string = string.replace(new RegExp(proptoreplace, "g"), propvalue);
        return string;
    }
//main function er jnno
    document.addEventListener("DOMContentLoaded", function (event) {
        showloading("#main-content");
        $ajaxUtils.sendGetRequest(homehtml,function (responsetext) {
            document.querySelector("#main-content").innerHTML = responsetext;
        },
        false);
    });

    //catagory page er jnno
    dc.loadmenucatagories = function (params) {
        showloading("#main-content");
        $ajaxUtils.sendGetRequest(allcatagoriesurl, bulidandshowcatagorieshtml);
    };

    function bulidandshowcatagorieshtml(catagories) {
        $ajaxUtils.sendGetRequest(catagoriestitlehtml,
            function (catagoriestitlehtml) {
                $ajaxUtils.sendGetRequest(catagoryhtml,function (catagoryhtml) {
                    var catagoryviewhtml =
                     buildcatagoriesviewhtml(catagories,catagoriestitlehtml,catagoryhtml);
                    inserthtml("#main-content", catagoryviewhtml)
                },
                false);
        },
        false);
        
    }

    function buildcatagoriesviewhtml(catagories,catagoriestitlehtml,catagoryhtml) {
        var finalhtml = catagoriestitlehtml;
        inalHtml += "<section class='row'>";
        for(var i = 0; i < categories.length; i++) {
            var html = categoryHtml;
            var name = "" +catagories[i].name;
            var short_name = catagories[i].short_name;

            html = insertproperty(html, "name", name);
            html = insertproperty(html, "short_name", short_name);

            finalhtml += html;
        }
        

        finalhtml += "</section";
        return finalhtml;
    }

    

    global.$dc = dc;
    
})(window);