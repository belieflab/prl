<?php

  //***********************************//
 //   EXPERIMENT CONFIGURATION FILE   //
//***********************************//

// SET EXPERIMENT NAME
$experimentName = 'Probabilistic Reversal Learning Task';
$experimentAlias = 'prl';

// SELECT LANGUAGE
$language = 'english';
// $language = 'french';
// $language = 'german';
?>

<script type="text/javascript">
    const experimentName = "<?php echo $experimentName; ?>";
    const experimentAlias = "<?php echo $experimentAlias; ?>";
    const language = "<?php echo $language; ?>";

    const version = "deck";
    //const version = "avatar";
    //const version = "sabotage";
    const difficulty = "easy-easy";
    //const difficulty = "easy-hard";
    //const difficulty = "hard-easy";
    //const difficulty = "hard-hard";
    const bonus = 2; // in dollars
    const percentile = 25; // cut-off performance percentile for bonus

</script>

