<template>
	<div>
		
		<div class="print-icon-container">
			<img title="Click to print." class="print-icon hide-for-small" src="/img/printer.png" alt="Print Resume" v-on:click="openPrintDialogue">
		</div>
		
		<div class="resume container">
			<section class="skills">
				<h2>Objective</h2>
				<p>
					To find a full-time position utilizing my experience on the web platform to explore interests such as UI/UX, visualization, computer graphics, and virtual reality.
				</p>
			</section>
			<section class="contact left">
				<h2>Contact</h2>
				<div>
					<div class="left">
						<ul class="plus"> <li>Name</li>
						</ul>
					</div>
					<div class="right">Russell Strauss</div>
					<div class="clearfix"> </div>
				</div>
				<div>
					<div class="left">
						<ul class="plus"> <li>Phone</li>
						</ul>
					</div>
					<div class="right">678.549.2874</div>
					<div class="clearfix"> </div>
				</div>
				<div>
					<div class="left">
						<ul class="plus"> <li>Email</li>
						</ul>
					</div>
					<div class="right"><a href="mailto:russellstrauss@gmail.com">russellstrauss@gmail.com</a></div>
					<div class="clearfix"> </div>
				</div>
				<div>
					<div class="left">
						<ul class="plus"> <li>Citizen status</li>
						</ul>
					</div>
					<div class="right">US citizen</div>
					<div class="clearfix"> </div>
				</div>
				<div>
					<div class="left">
						<ul class="plus"> <li>Portfolio</li>
						</ul>
					</div>
					<div class="right"><a href="/">https://portfolio.jrstrauss.net/</a></div>
					<div class="clearfix"> </div>
				</div>
				<div>
					<div class="left">
						<ul class="plus"> <li>GitHub</li>
						</ul>
					</div>
					<div class="right"><a href="https://github.com/russellstrauss">https://github.com/russellstrauss</a></div>
					<div class="clearfix"> </div>
				</div>
			</section>
			<section class="education right">
				<h2>Education</h2>
				<ul>
					<li>MS Computer Science 2020</li>
					<li>Specialized in Computer Graphics</li>
					<li>
						<span class="gt-rankings" title="Ranked #4 Most Innovative Schools <br>Ranked #5 Top U.S. Public Schools <br>Ranked #5 Computer Science<br><br>Source: <a href='https://www.usnews.com/best-colleges'>US News and World Report 2021</a>"> Georgia Institute of Technology
						</span>
					</li>
					<li>GPA 3.77</li>
				</ul>
				<ul>
					<li>BS Computational Media 2012</li>
					<li>
						<span class="gt-rankings" title="Ranked #4 Most Innovative Schools <br>Ranked #5 Top U.S. Public Schools <br>Ranked #5 Computer Science<br><br>Source: <a href='https://www.usnews.com/best-colleges'>US News and World Report 2021</a>"> Georgia Institute of Technology
						</span>
					</li>
					<li>GPA 3.5</li>
				</ul>
			</section>
			<div class="clearfix"> </div>
			<section class="skills">
				<h2>Skills</h2>
				<ul class="plus">
					<li>Front end: JavaScript, Vue.js, Three.js, Node.js, SASS, Gulp, SVG</li>
					<li>Visualization, 3D, WebGL, and interactive</li>
					<li>Responsive development for devices of all sizes, maintainability, and cross-browser compatibility</li>
					<li>Back end: C#, Python, IIS, SQL, Apache, PHP; interested in learning Ruby</li>
					<li>Preferred workflow: iterative design and development through team collaboration</li>
				</ul>
			</section>
			<section class="experience">
				<h2>Experience</h2>
				<div class="employment">
					<div class="duration left desktop">October 2014 - August 2019</div>
					<div class="summary right">
						<div class="company">Rightpoint</div>
						<div class="position">Senior Front End Engineer</div>
						<div class="duration mobile">October 2014 - August 2019</div>
						<div class="job-description">Built custom designs from the ground up into functional experiences, set up front end architecture, created and maintained automated front end build processes, designed modular and re-usable software components, debugged inconsistencies between server environments, participated in local and remote collaboration. Hired and trained junior developers, helped successfully design, build, and launch 10+ large-scale web sites and maintained many others.</div>
					</div>
					<div class="clearfix"> </div>
				</div>
				<div class="employment">
					<div class="duration left desktop">August 2013 - October 2014</div>
					<div class="summary right">
						<div class="company">Moxie Interactive</div>
						<div class="position">User Experience Developer</div>
						<div class="duration mobile">August 2013 - October 2014</div>
						<div class="job-description">Built out sites according to design specifications using various technologies, iterated with design team to improve app quality, localized content for global clients, created custom JavaScript code for interactive microsite campaigns, and managed server deployment scripts.</div>
					</div>
					<div class="clearfix"> </div>
				</div>
				<div class="employment">
					<div class="duration left desktop">May 2012 - August 2013</div>
					<div class="summary right">
						<div class="company">SolDesign Company</div>
						<div class="position">Web Developer</div>
						<div class="duration mobile">May 2012 - August 2013</div>
						<div class="job-description">Helped develop and maintain new and existing sites on WordPress and Drupal, managed servers to deploy code and debug issues, migrated sites to new servers, worked and communicated with clients to ensure satisfaction.</div>
					</div>
					<div class="clearfix"> </div>
				</div>
				<div class="employment">
					<div class="duration left desktop">May 2011 - August 2012</div>
					<div class="summary right">
						<div class="company">The Children's School</div>
						<div class="position">Robotics Teacher</div>
						<div class="duration mobile">May 2011 - August 2012</div>
						<div class="job-description">Taught sixth grade technology class Robotics using Lego NXT Mindstorms and MIT's Scratch program to expose them to basic lessons in the fundamentals of computing and procedural programming.</div>
					</div>
					<div class="clearfix"> </div>
				</div>
				<div class="employment">
					<div class="duration left desktop">August 2009 - May 2012</div>
					<div class="summary right">
						<div class="company">Institute for Computing Education</div>
						<div class="position">Summer Camp Instructor, Workshop Leader, Inventory Manager</div>
						<div class="duration mobile">August 2009 - May 2012</div>
						<div class="job-description">The Institute for Computing Education is a research institute funded by the National Science Foundation dedicated to raising interest in Computer Science among kids elementary through high school, especially among women and minorities. I led eight weeks of summer camps each summer, taught workshops throughout the school year, and managed their inventory throughout the year.</div>
					</div>
					<div class="clearfix"> </div>
				</div>
			</section>
			<section class="awards">
				<h2>Awards &amp; Achievements</h2>
				<ul class="plus">
					<li><a class="dotted" target="_blank" href="/documents/NACA_Strauss.pdf">NACA Foundation GT-Shenzhen Scholarship 2020</a></li>
					<li>Richard Tapia Celebration of Diversity in Computing Scholarship 2019</li>
					<li>Successfully completed a solo thru-hike of the 2,189 mile Appalachian Trail from Georgia to Maine 2015</li>
					<li>Computational Media's Outstanding Students 2012</li>
				</ul>
			</section>
		</div>
	</div>
