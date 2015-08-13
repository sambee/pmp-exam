var Exams = {};
Exams.exams = [];
Exams.events = [];
Exams.listerens = {};
Exams.on = function(eventName, fn){
    if(!Exams.listerens[eventName]){
        Exams.listerens[eventName] = [];
    }
    Exams.listerens[eventName].push(fn);
}
Exams.fireEvent = function(eventName){
    if( Exams.listerens[eventName]){
        var array = Exams.listerens[eventName];
        for(var k in array){
            array[k](arguments[1], arguments[2], arguments[3]);
        }
    }
};
///sync load js
function loadLocalLocalJS(){
    var href = location.href;
    var pos = href.lastIndexOf("/")+1;
    var end = href.lastIndexOf(".");
    var url = href.substring(pos,end) + ".js";
    document.write("<script src='" + url +"'><\/script>");
}
loadLocalLocalJS();

(function(){

    ///async load js
    function loadJSON(url) {
        //document.write("<script src='" + url +"'><\/script>");
        var r = false;
        var sNew = document.createElement("script");
        sNew.async = true;
        sNew.src = url;

        sNew.onload = sNew.onreadystatechange = function() {

            //console.log( this.readyState ); //uncomment this line to see which ready states are called.
            if ( (!this.readyState || this.readyState == 'complete') )
            {
                r = true;
                loadedJSON(url);
            }
        };
        var s0 = document.getElementsByTagName('script')[0];
        s0.parentNode.insertBefore(sNew, s0);
    };




    loadJSON('app.json');

    function loadedJSON(url){

        if(Exams && Exams.from){

            if(!Exams.loadJS){
                Exams.loadJS =[];
            }

            if( Exams.loadJS.indexOf(url) == -1){
                for(var k in Exams.from){
                    var obj = Exams.from[k];
                    Exams.loadJS.push(obj.url);
                    loadJSON(obj.url);
                }
            }
            else{
                if(!Exams.loadedJS){
                    Exams.loadedJS =[];
                }
                Exams.loadedJS.push(url);

                //completed load js.
                if(Exams.loadedJS.length == Exams.loadJS.length){
                        Exams.fireEvent('ready',Exams.exams);
                }

            }
        }
    }

})();

//function reander(index, exam, exams){
//  $('body').append('<h2><a href="practic.html?exam='+index+'">'+exam.title+'</a></h2>');
//}

//on html page loaded.
//$(document).ready(function(){
    //if(Exams && Exams.from){
    //    for(var k in Exams.from){
    //        var obj = Exams.from[k];
    //        loadJS(obj.url);
    //    }
    //}
//});