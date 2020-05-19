import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  imgLink = 'https://reedr.ru/wp-content/uploads/2019/04/DRON-1.jpg';
  imgLingBackRef = 'https://wallbox.ru/resize/1920x1080/wallpapers/main/201126/e9131073ec61c9beaf13f555ee328f10.jpg';
  constructor() { }

  ngOnInit() {
  }
}
