<?php
require_once 'db/data.php';
require_once 'exp/conf.php';
$directoryDeck = 'stim/deck/0/';
$directoryAvatar = 'stim/avatar/0/';
$decks = scandir($directoryDeck);
$avatars = scandir($directoryAvatar);
$fileArrayDeck = [];
$fileArrayAvatar = [];

// deck is black, blue, red
foreach ($decks as $deck) {
  // removes . and .. from element vector
  if ($deck !== '.' && $deck !== '..') {
        $fileArrayDeck[] = $directoryDeck.$deck;
  }
}
foreach ($avatars as $avatar) {
  if ($avatar !== '.' && $avatar !== '..') {
    $fileArrayAvatar[] = $directoryAvatar.$avatar;
  }
}

$fileArrayDeckJSON = json_encode($fileArrayDeck);
$fileArrayAvatarJSON = json_encode($fileArrayAvatar);
?>

<!DOCTYPE html>
<html>

<head>
  <!-- add the title of the experiment that would be seen in the browser -->
  <title><?php echo $experimentName; ?></title>
  <!-- PHP wrapper libraries -->
  <script type="text/javascript" src="db/validate.js"></script>
  <script type="text/javascript" src="db/jquery-3.5.1.min.js"></script>
  <!-- jsPsych CDN (content delivery network) libraries -->
  <script src="https://unpkg.com/jspsych@7.3.3"></script>
  <link href="https://unpkg.com/jspsych@7.3.3/css/jspsych.css" rel="stylesheet" type="text/css"/>
  <!-- jsPsych Plugins (add more here) -->
  <script src="https://unpkg.com/@jspsych/plugin-html-keyboard-response@1.1.2"></script>
  </link>
  <link rel="stylesheet" type="text/css" href="css/style.css">
  <script>
      const stimArrayDeck = <?php echo $fileArrayDeckJSON; ?>;
    const stimArrayAvatar = <?php echo $fileArrayAvatarJSON; ?>;
  </script>
</head>

<body id='unload' onbeforeunload="return areYouSure()">
<?php
    if (isset($_GET["workerId"]) || isset($_GET["PROLIFIC_PID"]) || isset($_GET["participantId"])) {
      switch ($language) {
        case 'english':
          include_once "include/consent/english.php";
          break;
  
        case 'french':
          include_once "include/consent/french.php";
          break;
  
        case 'german':
          include_once "include/consent/german.php";
          break;
        }
    } else if (isset($_GET["src_subject_id"])) {
      include_once "include/nda.php";
    } else {
      include_once "include/intake.php";
    }
  ?>
</body>
<footer>
  <!-- load experiment dependencies -->
  <script type="text/javascript" src="exp/fn.js"></script>
  <script type="text/javascript" src="exp/lang.js"></script>
  <script type="text/javascript" src="exp/var.js"></script>
  <script>
    // show page when loaded 
    window.onload = function() {
      $(".loading").css({
        display: "none"
      });
      $(".consent").css({
        display: "block"
      });
      $(".buttonHolder").css({
        display: "block"
      });
    };
  </script>
</footer>

</html>