import { Component, ElementRef, NgZone, OnDestroy, OnInit } from '@angular/core';
import { JsondataService } from '../services/jsondata.service';
import { ColorsService } from '../services/colors.service';
import 'rxjs/Rx';
import { D3Service, D3, Selection } from 'd3-ng2-service';
import * as $ from 'jquery';
import * as Timeline from 'd3-timelines';

declare var Timeline: any;

@Component({
  selector: 'app-d3graph',
  templateUrl: './d3graph.component.html',
  styleUrls: ['./d3graph.component.css']
})
export class D3graphComponent implements OnInit {
  d3: D3;
  x:number;
  y:number;
  beginning: string = "1250";
  ending: string = "1600";

  private parentNativeElement: any;
  private width: number = 100;
  private height: number = 350;
  private timelineData = [];
  private svg: any;

  constructor(
    private element: ElementRef, 
    private ngZone: NgZone, 
    private d3Service: D3Service, 
    private jsondataService: JsondataService, 
    private colorsService: ColorsService ) 
  {
    this.d3 = d3Service.getD3(); // <-- obtain the d3 object from the D3 Service
    this.parentNativeElement = element.nativeElement;
  }

 

  ngOnInit() {
    let self = this;
    let d3 = this.d3;
    let d3ParentElement: any;
    let svg: any;
    let name: string;
    let yVal: number;
    let colors: any = ["rgba(47,89,97,0.2)","rgba(47,64,89,0.2)","rgba(89,58,47,0.2)"];
    let data: {name: string, yVal: number}[] = [];
    let padding: number = 25;
    let xScale: any;
    let yScale: any;
    let xColor: any;
    let xAxis: any;
    let yAxis: any;
    let beginning = this.beginning;
    let ending = this.ending;


    this.jsondataService.getData().subscribe((data) => {     
        this.prepareData(data);

        if (this.parentNativeElement !== null) {
 
          d3ParentElement = d3.select(this.parentNativeElement); // <-- use the D3 select method 
     
          // Do more D3 things 
          svg = this.d3.select(this.parentNativeElement)
            .append('svg')        // create an <svg> element
            .attr('width', '90%') // set its dimensions
            .attr('height', this.height)
            .on('click', function(ev){
            });

          svg.on("mousemove", function(){
            var bb = svg.select(".container").node().getBBox();
            var axisbb = svg.select(".domain").node().getBBox();
            var xy = d3.mouse(this);
            self.x = xy[0]; 
            self.y = xy[1];

            svg.selectAll(".marker").remove();

            if (xy[0]>axisbb.x&&xy[0]<(axisbb.x+axisbb.width)&&xy[1]>bb.y&&xy[1]<(bb.y+bb.height)){

                var srr2 = d3.scaleLinear()
                   .domain([axisbb.x,(axisbb.x+axisbb.width)])  
                   .rangeRound([1250,1600]);
                  
                svg.append("line")         
                  .attr("class", "marker")
                  .style("stroke", "black")
                  .attr("x1", xy[0])   
                  .attr("y1", 10)      
                  .attr("x2", xy[0])     
                  .attr("y2", 180);

                svg.append("rect")
                  .attr("class", "marker")
                  .attr("width", 30)
                  .attr("height", 20)
                  .attr("x", xy[0]-15)
                  .attr("y", 0);

                svg.append("text")
                  .attr("class", "marker")
                  .attr("x", xy[0]-11)
                  .attr("y", 10)
                  .attr("dy", ".35em")
                  .style("fill","white")
                  .attr("font-size", "10px")
                  .text(srr2(xy[0]));
            }
          });


          var chart = Timeline.timelines()
            .stack()
            .beginning(new Date(this.beginning))
            .ending(new Date(this.ending))
            .tickFormat({
              format:  this.d3.timeFormat("%Y"),
              tickTime: this.d3.timeYears,
              tickInterval: 15,
              tickSize: 15,
            })
            .margin({left:200, right:30, top:0, bottom:0})

            .hover(function (d, i, datum) {
              var div = $('#hoverRes');
              var colors = chart.colors();
              div.find('.coloredDiv').css('background-color', colors(i))
              div.find('#name').text(datum.label);
            })

            .click(function (d, i, datum, selectedLabel, selectedRect, xVal) {
              console.log("timelineHover", datum.label, selectedRect);
            });
         
          svg = svg.datum(this.timelineData).call(chart);
        }
      })
   }

   draw_lines() {
     console.log("here");
   }

   prepareData(data){

      for(var i = 0; i < data.length-1; i++) {
          
          var exists = false;
          var start:Date = new Date(data[i].start);
          var end:Date = new Date(data[i].end);

          for(var k = 0; k < this.timelineData.length; k++) {
            if (this.timelineData[k].label === data[i].name) {
                this.timelineData[k].times.push({"color":this.colorsService.getColorByLabel(data[i].name),  "starting_time": start, "ending_time": end})
                exists = true; // stop searching
            } 
          };

          //add new series
          if (!exists){
            this.timelineData.push({label: data[i].name, times: [{"color":this.colorsService.getColorByLabel(data[i].name),  "starting_time": start, "ending_time": end}]})
          }
      }
   }
 }
