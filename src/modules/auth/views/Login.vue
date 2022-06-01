<template>
  <div class="c-background">
    Login page
  </div>
</template>

<script>
// import { AuthService } from '../../../services/api/auth.service';

export default {
  name: 'login_page',
  data() {
    return {
      Receiver: {
        data: null,
        loaded: false,
        loading: false,
        error: null,
      },
      phone_no: '+251',
      password: '',
    };
  },
  components: {},
  methods: {
    async login() {
    },
  },
  created() {

  },
};
</script>

<style scoped>
.fill-height {
  height: 100vh;
}
.c-form {
  margin-top: 30vh;
}
.text-read {
  color: red;
}
</style>
