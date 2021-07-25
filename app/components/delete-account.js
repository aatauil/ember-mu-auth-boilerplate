import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class DeleteAccountComponent extends Component {
  @service router;
  @tracked error;

  @action
    async deleteAccount(){
      this.error = "";
      try {
        const result = await fetch('/accounts/current', {
          method: 'DELETE',
          headers: new Headers({
            Accept: 'application/vnd.api+json',
            'Content-Type': 'application/vnd.api+json'
          })
        });
        if(result.ok){
          this.router.transitionTo('login');
        } else {
          this.error = "Something went wrong, try again later.";
        }
      } catch (err){
        this.error = err.msg;
      }
    }
}
