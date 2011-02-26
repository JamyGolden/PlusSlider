<?php
	$pageTitle = 'PlusSlider jQuery Plugin';
	$permalink = '2011/01/plusslider-1-0';
	$contentTitle = 'PlusSlider 1.1';
	$includeAnalytics = false;
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<link rel="icon" type="image/gif" href="../../images/favicon.ico" />

<title><?php echo $pageTitle; ?></title>

<link rel="stylesheet" type="text/css" href="../../css/defaults-v.2.css" />
<link rel="stylesheet" type="text/css" href="css/plusslider.css" />

<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.4/jquery.min.js"></script>
<script type='text/javascript' src='js/jquery.plusslider.1.1.js'></script>
<script type='text/javascript' src='js/jquery.easing.1.3.js'></script>
<script type='text/javascript'>
$(document).ready(function(){
	$('#slider').plusSlider({
        displayTime: 4000, // The amount of time the slide waits before automatically moving on to the next one. This requires 'autoPlay: true'
        sliderEasing: 'easeInOutExpo', // Anything other than 'linear' and 'swing' requires the easing plugin
        paginationBefore: true,
        sliderType: 'slider' // Choose whether the carousel is a 'slider' or a 'fader'
	});
	$('#slider2').plusSlider({
        displayTime: 2000, // The amount of time the slide waits before automatically moving on to the next one. This requires 'autoPlay: true'
        sliderType: 'fader', // Choose whether the carousel is a 'slider' or a 'fader'
		width: 500, // Overide the default CSS width
		height: 260 // Overide the default CSS width
	});
});
</script>
</head>
<body>
	<div id="page-wrap">
		<?php include('../../includes/header.php'); ?>
		<div id="content">
            <h1><?php echo $contentTitle; ?> <a id="download" href="http://css-plus.com/downloads/plugins/PlusSlider.zip">Download</a></h1>
			<div id="slider">
			
				<div class="slide1">
					<h2>PlusSlider</h2>
					<p>
						A content slider that simply works...<br />
						The right way
					</p>
				</div>
				
				<a href="#"><img src="images/image2.jpg" alt="" height="250" width="630" /></a>
				
				<img src="images/image3.jpg" alt="" height="250" width="630" />
				
				<div class="quote">
					I do not fear death,<br />
					in view of the fact that I had been dead<br />
					for billions and billions of years<br />
					before I was born, and had not suffered<br />
					the slightest inconvenience from it.<br />
					- Mark Twain
				</div>
				
				<img src="images/image4.jpg" alt="" height="250" width="630" />
				
			</div>
			<br /><br />
			<div id="slider2">
			
				
				<a href="#"><img src="images/image2.jpg" alt="" height="250" width="630" /></a>
				
				<img src="images/image3.jpg" alt="" height="250" width="630" />
				
				
				<img src="images/image4.jpg" alt="" height="250" width="630" />
				
			</div>

			<div class="content" id="features">
			<a href="http://twitter.com/share" class="twitter-share-button" data-count="vertical" data-via="jamygolden">Tweet</a><script type="text/javascript" src="http://platform.twitter.com/widgets.js"></script>
			<script src="http://connect.facebook.net/en_US/all.js#xfbml=1"></script><fb:like href="http://css-plus.com/examples/PlusSlider" layout="box_count" show_faces="true" width="450" font="arial"></fb:like>
				<h2>Features</h2>
				<ul>
					<li>Slides are <em>HTML</em> (<em>Can be images or text</em>)</li>
					<li>Easily swap between <strong>fading</strong> <span class="amp">&amp;</span> <strong>sliding</strong></li>
					<li>Multiple PlusSliders per page</li>
					<li>Very <em>simple</em> <span class="amp">&amp;</span> <em>valid markup</em></li>
					<li>Autoplay (<em>Optional</em>)</li>
					<li><strong>Next/Previous</strong> Navigation (<em>Optional</em>)</li>
					<li><strong>Paginated</strong> Navigation (<em>Optional</em>)</li>
					<li>Tested on <strong><abbr title="Internet Explorer">IE</abbr>7+</strong> and <strong>modern browsers</strong></li>
				</ul>
				<h2>Default Options</h2>
				<pre><code>$('#slider').plusSlider({
	createArrows: true, // Creates forward and backward navigation
	createPagination: true, // Creates Numbered pagination

	displayTime: 2000, // The amount of time the slide waits before automatically moving on to the next one. This requires 'autoPlay: true'
	speed: 500, // The amount of time it takes for a slide to fade into another slide

	autoPlay: true, // Creats a times, looped 'slide-show'
	keyboardNavigation: true, // The keyboard's directional left and right arrows function as next and previous buttons
	pauseOnHover: true, // Autoplay does not continue ifsomeone hovers over Plus Slider.

	sliderEasing: 'linear', // Anything other than 'linear' and 'swing' requires the easing plugin
	sliderType: 'slider', // Choose whether the carousel is a 'slider' or a 'fader'

	width: false, // Overide the default CSS width
	height: false // Overide the default CSS width
});</code></pre>
				<h2>Usage Instructions</h2>
				<h3>Step 1 - Add the <code>&lt;head&gt;</code> scripts</h3>
				<pre><code>&lt;script type=&quot;text/javascript&quot; src=&quot;http://ajax.googleapis.com/ajax/libs/jquery/1.4.4/jquery.min.js&quot;&gt;&lt;/script&gt;
