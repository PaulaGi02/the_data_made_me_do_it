export type StoryCategory = 'Global Scale' | 'Environmental Impact' | 'Health Impact';

export interface StorySection {
  id: string;
  title: string;
  subtitle?: string;
  category: StoryCategory;
  singleBubble?: string;
  paragraphs: {
    explanation: string;
    context: string;
    personal: string;
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
    subtitle: "Global Meat Production",
    category: "Global Scale",
    paragraphs: {
      explanation: "This line tracks global meat production from 1961 to 2023. It shows a relentless upward climb, moving from 70 million tonnes to nearly 370 million.",
      context: "This fivefold increase in 60 years is often framed as progress, but it represents a massive shift in how we utilize global resources.",
      personal: "Seeing this line made me realize that my consumption wasn't just a personal choice — it was part of a global surge that shows no signs of slowing down."
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
      explanation: "When you translate tonnes into living terms, the scale becomes staggering: over 80 billion animals are slaughtered every single year.",
      context: "Chickens dominate this chart because they are cheap and efficient to produce, leading to a slaughter rate that dwarfs all other livestock.",
      personal: "This was the first time the data felt heavy. It's one thing to talk about tonnes, but 80 billion lives is a number that is hard to sit with."
    },
    visualId: 1,
    tableauSheet: BASE + 'Animalsslaughtered' + PARAMS,
  },
  {
    id: "meat-supply",
    title: "Uneven Plates",
    subtitle: "Meat Supply per Person",
    category: "Global Scale",
    paragraphs: {
      explanation: "This map shows that meat consumption isn't evenly distributed. Wealthier nations in the North consume significantly more per person than the Global South.",
      context: "We aren't producing more meat because the whole world needs it; we're producing it because some regions consume it in extreme excess.",
      personal: "It made me question the fairness of my diet. Why was I consuming so much more than the global average, and at what cost to others?"
    },
    visualId: 2,
    tableauSheet: BASE + 'MeatSupply' + PARAMS,
  },
  {
    id: "ghg-product",
    title: "The Carbon Cost",
    subtitle: "GHG Emissions per kg by Product",
    category: "Environmental Impact",
    paragraphs: {
      explanation: "Beef sits at the top of this chart, emitting nearly 100kg of CO2 per kilogram of meat produced.",
      context: "Lamb and farmed prawns follow closely. In contrast, most plant-based foods stay well under the 5kg mark.",
      personal: "The gap wasn't just a few percentage points — it was a massive structural difference that I couldn't ignore."
    },
    visualId: 3,
    tableauSheet: BASE + 'GHGperkgbyproduct' + PARAMS,
  },
  {
    id: "ghg-average",
    title: "The Category Gap",
    subtitle: "GHG Emissions by Average",
    category: "Environmental Impact",
    singleBubble: "If we average out all the products from the previous chart, the pattern becomes undeniable. Meat sits at nearly 29 kg CO2 per kg — over seven times higher than plant-based foods at under 4 kg. No matter which product you pick, the category you eat from makes all the difference.",
    paragraphs: {
      explanation: "When averaged out, meat produces about 29kg of CO2 per kg. Dairy and vegetarian products sit around 10kg.",
      context: "Plant-based foods average under 4kg. This comparison highlights the inherent inefficiency of animal-based protein.",
      personal: "Seeing the averages made the choice feel simpler. It wasn't about finding better meat, but about shifting the category entirely."
    },
    visualId: 4,
    tableauSheet: BASE + 'GHGperkgbyaverage' + PARAMS,
  },
  {
    id: "land-use",
    title: "The Space We Take",
    subtitle: "Land Use per kg",
    category: "Environmental Impact",
    paragraphs: {
      explanation: "Meat requires about 111 square meters of land per kilogram. Plant-based foods require only about 6.",
      context: "This treemap shows that meat production is the primary driver of land conversion, leading to deforestation and biodiversity loss.",
      personal: "The physical space required for a single steak compared to a bowl of lentils made the environmental impact feel tangible."
    },
    visualId: 5,
    tableauSheet: BASE + 'landuse' + PARAMS,
  },
  {
    id: "soybean-use",
    title: "The Feed Myth",
    subtitle: "Global Soybean Use",
    category: "Environmental Impact",
    paragraphs: {
      explanation: "Most of the world's soy isn't feeding vegans; it's feeding livestock. Animal feed completely dominates global soy use.",
      context: "When you eat meat, you're consuming land and water twice — once for the animal and once for the crops that fed it.",
      personal: "This debunked the idea that my soy milk was the problem. The real problem was the hidden soy in the meat I was eating."
    },
    visualId: 6,
    tableauSheet: BASE + 'Globalsyobeanuse' + PARAMS,
  },
  {
    id: "water-withdrawals",
    title: "Thirsty Industry",
    subtitle: "Freshwater Withdrawals",
    category: "Environmental Impact",
    paragraphs: {
      explanation: "Meat production uses roughly 1800 liters of freshwater per kilogram, while plant-based foods average around 587.",
      context: "In a world facing growing water scarcity, the high water footprint of animal agriculture becomes a critical concern.",
      personal: "Water is a finite resource. Realizing how much hidden water was in my diet was a major turning point for me."
    },
    visualId: 7,
    tableauSheet: BASE + 'Freshwaterwithdrawls' + PARAMS,
  },
  {
    id: "climax",
    title: "The Moment it Clicked",
    subtitle: "Impact of Land, Food, and Water",
    category: "Environmental Impact",
    paragraphs: {
      explanation: "This scatterplot ties it all together. Red dots (meat) cluster in the high-impact corner: high emissions, high land use, high water use.",
      context: "Green dots (plant-based) sit in the low-impact corner. The pattern is consistent across three independent dimensions.",
      personal: "This was the chart. No more excuses. Across every metric, the data pointed to the same conclusion."
    },
    visualId: 8,
    tableauSheet: BASE + 'Impactoflandfoodwater' + PARAMS,
  },
  {
    id: "slaughter-production",
    title: "Efficiency vs. Life",
    subtitle: "Animals Slaughtered vs. Production",
    category: "Global Scale",
    paragraphs: {
      explanation: "This comparison shows the relationship between the number of animals killed and the actual weight of meat produced.",
      context: "It highlights the industrial scale of the industry, where lives are treated as units of production in a high-speed system.",
      personal: "It made me think about the machinery of it all. The data showed a system that prioritizes speed and volume over everything else."
    },
    visualId: 9,
    tableauSheet: BASE + 'Animalsslaughteredproduction' + PARAMS,
  },
  {
    id: "antibiotic-usage",
    title: "The Health Risk",
    subtitle: "Antibiotic Usage in Livestock",
    category: "Health Impact",
    paragraphs: {
      explanation: "Antibiotics are routinely used in industrial farming to prevent disease in crowded conditions and promote growth.",
      context: "This map shows usage levels by country, with some regions showing alarming levels of routine antibiotic use.",
      personal: "This shifted the story from the environment to public health. It wasn't just about the planet; it was about our future safety."
    },
    visualId: 10,
    tableauSheet: BASE + 'AntibioticUsage' + PARAMS,
  },
  {
    id: "meat-antibiotics-scatter",
    title: "The Correlation",
    subtitle: "Meat Consumption vs. Antibiotic Usage",
    category: "Health Impact",
    paragraphs: {
      explanation: "When you plot meat consumption against antibiotic use, a clear pattern emerges: higher consumption often goes with higher antibiotic use.",
      context: "Industrialized meat systems rely on these drugs to sustain high-density populations of livestock.",
      personal: "The link between my dinner plate and the global threat of antibiotic resistance became impossible to ignore."
    },
    visualId: 11,
    tableauSheet: BASE + 'MeatConsumtionandAntibiotica' + PARAMS,
  },
  {
    id: "antibiotics-final",
    title: "The Final Reckoning",
    subtitle: "Meat Consumption and Antibiotics",
    category: "Health Impact",
    paragraphs: {
      explanation: "This final view reinforces the public health threat. Antibiotic overuse in animals is a main driver of resistance in humans.",
      context: "The WHO has flagged this as a major global threat. Resistant bacteria don't respect species boundaries.",
      personal: "The data made a compelling case. It wasn't just one chart; it was the cumulative weight of all of them."
    },
    visualId: 12,
    tableauSheet: BASE + 'meatconsumptionantibiotica' + PARAMS,
  }
];