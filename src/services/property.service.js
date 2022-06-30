import urls from '../resources/urls';
import { Api } from '../resources/api';
import { NotifyError, NotifySucess } from '@/resources/notification';

export class PropertyService {
    constructor(vm) {
        this.vm = vm;
        this.api = new Api(vm);
    }

    async getProperties(filterData, paginationData, receiver) {
        let pg = "";
        if (paginationData != null && paginationData != undefined) {
            pg = `?page=${paginationData.page}&limit=${paginationData.limit}`
        }

        try {
            await this.api.post(urls.properties + pg, filterData, receiver);
        } catch (err) {
            NotifyError(this.vm, err.response.data.message);
            console.log(err);
        }
    }

    async getMyProperties(receiver) {
        try {
            await this.api.get(urls.my_properties, receiver);
        } catch (err) {
            NotifyError(this.vm, err.response.data.message);
            console.log(err);
        }
    }

    addProperties = async (receiver, payload) => {
        try {
            await this.api.post_form(urls.add_property, payload, receiver);
            NotifySucess(this.vm, "Successfully Added property");
        } catch (err) {
            NotifyError(this.vm, "Error on " + err.response.data.detail);
            console.log(err);
            throw(err);
        }
    }

    async getPropertyOptions(receiver) {
        try {
            await this.api.get(urls.property_options, receiver);
        } catch (err) {
            NotifyError(this.vm, err.response.data.message);
            console.log(err);
        }
    }

    async getProperty(id, receiver) {
        try {
            await this.api.get(urls.property_detail + id, receiver);
        } catch (err) {
            NotifyError(this.vm, err.response.data.message);
            console.log(err);
        }
    }

    async removeProperty(id, receiver) {
        try {
            await this.api.delete(urls.remove_properties + id, receiver);
            NotifySucess(this.vm, "Successfully Deleted property");
            this.vm.$router.push({ name: 'my_properties' });
        } catch (err) {
            NotifyError(this.vm, err.response.data.message);
            console.log(err);
        }
    }
}