</template>

<script>

	import $ from 'jquery';
	var jQuery = $;
	import Tipped from '@staaky/tipped';
	
	export default {
		name: 'Resume',

		components: {},

		data() {
			return {};
		},

		methods: {
			
			openPrintDialogue: function() {
				window.print();
			}
		},

		mounted: function () {
			Tipped.create('.gt-rankings');
		},
	};
</script>

<style lang="scss">
	
	.print-icon-container {
		text-align: right;
		padding-right: 15px;
		
		@include mobile-only {
			display: none;
		}
		
		.print-icon {
			display: inline-block;
			cursor: pointer;
		}
	}

	@mixin resume-heading {
		@include ibm;
		color: $link-color;
		font-size: 32px;
		margin-bottom: 20px;
		font-weight: 400;
		
		@include mobile-only {
			margin-bottom: 10px;
		}
	}
	
	@mixin resume-body {
		font-size: 14px;
	}

	.resume {
		margin: 100px auto;
		line-height: 1.5;
		
		@include mobile-only {
			margin-top: 50px;
		}
		
		* { 
			max-width: 100%;
		}
			
		>.left, >.right {
			float: left;
			width: 49%;
			
			@include mobile-only {
				display: block;
				float: none;
				width: 100%;
			}
			
			&.right {
				float: right;
			}
		}
		
		section {
			margin-bottom: 50px;
			
			@include mobile-only {
				margin-bottom: 40px;
			}
			
			&.contact {
					
				.left {
					float: left;
					width: 30%;
				}
				
				.right {
					float: right;
					width: 69%;
					
					@include mobile-only {
						text-align: right;
					}
					
					a {
						text-decoration: underline;
					}
				}
			}
			
			&.education {

				@include tablet {
					margin-bottom: 0;
				}
				
				.gt-rankings {
					border-bottom: 1px dotted rgba(0, 0, 0, .5);
					padding-bottom: 1px;
					cursor: pointer;
				}
				
				ul {
					margin-left: 3px;
					margin-bottom: 25px;

					li {
						margin-bottom: 3px;
					}
				}
			}

			&.experience {
				
				.left {
					float: left;
					width: 30%;
				}
				.right {
					float: right;
					width: 65%;
					
					@include mobile-only {
						width: 100%;
					}
				}
				
				.employment {
					margin-bottom: 30px;
					
					@include mobile-only {
						margin-bottom: 100px;
					}
					
					.duration {
						margin-bottom: 10px;
						
						&.mobile {
							
							@include mobile-only {
								border-bottom: 1px solid black;
								display: block;
							}
							
							@include tablet {
								display: none;
							}
						}
					}
					
					.summary {
						
						.company {
							font-size: 20px;
							
							@include mobile-only {
								font-size: 22px;
							}
							
							@include tablet {
								margin-bottom: 5px;
							}
						}
						
						.position {
							font-style: italic;
							font-size: 20px;
							margin-bottom: 10px;
						}
					}
				}
			}
			
			h2 {
				@include resume-heading;
			}
			
			ul {
				
				li {
					@include resume-body;
					margin-bottom: 10px;
				}
			}
			
			.plus {
				padding-left: 20px;

				li {
					
					&:before {
						content: '+ ';
						margin-left: -1em;
					}
				}
			}
		}
		
		.desktop {
			
			@include mobile-only {
				display: none;
			}
		}
		
		.mobile {
			
			@include tablet {
				display: none;
			}
		}
	}

	@media print {

		$section-title-size: 14px;
		$print-paragraph-size: 9px;
		
		.print-icon {
			display: none;
		}
		
		body {
			padding: 0;
		}
		
		.resume {
			font-size: $print-paragraph-size;
			
			section {
				margin-bottom: 10px;
				
				&.contact {
					font-size: $print-paragraph-size;

					.left {
						padding-left: 60px;

						ul { padding-left: 0;
						}
					}
				}

				&.skills {

					ul {
						padding-left: 60px;
						
						li {
							@include resume-body;
						}
					}
				}
				
				&.experience {
					
					.employment {
						margin-bottom: 10px;
						padding-left: 50px;

						.duration {
							margin-bottom: 5px;
						}
						
						.company {
							font-size: 10px !important;
						}
					}
				}
				
				&.education {
					margin-bottom: 0;
					
					.gt-rankings {
						border-bottom: none;
					}
					
					ul {
						vertical-align: top;
						display: inline-block;
						width: 45%;

						&:first-of-type {
							padding-left: 50px;
						}

						&:last-of-type {
							margin-bottom: 0;
						}
						
						li {
							@include resume-body;
						}
					}
				}
				
				h2 {
					font-size: $section-title-size;
					margin-bottom: 20px;
				}
				
				ul {
					
					li {
						font-size: $print-paragraph-size;
						margin-bottom: 0;
					}
				}
				
			}
		}
	}
</style>