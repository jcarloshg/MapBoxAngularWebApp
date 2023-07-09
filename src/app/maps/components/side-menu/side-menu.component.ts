import { Component } from '@angular/core';

interface MenuItem {
  route: string;
  name: string;
}

@Component({
  selector: 'maps-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent {
  public menuItems: MenuItem[] = [
    { name: 'FullScreen', route: '/maps/fullscreen', },
    { name: 'Markers', route: '/maps/markers', },
    { name: 'Properties', route: '/maps/properties', },
    { name: 'Zoom', route: '/maps/zoom-range', },
  ]
}
