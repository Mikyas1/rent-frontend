import urls from '../resources/urls';
import { Api } from '../resources/api';
import { NotifyError, NotifySucess } from '@/resources/notification';

export class AuthService {
  constructor(vm) {
    this.vm = vm;
    this.api = new Api(vm);
  }

  async login(receiver, payload) {
    try {
      await this.api.post(urls.login, payload, receiver);
      this.vm.$store.dispatch('auth/login', receiver.data);
      this.vm.$router.push({ name: 'property_list' });
      NotifySucess(this.vm, "Successfully logged In. Wellcome!!");
    } catch (err) {
      NotifyError(this.vm, err.response.data.message);
      console.log(err);
    }
  }

  async register(receiver, payload) {
    try {
      await this.api.post(urls.register, payload, receiver);
      this.vm.$store.dispatch('auth/login', receiver.data);
      this.vm.$router.push({ name: 'property_list' });
      NotifySucess(this.vm, "Successfully Registered. Wellcome!!");
    } catch (err) {
      NotifyError(this.vm, err.response.data.message);
      console.log(err);
    }
  }

  logout() {
    this.vm.$store.dispatch('auth/logout');
    this.vm.$store.commit("SET_SNACKBAR", {
      message: "Successfully logged Out. Good Bye!!",
      value: true,
      status: "success"
    });
    this.vm.$router.push({ name: 'property_list' });
  }
}
