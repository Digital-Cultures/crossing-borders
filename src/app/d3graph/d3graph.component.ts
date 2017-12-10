import { Component, ElementRef, NgZone, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColorsService } from '../services/colors.service';
import { JsondataService } from '../services/jsondata.service';
import { UidataService } from '../services/uidata.service';
import { TextModalComponent } from '../text-modal/text-modal.component';
import { Observable } from "rxjs"
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
  private timelineData = [];
  private timelinesYaxis: string;
  private svg: any;
  date: number;
  selectedID: number;


  constructor(
    private colorsService: ColorsService,
    private d3Service: D3Service,
    private element: ElementRef,
    private jsondataService: JsondataService,
    private modalService: NgbModal,
    private ngZone: NgZone,
    private uidataService: UidataService
    ) {
    this.d3 = d3Service.getD3(); // <-- obtain the d3 object from the D3 Service
    this.parentNativeElement = element.nativeElement;
    let beginning = this.uidataService.getBegining();
    let ending = this.uidataService.getEnding();

    this.uidataService.currentDate.subscribe(date => {
      this.date = date;
      this.drawLines(this.date);
    })

    this.uidataService.currentTextID.subscribe(selectedID => {
      this.selectedID = selectedID;
      this.hilightBar(this.selectedID);
    })

    this.jsondataService.currentRawData.subscribe((rawData: any) => {
      this.timelineData = this.uidataService.setGraphData(rawData, this.jsondataService.getTimelinesYaxi());
      this.drawGraph();
    })

    this.jsondataService.currentTimelinesYaxis.subscribe((yAxis: string) => {
      this.timelineData = this.uidataService.setGraphData(this.jsondataService.getRawData(), yAxis);
      this.timelinesYaxis = yAxis;
      this.drawGraph();
    })
  }


  ngOnInit() { }

  drawGraph() {

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
        .attr('width', '100%') // set its dimensions
        .attr('height', this.timelineData.length * 25 + 50)
        .on('click', function(ev) {
        });

      var chart = Timeline.timelines()
        .stack()
        .beginning(new Date(this.uidataService.getBegining()))
        .ending(new Date(this.uidataService.getEnding()))
        .tickFormat({
          format: this.d3.timeFormat("%Y"),
          tickTime: this.d3.timeYears,
          tickInterval: 15,
          tickSize: 15,
        })
        .margin({ left: 10, right: 10, top: -10, bottom: 0 })

        .hover(function(d, i, datum) {
          var div = $('#hoverRes');
          div.find('#name').text(datum.label);
        })

      svg = svg.datum(this.timelineData).call(chart);

      /** Add chart click event **/
      var elements = this.parentNativeElement.querySelectorAll("[id^='timelineItem']");
      for (var e in elements) {
        if (elements[e].id) {
          elements[e].addEventListener('click', (e) => {
            this.open(this.displayFullDescription(e));
          });
        }
      }

      /** Add hover event **/
    var graphContainer = this.parentNativeElement.querySelector(".timeline-xAxis")
        .addEventListener('mousemove', (e) => {
          var x = e.offsetX;
          var y = e.offsetY;
          this.uidataService.changeDate(this.positionToYear(x));
        });

      /** Add out event **/
    var graphContainer = this.parentNativeElement.querySelector(".timeline-xAxis")
        .addEventListener('mouseout', (e) => {
          this.uidataService.changeDate(-1);
        });

      d3.selectAll("svg .timeline-label").attr('dx', 15)
    }
  }

  positionToYear(x: number): number {
    //drawLines();
    this.svg = this.d3.select("svg"); //SHOULD BE MODULISED
    if (this.svg.select(".domain").node()) {
      var axisbb = this.svg.select(".domain").node().getBBox();
      var scale = this.d3.scaleLinear()
        .domain([axisbb.x, (axisbb.x + axisbb.width)])
        .rangeRound([parseInt(this.uidataService.getBegining()), parseInt(this.uidataService.getEnding())]);
      var year = scale(x)
      return year;
    } else {
      return -1;
    }
  }

  yearToPosition(year: number): number {
    this.svg = this.d3.select("svg"); //SHOULD BE MODULISED
    if (this.svg.select(".domain").node()) {
      var axisbb = this.svg.select(".domain").node().getBBox();
      var scale = this.d3.scaleLinear()
        .domain([parseInt(this.uidataService.getBegining()), parseInt(this.uidataService.getEnding())])
        .rangeRound([axisbb.x, (axisbb.x + axisbb.width)]);
      var xPos = scale(year)
      return xPos;
    } else {
      return -1;
    }

  }

  drawLines(year: number) {
    this.svg = this.d3.select("svg"); //SHOULD BE MODULISED
    this.svg.selectAll(".marker").remove();

    if (year >= parseInt(this.uidataService.getBegining()) && year <= parseInt(this.uidataService.getEnding())) {
      var x = this.yearToPosition(year);

      this.svg.append("line")
        .attr("class", "marker")
        .style("stroke", "black")
        .attr("x1", x)
        .attr("y1", 10)
        .attr("x2", x)
        .attr("y2", this.timelineData.length * 25 + 30)
        .style("pointer-events", "none");

      this.svg.append("rect")
        .attr("class", "marker")
        .attr("width", 30)
        .attr("height", 20)
        .style("pointer-events", "none")
        .attr("x", x - 15)
        .attr("y", this.timelineData.length * 25 + 25);

      this.svg.append("text")
        .attr("class", "marker")
        .attr("x", x - 11)
        .attr("y", this.timelineData.length * 25 + 35)
        .attr("dy", ".35em")
        .style("fill", "white")
        .style("pointer-events", "none")
        .attr("font-size", "10px")
        .text(this.positionToYear(x));
    }
  }

  hilightBar(id: number) {
    for (var i = this.timelineData.length - 1; i >= 0; i--) {
      for (var k = this.timelineData[i].ids.length - 1; k >= 0; k--) {
        if (parseInt(this.timelineData[i].ids[k]) == id) {
          this.timelineData[i].times[k] = { "color": this.timelineData[i].times[k].color.replace(/[^,]+(?=\))/, '1'), "starting_time": this.timelineData[i].times[k].starting_time, "ending_time": this.timelineData[i].times[k].ending_time };
        } else if (-1 == id) {
          this.timelineData[i].times[k] = { "color": this.timelineData[i].times[k].color.replace(/[^,]+(?=\))/, '0.2'), "starting_time": this.timelineData[i].times[k].starting_time, "ending_time": this.timelineData[i].times[k].ending_time };
        } else {
          this.timelineData[i].times[k] = { "color": this.timelineData[i].times[k].color.replace(/[^,]+(?=\))/, '0.1'), "starting_time": this.timelineData[i].times[k].starting_time, "ending_time": this.timelineData[i].times[k].ending_time };
        }
      }
    }
    this.drawGraph();
  }

  displayFullDescription(e): any {
    console.log(e);
    var item = document.elementFromPoint(e.clientX, e.clientY);
    var stack = [];

    // var items = "";
    for (var i = 0; i < 20; i++) {
      if (item.id.startsWith('timelineItem')) {
        // items += item.id+" ";
        stack.push(this.uidataService.getItemFromChart(item.id));
        this.d3.select(item).style('pointer-events', 'none').attr('class', 'hover');
        // // stack.push(item);
        item = document.elementFromPoint(e.clientX, e.clientY);
      }
    }
    return stack;
  }

  clickName(e) {
    this.jsondataService.setTimelinesYaxis("name");
  }

  clickLanguage(e) {
    this.jsondataService.setTimelinesYaxis("language");
  }

  open(data: any) {
    const modalRef = this.modalService.open(TextModalComponent);
    modalRef.componentInstance.data = data;
  }

}
