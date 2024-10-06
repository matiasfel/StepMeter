import { Component, OnInit } from '@angular/core';
import { fadeInOut, slideInOut, scaleInOut, rotateInOut, bounceInOut, fadeUpDown } from '../../animations/animations';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.page.html',
  styleUrls: ['./landing-page.page.scss'],
  animations: [
    fadeInOut,
    slideInOut,
    scaleInOut,
    rotateInOut,
    bounceInOut,
    fadeUpDown
  ]
})

export class LandingPagePage implements OnInit {

  showLoginSection: boolean = false;
  showInfoSection: boolean = true;

  isAnimating: boolean = false;

  passwordFieldType: string = 'password';
  isPasswordVisible: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  toggleSections() {
    this.showInfoSection = false;
  }

  onAnimationDone(event: any) {
    if (!this.showInfoSection) {
      this.showLoginSection = true;
    }
  }

  goBack() {
    this.isAnimating = true;
    this.showLoginSection = false;
  }

  onLoginAnimationDone(event: any) {
    if (!this.showLoginSection) {
      this.showInfoSection = true;
      this.isAnimating = false;
    }
  }

  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
    this.passwordFieldType = this.isPasswordVisible ? 'text' : 'password';
  }

}