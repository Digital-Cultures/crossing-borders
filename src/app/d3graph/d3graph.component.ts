import { Component, ElementRef, NgZone, OnDestroy, OnInit } from '@angular/core';
import { JsondataService } from '../services/jsondata.service';
import { ColorsService } from '../services/colors.service';
import { UidataService } from '../services/uidata.service';
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
  beginning: string = "1250"; // CALL FROM UI SERVICE
  ending: string = "1600"; // CALL FROM UI SERVICE

  private parentNativeElement: any;
  private width: number = 100;
  private height: number = 240;
  private timelineData = [];
  private svg: any;

  constructor(
    private element: ElementRef, 
    private ngZone: NgZone, 
    private d3Service: D3Service, 
    private jsondataService: JsondataService, 
    private colorsService: ColorsService,
    private uidataService: UidataService ) 
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
        this.timelineData = this.uidataService.setGraphData(data);

        if (this.parentNativeElement !== null) {
 
          d3ParentElement = d3.select(this.parentNativeElement); // <-- use the D3 select method 
     
          // Do more D3 things 
          svg = this.d3.select(this.parentNativeElement)
            .append('svg')        // create an <svg> element
            .attr('width', '90%') // set its dimensions
            .attr('height', this.height)
            .on('click', function(ev){
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

            // .click(function (d, i, datum, selectedLabel, selectedRect, xVal) {
            //   console.log("timelineHover", datum.label, selectedRect);
            // });
         
          svg = svg.datum(this.timelineData).call(chart);

          /** Add chart click event **/
          var elements = this.parentNativeElement.querySelectorAll("[id^='timelineItem']");
          for(var e in elements){
            if(elements[e].id){
              elements[e].addEventListener('click', (e) => {
                this.displayFullDescription(e);
             });
            }
          }

          /** Add hover event **/
          var graphContainer = this.parentNativeElement.querySelector("svg")
                .addEventListener('mousemove', (e) => {
                  var x = e.offsetX;
                  var y = e.offsetY;
                  this.drawLines(x,y);
             });
        }
      })
   }

   positionToYear(x:number) :number{
     //drawLines();
     var axisbb = this.svg.select(".domain").node().getBBox();
     var scale = this.d3.scaleLinear()
             .domain([axisbb.x,(axisbb.x+axisbb.width)])  
             .rangeRound([parseInt(this.beginning),parseInt(this.ending)]);
      var year = scale(x)
      this.uidataService.setDate(year);
      return year;
   }

   // yearToPosition(year:number) :number {

   // }

   drawLines(x:number,y:number) {
      this.svg = this.d3.select("svg"); //SHOULD BE MODULISED
      var bb = this.svg.select(".container").node().getBBox();
      var axisbb = this.svg.select(".domain").node().getBBox();
      //var xy = this.d3.mouse(this);

      this.svg.selectAll(".marker").remove();

      if (x>axisbb.x&&x<(axisbb.x+axisbb.width)){
        if(y>bb.y&&y<(bb.y+bb.height)){

          // var srr2 = this.d3.scaleLinear()
          //    .domain([axisbb.x,(axisbb.x+axisbb.width)])  
          //    .rangeRound([parseInt(this.beginning),parseInt(this.ending)]);
            
          this.svg.append("line")         
            .attr("class", "marker")
            .style("stroke", "black")
            .attr("x1", x)   
            .attr("y1", 10)      
            .attr("x2", x)     
            .attr("y2", 180)
            .style("pointer-events","none");

          this.svg.append("rect")
            .attr("class", "marker")
            .attr("width", 30)
            .attr("height", 20)
            .attr("x", x-15)
            .attr("y", 0);

          this.svg.append("text")
            .attr("class", "marker")
            .attr("x", x-11)
            .attr("y", 10)
            .attr("dy", ".35em")
            .style("fill","white")
            .attr("font-size", "10px")
            .text(this.positionToYear(x));
        }
      }
   }


   displayFullDescription(e){
     console.log(e);
     var item = document.elementFromPoint(e.clientX, e.clientY);
     var stack = [];
     for (var i=0; i<20; i++) {
       if(item.id.startsWith('timelineItem')){
         console.log(item.id);
         this.uidataService.selectItem(item.id);
         this.d3.select(item).style('pointer-events','none').attr('class', 'hover');
         // // stack.push(item);
         item = document.elementFromPoint(e.clientX, e.clientY);
       }else{
         break;
       }
    }
   }
 }
