Exams.on('ready', function(exams){


    function isCorrect(subject, key){

        return subject['key'] === key;
    }
    function checkAnswer(index, subject, replyKey){
       subject.isCorrect =isCorrect(subject, replyKey) ?  'Y' : 'N';

        exam_correct = 0;
        $.each(exam.items, function(index, subject){
            if(subject['isCorrect'] === 'Y'){
                exam_correct++;
            }
        }) ;
    }
    function answer(){
        var d =$("input[name='exam_answer']:checked").val();
        if(d){
            exam_done[index] = d;
            return d;
        }
        return undefined;
    }
    function resetKeys(){
        $("input[name='exam_answer']").attr("checked", false);
    }
    function setAnswerKey(key){
        $("input[name='exam_answer']").get(KEYS.indexOf(key)).checked=true;
    }
    function  save(){
        localStorage.setItem('exam'+examIndex, exam_done);
    }
    function load(){
        var config = localStorage.getItem('exam'+examIndex);

        if( config && config!=null && config.length>0){
            config = config.split(",");
            exam_done = config;
            index = exam_done.length-1;
            for(var i=0;i<exam_done.length; i++){
                checkAnswer(i, exam.items[i], exam_done[i]);
            }
            setAnswerKey(exam_done[index]);
            render();
        }

    }
    function perv(){

        if(answer()){
            checkAnswer(index, exam.items[index], exam_done[index]);
            save();
        }
        if(index--<0)index =0;

        render();
    }

    function next(){

        if(answer()){
            checkAnswer(index, exam.items[index], exam_done[index]);
            save();
        }
        if(index++>exam.items.length)index =exam.items.length;
        render();
    }
    function render(){

        resetKeys();
        if(exam_done[index]){
            setAnswerKey(exam_done[index])
        }

        $('#exam_content').text(exam.items[index].sn + '. ' + exam.items[index].subject);
        $('#exam_key_a').text(exam.items[index].answers['A']);
        $('#exam_key_b').text(exam.items[index].answers['B']);
        $('#exam_key_c').text(exam.items[index].answers['C']);
        $('#exam_key_d').text(exam.items[index].answers['D']);
        $('#exam_correct').text(exam_correct);
        $('#exam_wrong').text(exam_done.length-exam_correct);
        $('#exam_index').val(exam_done.length+1);
        $('#exam_count').text(exam_count);
        var exam_all_answers = '';
        for(var i=0;i< exam_done.length; i++){
            if(i%5==0){
                exam_all_answers += ' ';
            }

            exam_all_answers = exam_all_answers
            + exam.items[i].isCorrect === undefined ? ' ' :
                exam_all_answers += exam.items[i].isCorrect === 'Y'? 'Y' : 'N';
        }
        $('#exam_all_answers').text(exam_all_answers);
    }
    $("input[name='exam_answer']").on('click', function(e){
       var key = $(this).val();
        resetKeys();
        setAnswerKey(key);
    });
    $('#btn_perv').on('click', function(){
        perv();
    });
    $('#btn_next').on('click', function(){

        next();
    });
    $('#btn_back').on('click', function(e){
        location.href="index.html";
        return false;
    });
    $('#btn_load').on('click', function(e){
        load();
    });

//https://github.com/juanmendez/bootstrap-slider
//progressbar 
	function setExamProgress(max, min, now){

        $('#exam_progressbar').slider({
            formatter: function(value) {
                return '当前: ' + value;
            },
            id: "exam_progressbarSlider",
            min: min,
            max: max,
            value: now
        });
        $('#exam_progressbar').on('change', function(e){
            index = e.value.newValue;
            render();
        })
        $('.slider-horizontal').css('width', '100%')

	}

//application start.

    $.urlParam = function(name){
        var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
        if (results==null){
            return null;
        }
        else{
            return results[1] || 0;
        }
    }

    var examIndex = parseInt($.urlParam('exam'));
    var exam = Exams.exams[examIndex];
    var title = exam.title;
    var index = -1;
    var exam_done = [];
    var exam_count = exam.items.length;

    var exam_correct =0;
    var KEYS = 'ABCD';
    $('#exam_title').text(title);
	setExamProgress(exam_count, 0, 0);
    next();

});