&lt;script type='text/javascript' src='js/jquery.plusslider.1.1.js'&gt;&lt;/script&gt;
&lt;script type='text/javascript'&gt;
$(document).ready(function(){
	$('#slider').plusSlider();
});
&lt;/script&gt;</code></pre>
				<h3>Step 2 - Create a container <code>div</code></h3>
				<pre><code>&lt;div id=&quot;mySlider&quot;&gt;
		
&lt;/div&gt;</code></pre>
				<h3>Step 3 - Add Slides</h3>
				<p>
					Any child element will be a slide, even if it's an <code>&lt;a&gt;</code>, <code>&lt;div&gt;</code>, <code>&lt;img&gt;</code> or even <code>&lt;blockquote&gt;</code>.
				</p>
				<pre><code>&lt;div id=&quot;mySlider&quot;&gt;
	&lt;a href=&quot;#&quot;&gt;&lt;img src=&quot;image.jpg&quot; alt=&quot;&quot; /&gt;&lt;/a&gt;
	&lt;div class=&quot;slide2&quot;&gt;&lt;h2&gt;Lorem Ipsum dolor&lt;/h2&gt;&lt;/div&gt;
	&lt;img src=&quot;image2.jpg&quot; alt=&quot;&quot; /&gt;
	&lt;blockquote&gt;
		Lorem ipsum dolor sit amet, consectetur adipiscing elit,
		Phasellus ligula nibh, suscipit quis condimentum eleifend, 
		Lacinia a felis aenean erat nisl, tempus non ornare eu, 
		Commodo quis ipsum.
	&lt;blockquote&gt;
&lt;/div&gt;</code></pre>
				<h3>Step 4 - Relax</h3>
				<p>Your all done!</p>
				<h2>Customization</h2>
				<h3>Controlling the height, width, colour, pagination and directional arrows</h3>
				<p>
					This is all with <abbr title="Cascading Style Sheet">CSS</abbr> and is <strong>easily <span class="amp">&amp;</span> completely</strong> customized.
				</p>
				<p>
					The pagination is numbered. <code>text-indent</code> has been used within my styling to hide them for aesthetic purposes.
				</p>
				<p><strong>Note</strong>: every slide should be equal in width and height which is why I've added the optional <code>autofitContents</code> javascript functionality.</p>
				
				<h2>Changelog</h2>
				<h3>Version 1.1</h3>
				<ul>
					<li>Added support for multiple sliders per page</li>
					<li>Added a <code>width</code> &amp; <code>height</code> option</li>
				</ul>
				<h3>Version 1</h3>
				<ul>
					<li>First official version</li>
				</ul>
			</div>
		</div>
	</div>
	<?php if($includeAnalytics == true){
		include('../../includes/footer.php'); 
	}; ?>
</body>
</html>