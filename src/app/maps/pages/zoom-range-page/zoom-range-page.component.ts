import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { EventData, LngLat, LngLatLike, Map, MapboxEvent } from 'mapbox-gl';

@Component({
  templateUrl: './zoom-range-page.component.html',
  styleUrls: ['./zoom-range-page.component.css']
})
export class ZoomRangePageComponent implements AfterViewInit, OnDestroy {

  @ViewChild('map') public divMap?: ElementRef;
  public map?: Map;
  public zoom: number = 10;
  public currentCenter: LngLatLike = new LngLat(-90.3050302717446, 15.586434661166379);

  public ngAfterViewInit(): void {
    if (!this.divMap) return
    this.map = new Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currentCenter,
      zoom: this.zoom
    });
    this.mapListeners();
  }


  public ngOnDestroy(): void {
    this.map?.remove();
  }

  public mapListeners() {
    if (!this.map) throw 'Mapa no inicializado';
    this.map.on(
      'zoom',
      (ev: MapboxEvent<MouseEvent | TouchEvent | WheelEvent | undefined> & EventData) => {
        this.zoom = this.map!.getZoom();
      }
    );

    this.map.on(
      'zoomend',
      (ev: MapboxEvent<MouseEvent | TouchEvent | WheelEvent | undefined> & EventData) => {
        if (this.map!.getZoom() < 18) return;
        if (this.map!.getZoom() > 18) this.map!.zoomTo(18);
      }
    );

    this.map.on(
      'move',
      (ev: MapboxEvent<MouseEvent | TouchEvent | WheelEvent | undefined> & EventData) => {
        this.currentCenter = this.map!.getCenter();
      }
    );
  }

  public zoomIn() {
    this.map?.zoomIn();
  }

  public zoomOut() {
    this.map?.zoomOut();
  }

  public zoomChanged(value: string) {
    this.zoom = Number(value);
    this.map?.zoomTo(this.zoom);
  }

}
