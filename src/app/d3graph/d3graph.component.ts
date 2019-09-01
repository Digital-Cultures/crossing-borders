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
  private onInit: boolean = false;
  date: number;
  startDate: number;
  endDate: number;
  selectedID: number;
  dragging: boolean = false;
  end: string;
  position: number = -1;
  Timeline: any;


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


    this.uidataService.currentStartDate.subscribe(startDate => {
      this.startDate = startDate;
      this.updateTimelineSelector();
    })

    this.uidataService.currentEndDate.subscribe(endDate => {
      this.endDate = endDate;
      this.updateTimelineSelector();
    })

    this.uidataService.currentTextID.subscribe(selectedID => {
      console.log(selectedID);
      this.selectedID = selectedID;
      this.hilightBar(this.selectedID);
    })

    this.jsondataService.currentRawData.subscribe((rawData: any) => {
      this.timelineData = this.uidataService.setGraphData(rawData, this.jsondataService.getTimelinesYaxi());
      this.drawGraph();
    })

    this.jsondataService.currentMarkerRawData.subscribe((rawMarkerData: any) => {
      let rawData = this.jsondataService.getRawData();
      let thisData = this.jsondataService.getDataset();
      for (let index = 0; index < rawMarkerData.length; index++) {
        console.log(rawMarkerData[index].clean_title+" = "+rawMarkerData[index].posts+" = "+this.jsondataService.getDataset());
        let text:string = rawMarkerData[index].clean_title.split('-')[0];
        // if it has a comment and is the right dataset
        if (rawMarkerData[index].posts>0 && thisData==text)
        {
         let id:string = rawMarkerData[index].clean_title.split('-')[1];
          for (let k = 0; k < rawData.length; k++) {
           if (id == rawData[k].id ){
            console.log("HAS a Match");
            // add marker!!
            this.uidataService.setCommentMarker(rawData[k])
           }
          }
        }       
      }
    })

    this.jsondataService.currentTimelinesYaxis.subscribe((yAxis: string) => {
      this.timelineData = this.uidataService.setGraphData(this.jsondataService.getRawData(), yAxis);
      this.timelinesYaxis = yAxis;
      this.drawGraph();
    })
  }

  ngOnInit() { 
    this.onInit = true;
    console.log("ngOnInit D3 graph");
    this.jsondataService.setDataset(this.jsondataService.getDataset());
    this.drawGraph();
  }

  public drawGraph() {
    if (this.onInit){
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
          .attr('height', this.timelineData.length * 25 + 50);


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
          .margin({ left: 40, right: 40, top: -10, bottom: 0 })

          .hover(function(d, i, datum) {
            var div = $('#hoverRes');
            div.find('#name').text(datum.label);
          })

        svg = svg.datum(this.timelineData).call(chart);

        

        /** Add chart click event **/
        var elements = this.parentNativeElement.querySelectorAll("[id^='timelineItem']");
        for (var e in elements) {
          if (elements[e].id && elements[e].tagName=='rect') {
            var timelineBar = elements[e];
            timelineBar.addEventListener('pointerdown', (e) => {
              this.open(this.displayFullDescription(e));
            });
          }
        }

        /** Colour lables **/
        //console.log(d3.selectAll("svg .timeline-label").size());
        for (var i = 1; i < d3.selectAll("svg .timeline-label").size() + 1; i++) {
          console.log(d3.select("svg .timeline-label:nth-of-type(" + i + ")").text());
          d3.selectAll("svg .timeline-label:nth-of-type(" + i + ")")
            //.attr('fill', this.colorsService.getColorByLabel(d3.select("svg .timeline-label:nth-of-type(" + i + ")").text()).replace(/[^,]+(?=\))/, '1'))
            .attr('dx', 45);
        }

        this.addTimeSelector();
      }
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

  addTimeSelector() {

    var x = this.yearToPosition(this.startDate);
    var width = this.yearToPosition(this.endDate) - x;

    this.svg = this.d3.select("svg");
    this.svg.append("rect")
      .attr("class", "time-selector")
      .style("pointer-events", "none")
      .attr("width", width)
      .attr("height", this.timelineData.length * 25 + 5)
      .style("opacity", 0.1)
      .style("fill", "#")
      .attr("x", x)
      .attr("y", 10);

    var startTimeDrag = this.svg.append("g")
      .attr("class", "time-selector-start-drag");

    startTimeDrag.append("line")
      .attr("class", "time-selector")
      .attr("class", "time-selector-start")
      .style("stroke", "black")
      .style("stroke-width", 2)
      .style("cursor", "pointer")
      .attr("x1", x)
      .attr("y1", 10)
      .attr("x2", x)
      .attr("y2", this.timelineData.length * 25 + 25);

    startTimeDrag.append("rect")
      .attr("class", "time-selector-start-bg")
      .attr("width", 30)
      .attr("height", 20)
      .style("cursor", "pointer")
      .attr("x", x - 15)
      .attr("y", this.timelineData.length * 25 + 25);

    startTimeDrag.append("text")
      .attr("class", "time-selector-start-label")
      .attr("x", x - 11)
      .attr("y", this.timelineData.length * 25 + 35)
      .attr("dy", ".35em")
      .style("fill", "white")
      .style("cursor", "pointer")
      .attr("font-size", "10px")
      .text(this.positionToYear(x));

    //.on("mousedown", this.dragstarted);

    var endTimeDrag = this.svg.append("g")
      .attr("class", "time-selector-end-drag");

    endTimeDrag.append("line")
      .attr("class", "time-selector")
      .attr("class", "time-selector-end")
      .style("stroke", "black")
      .style("stroke-width", 2)
      .style("cursor", "pointer")
      .attr("x1", x + width)
      .attr("y1", 10)
      .attr("x2", x + width)
      .attr("y2", this.timelineData.length * 25 + 25);

    endTimeDrag.append("rect")
      .attr("class", "time-selector-end-bg")
      .attr("width", 30)
      .attr("height", 20)
      .style("cursor", "pointer")
      .attr("x", x + width - 15)
      .attr("y", this.timelineData.length * 25 + 25);

    endTimeDrag.append("text")
      .attr("class", "time-selector-end-label")
      .attr("x", x + width - 11)
      .attr("y", this.timelineData.length * 25 + 35)
      .attr("dy", ".35em")
      .style("fill", "white")
      .style("cursor", "pointer")
      .attr("font-size", "10px")
      .text(this.positionToYear(x + width));

    // this.svg.append("line")
    //   .attr("class", "time-selector")
    //   .attr("class", "time-selector-dragger")
    //   .style("stroke", "black")
    //   .style("stroke-width", 2)
    //   .style("cursor", "pointer")
    //   .attr("x1", x)
    //   .attr("y1", 10)
    //   .attr("x2", x + width)
    //   .attr("y2", 10);
    //.drag();

    var container = document.getElementsByTagName('svg');//this.parentNativeElement.querySelector(".container");
    if (container[0] != undefined) {
      container[0].addEventListener('pointermove', (e) => {
        //console.log(e.type+" dragging = "+this.dragging);
        if (this.dragging) {
          var x = e.offsetX;
          if (this.end == "drag") {
            if (this.position != -1){
              var change = x - this.position;

              var newStart = this.yearToPosition(this.startDate) + change;
              this.uidataService.changeDate(this.positionToYear(newStart), "start");

              var newEnd= this.yearToPosition(this.endDate) + change;
              this.uidataService.changeDate(this.positionToYear(newEnd), "end");

            }
            this.position = x;
          }else{
            this.uidataService.changeDate(this.positionToYear(x), this.end);
          }
        }
      });     
    }

     //var body = this.parentNativeElement.querySelector("body");
      document.body.addEventListener('pointerup', (e) => {
        this.dragging = false;
        this.position = -1;
        //console.log(e.type+" dragging = "+this.dragging);
      });


    var timeSelectorEnd = this.parentNativeElement.querySelector(".time-selector-end-drag");
    if (timeSelectorEnd != null) {

      timeSelectorEnd.addEventListener('pointerdown', (e) => {
        this.dragging = true;
        console.log(e.type+" dragging = "+this.dragging);
        this.end = "end";
      });

      timeSelectorEnd.addEventListener('pointerup', (e) => {
        this.dragging = false;
        console.log(e.type+" dragging = "+this.dragging);
      });
    }

    var timeSelectorStart = this.parentNativeElement.querySelector(".time-selector-start-drag");
    if (timeSelectorStart != null) {

      timeSelectorStart.addEventListener('pointerdown', (e) => {
        this.dragging = true;
        console.log(e.type+" dragging = "+this.dragging);
        this.end = "start";
      });

      timeSelectorStart.addEventListener('pointerup', (e) => {
        console.log(e.type+" dragging = "+this.dragging);
        this.dragging = false;
      });
    }
  }

  updateTimelineSelector() {
    var x = this.yearToPosition(this.startDate);
    var width = this.yearToPosition(this.endDate) - x;

    this.d3.select(".time-selector")
      .attr("width", width)
      .attr("height", this.timelineData.length * 25 + 5)
      .attr("x", x)

    this.d3.select(".time-selector-start")
      .attr("x1", x)
      .attr("x2", x)
      .attr("y2", this.timelineData.length * 25 + 25);

    this.d3.select(".time-selector-start-bg")
      .attr("x", x - 15)
      .attr("y", this.timelineData.length * 25 + 25);

    this.d3.select(".time-selector-start-label")
      .attr("x", x - 11)
      .attr("y", this.timelineData.length * 25 + 35)
      .text(this.positionToYear(x));
    //.on("mousedown", this.dragstarted);

    this.d3.select(".time-selector-end")
      .attr("x1", x + width)
      .attr("x2", x + width)
      .attr("y2", this.timelineData.length * 25 + 25)

    this.d3.select(".time-selector-end-bg")
      .attr("x", x + width - 15)
      .attr("y", this.timelineData.length * 25 + 25);

    this.d3.select(".time-selector-end-label")
      .attr("x", x + width - 11)
      .attr("y", this.timelineData.length * 25 + 35)
      .text(this.positionToYear(x + width));

    this.d3.select(".time-selector-dragger")
      .attr("x1", x)
      .attr("x2", x + width)
  }

  drawLines(year: number) {
    this.svg = this.d3.select("svg");
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
          this.timelineData[i].times[k] = {
            "color": this.timelineData[i].times[k].color.replace(/[^,]+(?=\))/, '1'),
            "starting_time": this.timelineData[i].times[k].starting_time,
            "ending_time": this.timelineData[i].times[k].ending_time
          };
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
    var ids = [];

    //click down through layers (max 100 layers)
    for (var i = 0; i < 100; i++) {
      if (item.id.startsWith('timelineItem')) {
        // items += item.id+" ";
        stack.push(this.uidataService.getItemFromChart(item.id));
        ids.push(item);
        this.d3.select(item).style('pointer-events', 'none').attr('class', 'hover');
        // // stack.push(item);
        item = document.elementFromPoint(e.clientX, e.clientY);
      }
    }

    //put back click interaction
     for (var k = 0; k < ids.length; k++) {
      console.log(ids[k].id)
      this.d3.select(ids[k]).style('pointer-events', 'inherit').attr('class', '');
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
