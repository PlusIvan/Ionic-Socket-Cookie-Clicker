import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';


import { SocketService } from '../service/socket-io.service'


interface Cookie {
  cookieClicked: 0;
  usersOnline: 0;
}

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {


  socketSubscription: Subscription;

  cookieClicked = 0;
  usersOnline: Array<number> = [];

  clickAnimate: 'rotate-center' | '' = '';

  constructor(
    private socket: SocketService
  ) {}

  ngOnInit(): void {
    
    
    this.socketSubscription = this.socket.listenEvent('click').subscribe({
      error: (error) => {
        console.log(error);
      },
      next: (response: Cookie) => {
        this.clickAnimate = 'rotate-center';
        this.cookieClicked = response.cookieClicked;
        this.usersOnline = Array( response.usersOnline).fill(0).map((x,i)=>i);
      }
    })

  }


  click(): void{
    this.clickAnimate = '';
    this.socket.emitEvent('click');
  }

}
