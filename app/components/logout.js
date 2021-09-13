import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class LogoutComponent extends Component {
  @service session;

  @action async logout(){
    try {
      await this.session.invalidate('authenticator:mu-semtech');
    } catch(err){
      this.error = err.errors[0].title;
    }
  }
}
