import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { NetworkstatusService } from './networkstatus.service';
import Dexie from 'dexie';
import { PawsClient } from './proto/Paws_grpcServiceClientPb';
import { Error } from 'grpc-web';
import { Diary, FetchParam, DiaryList } from './proto/paws_grpc_pb';

@Injectable({
  providedIn: 'root'
})
export class PawsService {

  private pawsdb: any;
  private isOnline = true;
  private diarySubject = new Subject<Diary.AsObject[]>();

  constructor(private http: HttpClient, private networkstatusService: NetworkstatusService) {
    this.registerToEvents(networkstatusService);
    this.createDatabase();
    this.isOnline = networkstatusService.isOnline;
  }

  private registerToEvents(networkstatusService: NetworkstatusService) {
    networkstatusService.connectionChanged.subscribe(online => {
      this.isOnline = online;
      if (online) {
        console.log('went online');
        console.log('sending all stored items');
      } else {
        console.log('went offline, storing in indexdb');
      }
    });
  }

  private createDatabase() {
    this.pawsdb = new Dexie('paws_db');
    this.pawsdb.version(1).stores({
      diaries: 'id,date,note,image'
    });
  }

  private getFromIndexedDB(id: string) {
    return this.pawsdb.diaries.where('id').equals(id);
  }

  private storeInIndexedDB(diaries: Diary.AsObject[]) {
    // console.log(this.getFromIndexedDB(diary.id));
    this.pawsdb.diaries.clear().then(async () => {
      this.pawsdb.diaries
        .bulkPut(diaries)
        .then(async () => {
          const allItems: Diary[] = await this.pawsdb.diaries.toArray();
          console.log('saved in DB, DB is now', allItems);
        })
        .catch(e => {
          console.log('Error: ' + (e.stack || e));
        });

    });
  }

  private async sendItemsFromIndexedDb() {
    const allItems: Diary[] = this.pawsdb.diaries.toArray();

    allItems.forEach((item: Diary) => {
      // send items to backend...
      this.pawsdb.diaries.delete(item.getId()).then(() => {
        console.log(`item ${item.getId()} sent and deleted locally`);
      });
    });
  }

  getDiaries(): Observable<Diary.AsObject[]> {
    if (!this.isOnline) {
      const allItems = this.pawsdb.diaries;
      const diariesInIndexedDB: Diary.AsObject[] = [];
      allItems.each((item) => {
        diariesInIndexedDB.push(item);
      });
      if (diariesInIndexedDB) {
        console.log('got it from indexeddb');
        console.log(diariesInIndexedDB);
        return of(diariesInIndexedDB);
      }
    } else {
      const pawsService = new PawsClient('http://localhost:8080', null, null);

      const fp = new FetchParam();
      pawsService.fetchAllDiaries(fp, {},
        (err: Error, response: DiaryList) => {
          console.log(err);
          const diaries: Diary.AsObject[] = [];
          response.getDiariesList().forEach((diary) => {
            diaries.push(diary.toObject());
          });

          this.diarySubject.next(diaries);
          //this.storeInIndexedDB(diaries);
          this.diarySubject.asObservable().subscribe((d) => { console.log(d); }
          );
          return this.diarySubject.asObservable();
        });
    }

  }

}
