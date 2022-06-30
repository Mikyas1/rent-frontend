<template>
    <div>Good bye</div>
</template>

<script>
import { AuthService } from '../../../services/auth.service';

export default {
    name: "logout_page",
    created () { 
      this.authService = new AuthService(this);
      this.authService.logout();
    }
}
</script>
