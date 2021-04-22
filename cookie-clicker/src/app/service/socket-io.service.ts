import { Injectable } from '@angular/core';


import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor(
    private socket: Socket
  ) { }



  /**
   * Emit a event to backend via socket
   * @param name Name of event
   * @param object Data to pass in Objects
   */
  public emitEvent(name: string, object?: Object): void{
    this.socket.emit(name, object);
  }



  /**
   * Listen to a event
   * @param name Socket event name
   */
  public listenEvent(name: string): Observable<any>{

    return this.socket.fromEvent(name).pipe(map((data: any) => data))

  }


}
