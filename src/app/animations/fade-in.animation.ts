import { trigger, state, animate, transition, style, query, animateChild } from '@angular/animations';

export const fadeInAnimation =
    trigger('fadeInAnimation', [
        transition(':enter', [
            style({ opacity: 0 }),
            // animate('3s', style({ opacity: 1 }))
            animate('1s ease-in-out')            
        ]),
        transition(':leave', [
            style({ opacity: 1 }),
            // animate('3s', style({ opacity: 0 }))
            animate('1s ease-in-out')
        ])
    ]);
