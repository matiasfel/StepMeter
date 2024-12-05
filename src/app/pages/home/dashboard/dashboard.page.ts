import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  email: string = '';

  constructor() { }

  ngOnInit() {
    const email = sessionStorage.getItem('usuario@example.com');
    this.email = email !== null ? email : '';
  }

  logout(){
    console.log("Cerrar sesión");
  }

}
