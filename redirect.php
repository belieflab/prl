<?php
?>

<!DOCTYPE html>
<html>

<head>
  <script>
    document.addEventListener('DOMContentLoaded', () => {
      document.title = experimentName;
    });
  </script>
</head>

<body id='unload' onbeforeunload="return areYouSure()">


<?php

// Get the params from the URL
$workerId = $_GET['workerId'];
$PROLIFIC_PID = $_GET['PROLIFIC_PID'];
$participantId = $_GET['participantId'];

if ($workerId) {
    // Redirect to index.php with the workerId parameter
    header("Location: ./?workerId=$workerId");
    exit; // Make sure to exit after the header redirect
} else if ($PROLIFIC_PID) {
    // Redirect to index.php with the workerId parameter
    header("Location: ./?PROLIFIC_PID=$PROLIFIC_PID");
    exit; // Make sure to exit after the header redirect
} else if ($participantId) {
    // Redirect to index.php with the workerId parameter
    header("Location: ./?participantId=$participantId");
    exit; // Make sure to exit after the header redirect
} else {
    // Redirect to index.php with the workerId parameter
    echo"<h1>Ah! Ah! Ah!<h1>";
    echo"<h1>You didn't say the magic word!<h1/>";
    echo"<img src='wrap/magicword.gif'>";
    exit; // Make sure to exit after the header redirect
}

?>



</body>

</html>
