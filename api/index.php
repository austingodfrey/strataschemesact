<?php
const user = document.cookie
.split('; ')
.find(c => c.startsWith('client_user='))
?.split('=')[1];

if (user) {
document.getElementById("welcomeText").textContent = `Welcome, ${user}`;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Styled Title</title>
  <style>
    .cursive-title {
      font-family: 'Brush Script MT', cursive;
      font-size: 2rem;
      color: #1f2937; /* Tailwind slate-800 */
      text-align: center;
      margin-top: 2rem;
    }
  </style>
</head>
<body>
  <h1 class="cursive-title">STRATA SCHEMES MANAGEMENT ACT 2015</h1>
  <script src="/scripts/apply-theme.js"></script>
</body>

</html> 