import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PawsService } from './paws.service';
import { Diary } from './proto/paws_grpc_pb';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'PawsPWA';
  diaries$: Observable<Diary.AsObject[]>;

  constructor(private pawsService: PawsService) {
  }

  ngOnInit(): void {
    //this.diaries$ = this.pawsService.getDiaries();

    this.pawsService.getDiaries().subscribe((d) => {console.log(d);});
    // this.pawsService.getDiaries().subscribe((d) => {
    //   console.log('subscribed!');
    //   console.log(d.length);
    // });
  }
}
