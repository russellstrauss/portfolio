<?php
/**
 * Template Name: Resume
 * Description: Resume template.
 *
 * @package WordPress
 * @subpackage Portfolio
 */


get_header(); ?>
	
	<div id="primary" class="full-width">
		<div id="content">
				
			<div class="resume-content">
				
				<?php the_content(); ?>
				
				<!-- <div class="section">
					<div class="row"> <div class="small-12 columns"> <h1>Contact</h1> </div> </div>
					
					<div class="row"> 
						<div class="large-6 small-12 columns item"><span class="plus">+ </span>Phone </div> <div class="large-6 small-12 columns"> 678.927.3289 </div>
					</div>
					<div class="row"> 
						<div class="large-6 small-12 columns item"><span class="plus">+ </span>Email </div> <div class="large-6 small-12 columns"> <a href="mailto:spe@k-to.me">spe@k-to.me</a> </div>
					</div>
					<div class="row"> 
						<div class="large-6 small-12 columns item"><span class="plus">+ </span>Portfolio </div> <div class="large-6 small-12 columns"> <a href="http://portfolio.jrstrauss.net/work/">http://portfolio.jrstrauss.net/work/</a> </div>
					</div>

				</div>
				

				<div class="section">
					<div class="row"> <div class="small-12 columns"> <h1>Education</h1> </div> </div>
					
					<div class="row"> 
						<div class="large-6 small-12 columns subhead"><span class="plus">+ </span>Undergraduate </div>
					
						<div class="large-6 small-12 columns listed-item">
							Georgia Institute of Technology <br/>
							BS Computational Media '12 <br/>
							Cum Laude <br/>
							GPA 3.5 <br/>
						</div>
					</div>
				</div>
				
				<div class="section">
					<div class="row"> <div class="small-12 columns"> <h1>Skills</h1> </div> </div>
					
					<div class="row bulleted"> 
						<div class="large-6 small-12 columns subhead"><span class="plus">+ </span>Coding Experience </div>
					
						<div class="large-6 small-12 columns listed-item">
							<ul>
								<li>PHP, jQuery, Javascript, SQL, Unix, WordPress, Drupal, Python, Java, C, Basic, SmallTalk, XML</li>
								<li>Can quickly adapt to new languages and syntax without much difficulty</li>
								<li>Knowledge of styling standards, clear and concise commenting habits</li>
								<li>Valid markup habits</li>
							</ul>
						</div>
					</div>
					
					<div class="row bulleted"> 
						<div class="large-6 small-12 columns subhead"><span class="plus">+ </span>Design </div>
					
						<div class="large-6 small-12 columns listed-item">
							<ul>
								<li>HMTL5, CSS3, responsive development, media queries, cross-browser compatibility</li>
								<li>Twitter Bootstrap, Zurb Foundation, LESS</li>
								<li>Adobe Photoshop, Illustrator, Premiere, Flash</li>
								<li>Final Cut Pro</li>
								<li>Autodesk Maya</li>
							</ul>
						</div>
					</div>
					
					<div class="row decreased-line-height">
						<ul class="plus">
							<li>Can communicate clearly and effectively, work under strict deadlines, balance multiple projects at once</li>
							<li>Can easily work well independently or with others, highly self-motivated</li>
							<li>Extremely high attention to detail</li>
						</ul>
					</div>
					
				</div>

				<div class="section">
					<div class="row"> <div class="small-12 columns"> <h1>Awards</h1> </div> </div>
					<div class="row decreased-line-height">
						<ul class="plus">
							<li>One of Computational Media's "Most Outstanding Students" in the degree</li>
							<li>Dean's List each semester Fall 2008 to Spring 2012</li>
							<li>Best school-wide Foreign Language Student in high school</li>
						</ul>
					</div>
				</div>
				
				<div class="section" id="work-experience">
					<div class="row"> <div class="small-12 columns"> <h1>Work Experience</h1> </div> </div>
					
					<div class="employment-entry">
						<div class="large-3 columns employment-duration hide-for-small">May 2012 - present</div>
						<div class="large-9 columns employment-description">
							<div class="company-name">SolDesign Company</div>
							<div class="job-title">Front & Back-end Web Developer</div>
							<div class="small-12 columns employment-duration show-for-small">May 2012 - present</div>
							<div title="job-description">
								SolDesign is a small 12-person Web Agency that specializes in both Web Design and Web Development. We design, build, host, and maintain sites for our clients, doing all work in-house. My roles as a developer at SolDesign vary: front-end & back-end development, server management, site architecture, client management, migration, content management, and debugging & updating outdated products.
							</div>
						</div>
						<div class="clearfix">&nbsp;</div>
					</div>
					
					<div class="employment-entry">
						<div class="large-3 columns employment-duration hide-for-small">December 2011 - May 2012</div>
						<div class="large-9 columns employment-description">
							<div class="company-name">Crawford Media Services</div>
							<div class="job-title">Front & Back-end Web Developer</div>
							<div class="small-12 columns employment-duration show-for-small">December 2011 - May 2012</div>
							<div title="job-description">
								I was hired as a contractor for six months with Crawford to build a new web site for Crawford that would improve upon their current design and showcase their skill in the video production industry. I worked on the front-end and back-end of the site, communicating with the design team and interpreting the functional requirements for Crawford while critiquing the quality of the design and user experience of the site's interface.
							</div>
						</div>
						<div class="clearfix">&nbsp;</div>
					</div>
					
					<div class="employment-entry">
						<div class="large-3 columns employment-duration hide-for-small">May 2011 - August 2012</div>
						<div class="large-9 columns employment-description">
							<div class="company-name">The Children's School</div>
							<div class="job-title">Robotics Teacher</div>
							<div class="small-12 columns employment-duration show-for-small">May 2011 - August 2012</div>
							<div title="job-description">
								The Children's School is a private school in Atlanta next to Piedmont Park. I taught the sixth grade technology class Computer Science and Robotics weekly using Lego NXT Mindstorms and basic lessons in the fundamentals of computing and procedural programming.
							</div>
						</div>
						<div class="clearfix">&nbsp;</div>
					</div>
					
					<div class="employment-entry">
						<div class="large-3 columns employment-duration hide-for-small">August 2009 - May 2012</div>
						<div class="large-9 columns employment-description">
							<div class="company-name">Institute for Computing Education</div>
							<div class="job-title">Summer Camp Director, Workshop Leader, Inventory Manager</div>
							<div class="small-12 columns employment-duration show-for-small">August 2009 - May 2012</div>
							<div title="job-description">
								The Institute for Computing Education is a research institute funded by the National Science Foundation dedicated to raising interest in Computer Science among kids elementary through high school, especially among women and minorities. I led eight weeks of summer camps each summer, taught workshops throughout the school year, and managed their inventory throughout the year.
							</div>
						</div>
						<div class="clearfix">&nbsp;</div>
					</div>
					
					<div class="employment-entry">
						<div class="large-3 columns employment-duration hide-for-small">January 2009 - August 2010</div>
						<div class="large-9 columns employment-description">
							<div class="company-name">Office of Success Programs</div>
							<div class="job-title">Undergraduate Tutor</div>
							<div class="small-12 columns employment-duration show-for-small">January 2009 - August 2010</div>
							<div title="job-description">
								Tutoring other undergrads in Computer Science and Spanish.
							</div>
						</div>
						<div class="clearfix">&nbsp;</div>
					</div>
					
				</div>
				
				<div class="section" id="references">
					<div class="row"> <div class="small-12 columns"> <h1>References</h1> </div> </div>
					
					<div class="reference-entry">
						<div class="large-3 columns reference-name">Snapper Morgan</div>
						<div class="large-9 columns reference-details">
							<div class="role">SolDesign Company, <em>Lead Developer</em></div>
							<div class="e-mail"><a href="mailto:snappermorgan@gmail.com">snappermorgan@gmail.com</a></div>
							<div class="phone">404.409.7856</div>
						</div>
						<div class="clearfix">&nbsp;</div>
					</div>
					
					<div class="reference-entry">
						<div class="large-3 columns reference-name">Tamara Weinstein</div>
						<div class="large-9 columns reference-details">
							<div class="role">The Children’s School, <em>Technology Specialist</em></div>
							<div class="e-mail"><a href="mailto:tamaraw@thechildrensschool.com">tamaraw@thechildrensschool.com</a></div>
							<div class="phone">404.835.4602</div>
						</div>
						<div class="clearfix">&nbsp;</div>
					</div>
					
					<div class="reference-entry">
						<div class="large-3 columns reference-name">Tyler Dotson</div>
						<div class="large-9 columns reference-details">
							<div class="role">MemberClicks, <em>Software Engineer</em></div>
							<div class="e-mail"><a href="mailto:richardtylerdotson@gmail.com">richardtylerdotson@gmail.com</a></div>
							<div class="phone">770.355.0579</div>
						</div>
						<div class="clearfix">&nbsp;</div>
					</div>
					
				</div> -->


				
			</div>


		</div><!-- #content -->
	</div><!-- #primary -->

<?php get_footer(); ?>