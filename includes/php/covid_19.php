<?php
	$executionStartTime = microtime(true) / 1000;

	$url='https://covid-19-tracking.p.rapidapi.com/v1/'.$_REQUEST['country'];

	$ch = curl_init();

	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_URL,$url);
    curl_setopt($ch, CURLOPT_HTTPHEADER , [
		"x-rapidapi-host: covid-19-tracking.p.rapidapi.com",
		"x-rapidapi-key: bae906d29bmsh6603ae9ee0ffcc1p10949ajsne53a0cc8fb32"
	]);

	$result=curl_exec($ch);

	curl_close($ch);

	$decode = json_decode($result,true);	

	$output['status']['code'] = "200";
	$output['status']['name'] = "ok";
	$output['status']['description'] = "mission saved";
	$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
	$output['data'] = $decode;
	
	header('Content-Type: application/json; charset=UTF-8');

	echo json_encode($output); 
?>
