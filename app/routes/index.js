import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class IndexRoute extends Route {
  @service() session;

  beforeModel(transition) {
    this.session.requireAuthentication(transition, 'login');
  }

  async model(){
    return this.store.findRecord('account', this.session.data.authenticated.relationships.account.data.id);
  }

  setupController(controller, model) {
    controller.set('email', model.email);
  }
}
