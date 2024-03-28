import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {

  public isSidebar = false;

  constructor() { }

  ngOnInit(): void {
  }

  public showSidebar(){
    this.isSidebar = true;
  }

}
