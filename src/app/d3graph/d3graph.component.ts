import { Component, ElementRef, NgZone, OnDestroy, OnInit } from '@angular/core';
import { JsondataService } from '../services/jsondata.service';
import { ColorsService } from '../services/colors.service';
import { UidataService } from '../services/uidata.service';
import {Observable} from "rxjs"
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
  private parentNativeElement: any;
  private width: number = 100;
  private height: number = 240;
  private timelineData = [];
  timelinesYaxis = 'language';
  private svg: any;
  date:number;


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
    
    this.uidataService.currentDate.subscribe(date => {
      this.date = date;
      this.drawLines(this.date);
    })
  }

  ngOnInit() {
    
    let beginning = this.uidataService.getBegining();
    let ending = this.uidataService.getEnding();

    this.jsondataService.getData().subscribe((data) => {     
        this.timelineData = this.uidataService.setGraphData(data, this.timelinesYaxis);
        this.drawGraph();
      })
   }

   drawGraph(){

     let self = this;
     let d3 = this.d3;
     let d3ParentElement: any;
     let svg: any;
     if (this.parentNativeElement !== null) {
          $("svg").remove();
 
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
            .beginning(new Date(this.uidataService.getBegining()))
            .ending(new Date(this.uidataService.getEnding()))
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

                  this.uidataService.changeDate(this.positionToYear(x));
             });

          /** Add out event **/
          var graphContainer = this.parentNativeElement.querySelector("svg")
                .addEventListener('mouseout', (e) => {
                  this.uidataService.changeDate(-1);
             });
        }
   }

   positionToYear(x:number) :number{
     //drawLines();
      this.svg = this.d3.select("svg"); //SHOULD BE MODULISED
      if (this.svg.select(".domain").node()){
        var axisbb = this.svg.select(".domain").node().getBBox();
        var scale = this.d3.scaleLinear()
               .domain([axisbb.x,(axisbb.x+axisbb.width)])  
               .rangeRound([parseInt(this.uidataService.getBegining()),parseInt(this.uidataService.getEnding())]);
        var year = scale(x)
        return year;
      }else{
        return -1;
      }
   }

   yearToPosition(year:number) :number {
      this.svg = this.d3.select("svg"); //SHOULD BE MODULISED
      if (this.svg.select(".domain").node()){
        var axisbb = this.svg.select(".domain").node().getBBox();
        var scale = this.d3.scaleLinear()
             .domain([parseInt(this.uidataService.getBegining()),parseInt(this.uidataService.getEnding())])  
             .rangeRound([axisbb.x,(axisbb.x+axisbb.width)]);
        var xPos = scale(year)
        return xPos;
      }else{
        return -1;
      }
      
   }

   drawLines(year:number) {
      this.svg = this.d3.select("svg"); //SHOULD BE MODULISED
      this.svg.selectAll(".marker").remove();

      if(year>=parseInt(this.uidataService.getBegining())&&year<=parseInt(this.uidataService.getEnding())){
        var x = this.yearToPosition(year);

      this.svg.append("line")         
        .attr("class", "marker")
        .style("stroke", "black")
        .attr("x1", x)   
        .attr("y1", 10)      
        .attr("x2", x)     
        .attr("y2", this.timelineData.length*25+30)
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

   clickName(e){
     this.timelinesYaxis = "name";
     this.jsondataService.getData().subscribe((data) => {     
        this.timelineData = this.uidataService.setGraphData(data, this.timelinesYaxis);
        this.drawGraph();
      })

   }

   clickLanguage(e){
     this.timelinesYaxis = "language";
     this.jsondataService.getData().subscribe((data) => {     
        this.timelineData = this.uidataService.setGraphData(data, this.timelinesYaxis);
        this.drawGraph();
      })
   }
 }
