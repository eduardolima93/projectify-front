import { Pipe, PipeTransform } from '@angular/core';

import { User } from '../../user';

@Pipe({
  name: 'userFilter'
})
export class UserFilterPipe implements PipeTransform {
  transform(users: User[], filterText: string): User[] {
    return users.filter((user: User) => {
      filterText = filterText || '';
      return (user.skills.toLowerCase().indexOf(filterText.toLowerCase()) !== -1
        || user.name.toLowerCase().indexOf(filterText.toLowerCase()) !== -1);
    });
  }
}
