import { Component, ElementRef, NgZone, OnDestroy, OnInit } from '@angular/core';
import { JsondataService } from '../services/jsondata.service';

import {
  D3Service,
  D3,
  Axis,
  BrushBehavior,
  BrushSelection,
  D3BrushEvent,
  ScaleLinear,
  ScaleOrdinal,
  Selection,
  Transition
} from 'd3-ng2-service';

import * as $ from 'jquery';
import * as Timeline from 'd3-timelines';

declare var Timeline: any;


@Component({
  selector: 'app-d3graph',
  templateUrl: './d3graph.component.html',
  styleUrls: ['./d3graph.component.css']
})
export class D3graphComponent implements OnInit {
  private d3: D3;
  private parentNativeElement: any;
  private d3Svg: Selection<SVGSVGElement, any, null, undefined>;

  constructor(element: ElementRef, private ngZone: NgZone, d3Service: D3Service, private jsondataService: JsondataService) {
    this.d3 = d3Service.getD3();
    this.parentNativeElement = element.nativeElement;
  }

  width: number = 100;
  height: number = 350;

  testData = [];
  svg: any;

  ngOnInit() {
    let self = this;
    let d3 = this.d3;
    let d3ParentElement: any;
    //let svg: any;
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


    this.jsondataService.getData().subscribe((data) => {
        
        this.prepareData(data);
        this.plotData();
        //this.myjsondata = data;
      });

   }

   private prepareData(data){

      for(var i = 0; i < data.length-1; i++) {
          
          var exists = false;
          var start:Date = new Date(data[i].start);
          var end:Date = new Date(data[i].end);

          for(var k = 0; k < this.testData.length; k++) {

            if (this.testData[k].label === data[i].name) {
                this.testData[k].times.push({"color":"rgba(89,58,47,0.2)",  "starting_time": start, "ending_time": end})
                exists = true; // stop searching
            } 
          };

          if (!exists){
            this.testData.push({label: data[i].name, times: [{"color":"rgba(89,58,47,0.2)",  "starting_time": start, "ending_time": end}]})
          }
      }
   }

   private plotData() {
     if (this.parentNativeElement !== null) {
      this.svg = this.d3.select(this.parentNativeElement)
          .append('svg')        // create an <svg> element
          .attr('width', '90%') // set its dimensions
          .attr('height', this.height);

     var chart = Timeline.timelines()
          .stack()
          .beginning(new Date("1300"))
          .ending(new Date("1600"))
          .tickFormat({
            format:  this.d3.timeFormat("%Y") ,
            tickTime: this.d3.timeYears,
            tickInterval: 15,
            tickSize: 15,
          })
          .margin({left:200, right:30, top:0, bottom:0})
          .hover(function (d, i, datum) {
          // d is the current rendering object
          // i is the index during d3 rendering
          // datum is the id object
           console.log("timelineHover", datum.label);
            var div = $('#hoverRes');
            var colors = chart.colors();
            div.find('.coloredDiv').css('background-color', colors(i))
            div.find('#name').text(datum.label);
          })
          .click(function (d, i, datum, selectedLabel, selectedRect, xVal) {
            console.log("timelineHover", datum.label);
          });
        
        this.svg = this.svg.datum(this.testData).call(chart);
   
     }
   }
 }
