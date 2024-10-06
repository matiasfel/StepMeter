import { trigger, state, style, transition, animate } from '@angular/animations';

export const fadeInOut = trigger('fadeInOut', [
  state('void', style({
    opacity: 0
  })),
  transition('void <=> *', [
    animate('250ms')
  ]),
]);

export const slideInOut = trigger('slideInOut', [
  state('void', style({
    transform: 'translateX(100%)'
  })),
  transition('void <=> *', [
    animate('300ms ease-in-out')
  ]),
]);

export const scaleInOut = trigger('scaleInOut', [
  state('void', style({
    transform: 'scale(0)'
  })),
  transition('void <=> *', [
    animate('600ms ease-in-out')
  ]),
]);

export const rotateInOut = trigger('rotateInOut', [
  state('void', style({
    transform: 'rotate(-90deg)'
  })),
  transition('void <=> *', [
    animate('400ms ease-in-out')
  ]),
]);

export const bounceInOut = trigger('bounceInOut', [
  state('void', style({
    transform: 'scale(0.5)',
    opacity: 0
  })),
  transition('void <=> *', [
    animate('500ms cubic-bezier(0.68, -0.55, 0.27, 1.55)')
  ]),
]);

export const fadeUpDown = trigger('fadeUpDown', [
  state('void', style({
    opacity: 0,
    transform: 'translateX(-100px)'
  })),
  transition('void <=> *', [
    animate('300ms ease-in-out')
  ]),
]);