<template>
    <div>
        Rent List
        <br/>
        <router-link :to="{ name: 'login' }">login</router-link>
        <br/>
        <router-link :to="{ name: 'logout' }">logout</router-link>
    </div>
</template>

<script>
export default {
    name: "rent_list"
}
</script>