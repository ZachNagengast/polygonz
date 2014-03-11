<!DOCTYPE HTML>
 
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Polygonz | HD Wallpaper Maker</title>

<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="Polygons makes HD wallpaper backgrounds for you desktop, iphone, ipad, and android devices.">
<meta name="author" content="Zauce Technologies">
<meta property="og:image" content="" />
<link rel="image_src" href="" / >
<link rel="icon" type="image/png" href="favicon.ico">

<!-- Bootstrap core CSS -->
<link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css">

<!-- Add custom CSS here -->
<link href="http://www.zaucetech.com/css/stylish-portfolio.css" rel="stylesheet">
<link href="style.css" rel="stylesheet">
<link href="slider.css" rel="stylesheet">

<!-- Analytics -->
<script>
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
ga('create', 'UA-32529139-6', 'google.com');
ga('send', 'pageview');
</script>

<!--Scripts--> 
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
<script src="//netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js"></script>
<script type="text/javascript" src="fragmenter.js"></script>
<script type="text/javascript" src="canvas2image.js"></script>
<script type="text/javascript" src="bootstrap-slider.js"></script>
</head>
 
<body>

<?php include('../inc/header.php');?>

<div class="container-fluid">
<div class="row header">
	<h1><p class="text-center"><em>Polygonz</em> - HD Wallpaper Maker</p></h1>
	<h5><p class="text-center">Make your own beautiful HD wallpaper backgrounds for your <br> desktop, iphone, ipad, and android devices with this cool polygon algorithm.</p></h5>
</div>

<div class="row">
	<div class="col-md-offset-1 col-md-4 text-center">
		<div class="input-group" style="padding:0px;padding-bottom:5px">
		  	<div class="input-group-btn">
		     	<button id="presets" type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">iPhone 5 <span class="caret"></span></button>
		        <ul id="presets-dropdown" class="dropdown-menu" style="margin-left: 30%; margin-right: auto">
		        </ul>
          	</div>
        </div>
		<div class="input-group">
		  <span class="input-group-addon">Width</span>
		  <input id="width" type="text" class="form-control" value="640">
		  <span class="input-group-addon">Density</span>
		  <input id="densityX" type="text" class="form-control" value="10">
		</div>
		<div class="input-group">
		  <span class="input-group-addon">Height</span>
		  <input id="height" type="text" class="form-control" value="1136">
		  <span class="input-group-addon">Density</span>
		  <input id="densityY" type="text" class="form-control" value="14">
		</div>
		<div class="input-group">
	      <span class="input-group-addon">
	      Distortion
		  </span>
		  <input id="slider" type="text" data-slider-min="0" data-slider-max="10" data-slider-step="1" data-slider-value="0">
        </div>
		

		<div class="input-group">
		  	<div class="input-group-btn">
		     	<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">Colors <span class="caret"></span></button>
		        <ul id="colors-dropdown" class="dropdown-menu">
		        </ul>
          	</div>
		  <input id="colors" type="text" class="form-control" value="#444,#000,#040404,#080808,#0c0c0c,#101010,#141414,#181818,#1c1c1c,#202020,#242424,#282828,#2c2c2c,#000,#040404,#080808,#0c0c0c,#101010,#141414,#181818,#1c1c1c,#202020,#242424,#282828,#2c2c2c,#000,#040404,#080808,#0c0c0c,#101010,#141414,#181818,#1c1c1c,#202020,#242424,#282828,#2c2c2c">
		  <span class="input-group-addon">
	        <input id="wrap" type="checkbox" checked="false">
	        Wrap Colors
	      </span>
		</div>

	<div class="row">
  		<button id="update" onclick="updateImage()"type="button" class="btn btn-success btn-lg">
		  <span class="glyphicon glyphicon-refresh"></span> Update
		</button>

		<a id="save" download="fragmented.png">
		<button onclick="saveImage()" type="button" class="btn btn-primary btn-lg">
		  <span class="glyphicon glyphicon-floppy-save"></span> Save
		</button>
		</a>
	  </div>

	  <!-- footer -->
	  <div class="row">
	  	<?php include('../inc/footer.php');?>	  	
	  </div>

	</div><!-- /.col-lg-6 -->

  	<div class="col-md-6 text-center">
	  <div class="row">
	  	<h4><em>Preview</em></h4>
		<canvas id="canvas"></canvas>
		<a id="img" download="fragmented.png"></a>
		<br/>
		<script type="text/javascript">
			init();
		    $("#slider").slider();
		    $("#slider").on('slide', function(slideEvt) {
		        $("#sliderSliderVal").text(slideEvt.value);
		    });
		</script>
	  </div>
 	</div><!-- /.col-lg-6 -->
 </div> <!-- /.row -->
</div> <!-- /.container -->

</body>
</html>