<template>
  <header>
    <nav>
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">Charity</a></li>
        <li><a href="#">Event</a></li>
        <li><a href="#">About Us</a></li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'HeaderNav',
}
</script>

<style scoped>
header {
  background: #fff;
  padding: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}
nav ul {
  list-style: none;
  display: flex;
  justify-content: center;
  padding: 0;
  margin: 0;
}
nav ul li {
  margin: 0 15px;
}
nav ul li a {
  text-decoration: none;
  color: #333;
  font-weight: bold;
}
</style>
