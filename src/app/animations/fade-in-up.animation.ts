import { trigger, state, animate, transition, style } from '@angular/animations';

export const fadeInUpAnimation =
// trigger name for attaching this animation to an element using the [@triggerName] syntax
trigger('fadeInUpAnimation', [
    // route 'enter' transition
    transition(':enter', [
        // css styles at start of transition
        style({ top: '50px', opacity: 0 }),
        // animation and styles at end of transition
        animate('0.45s ease', style({ top: 0, opacity: 1 }))
    ]),
]);
