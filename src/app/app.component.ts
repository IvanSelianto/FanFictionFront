import {Component, DoCheck, OnChanges, OnInit} from '@angular/core';
import {TokenStorageService} from './_services/token-storage.service';
import {Router} from '@angular/router';
import {CompositionService} from './_services/composition.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  roles: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  username: string;
  searchRequest: string;
  searchResult: any;
  userId: number;

  constructor(public tokenStorageService: TokenStorageService,
              public router: Router, private compositionService: CompositionService) {
  }

  ngOnInit() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.userId = user.id;
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.username = user.username;
    }
  }


  logout() {
    this.tokenStorageService.signOut();
    this.showAdminBoard = false;
    this.ngOnInit();
    this.router.navigateByUrl('home');
  }

  search(): void {
    if (this.searchRequest !== undefined) {
      this.compositionService.search(this.searchRequest).subscribe((data) => this.searchResult = data);
    }
  }

  openSearchPanel() {
    if ((document.getElementsByClassName('search-li')[0] as HTMLElement).hidden === true) {
      (document.getElementsByClassName('search-li')[0] as HTMLElement).hidden = false;
    } else {
      (document.getElementsByClassName('search-li')[0] as HTMLElement).hidden = true;
    }

  }

  readComposition(compositionId) {
    this.router.navigateByUrl('/composition/' + compositionId);
  }
}
