
  
  var histogram_block=document.getElementById('histogram_block');
  var mean_html = document.getElementById('mean');
  var median_html = document.getElementById('median');
  var mode_html=document.getElementById('mode');
  var q1_html = document.getElementById('q1');
  var q3_html = document.getElementById('q3');
  var outliers_html = document.getElementById('outliers');
  var iqr_html=document.getElementById('iqr')
  function setHistogramma(){
    document.getElementById("histogram").remove();
    var histogram=document.createElement('canvas');
    histogram.id='histogram';
  
    histogram_block.insertAdjacentElement('afterbegin',histogram)
        var res=[
            {
                song_length: "One",
                size: 1
            },
            {
                song_length: "Three",
                size: 3
            },
            {
                song_length: "Ten",
                size: 10
            },
            {
              song_length: "Ten",
              size: 10
            },
            {
                song_length: "Fifty",
                size: 50
            },
            {
                song_length: "Twenty",
                size: 20
            },
            {
                song_length: "Twenteen",
                size: 12
            },
        ]
        var dataValues = [];
        var dataLabels = [];
        var list_of_size=[];
        var outliers=[]
        var sum_of_data=0;
        var median;
       res.forEach(data=>{
        sum_of_data+=data.size;
        list_of_size.push(data.size)
       });
       res.sort(function(a, b){return a.size-b.size});
       if(res.length%2==0){
        median = (res[res.length/2].size + res[res.length/2 - 1].size)/2
       } else {
        median = res[Math.floor(res.length/2)].size
       }

       var mode = a => {
        a = a.slice().sort((x, y) => x - y);
      
        var bestStreak = 1;
        var bestElem = a[0];
        var currentStreak = 1;
        var currentElem = a[0];
      
        for (let i = 1; i < a.length; i++) {
          if (a[i-1] !== a[i]) {
            if (currentStreak > bestStreak) {
              bestStreak = currentStreak;
              bestElem = currentElem;
            }
      
            currentStreak = 0;
            currentElem = a[i];
          }
      
          currentStreak++;
        }
      
        return currentStreak > bestStreak ? currentElem : bestElem;
      };
      var data_q1= res.slice(0, res.length/2)
      var data_q3 = res.slice(res.length/2 +1, res.length)
      var q1,q3;
      data_q1.sort(function(a, b){return a.size-b.size});
       if(data_q1.length%2==0){
        q1 = (data_q1[data_q1.length/2].size + data_q1[data_q1.length/2 - 1].size)/2
       } else {
        q1 = data_q1[Math.floor(data_q1.length/2)].size
       }
       data_q3.sort(function(a, b){return a.size-b.size});
       if(data_q3.length%2==0){
        q3 = (data_q3[data_q3.length/2].size + data_q3[data_q3.length/2 - 1].size)/2
       } else {
        q3 = data_q3[Math.floor(data_q3.length/2)].size
       }
       res.forEach(data=>{
        if(data.size>q3 || data.size < q1){
          outliers.push(data.size)
        }
       })


       q3_html.innerHTML=`Q3: ${q3}`
       q1_html.innerHTML = `Q1: ${q1}`
      mode_html.innerHTML=`Mode: ${mode(list_of_size)}`
       median_html.innerHTML=`Median: ${median}`
       mean_html.innerHTML=`Mean: ${sum_of_data/res.length}`
       outliers_html.innerHTML=`Outliers: ${outliers}`
        iqr_html.innerHTML=`IQR: ${q3-q1}`
        res.forEach(res_data=>{
            dataValues.push(res_data.song_length)
            dataLabels.push(res_data.size)
        })
        
        var ctx = document.getElementById("histogram");
        const myChart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: dataValues,
            datasets: [{
              label: 'Data',
              data: dataLabels,
              borderWidth: 1,
              borderColor: 'black',
              borderRadius: 5,
              backgroundColor: 'blue',
            }]
          },
          options: {
            maintainAspectRatio: false,
            scales: {
            y: {
              beginAtZero: true
            }
            
          },
           
          }
        });
        var containerBody = document.querySelector('.containerBody');
        if(myChart.data.labels.length>10){
            containerBody.style.width=`${myChart.data.labels.length}00px`;
        }
      }
      setHistogramma()
  
  