<template>
	<div class="work container-fluid">
		
		<Title></Title>
		
		<div class="layout-wrapper">
			<Nav></Nav>
			
			<transition-group class="category-list" name="stagger-list" tag="ul"  v-on:enter="menuItemEnter" v-on:leave="menuItemLeave">
				<li class="category" v-for="(category, index) in categories" :key="category.path" :data-index="index">
					<a :href="$route.path + '/' + category.path" @click.prevent="navigateToCategory(category.path)">{{ category.title }}</a>
				</li>
			</transition-group>
			
		</div>
	</div>
</template>

<script>
	import axios from 'axios';
	import anime from 'animejs';
	import Title from './components/Title.vue';
	import Nav from './components/Nav.vue';
	
	export default {
		name: 'Work',

		components: {
			Nav,
			Title
		},

		data() {
			return {
				categories: []
			};
		},

		methods: {
			
			navigateToCategory: function(categoryPath) {
				if (this.$router) {
					this.$router.push('/work/' + categoryPath);
				}
			},
			
			menuItemEnter: function (element) {
				
				var delay = element.dataset.index * 75;
				setTimeout(function () {
					element.classList.add('active');
				}, delay);
			},
			menuItemLeave: function (element) {
				
				var delay = element.dataset.index * 75;
				setTimeout(function () {
					element.classList.remove('active');
				}, delay);
			}
		},

		mounted: function () {
			
			let self = this;
			let categories = import.meta.env.BASE_URL + 'data/categories.json';
			axios.get(categories).then(function(response) {
				
				let categories = response.data.categories;
				if (categories) categories.sort(function(a, b) {
					return a.sortOrder - b.sortOrder;
				});
				self.categories = response.data.categories.filter(category => category.published === "true");
			})
			.catch(function (error) {
				console.log(error);
			});
		},
	};
</script>

<style lang="scss">
	
	.category-list {
		
		.category {
			@include heading-font;
			margin-bottom: 20px;
			opacity: 0;
			margin-left: 20px;
			transition: opacity 600ms ease, margin-left 400ms ease;
			
			&.active {
				opacity: 1;
				margin-left: 0;
			}
			
			a {
				text-decoration: none;
			}
		}
	}
</style>