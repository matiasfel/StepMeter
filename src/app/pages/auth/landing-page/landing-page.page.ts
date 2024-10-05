import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.page.html',
  styleUrls: ['./landing-page.page.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      transition('void <=> *', [
        animate('250ms')
      ]),
    ]),
    trigger('slideInOut', [
      state('void', style({
        transform: 'translateX(100%)'
      })),
      transition('void <=> *', [
        animate('300ms ease-in-out')
      ]),
    ]),
    trigger('scaleInOut', [
      state('void', style({
        transform: 'scale(0)'
      })),
      transition('void <=> *', [
        animate('600ms ease-in-out')
      ]),
    ]),
    trigger('rotateInOut', [
      state('void', style({
        transform: 'rotate(-90deg)'
      })),
      transition('void <=> *', [
        animate('400ms ease-in-out')
      ]),
    ]),
    trigger('bounceInOut', [
      state('void', style({
        transform: 'scale(0.5)',
        opacity: 0
      })),
      transition('void <=> *', [
        animate('500ms cubic-bezier(0.68, -0.55, 0.27, 1.55)')
      ]),
    ]),
    trigger('fadeUpDown', [
      state('void', style({
        opacity: 0,
        transform: 'translateX(-100px)'
      })),
      transition('void <=> *', [
        animate('300ms ease-in-out')
      ]),
    ])
  ]
})

export class LandingPagePage implements OnInit {
  showLoginSection: boolean = false;
  showInfoSection: boolean = true;
  isAnimating: boolean = false;

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
}