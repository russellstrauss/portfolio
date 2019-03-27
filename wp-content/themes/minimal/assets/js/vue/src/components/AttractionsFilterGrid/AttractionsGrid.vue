<template>
	
	<div>
		
		<div class="attraction-grid">
			
			<div class="attraction" v-bind:key="gridItem.gridItemID" v-for="gridItem in currentItems" v-bind:style="encodeBackgroundImage(gridItem.background)" v-bind:class="{'active' : gridItem.active}">
				<!-- gridItemID can be Sitecore GUID -->
				
				<div class="gradient-top"></div>
				<div class="gradient-bottom"></div>
				
				<div class="content">
				
					<div class="category">
						<span v-bind:key="category.categoryID" v-for="(category, index) in gridItem.categoryList">
							
							<span v-if="gridItem.featured && index === 0">Featured | </span>
							{{ category.categoryDisplayName }}
							<span v-if="index !== gridItem.categoryList.length - 1"> | </span>
						</span>
					</div>
					
					<div class="details-toggle" v-on:click="makeTileActive(gridItem)">
						<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24.5 24.5" xml:space="preserve">
							<g>
								<path d="M12.3,10.4l10-10c0.5-0.5,1.4-0.5,1.9,0s0.5,1.4,0,1.9l-10,10l10,10c0.5,0.5,0.5,1.4,0,1.9s-1.4,0.5-1.9,0 l-10-10l-10,10c-0.5,0.5-1.4,0.5-1.9,0s-0.5-1.4,0-1.9l10-10l-10-10c-0.5-0.5-0.5-1.4,0-1.9s1.4-0.5,1.9,0L12.3,10.4z"/>
							</g>
						</svg>
					</div>
					
					<h3 class="title">
						<a v-bind:href="gridItem.calloutLink">
							{{ gridItem.title }}
							<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 9 15">
								<path d="M1.5,15c-0.4,0-0.8-0.1-1.1-0.4c-0.6-0.6-0.6-1.5,0-2.1l4.9-4.9L0.4,2.6C-0.1,2-0.1,1,0.4,0.4C1-0.1,2-0.1,2.6,0.4l6,6 C9.1,7,9.1,8,8.6,8.6l-6,6C2.3,14.8,1.9,15,1.5,15z"/>
							</svg>
						</a>
					</h3>
					
					<div class="active-content">
						
						<div class="category">
							<span v-bind:key="category.categoryID" v-for="(category, index) in gridItem.categoryList">
								<span v-if="gridItem.featured && index === 0">Featured | </span>
								{{ category.categoryDisplayName }}
								<span v-if="index !== gridItem.categoryList.length - 1"> | </span>
							</span>
						</div>

						<div class="details">
							
							<div class="location">
								<i class="la la-map-marker"></i>
								{{ gridItem.location }}
							</div>
							
							<h3 class="title">{{ gridItem.title }}</h3>
							
							<div class="description">{{ gridItem.description }}</div>
							
							<a class="callout" v-bind:href="gridItem.calloutLink">
								{{ gridItem.calloutText }}
								<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 9 15">
									<path d="M1.5,15c-0.4,0-0.8-0.1-1.1-0.4c-0.6-0.6-0.6-1.5,0-2.1l4.9-4.9L0.4,2.6C-0.1,2-0.1,1,0.4,0.4C1-0.1,2-0.1,2.6,0.4l6,6 C9.1,7,9.1,8,8.6,8.6l-6,6C2.3,14.8,1.9,15,1.5,15z"/>
								</svg>
							</a>
						
						</div>
						
					</div>
					
					<div class="wipe"></div>
				</div>
			
			</div>
		</div>
		
		<div class="empty-message" v-if="currentItems.length === 0">
			<h3>{{ emptyResultsMessage }}</h3>
		</div>
	</div>
	
</template>

<script>
	export default {
		name: 'AttractionsGrid',
		props: ['currentItems', 'emptyResultsMessage'],
		methods: {
			
			encodeBackgroundImage: function(value) {
				
				return "background-image: url(" + encodeURI(value).replace(/\(/g, '%28').replace(/\)/g, '%29') + ");"; // RegEx replaces parenthesis with HTML entities
			},
			
			makeTileActive: function(gridItem) {
				gridItem.active = !gridItem.active;
			}
		}
	}
</script>