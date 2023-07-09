import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Map, Marker } from 'mapbox-gl';

@Component({
  selector: 'app-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrls: ['./mini-map.component.css']
})
export class MiniMapComponent implements AfterViewInit {

  @ViewChild('map') public divMap?: ElementRef;
  @Input() lngLat?: [number, number];
  public map?: Map;

  public ngAfterViewInit(): void {
    if (!this.divMap) throw '[divMap] is null';
    if (!this.lngLat) throw '[lngLat] can not be null';

    this.map = new Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.lngLat,
      zoom: 13,
      interactive: false,
    });

    const marker = new Marker()
      .setLngLat(this.lngLat)
      .addTo(this.map);
  }
}
