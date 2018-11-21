<template>
  <p>
    {{ greeting }} World!
  </p>  
</template>

<script>
export default {
  data() {
    return {
      greeting: "Hello"
    };
  }
};
</script>

<style scoped>
p {
  font-size: 2em;
  text-align: center;
  color: #2e9afe;
}
</style>