import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tweets',
  templateUrl: './tweets.component.html',
  styleUrls: ['./tweets.component.css']
})
export class TweetsComponent implements OnInit {

  tweetArray = [
    {
      name: 'John Doe',
      date: '03/10/2019',
      content: 'thsfsdfsdfsdfsdfsfaofi aoknf oanoajdn asodn asodn oasdn osaidn osaind oasind oasnd asiodn asoidn asoidn'
    },
    {
      name: 'John Doe',
      date: '03/10/2019',
      content: 'thsfsdfsdfsdfsdfsfaofi aoknf oanoajdn asodn asodn oasdn osaidn osaind oasind oasnd asiodn asoidn asoidn'
    },
    {
      name: 'John Doe',
      date: '03/10/2019',
      content: 'thsfsdfsdfsdfsdfsfaofi aoknf oanoajdn asodn asodn oasdn osaidn osaind oasind oasnd asiodn asoidn asoidn'
    }
    ,
    {
      name: 'John Doe',
      date: '03/10/2019',
      content: 'thsfsdfsdfsdfsdfsfaofi aoknf oanoajdn asodn asodn oasdn osaidn osaind oasind oasnd asiodn asoidn asoidn'
    }
    ,
    {
      name: 'John Doe',
      date: '03/10/2019',
      content: 'thsfsdfsdfsdfsdfsfaofi aoknf oanoajdn asodn asodn oasdn osaidn osaind oasind oasnd asiodn asoidn asoidn'
    }
    ,
    {
      name: 'John Doe',
      date: '03/10/2019',
      content: 'thsfsdfsdfsdfsdfsfaofi aoknf oanoajdn asodn asodn oasdn osaidn osaind oasind oasnd asiodn asoidn asoidn'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
