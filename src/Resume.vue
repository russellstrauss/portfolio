<template>
	<div>
		
		<div class="print-icon-container">
			<img title="Click to print." class="print-icon hide-for-small" src="/img/printer.png" alt="Print Resume" v-on:click="openPrintDialogue">
		</div>
		
		<div class="resume container">
			<section class="skills">
				<h2>Objective</h2>
				<ul>
					<li>To find a full-time position utilizing my experience on the web platform to explore interests such
						as<br />UI, visualization, computer graphics, and WebVR.</li>
				</ul>
			</section>
			<section class="contact left">
				<h2>Contact</h2>
				<div>
					<div class="left">
						<ul class="plus">
							<li>Name</li>
						</ul>
					</div>
					<div class="right">Russell Strauss</div>
					<div class="clearfix"> </div>
				</div>
				<div>
					<div class="left">
						<ul class="plus">
							<li>Phone</li>
						</ul>
					</div>
					<div class="right">678.549.2874</div>
					<div class="clearfix"> </div>
				</div>
				<div>
					<div class="left">
						<ul class="plus">
							<li>Email</li>
						</ul>
					</div>
					<div class="right"><a href="mailto:russellstrauss@gmail.com">russellstrauss@gmail.com</a></div>
					<div class="clearfix"> </div>
				</div>
				<div>
					<div class="left">
						<ul class="plus">
							<li>Citizen status</li>
						</ul>
					</div>
					<div class="right">US citizen</div>
					<div class="clearfix"> </div>
				</div>
				<div>
					<div class="left">
						<ul class="plus">
							<li>Portfolio</li>
						</ul>
					</div>
					<div class="right"><a href="http://portfolio.jrstrauss.net/work/">http://portfolio.jrstrauss.net/work/</a></div>
					<div class="clearfix"> </div>
				</div>
				<div>
					<div class="left">
						<ul class="plus">
							<li>GitHub</li>
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
						<span class="gt-rankings" title="Ranked #4 Most Innovative Schools <br>Ranked #5 Top Public Schools <br>Ranked #8 Computer Science<br><br>Source: <a href='https://www.usnews.com/best-colleges'>US News and World Report</a>">
							Georgia Institute of Technology
						</span>
					</li>
					<li>GPA 3.77</li>
				</ul>
				<ul>
					<li>BS Computational Media 2012</li>
					<li>
						<span class="gt-rankings" title="Ranked #4 Most Innovative Schools <br>Ranked #5 Top Public Schools <br>Ranked #8 Computer Science<br><br>Source: <a href='https://www.usnews.com/best-colleges'>US News and World Report</a>">
							Georgia Institute of Technology
						</span>
					</li>
					<li>GPA 3.5</li>
				</ul>
			</section>
			<div class="clearfix"> </div>
			<section class="skills">
				<h2>Skills</h2>
				<ul class="plus">
					<li>Front end: JavaScript, Vue.js, HTML, SASS, Gulp, Node.js, SVG</li>
					<li>Back end: C#, Python, Node.js, IIS, SQL, Apache, PHP; interested in learning Ruby</li>
					<li>Responsive development for devices of all sizes, maintainability, and cross-browser compatibility</li>
					<li>Methodology: iterative design and development through collaboration</li>
					<li>Adobe Creative Suite, InVision, Sketch</li>
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
						<div class="job-description">Built custom designs from the ground up into functional experiences,
							set<br />up front end architecture, created and maintained automated front end build processes,
							designed<br />modular and re-usable software components, debugged inconsistencies between
							server<br />environments, participated in both local and remote collaboration. Hired and trained
							junior<br />developers, helped successfully design, build, and launch 10+ large-scale web sites
							and<br />maintained many others.</div>
					</div>
					<div class="clearfix"> </div>
				</div>
				<div class="employment">
					<div class="duration left desktop">August 2013 - October 2014</div>
					<div class="summary right">
						<div class="company">Moxie</div>
						<div class="position">User Experience Developer</div>
						<div class="duration mobile">August 2013 - October 2014</div>
						<div class="job-description">Built out sites according to design specifications using<br />various
							technologies, iterated with design team to improve app quality, localized content<br />for global
							clients, created custom JavaScript code for interactive microsite campaigns, and<br />managed server
							deployment scripts.</div>
					</div>
					<div class="clearfix"> </div>
				</div>
				<div class="employment">
					<div class="duration left desktop">May 2012 - August 2013</div>
					<div class="summary right">
						<div class="company">SolDesign Company</div>
						<div class="position">Web Developer</div>
						<div class="duration mobile">May 2012 - August 2013</div>
						<div class="job-description">Helped develop and maintain new and existing sites on WordPress
							and<br />Drupal, managed servers to deploy code and debug issues, migrated sites to new servers,
							worked<br />and communicated with clients to ensure satisfaction.</div>
					</div>
					<div class="clearfix"> </div>
				</div>
				<div class="employment">
					<div class="duration left desktop">May 2011 - August 2012</div>
					<div class="summary right">
						<div class="company">The Children's School</div>
						<div class="position">Robotics Teacher</div>
						<div class="duration mobile">May 2011 - August 2012</div>
						<div class="job-description">Taught sixth grade technology class Robotics using Lego NXT Mindstorms<br />and
							MIT's Scratch program to expose them to basic lessons in the fundamentals of computing<br />and
							procedural programming.</div>
					</div>
					<div class="clearfix"> </div>
				</div>
				<div class="employment">
					<div class="duration left desktop">August 2009 - May 2012</div>
					<div class="summary right">
						<div class="company">Institute for Computing Education</div>
						<div class="position">Summer Camp Instructor, Workshop Leader, Inventory Manager</div>
						<div class="duration mobile">August 2009 - May 2012</div>
						<div class="job-description">The Institute for Computing Education is a research institute funded
							by<br />the National Science Foundation dedicated to raising interest in Computer Science among
							kids<br />elementary through high school, especially among women and minorities. I led eight weeks
							of<br />summer camps each summer, taught workshops throughout the school year, and managed
							their<br />inventory throughout the year.</div>
					</div>
					<div class="clearfix"> </div>
				</div>
			</section>
			<section class="awards">
				<h2>Awards &amp; Achievements</h2>
				<ul class="plus">
					<li>Richard Tapia Celebration of Diversity in Computing Scholarship 2019</li>
					<li>Successfully completed a solo thru-hike of the 2,189 mile Appalachian Trail from Georgia to Maine 2015</li>
					<li>Computational Media's Outstanding Students 2012</li>
				</ul>
			</section>
		</div>
	</div>
