<template>
  <form>
    <div>Update profile for {{ user.name }}</div>
  </form>
</template>

<script>
export default {
  name: 'update-form',
  props: {
    user: Object,
  }
}
</script>

<style>

</style>