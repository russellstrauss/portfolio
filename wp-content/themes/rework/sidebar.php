<div class="sidebar row">
	<div class="col-sm-3">
		<nav class="main-menu <?php echo $triggerAnimation; ?>"> <!-- TODO fix trigger-animation class -->
			<?php wp_nav_menu( array( 'theme_location' => 'main-menu' ) ); ?>
		</nav>
	</div>
</div>