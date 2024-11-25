import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageIonicService } from 'src/app/services/local-storage-ionic.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  user: any;
  allData: any[] = [];

  constructor(
    private localStorageIonicSerive: LocalStorageIonicService,
    private router: Router
  ) { }

  async ngOnInit() {
    this.user = await this.localStorageIonicSerive.get('user');
    this.allData = await this.localStorageIonicSerive.getAllData();
  }

  removeSession(key: string): void {
    this.router.navigate(['/login']);
    this.localStorageIonicSerive.remove(key);
  }

}