</template>

<script>

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
		
		.print-icon {
			cursor: pointer;
		}
	}

	@mixin resumeHeading {
		font-family: 'IBM Plex Mono', monospace;
		color: $link-color;
		font-size: 32px;
		margin-bottom: 20px;
		
		@include mobile-only {
			margin-bottom: 10px;
		}
	}

	.resume {
		margin: 200px auto;
		font-size: 14px;
		line-height: 1.5;
		
		@include mobile-only {
			margin-top: 50px;
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
			font-family: 'Merriweather Sans', sans-serif;
			font-weight: 300;
			
			@include mobile-only {
				margin-bottom: 25px;
			}
			
			&.contact {
					
				.left {
					float: left;
					width: 30%;
				}
				
				.right {
					float: right;
					width: 69%;
					
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
					
					.duration {
						margin-bottom: 10px;
					}
					
					.summary {
						
						.company {
							font-size: 20px;
							
							@include mobile-only {
								font-size: 18px;
							}
							
							@include tablet {
								margin-bottom: 5px;
							}
						}
						
						.position {
							font-style: italic;
							
							@include tablet {
								margin-bottom: 10px;
							}
						}
					}
				}
			}
			
			h2 {
				@include resumeHeading;
			}
			
			ul {
				
				li {
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
		$paragraph-size: 9px;
		
		.print-icon {
			display: none;
		}
		
		body {
			padding: 0;
		}
		
		.resume {
			font-size: $paragraph-size;
			
			section {
				margin-bottom: 10px;
				
				&.contact {
					font-size: $paragraph-size;

					.left {
						padding-left: 60px;

						ul {
							padding-left: 0;
						}
					}
				}

				&.skills {

					ul {
						padding-left: 60px;
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
					}
				}
				
				h2 {
					font-size: $section-title-size;
					margin-bottom: 20px;
				}
				
				ul {
					
					li {
						font-size: $paragraph-size;
						margin-bottom: 0;
					}
				}
				
			}
		}
		
		.edit-link {
			display: none;
		}
	}
</style>