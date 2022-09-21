import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  name: string | null;

  constructor() { 
    this.name = 'John Doe';
  }

  ngOnInit(): void {
    this.name = JSON.parse(localStorage.getItem("currentUser") as string).name;
  }

}
