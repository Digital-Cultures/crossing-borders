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

import * as Timeline from 'd3-timelines';

declare var Timeline: any;


@Component({
  selector: 'app-d3graph',
  template: ''
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
  testData = [{label: "The Prophecies of Merlin (Prose Version)", times: [
        {"color":"rgba(47,89,97,0.2)", "starting_time": 1355752800000, "ending_time": 1355766900000},
        {"color":"rgba(47,89,97,0.2)", "starting_time": 1355759900000, "ending_time": 1355774400000}]},
        {label: "person b", times: [{"starting_time": 1355759910000, "ending_time": 1355761900000}]},
        {label: "person c", times: [{"starting_time": 1355761910000, "ending_time": 1355763910000}]}
    ];

  ngOnInit() {
            let self = this;
            let d3 = this.d3;
            let d3ParentElement: any;
            let svg: any;
            let name: string;
            let yVal: number;
            let colors: any = [];
            let data: {name: string, yVal: number}[] = [];
            let padding: number = 25;
            let xScale: any;
            let yScale: any;
            let xColor: any;
            let xAxis: any;
            let yAxis: any;


            this.jsondataService.getData().subscribe((data) => {
                console.log("what is in the data ", data);
                //this.myjsondata = data;
              });

    if (this.parentNativeElement !== null) {
      svg = d3.select(this.parentNativeElement)
          .append('svg')        // create an <svg> element
          .attr('width', '100%') // set its dimensions
          .attr('height', this.height);

     var chart = Timeline.timelines()
          .relativeTime()
          .stack()
          .tickFormat({
            format: function(d) { return d3.timeFormat("%M")(d) },
            tickTime: d3.timeMinutes,
            tickInterval: 15,
            tickSize: 15,
          })
          .margin({left:70, right:30, top:0, bottom:0})
          .hover(function (d, i, datum) {
          // d is the current rendering object
          // i is the index during d3 rendering
          // datum is the id object
            // var div = $('#hoverRes');
            // var colors = chart.colors();
            // div.find('.coloredDiv').css('background-color', colors(i))
            // div.find('#name').text(datum.name);
          })
          .click(function (d, i, datum, selectedLabel, selectedRect, xVal) {
            console.log("timelineHover", datum.name);
            console.log("point", xVal)
            // $("#assays").append("<div>\
            // <label>Assay Type:</label><select><option value=\"dnase\">DNAseSeq</option><option value=\"rnase\">RNASeq</option></select> \
            // <label>Assay Timepoint:</label><span>"+ Math.round(xVal) + "</span> \
            // </div>");
          });
        
        svg = svg.datum(this.testData).call(chart);
   
     }
   }
 }
