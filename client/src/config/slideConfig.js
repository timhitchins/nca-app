//slide constants
export const MAX_SECTION_NO = 12;
export const MIN_SECTION_NO = 0;
export const VIDEO_1_SECTION = 6;
export const VIDEO_2_SECTION = 10;

//configuration for the slides
export const imageConfig = [
  {
    imageURI:
      "https://nca-toolkit.s3-us-west-2.amazonaws.com/OregonLive_hazepdxjpg-e8d26d8245f61043.jpg",
    altText: "An image of a person running in smoky air",
    heading: "Oregon has toxic air pollution",
    body: `<span><strong><h2>We all have the right to breathe clean air.</h2></strong> 
      However, in the Portland metro area, the presence of fine and ultra-fine 
      particulate matter from older dirty diesel engines makes our air unhealthy. 
      <strong>Clackamas, Multnomah, and Washington counties rank in the top 5 
      percent of all counties nationwide for ambient diesel particulate concentrations</strong> and have the highest exposure rate of all counties in Oregon.</span>`,
  },
  {
    imageURI:
      "https://nca-toolkit.s3-us-west-2.amazonaws.com/parking+construction+no+copyright.jpg",
    altText: "An image of an active construction site",
    heading: "Diesel engines are a primary source of pollution",
    innerImageURI: `https://nca-toolkit.s3-us-west-2.amazonaws.com/Three_clouds.png`,
    body: `<p>While there are many sources for air pollution in Oregon – industry, automobiles, 
      burning wood at homes, wildfires – one of the most significant and underregulated 
      sources is diesel.</p> 
      <p>Areas with higher diesel vehicle traffic, like near freight corridors, rail yards, or 
      construction sites, have levels of diesel pollution over 10 times Oregon health standards 
      for healthy air.</p>`,
  },
  {
    imageURI:
      "https://nca-toolkit.s3-us-west-2.amazonaws.com/parking+construction+no+copyright.jpg",
    altText: "An image of an active construction site",
    heading: "Where does diesel pollution come from?",
    innerImageURI:
      "https://nca-toolkit.s3-us-west-2.amazonaws.com/Emissions_graph.png",
    innerAltText: "An illustration of Portland Metro emission sources",
    body: `Diesel pollution comes from many sources -- trucks, rail and rail yards, shipping and more.
    <br><br><strong>The largest source, however, is off-road equipment, which is responsible for 65 percent of diesel particulate
    matter in the Portland area.</strong>`,
  },
  {
    imageURI:
      "https://nca-toolkit.s3-us-west-2.amazonaws.com/parking+construction+no+copyright.jpg",
    altText: "An image of an active construction site",
    heading: "What is off-road equipment?",
    body: `<p>Off-road equipment is what we call the heavy construction vehicles such as excavators, 
    wheel loaders, articulated and rigid dump trucks moving in and out of all of our neighborhoods. 
    The term also applies to logging and agricultural equipment.</p>
    <p><strong>In Oregon, these vehicles are not required to meet diesel exhaust standards.</strong</p>`,
    innerImageURI:
      "https://nca-toolkit.s3-us-west-2.amazonaws.com/One_third_carbon_new.png",
    innerAltText: "A pie chart of construction stats",
  },
  {
    imageURI:
      "https://nca-toolkit.s3-us-west-2.amazonaws.com/parking+construction+no+copyright.jpg",
    altText: "An image of an active construction site",
    heading: "Old diesel engines are dangerous",
    body: `<p>One component of the dangerous particles produced by diesel is black carbon, 
    which not only harms human health but is a significant contributor to climate change.</p>
    <p>Older diesel engines can emit 85% more black carbon than newer engines. While legislation is in 
    place to begin to replace older diesel trucks, no requirements exist to replace older rail and 
    construction equipment.</p>`,
    innerImageURI:
      "https://nca-toolkit.s3-us-west-2.amazonaws.com/Eighty_five_percent_new.png",
    innerAltText: "An infographic of construction stats",
  },
  {
    imageURI:
      "https://nca-toolkit.s3-us-west-2.amazonaws.com/parking+construction+no+copyright.jpg",
    altText: "An image of an active construction site",
    heading: "Diesel engines endanger our health",
    innerImageURI:
      "https://nca-toolkit.s3-us-west-2.amazonaws.com/Lungs_Deisel_with_text.png",
    innerAltText:
      "A illustration of the impact of diesel particulate on the lungs",
    body: `<p>Diesel engines emit fine particulate matter, tiny particles that work deeply into our 
    lungs and enter our blood stream. This matter, sometimes called <strong>PM2.5 or PM10</strong>, can damage our lungs 
    and create a number of health issues.</p>
    <p>These health issues include cancer, increase the risk of heart attack, stroke and cardiovascular disease, and can 
    cause adverse nervous system impacts. Diesel can exacerbate asthma, and can lead to low-weight and preterm births. 
    Individuals living in areas with bad air pollution also have a significantly higher risk of mortality from COVID-19.</p>`,
  },
  {
    imageURI:
      "https://nca-toolkit.s3-us-west-2.amazonaws.com/parking+construction+no+copyright.jpg",
    altText: "An image of an active construction site",
    heading: "Breath Oregon Collaborative",
    body: "<div></div>",
    videoURI:
      "https://nca-toolkit.s3-us-west-2.amazonaws.com/OurAir_11.6.19.mp4",
    videoName: "our-air",
  },
  {
    imageURI:
      "https://nca-toolkit.s3-us-west-2.amazonaws.com/Wikimedia_Children_dancing.jpg",
    altText: "An image of children playing",
    heading: "Historically underserved people are at high risk",
    body: `<p>A recent PSU study found that nearly 40% of people of color live close to a major polluter, 
    with 42% of culturally-specific, redlined neighborhoods being less than a mile away from one.</p>
    <p><strong>With regard to diesel, a 2014 Multnomah County Department of Health study found that that communities 
    of color are exposed to levels of diesel pollution 2‐3 times higher than their white counterparts,</strong> with Black/African 
    Americans facing the largest disparate exposure compared to whites. Rates of asthma in historically non-white neighborhoods 
    are significantly higher than elsewhere.</p>
    <p>Finally, this exposure and its effects on lungs creates an increased risk of COVID-19, increasing already-alarming health disparities.</p>`,
    innerImageURI:
      "https://nca-toolkit.s3-us-west-2.amazonaws.com/Race_ethnicity_effect.png",
    innerAltText: "An illustration of people inhaling air pollution",
  },
  {
    imageURI:
      "https://nca-toolkit.s3-us-west-2.amazonaws.com/Wikimedia_Children_dancing.jpg",
    altText: "An image of children playing",
    heading: "Women, children and the elderly are especially vulnerable",
    body: `<p>Studies have shown that women exposed to high levels of air pollution in their third
     trimester were twice as likely to deliver children with autism.</p>
     <p><strong>Children are effected by air pollution more than adults</strong> because their lungs are still in the 
     developmental phase and they breathe, on average, 50 percent more air per pound of body weight than 
     adults do. Also, increasing evidence shows that air pollution affects a child’s brain development, 
     lowering test scores and increasing of ADHD, ADD as well as impulse control.</p>
     <p>Research into the effects of air pollution among the elderly suggests  that it can raise the risk of strokes, 
     Parkinson’s disease, and Alzheimer’s disease.</p>`,
    innerImageURI:
      "https://nca-toolkit.s3-us-west-2.amazonaws.com/Age_effects_new.png",
    innerAltText:
      "An illustration of people of all ages and abilities inhaling air pollution",
  },
  {
    imageURI:
      "https://nca-toolkit.s3-us-west-2.amazonaws.com/Wikipedia_Svalbard1-e1444847759534.jpg",
    altText: "An image of thawing ice",
    heading: "Diesel engines endanger our planet",
    body: `<p><strong>Black carbon is a leading contributor to global warming and climate change.</strong>
    Black carbon warms the climate 460-1,500 times more than CO2.</p>
      <ul>
      <li>Black carbon is the second highest global warming agent in the world, tied with methane.</li>
      <li>Black carbon only lives in the atmosphere for 2-6 weeks, so if we stop emitting we could 
      see cooling effects relatively quickly unlike CO2 which takes about 100 years</li>
      <li>Black carbon can land on snow and increase the melting and warming of the arctic.</li>
      </ul>`,
  },
  {
    imageURI:
      "https://nca-toolkit.s3-us-west-2.amazonaws.com/Wikipedia_Svalbard1-e1444847759534.jpg",
    altText: "An image of thawing ice",
    body: "<div></div>",
    videoURI:
      "https://nca-toolkit.s3-us-west-2.amazonaws.com/we-are-with-earth-v6.mp4",
    videoName: "we-are-with-earth",
  },
  {
    imageURI:
      "https://nca-toolkit.s3-us-west-2.amazonaws.com/white-background.png",
    altText: "white-background",
    heading: "we need a statewide clean standard",
    summary: `About these images`,
    details: `<p>In 2018 the <a href="https://www.portlandoregon.gov/brfs/79317">Clean Air Construction Collaborative<a/> did a study to better understand 
     clean diesel construction procurement standards and determine best practices. This research 
     informed development of the Clean Air Construction Standard. In addition, the City of Portland 
     and Multnomah County co-funded an air quality feasibility study to perform an in-depth assessment 
     of various strategies actionable by local government to address Portland metro’s air quality issues. 
     A top recommended action in the study was to implement diesel engine specifications for public 
     construction projects.</p>
     <p>The images below show the difference in air quality between regulated and unregulated diesel emissions.</p>`,
    compareImageURIs: [
      "https://nca-toolkit.s3-us-west-2.amazonaws.com/Layout_DPMoff_B_1_1200dpi_legend_800px.png",
      "https://nca-toolkit.s3-us-west-2.amazonaws.com/Layout_DPMoff_Ben_1200dpi_legend_800px.png",
    ],
    compareImageAltText: [
      "An image with low diesel particulate matter over Portland, OR",
      "An image with high diesel particulate matter over Portland, OR",
    ],
  },
  {
    imageURI: "https://nca-toolkit.s3-us-west-2.amazonaws.com/construction.jpg",
    altText: "An image of downtown Portland construction",
    heading: "we need a statewide clean standard",
    body:
      `<p>The first step toward changing the landscape of diesel pollution is awareness. 
      NCA is committed to making a lasting difference by ensuring that all residents 
      of the Portland Metro region have the information necessary to bring about changes 
      in their neighborhoods and community.<br><br>
      You can take action. First, you can review NCA’s <strong>
      <a className="slide-config-link" href="/mapping-tool" rel="noopener noreferrer">interactive mapping tool</a></strong> that shows you what 
      construction is happening in your neighborhood and affecting your air.<br><br>
      Then, you <strong>can <a className="slide-config-link" href="/join-us" rel="noopener noreferrer">Join Us</a> to help improve the air you breath.</strong> 
      We will connect you to actions you can take to help us all have a breath of fresh air.</p>`,
    takeAction: true,
    footer: true,
  },
];
