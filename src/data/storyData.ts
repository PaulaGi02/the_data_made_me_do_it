export type StoryCategory = 'Global Scale' | 'Environmental Impact' | 'Health Impact';

export interface StorySection {
  id: string;
  title: string;
  subtitle?: string;
  category: StoryCategory;
  singleBubble?: string;
  paragraphs?: {
    explanation: string;
    context: string;
  };
  visualId: number;
  tableauSheet: string;
}

const BASE = 'https://public.tableau.com/views/FinalProject-StoryWhyITurnedVegan/';
const PARAMS = '?:language=en-US&:display_count=n&:origin=viz_share_link&:embed=true&:showVizHome=no&:toolbar=no';

export const storyData: StorySection[] = [
  {
    id: "meat-production",
    title: "The Rising Line",
    subtitle: "Global Meat Production 1961-2023",
    category: "Global Scale",
    paragraphs: {
      explanation: "Global meat production has grown from 70 million tonnes in 1961 to nearly 370 million tonnes in 2023. <strong> That is more than a fivefold increase in six decades </strong>.",
      context: "To put 370 million tonnes in perspective: Ultra large Container ships would approximately need <strong>1500 to 1600 voyages</strong> to carry the load. That is the number, produced and slaughtered every single year. The system that generates this has grown so large and so fast that most of us never paused to ask what it actually costs.",
       },
    visualId: 0,
    tableauSheet: BASE + 'GlobalMeatProduction' + PARAMS,
  },
  {
    id: "animals-slaughtered",
    title: "80 Billion Lives",
    subtitle: "Animals Slaughtered per Year",
    category: "Global Scale",
    paragraphs: {
      explanation: "In 2023, over 80 billion land animals were slaughtered for food. Chickens dominate the chart almost entirely. Around <strong>75 billion per year </strong> with pigs, cattle, sheep and others accounting for the rest. The numbers have risen steadily alongside production, but the chicken line has accelerated far faster than any other species as they are easy to produce and cheap to buy.",
      context: "75 billion is a number that resists intuition. If you <strong>counted one animal per second</strong> without stopping, it would take over <strong>2,400 years</strong> to reach 80 billion. The sheer scale of this system is one of the least discussed facts in mainstream conversations about food.",
       },
    visualId: 1,
    tableauSheet: BASE + 'Animalsslaughtered' + PARAMS,
  },
  {
    id: "meat-supply",
    title: "Uneven Plates",
    subtitle: "Meat Supply per Person, 2022",
    category: "Global Scale",
    paragraphs: {
      explanation: "This map shows average meat supply per person per year across countries in 2022. The spread is enormous: Australia and the United States exceed 120 kg, while many countries in sub Africa and South Asia consume less than 10 kg. <strong>We are not producing more meat because everyone needs it</strong>. We are producing more because some countries consume excessively",
      context: "The environmental pressure of meat production falls on the whole planet, while the <strong>consumption is concentrated in the wealthiest countries</strong>. Overconsumption in one place has consequences everywhere as we will further discover.",
         },
    visualId: 2,
    tableauSheet: BASE + 'MeatSupply' + PARAMS,
  },
  {
    id: "ghg-product",
    title: "The Carbon Cost",
    subtitle: "GHG (kg) Emissions per kg of Food Produced",
    category: "Environmental Impact",
    paragraphs: {
      explanation: "This chart ranks food products by their greenhouse gas emissions per kilogram produced, covering the full supply chain: land use, feed production, animal digestion, processing, and transport. <strong>Beef tops the list at around 99 kg CO2-equivalent per kg</strong>. At the other end, peas emit less than 1 kg. The gap between the top and bottom of this chart spans two orders of magnitude.",
      context: "To make the beef figure concrete: driving an average car produces roughly 170g of CO2 per kilometer. <strong>One kilogram of beef is equivalent to driving about 59 kilometers</strong>. That is before counting any other meat.",
         },
    visualId: 3,
    tableauSheet: BASE + 'GHGperkgbyproduct' + PARAMS,
  },
  {
    id: "ghg-average",
    title: "The Category Gap",
    subtitle: "GHG Emissions by Food Category",
    category: "Environmental Impact",
    singleBubble: "The previous chart showed individual products. This one averages across entire food categories. <strong>Meat as a whole averages 33 kg CO2 per kg</strong> — more than seven times higher than plant-based foods at around 4 kg. Even dairy and vegetarian products, which include eggs and cheese, sit at around 10 kg. The variation within each category is real, but the gap between categories is structural. It does not disappear when you average it out.",
    visualId: 4,
    tableauSheet: BASE + 'GHGperkgbyaverage' + PARAMS,
  },
  {
    id: "land-use",
    title: "The Space We Take",
    subtitle: "Land Use per kg of Food Produced",
    category: "Environmental Impact",
    paragraphs: {
      explanation: "This treemap shows average land use per kilogram of food by category. <strong>Meat requires around 111 square meters per kg</strong>, the size of a common family home, to produce a single kilogram. Dairy needs about 34 square meters. <strong>Plant-based foods average just 6 square meters</strong>. The visual area of each rectangle is proportional to land demand, which is why meat fills most of the picture.",
      context: "Agriculture already occupies about <strong>50% of all habitable land</strong> on Earth. Of that, <strong>77% is used for livestock</strong>. We route enormous amounts of land through animals to get a fraction of the nutritional output we could get from plants directly. Land converted for agriculture is the single leading driver of habitat destruction and species loss globally.",
        },
    visualId: 5,
    tableauSheet: BASE + 'landuse' + PARAMS,
  },
  {
    id: "soybean-use",
    title: "The Feed Myth",
    subtitle: "Global Soybean Use by Purpose",
    category: "Environmental Impact",
    paragraphs: {
      explanation: "This chart tracks global soybean use from 1961 to 2022, split by purpose: animal feed, human food, and processed products like oil. The animal feed line dominates and has grown steeply since the 1970s. Today, <strong>roughly 80% of all soybeans grown globally go to livestock feed</strong>. The portion eaten directly by humans remains small by comparison.",
      context: "<strong>Soy agriculture is one of the primary drivers of deforestation </strong>in the Amazon and the Brazilian Cerrado. When critics point to soy as a problem with plant-based diets, they are describing the wrong end of the supply chain. The vast majority of soy-driven deforestation exists to feed animals, not people. Eating plants directly requires far less soy, and far less land, than eating the animals that soy was used to raise.",
       },
    visualId: 6,
    tableauSheet: BASE + 'Globalsyobeanuse' + PARAMS,
  },
  {
    id: "water-withdrawals",
    title: "Thirsty Industry",
    subtitle: "Freshwater Withdrawals per kg of Food",
    category: "Environmental Impact",
    paragraphs: {
      explanation: "This chart compares freshwater withdrawals per kilogram of food across the three main categories.<strong> Meat requires around 1,800 liters per kg</strong>. Dairy sits higher at around 2,270 liters, pulled up by cheese. Plant-based foods average around 587 liters. A single beef burger patty requires approximately 2,400 liters of water to produce, enough to fill a standard bathtub 18 times.",
      context: "Around 2 billion people currently live in countries experiencing high water stress. <strong>Agriculture accounts for roughly 72% of all global freshwater withdrawals</strong>, and livestock systems, both directly and through feed crop irrigation, account for a disproportionate share of that. In a world where water scarcity is projected to intensify significantly by 2050, the water cost of food becomes a resource allocation question, not just a personal one.",
       },
    visualId: 7,
    tableauSheet: BASE + 'Freshwaterwithdrawls' + PARAMS,
  },
  {
    id: "climax",
    title: "The Moment it Clicked",
    subtitle: "Three Dimensions of Environmental Impact",
    category: "Environmental Impact",
    paragraphs: {
      explanation: "<strong>This scatterplot maps individual food products across three environmental dimensions simultaneously:</strong> greenhouse gas emissions on the x-axis, land use on the y-axis, and freshwater withdrawal as bubble size. Each dot is a food product, colored by category. Red is meat, yellow is dairy and vegetarian, green is plant-based.",
      context: "The pattern is not subtle. Red dots cluster in the upper right, high emissions, high land use, high freshwater withdrawal. Green dots sit in the lower left, low on all three. What makes this chart significant is that these three variables are measured independently, from different data sources, using different methodologies. <strong>The alignment across reflects something structural about how animal agriculture works</strong>.",
         },
    visualId: 8,
    tableauSheet: BASE + 'Impactoflandfoodwater' + PARAMS,
  },
  {
    id: "slaughter-production",
    title: "Efficiency vs. Life",
    subtitle: "Animals Slaughtered vs. Meat Produced",
    category: "Global Scale",
    paragraphs: {
      explanation: "This dual-axis chart overlays two trends: total meat production in tonnes and total animals slaughtered, both from 1961 to 2023. Both lines rise across the full period. <strong>In recent decades, the animal count has grown faster than the production weight</strong>, reflecting and underlining a shift toward smaller-bodied animals, particularly chickens, which produce less meat per animal but are slaughtered in far greater numbers.",
      context: "The divergence between the two lines tells a specific <strong>story about how the industry has optimised</strong>. As told before, chickens are cheap to raise, fast to grow, and space-efficient which makes them economically dominant. From a resource perspective, chicken is significantly more efficient than beef. From the perspective of animal numbers, the shift toward chicken has meant more individual lives inside the system, not fewer, trying to meet the rising demand.",
        },
    visualId: 9,
    tableauSheet: BASE + 'Animalsslaughteredproduction' + PARAMS,
  },
  {
    id: "antibiotic-usage",
    title: "The Hidden Risk",
    subtitle: "Antibiotic Use in Livestock by Country",
    category: "Health Impact",
    paragraphs: {
      explanation: "This world map shows antibiotic use in livestock production by country, measured in milligrams per kilogram of meat produced. China, Mongolia and parts of Southeast Asia and Latin America stand out with the highest usage. Most of Europe has reduced livestock antibiotic use significantly through regulation over the past decade, though <strong>global usage remains high.</strong>",
      context: "Antibiotics in livestock are used for two purposes: treating sick animals, and, in many countries, <strong>preventing disease in overcrowded conditions and promoting faster growth</strong>. The second use is what drives the public health concern. When antibiotics are used routinely across large animal populations, bacteria evolve resistance. Those resistant strains can transfer to humans through food, contact, or shared environments. <strong> WHO classifies antibiotic resistance as one of the top ten global public health threats.</strong>",
         },
    visualId: 10,
    tableauSheet: BASE + 'AntibioticUsage' + PARAMS,
  },
  {
    id: "meat-antibiotics-scatter",
    title: "The Inequality",
    subtitle: "Meat Consumption vs. Antibiotic Use by Country",
    category: "Health Impact",
    paragraphs: {
      explanation: "This scatterplot plots countries by per capita meat consumption on the x-axis and livestock antibiotic use on the y-axis, colored by continent. What emerges is not a clean correlation. <strong>Europe consumes large amounts of meat</strong> but uses relatively few antibiotics, because strict regulation has made that possible. <strong>Much of Asia, Latin America, and Africa sits higher on the antibiotic axis</strong>, producing meat under conditions that wealthy, regulated markets have effectively outsourced.",
      context: "The countries with the <strong>highest antibiotic use in livestock are often not the ones consuming the most meat per person</strong>. They are the ones producing it for export, or producing it cheaply because regulations that Europe and North America enacted at home were never required of their suppliers abroad. A German consumer eating imported chicken benefits from a regulatory system that cleaned up domestic farming, while the health risk of antibiotic resistance generated elsewhere is shared by everyone. Resistant bacteria do not stop at borders.",
          },
    visualId: 11,
    tableauSheet: BASE + 'MeatConsumptionandAntibiotica' + PARAMS,
  },
  {
  id: "antibiotics-final",
  title: "Country by Country",
  subtitle: "Meat Consumption and Antibiotic Use per Nation",
  category: "Health Impact",
  singleBubble: "This chart breaks the scatterplot down to individual countries, showing both per capita meat consumption and livestock antibiotic use side by side. It makes it possible to see exactly where the two values track closely and where they diverge, <strong>revealing which countries have successfully decoupled high consumption from high antibiotic use</strong>, and which have not.",
    visualId: 12,
    tableauSheet: BASE + 'meatconsumptionantibiotica' + PARAMS,
  }
];