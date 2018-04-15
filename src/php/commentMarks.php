<?php

require('../disqusapi/disqusapi.php');
$disqus = new DisqusAPI('hAuiQkPAitJ6IvBjLLwdjtW8CR5L0Pam1CFXPAhEsOY0LeG2d6GEKvGEwquR9SRD');
//print_r($disqus->forums->listThreads(array('forum'=>'crossingborders2')));

echo json_encode($disqus->forums->listThreads(array('forum'=>'crossingborders2')));

?>
