import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tweets',
  templateUrl: './tweets.component.html',
  styleUrls: ['./tweets.component.css']
})
export class TweetsComponent implements OnInit {

  @Input() pagePlacing: string;
  tweetArray = [
    {
      name: 'John Doe',
      date: '03/10/2019',
      content: 'thsfsdfsdfsdfsdfsfaofi aoknf oanoajdn asodn asodn oasdn osaidn osaind oasind oasnd asiodn asoidn asoidn',
      stars: 5
    },
    {
      name: 'John Doe',
      date: '03/10/2019',
      content: 'thsfsdfsdfsdfsdfsfaofi aoknf oanoajdn asodn asodn oasdn osaidn osaind oasind oasnd asiodn asoidn asoidn',
      stars: 5
    },
    {
      name: 'John Doe',
      date: '03/10/2019',
      content: 'thsfsdfsdfsdfsdfsfaofi aoknf oanoajdn asodn asodn oasdn osaidn osaind oasind oasnd asiodn asoidn asoidn',
      stars: 5
    }
    ,
    {
      name: 'John Doe',
      date: '03/10/2019',
      content: 'thsfsdfsdfsdfsdfsfaofi aoknf oanoajdn asodn asodn oasdn osaidn osaind oasind oasnd asiodn asoidn asoidn',
      stars: 5
    }
    ,
    {
      name: 'John Doe',
      date: '03/10/2019',
      content: 'thsfsdfsdfsdfsdfsfaofi aoknf oanoajdn asodn asodn oasdn osaidn osaind oasind oasnd asiodn asoidn asoidn',
      stars: 5
    }
    ,
    {
      name: 'John Doe',
      date: '03/10/2019',
      content: 'thsfsdfsdfsdfsdfsfaofi aoknf oanoajdn asodn asodn oasdn osaidn osaind oasind oasnd asiodn asoidn asoidn',
      stars: 5
    }
  ];

  constructor() { }

  ngOnInit() {
    // TODO call tweets service with input
    console.log(this.pagePlacing);
  }

}
