import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Globals } from 'src/shared/global-constants';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  tabs = Globals.TABS;
  activeLink = this.tabs[0].path;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.setActiveLink();
  }

  setActiveLink() {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        if (val.url === '/history') {
          this.activeLink = this.tabs[1].path;
        } else {
          this.activeLink = this.tabs[0].path;
        }
      }
    });
  }

  onLinkClick(path: string) {
    this.activeLink = path;
    this.router.navigate([path]);
  }
}
