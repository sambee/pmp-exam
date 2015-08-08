(function(){

    function loadJS(url) {
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
                loadedJS(url);
            }
        };
        var s0 = document.getElementsByTagName('script')[0];
        s0.parentNode.insertBefore(sNew, s0);
    };

    loadJS('exam/data.js');

    function loadedJS(url){

        if(Exams && Exams.from){

            if(!Exams.loadedJS){
                Exams.loadedJS =[];
            }

            if( Exams.loadedJS.indexOf(url) == -1){
                for(var k in Exams.from){
                    var obj = Exams.from[k];
                    Exams.loadedJS.push(obj.url);
                    loadJS(obj.url);
                }
            }
            else{
                console.info('[Loaded JS]' +url);
                for(var index in Exams.exams){
                    debugger
                }
            }
        }
    }

})();


//on html page loaded.
//$(document).ready(function(){
    //if(Exams && Exams.from){
    //    for(var k in Exams.from){
    //        var obj = Exams.from[k];
    //        loadJS(obj.url);
    //    }
    //}
//});