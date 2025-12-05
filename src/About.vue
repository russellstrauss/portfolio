<template>
	<div class="about container-fluid">
		<Title></Title>
		<div class="layout-wrapper">
			<Nav></Nav>
			
			<div class="main-content">
				<div class="entry-content">
					<p>
						I’m a UI-focused software engineer with over a decade of experience building production-grade web applications that are fast, accessible, and visually precise. My specialization is turning complex product requirements and detailed design systems into clean, maintainable interfaces that are effortless to use.
					</p>
					<p>
						While many teams fixate on specific tool choices, my strength is deeper: I understand the underlying principles of modern JavaScript, rendering performance, state modeling, and component architecture. This lets me ramp up instantly on any stack—React, Vue, Angular, custom design systems, REST APIs, or whatever a project requires.
					</p>
					<p>
						I excel in roles where clarity, reliability, and delivery matter. Whether it's implementing pixel-perfect UI from designs, refactoring legacy front-end code into modern patterns, or building new components that scale, I focus on producing work that is both technically solid, visually precise, and dynamically flexible.
					</p>
					<p>	
						If you need a UI engineer who can ship high-quality interfaces without hand-holding, adapt quickly to new tools, and maintain a calm, organized approach in fast-moving environments, I'm your guy.
					</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	
	import Title from './components/Title.vue';
	import Nav from './components/Nav.vue';

	export default {
		
		name: 'About',
		
		components: {
			Nav,
			Title
		},
		
		data() {
			return {}
		},
		
		methods: {}
	}
</script>

<style lang="scss">
	
	.about {
		
	}
	
</style>