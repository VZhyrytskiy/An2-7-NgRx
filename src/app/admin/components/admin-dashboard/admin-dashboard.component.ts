import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// rxjs
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  templateUrl: 'admin-dashboard.component.html',
  styleUrls: ['admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  sessionId: Observable<string>;
  token: Observable<string>;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    // Capture the session ID if available
    this.sessionId = this.route
      .queryParamMap
      .pipe(
        map(params => params.get('sessionId') || 'None')
      );

    // Capture the fragment if available
    this.token = this.route
      .fragment
      .pipe(
        map(fragment => fragment || 'None')
      );
  }

}
