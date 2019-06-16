$(document).ready(function(){
  
  let subject_points; //　←関数の外に出して合否判定でも使えるようにしました。
  function score_indicate(){
    subject_points = [Number($('#national_language').val()),//　←空っぽの変数に配列を格納 
                      Number($('#english').val()),
                      Number($('#mathematics').val()),
                      Number($('#science').val()),
                      Number($('#society').val())
                      ];

    let sum = subject_points.reduce(function(a,b){
      return a + b;
    });
    $('#sum_indicate').text(sum);

    let average = sum / subject_points.length;//　←合計値と配列の数で平均を計算
    $('#avarage_indicate').text(average);
  };
  
  function get_achievement(){
    // ここに、ランクの値の文字列（平均点が80点以上なら"A"、60点以上なら"B"、40点以上なら"C"、それ以下なら"D"）を出力する処理を書き込む
    let ave = Number($('#avarage_indicate').text());
    function rank(){
      if (ave >= 80) {
        return "A";
      } else if(ave >= 60) {
        return "B";
      } else if(ave >= 40) {
        return "C";
      } else {
        return "D";
      }
    }
    $('#evaluation').text(rank());
  }
  
  function get_pass_or_failure(){
    // ここに、全ての教科が60点以上なら"合格"の文字列、
    // 一つでも60点未満の教科があったら"不合格"の文字列を出す処理を書き込む
    let judge = "合格";
    for (let i=0; i<subject_points.length; i++){
      if (subject_points[i] < 60){
        judge = "不合格";
      }
    }
    $('#judge').text(judge);
  }

  function judgement(){
    let judge = $('#judge').text();
    let evaluation = $('#evaluation').text();
    
    //以下、ついでに最終ジャッジクリック時でランク・判定が出力されていない場合にアラートが出るように設定
    if (evaluation == ""){
      window.alert('ランクが出力されていません');
    } else if(judge == ""){
      window.alert('判定が出力されていません');
    } else {
    $('#declaration').append(`<label id="alert-indicate" class="alert alert-info">あなたの成績は${evaluation}です。${judge}です。</label>`);
    }
  };

  $('#national_language, #english, #mathematics, #science, #society').change(function() {
    score_indicate();
  });

  $('#btn-evaluation').click(function() {
    get_achievement();
  });

  $('#btn-judge').click(function() {
    get_pass_or_failure();
  });

  $('#btn-declaration').on('click', function() {
    $('#declaration').empty();// ←removeだと何故か上手くいかなかったので、emptyで削除してます。。。
    judgement();
  });
});