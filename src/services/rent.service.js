import urls from '../resources/urls';
import { Api } from '../resources/api';
import { NotifyError, NotifySucess } from '@/resources/notification';

export class RentService {
    constructor(vm) {
        this.vm = vm;
        this.api = new Api(vm);
    }

    async getPaymentTypes(receiver) {
        try {
            await this.api.get(urls.payment_types, receiver);
        } catch (err) {
            NotifyError(this.vm, err.response.data.message);
            console.log(err);
        }
    }

    async createRentRequest(receiver, payload) {
        try {
            await this.api.post(urls.create_request, payload, receiver);
            NotifySucess(this.vm, "Successfully created rent request");
            this.vm.$router.push({ name: 'my_rent_requests' });
        } catch (err) {
            NotifyError(this.vm, err.response.data.message);
            console.log(err);
            throw (err);
        }
    }

    async getRentRequestsAsOwner(receiver) {
        try {
            await this.api.get(urls.rent_requests_as_owner, receiver);
        } catch (err) {
            NotifyError(this.vm, err.response.data.message);
            console.log(err);
        }
    }

    async getRentRequestsAsRenter(receiver) {
        try {
            await this.api.get(urls.rent_requests_as_renter, receiver);
        } catch (err) {
            NotifyError(this.vm, err.response.data.message);
            console.log(err);
        }
    }

    async getRentRequestDetail(id, receiver) {
        try {
            await this.api.get(urls.rent_request_detail + id, receiver);
        } catch (err) {
            NotifyError(this.vm, err.response.data.message);
            console.log(err);
        }
    }

    async rejectRentRequest(id, receiver) {
        try {
            await this.api.get(urls.reject_rent_request + id, receiver);
            this.vm.$router.push({ name: 'recived_rent_requests' });
            NotifySucess(this.vm, "Successfully rejected rent request");
        } catch (err) {
            NotifyError(this.vm, err.response.data.message);
            console.log(err);
        }
    }

    async acceptRentRequest(id, receiver) {
        try {
            await this.api.get(urls.accept_rent_request + id, receiver);
            NotifySucess(this.vm, "Successfully accepted rent request");
            this.vm.$router.push({ name: 'my_rented_properties' }); // to my rents page
        } catch (err) {
            NotifyError(this.vm, err.response.data.message);
            console.log(err);
        }
    }

    async rentsAsOwner(receiver) {
        try {
            await this.api.get(urls.rents_as_owner, receiver);
        } catch (err) {
            NotifyError(this.vm, err.response.data.message);
            console.log(err);
        }
    }

    async rentsAsRenter(receiver) {
        try {
            await this.api.get(urls.rents_as_renter, receiver);
        } catch (err) {
            NotifyError(this.vm, err.response.data.message);
            console.log(err);
        }
    }

    async rentDetail(id, receiver) {
        try {
            await this.api.get(urls.rent_detail + id, receiver);
        } catch (err) {
            NotifyError(this.vm, err.response.data.message);
            console.log(err);
        }
    }


}