import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

interface MenuItem {
  route: string;
  name: string;
}

@Component({
  selector: 'side-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent {
  public menuItems: MenuItem[] = [
    { name: 'FullScreen', route: '/maps/fullscreen', },
    { name: 'Markers', route: '/maps/markers', },
    { name: 'Properties', route: '/maps/properties', },
    { name: 'Zoom', route: '/maps/zoom-range', },
    { name: 'StandAloneComponent', route: '/alone', },
  ]
}
