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

  constructor(private router: Router) { }

  goToProfilePage() {
    this.router.navigate(['/profile']);
  }

  deleteTweet(tweet: object) {
    // TODO call api service
    console.log(tweet);
  }

  replyTweet(tweet: object) {
    // TODO call api service
    console.log(tweet);
  }

  starTweet(tweet: object) {
    // TODO call api service
    console.log(tweet);
  }

  ngOnInit() {
    // TODO call tweets service with input
    console.log(this.pagePlacing);
  }

}
