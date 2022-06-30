import urls from '../resources/urls';
import { Api } from '../resources/api';
import { NotifyError, NotifySucess } from '@/resources/notification';

export class RenterProfileService {
  constructor(vm) {
    this.vm = vm;
    this.api = new Api(vm);
  }

  async getRenterProfile(receiver) {
    try {
      await this.api.get(urls.renter_profile, receiver);
    } catch (err) {
      NotifyError(this.vm, err.response.data.message);
      console.log(err);
    }
  }

  async updateRenterProfile(receiver, payload) {
    try {
      await this.api.post(urls.renter_profile, payload, receiver);
      NotifySucess(this.vm, "Successfully created renting profile");
    } catch (err) {
      NotifyError(this.vm, err.response.data.message);
      console.log(err);
    }
  }

  
}
