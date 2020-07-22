import { Component, OnInit,ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import * as Chart from 'chart.js'
import * as moment from 'moment'
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-display-chart',
  templateUrl: './display-chart.component.html',
  styleUrls: ['./display-chart.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class DisplayChartComponent implements OnInit {
  title = 'angular8chartjs';
  canvas: any;
  ctx: any;
  max:any;
  min:any;
  maxdate:any;
  mindate:any;
  dataset:any;
  constructor(private _cdr: ChangeDetectorRef,  private http: HttpClient) { }

  ngOnInit(){
    let data:any
    let ylabelarr=[]
    let datasets=[]
    let maxdate = ''
      let mindate = ''
    return this.http.get("http://localhost:4000/getchartdata").subscribe((response) =>
    {
      data=response
      maxdate = data[0]['Date']
        mindate = data[0]['Date']
      data.map((customerdata)=>{
        maxdate = maxdate < customerdata['Date'] ? customerdata['Date'] : maxdate
        mindate = mindate > customerdata['Date'] ? customerdata['Date'] : mindate
        if(!ylabelarr.includes(customerdata['Decision']))
        {
          ylabelarr.push(customerdata['Decision'])
          datasets.push({
            type: 'line',
            label:customerdata['Decision'],
            data: [{
              x: moment(customerdata['Date'].toString()).format(),
              y: customerdata['Amount']
            }],
            fill: true,
            backgroundColor: customerdata['Decision']==='ACCEPT'?'#0080004a':customerdata['Decision']==='REJECT'?"#ffff003d":customerdata['Decision']==='ERR'?'#ff00004a':null,
            borderColor:  customerdata['Decision']==='ACCEPT'?'green':customerdata['Decision']==='REJECT'?"yellow":customerdata['Decision']==='ERR'?'red':null,
            id: customerdata['Decision']
          })
        }
        else
        {
          let datasetIndex={}
          let EventData=[]
          Object.keys(datasets).map((data) => {
            if (datasets[data]['id'] === customerdata['Decision']) 
            {
              datasetIndex = datasets[data]
            }

          })
          EventData = datasetIndex['data']
          EventData.push({
            x:moment(customerdata['Date'].toString()).format(),
            y: customerdata['Amount']
          })
        }
        
      })
      this.maxdate=maxdate
      this.mindate=mindate
      this.max=moment(maxdate,toString()).format,
      this.min=moment(mindate,toString()).format;
      this.dataset=datasets
      console.log(this.max,this.min,this.dataset)
      this.canvas = document.getElementById('myChart');
    this.ctx = this.canvas.getContext('2d');
    let myChart = new Chart(this.ctx, {
      type: 'line',
      data: {
        // labels: [, 1490738400],
          datasets: this.dataset
      },
      options: {
        title: {
          display: true,
          text: 'Custom Chart Title'
      },
        legend:{
          display: true,
      },
        responsive: false,
        maintainAspectRatio: false,
        scales: {
          xAxes: [{
            type: 'time',
            time: {
              unit: 'month',
              max:this.max,
              min:this.min,
            }
          }]
        }
      }
    });
    })
    
  }

  // changeStatus(): void {
  //   this.max=moment((<HTMLInputElement>document.getElementById('lastdate')).value).format();
  //   this.min=moment((<HTMLInputElement>document.getElementById('startdate')).value).format();
  //   this._cdr.detectChanges()
  //  }
  ngAfterViewInit() {
    
  }

  submitDate = () =>{
    this.max=moment((<HTMLInputElement>document.getElementById('lastdate')).value).format();
    this.min=moment((<HTMLInputElement>document.getElementById('startdate')).value).format();
    
  }

  updateConfigAsNewObject() {
    if(new Date((<HTMLInputElement>document.getElementById('lastdate')).value) > new Date(this.maxdate) || new Date((<HTMLInputElement>document.getElementById('startdate')).value) < new Date(this.mindate))
    {
        alert('select Date between '+this.mindate+" & "+this.maxdate)
    }
    else{
        this.max=moment((<HTMLInputElement>document.getElementById('lastdate')).value).format();
        this.min=moment((<HTMLInputElement>document.getElementById('startdate')).value).format();
        this.canvas = document.getElementById('myChart');
        this.ctx = this.canvas.getContext('2d');
        let myChart = new Chart(this.ctx, {
          type: 'line',
          data: {
            // labels: [, 1490738400],
              datasets: this.dataset
          },
          options: {
            legend:{
              display: true,
          },
            responsive: false,
            maintainAspectRatio: false,
            scales: {
              xAxes: [{
                type: 'time',
                time: {
                  unit: 'month',
                  max:this.max,
                  min:this.min,
                }
              }]
            }
          }
        });
        myChart.options.title.display=true
        myChart.options.title.text='hiii'
        let date1=new Date(this.min)
        let date2=new Date(this.max)
        var Difference_In_Time = date2.getTime() - date1.getTime(); 
      
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
        if(Difference_In_Days < 7)
        {
          myChart.options.scales.xAxes[0].time.unit='day'
        }
        else if(Difference_In_Days > 7 && Difference_In_Days < 90) 
        {
          myChart.options.scales.xAxes[0].time.unit='week'
        }
        else if(Difference_In_Days > 90)
        {
          myChart.options.scales.xAxes[0].time.unit='month'
        } 
        
        myChart.update();
    
        console.log(this.max,this.min)
        myChart.options.scales.xAxes[0].time.max=this.max
        myChart.options.scales.xAxes[0].time.min=this.min
        console.log(myChart.options.scales.xAxes[0].time)
    }
    
    // chart.update();
}

}
