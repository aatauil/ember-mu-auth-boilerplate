import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ChangePasswordComponent extends Component {
  @tracked newPassword;
  @tracked currentPassword;
  @tracked confirmPassword;
  @tracked error;
  @tracked success;

  get hasValues(){
    return this.currentPassword && this.newPassword && this.confirmPassword;
  }

  @action
    async changePassword(){
      this.error = '';
      this.success = '';

      if(this.newPassword != this.confirmPassword) {
        return this.error = "Passwords do not match";
      }

      try {
        const result = await fetch('/accounts/current/changePassword', {
          method: 'PATCH',
          headers: new Headers({
            Accept: 'application/vnd.api+json',
            'Content-Type': 'application/vnd.api+json'
          }),
          body: JSON.stringify({
            data: {
              type: 'accounts',
              attributes: {
                currentPassword: this.currentPassword,
                newPassword: this.newPassword,
              }
            }
          })
        });
        if (result.ok) {
          this.success = "Password Successfully changed";
        } else {
          const response = await result.json();
          throw response;
        }
      } catch (err){
        this.error = err.errors[0].title;
      }
    }
}
