
  
  var histogram_block=document.getElementById('histogram_block');
  function setHistogramma(){
    document.getElementById("histogram").remove();
    var histogram=document.createElement('canvas');
    histogram.id='histogram';
  
    histogram_block.insertAdjacentElement('afterbegin',histogram)
        var res=[
            {
                song_length: "0-120",
                size: 1
            },
            {
                song_length: "120-180",
                size: 9
            },
            {
                song_length: "180-240",
                size: 15
            },
            {
                song_length: "240-300",
                size: 17
            },
            {
                song_length: "300-360",
                size: 13
            },
            {
                song_length: "360-600",
                size: 5
            },
        ]
        var dataValues = [];
        var dataLabels = [];
       
        
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
              label: 'Songs',
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
  
  