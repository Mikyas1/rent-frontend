import axios from 'axios';

export class Api {
  constructor(vm) {
    this.vm = vm;
    this.axios = axios.create({
      baseURL: process.env.VUE_APP_API_URL,
      // withCredentials: true,
      // headers: {
      //   'Content-Type': 'application/json',
      //   Accept: 'application/json',
      //   'Access-Control-Allow-Headers': '*',
      //   'Access-Control-Allow-Origin': '*',
      //   'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      // },
    });

    try {
      this.axios.interceptors.request.use(
        (config) => {
          let data = JSON.parse(localStorage.getItem('rent'));

          if (data && data.auth && data.auth.token) {
            // config.headers["Authorization"] = 'Token ' + data.auth.token;
            config.headers['Authorization'] = `Bearer ${data.auth.token}`;
          }

          return config;
        },

        (error) => {
          return Promise.reject(error);
        }
      );
    } catch (error) {
      console.log(error);
    }


    this.axios.interceptors.response.use(undefined, (err) => {
      return new Promise(() => {
        console.log(err)
        if (
          err.response &&
          err.response.status === 401 &&
          err.config &&
          !err.config.__isRetryRequest
        ) {
          // this.vm.$store.dispatch("auth/logout");
          console.log("got here bad")
          console.log(this.vm);
          this.vm.$router.push({ name: "logout" });
        } else {
          throw err;
        }
      });
    });
  }

  async get(path, receiver) {
    try {
      if (receiver) receiver.loaded = false;

      let res = await this.axios.get(path);
      
      if (receiver == null || receiver == undefined) {
        return res.data;
      }

      // mutation
      receiver.data = res.data;
      receiver.loaded = true;
    } catch(err) {
      if (receiver) receiver.error = err;
      throw err;
    }
  }

  async post(path, data, receiver) {
    try {
      if (receiver) receiver.loaded = false;
      if (receiver) receiver.loading = true;

      let res = await this.axios.post(path, data);

      if (receiver == null || receiver == undefined) {
        return res;
      }

      // mutation
      receiver.data = res.data;
      receiver.loaded = true;
      receiver.loading = false;
    } catch(err) {
      if (receiver) receiver.error = err;
      if (receiver) receiver.loading = false;
      if (receiver) receiver.loaded = true;
      throw err;
    }
  }

  async post_form(path, data, receiver) {
    try {
      if (receiver) receiver.loaded = false;
      if (receiver) receiver.loading = true;

      let res = await this.axios.post(path, data, { headers: { 'Content-Type': 'multipart/form-data' } });

      if (receiver == null || receiver == undefined) {
        return res;
      }

      // mutation
      receiver.data = res.data;
      receiver.loaded = true;
      receiver.loading = false;
    } catch(err) {
      if (receiver) receiver.error = err;
      if (receiver) receiver.loading = false;
      if (receiver) receiver.loaded = true;
      throw err;
    }
  }

  async patch(path, data, receiver) {
    try {
      if (receiver) receiver.loaded = false;
      if (receiver) receiver.loading = true;
      
      let res = await this.axios.patch(path, data);

      if (receiver == null || receiver == undefined) {
        return res;
      }

      // mutation
      receiver.data = res.data ? res.data : res;
      receiver.loaded = true;
      receiver.loading = false;
    } catch(err) {
      if (receiver) receiver.error = err;
      if (receiver) receiver.loading = false;
      throw err;
    }
  }

  async put(path, data, receiver) {
    try {
      if (receiver) receiver.loaded = false;
      if (receiver) receiver.loading = true;
      let res = await this.axios.put(path, data);

      if (receiver == null || receiver == undefined) {
        return res;
      }

      // mutation
      receiver.data = res.data ? res.data : res;
      receiver.loaded = true;
      receiver.loading = false;
    } catch(err) {
      if (receiver) receiver.error = err;
      if (receiver) receiver.loading = false;
      throw err;
    }
  }

  async delete(path, receiver) {
    try {
      if (receiver) receiver.loaded = false;
      if (receiver) receiver.loading = true;
      let res = await this.axios.delete(path);

      if (receiver == null || receiver == undefined) {
        return res;
      }

      // mutation
      receiver.data = res.data ? res.data : res;
      receiver.loaded = true;
      receiver.loading = false;
    } catch(err) {
      if (receiver) receiver.error = err;
      if (receiver) receiver.loading = false;
      throw err;
    }
  }
}
