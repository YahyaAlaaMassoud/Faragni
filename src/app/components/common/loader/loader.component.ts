import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { LoaderService } from '../../../services/loader/loader.service';
import { LoaderState } from '../../../models/loaderstate.model';

@Component({
  selector: 'loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  show: boolean = false;
  changingValue: number;
  private subscription: Subscription;

  constructor(private loaderService: LoaderService) 
  { 
  }

  ngOnInit() { 
    this.subscription = this.loaderService.loaderState
        .subscribe((state: LoaderState) => {
            this.show = state.show;
            if(this.show){
              this.changingValue = 100;
            }
            else 
              this.changingValue = 0;
        });
  }
  ngOnDestroy() {
      this.changingValue = 0;
      this.subscription.unsubscribe();
  }

}
