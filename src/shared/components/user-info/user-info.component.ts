import { Component, Input } from '@angular/core';
import { UserInfo } from 'src/shared/interfaces';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent {
  @Input() user!: UserInfo;

  onUserClick(): void {
    window.open(this.user.html_url, "_blank");
  }
}
