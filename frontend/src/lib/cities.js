// City lists for BGD-Trans routes
export const CITIES = {
  Romania: [
    "Vaslui", "Bârlad", "Focșani", "Iași", "Galați", "Brăila",
    "Râmnicu Sărat", "Buzău", "Ploiești", "București", "Pitești",
    "Râmnicu Vâlcea", "Sibiu", "Alba Iulia", "Deva", "Lugoj",
    "Timișoara", "Arad",
  ],
  Germania: [
    "München", "Passau", "Regensburg", "Nürnberg", "Würzburg",
    "Frankfurt am Main", "Augsburg", "Ulm", "Stuttgart", "Karlsruhe",
    "Heilbronn", "Mannheim", "Koblenz", "Köln", "Dortmund", "Hannover",
  ],
  Austria: [
    "Wien", "Linz", "Salzburg", "Graz", "Innsbruck",
  ],
  Olanda: [
    "Amsterdam", "Rotterdam", "Haga (Den Haag)", "Utrecht", "Eindhoven",
    "Groningen", "Tilburg", "Almere", "Breda", "Nijmegen",
    "Enschede", "Haarlem", "Arnhem", "Zaanstad", "Amersfoort",
    "Apeldoorn", "'s-Hertogenbosch", "Hoofddorp", "Maastricht",
    "Leiden", "Dordrecht", "Zoetermeer", "Zwolle", "Deventer",
    "Delft", "Alkmaar", "Venlo", "Helmond", "Hengelo", "Leeuwarden",
  ],
};

// Flat list suitable for <Select> with group labels
export const ALL_CITIES_GROUPED = [
  { country: "România", items: CITIES.Romania },
  { country: "Germania", items: CITIES.Germania },
  { country: "Austria", items: CITIES.Austria },
  { country: "Olanda", items: CITIES.Olanda },
];
