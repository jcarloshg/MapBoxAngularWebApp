import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { LngLat, LngLatLike, Map, Marker } from 'mapbox-gl';

interface MarkerAndColor {
  marker: Marker,
  color: string,
}

interface PlainMarker {
  color: string,
  lngLat: [number, number]
}

@Component({
  templateUrl: './makers-page.component.html',
  styleUrls: ['./makers-page.component.css']
})
export class MakersPageComponent implements AfterViewInit {

  @ViewChild('map') public divMap?: ElementRef;
  public markers: MarkerAndColor[] = [];
  public map?: Map;
  public zoom: number = 14;
  public currentCenter: LngLatLike = new LngLat(-98.20008333839402, 19.04506949610004);

  public ngAfterViewInit(): void {
    if (!this.divMap) return
    this.map = new Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currentCenter,
      zoom: this.zoom
    });

    this.readToLocalStorage();

    // const markerHTML = document.createElement('div');
    // markerHTML.innerHTML = 'JoseChuy'
    // const marker = new Marker({
    //   color: 'red',
    //   element: markerHTML,
    // })
    //   .setLngLat(this.currentCenter)
    //   .addTo(this.map);
  }

  public createMarker() {
    if (!this.map) return;
    const color = '#xxxxxx'.replace(/x/g, y => (Math.random() * 16 | 0).toString(16));
    const lngLat = this.map.getCenter();
    this.addMarker(lngLat, color);
  }

  private addMarker(lngLat: LngLat, color: string = 'red') {
    if (!this.map) return;

    const marker = new Marker({
      color: color,
      draggable: true,
    })
      .setLngLat(lngLat)
      .addTo(this.map);

    this.markers.push({ marker, color, });
    this.saveToLocalStorage();

    marker.on(
      'dragend',
      () => {
        this.saveToLocalStorage();
      }
    );
  }

  public deleteMarker(index: number) {
    this.markers[index].marker.remove();
    this.markers.splice(index, 1);
  }

  public flyTo(marker: Marker) {
    this.map?.flyTo({
      zoom: 15,
      center: marker.getLngLat(),
    })
  }

  public saveToLocalStorage() {
    const plainMarkers: PlainMarker[] = this.markers.map(markerAndColor => {
      const [lng, lat] = markerAndColor.marker.getLngLat().toArray();
      const plainMarker: PlainMarker = {
        color: markerAndColor.color,
        lngLat: [lng, lat],
      }
      return plainMarker;
    });
    localStorage.setItem('plainMarkers', JSON.stringify(plainMarkers));
  }

  public readToLocalStorage() {
    const plainMarkersString = localStorage.getItem('plainMarkers') ?? '[]';
    const plainMarkersParse = JSON.parse(plainMarkersString);
    try {
      const plainMarkers = plainMarkersParse as PlainMarker[];
      plainMarkers.forEach((plainMarker: PlainMarker) => {
        const [lng, lat] = plainMarker.lngLat;
        const lngLat = new LngLat(lng, lat);
        this.addMarker(lngLat, plainMarker.color);
      });
    } catch (error) {
      console.error(error);
    }

  }

}
