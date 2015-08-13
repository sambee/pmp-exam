Exams.on('ready', function(exams){
    for(var index in Exams.exams){
       // reander(index, Exams.exams[index], Exams.exams);
        $('body').append('<h2><a href="practic.html?exam='+index+'">'+exams[index].title+'</a></h2>');
    }
})