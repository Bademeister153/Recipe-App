import { Recipe } from '../context/RecipesContext';

export const recipes: Recipe[] = [
  {
    id: 'r001',
    title: 'Spaghetti Carbonara',
    description: 'Klassische italienische Pasta mit cremiger Eiersauce, knusprigem Pancetta und schwarzem Pfeffer.',
    image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601',
    servings: 4,
    prepTime: '15-20 mins',
    cookTime: '15 mins',
    ingredients: [
      { amount: '350g', item: 'Spaghetti' },
      { amount: '100g', item: 'Pancetta' },
      { amount: '50g', item: 'Pecorino Käse' },
      { amount: '50g', item: 'Parmesan' },
      { amount: '3', item: 'große Eier' },
      { amount: '2', item: 'Knoblauchzehen' },
      { amount: '50g', item: 'ungesalzene Butter' },
      { amount: '', item: 'Meersalz und frisch gemahlener schwarzer Pfeffer' }
    ],
    instructions: [
      'Wasser in einem großen Topf zum Kochen bringen und salzen.',
      'Spaghetti nach Packungsanweisung al dente kochen.',
      'In der Zwischenzeit Pancetta in einer großen Pfanne knusprig braten.',
      'Eier mit geriebenem Käse und Pfeffer in einer Schüssel verquirlen.',
      'Gekochte Pasta mit etwas Kochwasser zur Pancetta geben.',
      'Pfanne vom Herd nehmen und Ei-Käse-Mischung unterrühren.',
      'Mit Salz und Pfeffer abschmecken und sofort servieren.'
    ]
  },
  {
    id: 'r002',
    title: 'Wiener Schnitzel',
    description: 'Traditionelles österreichisches Gericht aus dünn geklopftem, paniertem Kalbfleisch.',
    image: 'https://images.unsplash.com/photo-1599921841143-819065a55cc6',
    servings: 4,
    prepTime: '25 mins',
    cookTime: '20 mins',
    ingredients: [
      { amount: '4', item: 'Kalbsschnitzel (je 150g)' },
      { amount: '200g', item: 'Semmelbrösel' },
      { amount: '2', item: 'Eier' },
      { amount: '100g', item: 'Mehl' },
      { amount: '200ml', item: 'Öl zum Braten' },
      { amount: '1', item: 'Zitrone' },
      { amount: '', item: 'Salz und Pfeffer' }
    ],
    instructions: [
      'Schnitzel zwischen Frischhaltefolie dünn klopfen.',
      'Fleisch salzen und pfeffern.',
      'Drei Teller vorbereiten: Mehl, verquirlte Eier, Semmelbrösel.',
      'Schnitzel erst in Mehl, dann in Ei und zuletzt in Semmelbröseln wenden.',
      'Öl in einer großen Pfanne erhitzen.',
      'Schnitzel goldbraun braten.',
      'Auf Küchenpapier abtropfen lassen.',
      'Mit Zitronenspalten servieren.'
    ]
  },
  {
    id: 'r003',
    title: 'Caesar Salad',
    description: 'Knackiger Römersalat mit cremigem Dressing, Croutons und Parmesan.',
    image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1',
    servings: 2,
    prepTime: '15 mins',
    cookTime: '10 mins',
    ingredients: [
      { amount: '1', item: 'Römersalat' },
      { amount: '100g', item: 'Parmesan' },
      { amount: '2', item: 'Scheiben Weißbrot' },
      { amount: '1', item: 'Knoblauchzehe' },
      { amount: '2', item: 'Sardellenfilets' },
      { amount: '1', item: 'Ei' },
      { amount: '2 EL', item: 'Olivenöl' },
      { amount: '1 EL', item: 'Zitronensaft' },
      { amount: '1 TL', item: 'Dijon-Senf' }
    ],
    instructions: [
      'Brot in Würfel schneiden und mit Olivenöl und Knoblauch zu Croutons rösten.',
      'Für das Dressing: Ei kochen, Sardellen zerkleinern.',
      'Eigelb mit Sardellen, Senf, Zitronensaft und Öl verrühren.',
      'Salat waschen und in mundgerechte Stücke zupfen.',
      'Salat mit Dressing vermengen.',
      'Mit Croutons und gehobeltem Parmesan servieren.'
    ]
  },
  {
    id: 'r004',
    title: 'Beef Burger',
    description: 'Saftiger Rindfleisch-Burger mit Käse, frischem Gemüse und hausgemachter Sauce.',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd',
    servings: 4,
    prepTime: '20 mins',
    cookTime: '15 mins',
    ingredients: [
      { amount: '600g', item: 'Rinderhackfleisch' },
      { amount: '4', item: 'Burger Buns' },
      { amount: '4', item: 'Scheiben Cheddar' },
      { amount: '1', item: 'Zwiebel' },
      { amount: '2', item: 'Tomaten' },
      { amount: '1', item: 'Kopfsalat' },
      { amount: '4 EL', item: 'Mayonnaise' },
      { amount: '2 EL', item: 'Ketchup' },
      { amount: '1 EL', item: 'Senf' }
    ],
    instructions: [
      'Hackfleisch mit Salz und Pfeffer würzen und zu 4 Patties formen.',
      'Zwiebeln in Ringe schneiden, Tomaten in Scheiben.',
      'Burger-Sauce aus Mayo, Ketchup und Senf mischen.',
      'Patties von beiden Seiten 3-4 Minuten braten.',
      'Käse auf die Patties legen und schmelzen lassen.',
      'Buns toasten und mit Sauce bestreichen.',
      'Burger mit Salat, Tomaten und Zwiebeln belegen.'
    ]
  },
  {
    id: 'r005',
    title: 'Gemüsecurry',
    description: 'Aromatisches Curry mit buntem Gemüse und Kokosmilch, serviert mit Basmatireis.',
    image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd',
    servings: 4,
    prepTime: '20 mins',
    cookTime: '25 mins',
    ingredients: [
      { amount: '200g', item: 'Basmatireis' },
      { amount: '400ml', item: 'Kokosmilch' },
      { amount: '1', item: 'Zwiebel' },
      { amount: '2', item: 'Karotten' },
      { amount: '1', item: 'Zucchini' },
      { amount: '200g', item: 'Blumenkohl' },
      { amount: '2 EL', item: 'Currypaste' },
      { amount: '2', item: 'Knoblauchzehen' },
      { amount: '1 Stück', item: 'Ingwer' },
      { amount: '', item: 'Koriander zum Garnieren' }
    ],
    instructions: [
      'Reis nach Packungsanweisung kochen.',
      'Gemüse waschen und in mundgerechte Stücke schneiden.',
      'Zwiebeln, Knoblauch und Ingwer fein hacken und anbraten.',
      'Currypaste hinzufügen und kurz mitbraten.',
      'Gemüse hinzufügen und kurz anbraten.',
      'Mit Kokosmilch ablöschen und 15-20 Minuten köcheln lassen.',
      'Mit Salz und Pfeffer abschmecken.',
      'Mit Reis und frischem Koriander servieren.'
    ]
  },
  {
    id: 'r006',
    title: 'Pizza Margherita',
    description: 'Klassische italienische Pizza mit Tomaten, Mozzarella und frischem Basilikum.',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591',
    servings: 2,
    prepTime: '2 hours',
    cookTime: '15 mins',
    ingredients: [
      { amount: '300g', item: 'Pizzamehl (Tipo 00)' },
      { amount: '200ml', item: 'lauwarmes Wasser' },
      { amount: '10g', item: 'frische Hefe' },
      { amount: '1 TL', item: 'Salz' },
      { amount: '1 EL', item: 'Olivenöl' },
      { amount: '200g', item: 'San Marzano Tomaten' },
      { amount: '200g', item: 'Büffelmozzarella' },
      { amount: '', item: 'frisches Basilikum' },
      { amount: '', item: 'Olivenöl zum Beträufeln' }
    ],
    instructions: [
      'Hefe im lauwarmen Wasser auflösen.',
      'Mehl mit Salz mischen, Hefewasser und Öl hinzufügen.',
      'Teig 10 Minuten kneten und 1-2 Stunden gehen lassen.',
      'Ofen mit Pizzastein auf 250°C vorheizen.',
      'Teig dünn ausrollen und mit Tomaten bestreichen.',
      'Mit zerupftem Mozzarella belegen.',
      'Pizza 12-15 Minuten backen.',
      'Mit Basilikum und Olivenöl garnieren.'
    ]
  },
  {
    id: 'r007',
    title: 'Lachs mit Gemüse',
    description: 'Gebratener Lachs mit gedämpftem Gemüse und Zitronenbutter.',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288',
    servings: 2,
    prepTime: '15 mins',
    cookTime: '20 mins',
    ingredients: [
      { amount: '2', item: 'Lachsfilets (je 150g)' },
      { amount: '200g', item: 'Brokkoli' },
      { amount: '200g', item: 'Karotten' },
      { amount: '50g', item: 'Butter' },
      { amount: '1', item: 'Zitrone' },
      { amount: '2', item: 'Knoblauchzehen' },
      { amount: '', item: 'Frische Kräuter (Dill, Petersilie)' },
      { amount: '', item: 'Salz und Pfeffer' }
    ],
    instructions: [
      'Gemüse waschen und in mundgerechte Stücke schneiden.',
      'Lachsfilets mit Salz und Pfeffer würzen.',
      'Gemüse in Dampfgarer oder Sieb dämpfen.',
      'Lachs in einer Pfanne von beiden Seiten 4-5 Minuten braten.',
      'Butter mit Zitronensaft und gehacktem Knoblauch schmelzen.',
      'Lachs und Gemüse anrichten.',
      'Mit Zitronenbutter übergießen und mit frischen Kräutern garnieren.'
    ]
  },
  {
    id: 'r008',
    title: 'Chicken Tikka Masala',
    description: 'Cremiges indisches Curry mit mariniertem Hühnchen und aromatischen Gewürzen.',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641',
    servings: 4,
    prepTime: '30 mins',
    cookTime: '40 mins',
    ingredients: [
      { amount: '600g', item: 'Hühnchenbrust' },
      { amount: '400ml', item: 'Kokosmilch' },
      { amount: '400g', item: 'stückige Tomaten' },
      { amount: '2', item: 'Zwiebeln' },
      { amount: '3 EL', item: 'Tikka Masala Paste' },
      { amount: '200g', item: 'Naturjoghurt' },
      { amount: '2', item: 'Knoblauchzehen' },
      { amount: '1 Stück', item: 'frischer Ingwer' },
      { amount: '', item: 'Garam Masala' },
      { amount: '', item: 'Koriander zum Garnieren' }
    ],
    instructions: [
      'Hühnchen in Würfel schneiden und mit Joghurt und Gewürzen marinieren.',
      'Zwiebeln, Knoblauch und Ingwer fein hacken.',
      'Mariniertes Hühnchen anbraten bis es goldbraun ist.',
      'Zwiebeln, Knoblauch und Ingwer hinzufügen und anschwitzen.',
      'Tikka Masala Paste einrühren und kurz mitbraten.',
      'Tomaten und Kokosmilch hinzufügen und 30 Minuten köcheln lassen.',
      'Mit Garam Masala abschmecken.',
      'Mit frischem Koriander garnieren und mit Reis servieren.'
    ]
  },
  {
    id: 'r009',
    title: 'Pancakes',
    description: 'Fluffige amerikanische Pancakes mit Ahornsirup und frischen Beeren.',
    image: 'https://images.unsplash.com/photo-1515516969-d4008cc6241a',
    servings: 4,
    prepTime: '15 mins',
    cookTime: '20 mins',
    ingredients: [
      { amount: '200g', item: 'Mehl' },
      { amount: '2', item: 'Eier' },
      { amount: '250ml', item: 'Milch' },
      { amount: '2 EL', item: 'Zucker' },
      { amount: '2 TL', item: 'Backpulver' },
      { amount: '50g', item: 'geschmolzene Butter' },
      { amount: '1 Prise', item: 'Salz' },
      { amount: '', item: 'Ahornsirup' },
      { amount: '', item: 'Frische Beeren zum Garnieren' }
    ],
    instructions: [
      'Mehl, Zucker, Backpulver und Salz vermischen.',
      'Eier, Milch und geschmolzene Butter verquirlen.',
      'Flüssige Zutaten zu den trockenen geben und zu einem glatten Teig verrühren.',
      'Pfanne erhitzen und leicht einfetten.',
      'Je 2-3 EL Teig in die Pfanne geben.',
      'Pancakes von beiden Seiten goldbraun backen.',
      'Mit Ahornsirup und frischen Beeren servieren.'
    ]
  },
  {
    id: 'r010',
    title: 'Griechischer Salat',
    description: 'Frischer Salat mit Tomaten, Gurken, Oliven und Feta-Käse.',
    image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe',
    servings: 4,
    prepTime: '15 mins',
    cookTime: '0 mins',
    ingredients: [
      { amount: '2', item: 'große Tomaten' },
      { amount: '1', item: 'Salatgurke' },
      { amount: '1', item: 'rote Zwiebel' },
      { amount: '200g', item: 'Feta-Käse' },
      { amount: '100g', item: 'Kalamata-Oliven' },
      { amount: '4 EL', item: 'Olivenöl' },
      { amount: '2 EL', item: 'Rotweinessig' },
      { amount: '', item: 'Oregano' },
      { amount: '', item: 'Salz und Pfeffer' }
    ],
    instructions: [
      'Tomaten in Spalten schneiden.',
      'Gurke in Halbmonde schneiden.',
      'Zwiebel in dünne Ringe schneiden.',
      'Feta-Käse würfeln.',
      'Alle Zutaten in einer Schüssel kombinieren.',
      'Olivenöl und Essig darüber träufeln.',
      'Mit Oregano, Salz und Pfeffer würzen.',
      'Vor dem Servieren kurz durchziehen lassen.'
    ]
  },
  {
    id: 'r011',
    title: 'Ramen',
    description: 'Japanische Nudelsuppe mit Chashu-Schweinefleisch, Ajitsuke Tamago und Gemüse.',
    image: 'https://images.unsplash.com/photo-1557872943-16a5ac26437e',
    servings: 2,
    prepTime: '30 mins',
    cookTime: '3 hours',
    ingredients: [
      { amount: '200g', item: 'Ramen Nudeln' },
      { amount: '400g', item: 'Schweinebauch' },
      { amount: '2', item: 'Eier' },
      { amount: '1L', item: 'Hühnerbrühe' },
      { amount: '100ml', item: 'Sojasauce' },
      { amount: '2', item: 'Frühlingszwiebeln' },
      { amount: '100g', item: 'Bambussprossen' },
      { amount: '2', item: 'Nori-Blätter' },
      { amount: '', item: 'Sesamöl' }
    ],
    instructions: [
      'Schweinebauch mit Gewürzen und Sojasauce 2-3 Stunden schmoren.',
      'Eier 6,5 Minuten kochen und in Sojasauce marinieren.',
      'Brühe mit Gewürzen aufkochen.',
      'Ramen Nudeln nach Packungsanweisung kochen.',
      'Nudeln in Schüsseln verteilen und mit heißer Brühe übergießen.',
      'Mit Scheiben vom Schweinebauch, halbierten Eiern belegen.',
      'Mit Bambussprossen, Frühlingszwiebeln und Nori garnieren.',
      'Mit einem Tropfen Sesamöl servieren.'
    ]
  },
  {
    id: 'r012',
    title: 'Tacos',
    description: 'Mexikanische Tacos mit würzigem Fleisch, frischem Gemüse und Guacamole.',
    image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b',
    servings: 4,
    prepTime: '20 mins',
    cookTime: '25 mins',
    ingredients: [
      { amount: '500g', item: 'Rinderhackfleisch' },
      { amount: '8', item: 'Weizentortillas' },
      { amount: '2', item: 'Avocados' },
      { amount: '2', item: 'Tomaten' },
      { amount: '1', item: 'Zwiebel' },
      { amount: '1', item: 'Limette' },
      { amount: '1 Bund', item: 'Koriander' },
      { amount: '2 EL', item: 'Tacowürzmischung' },
      { amount: '', item: 'Salz und Pfeffer' }
    ],
    instructions: [
      'Hackfleisch mit Tacowürzmischung anbraten.',
      'Tomaten und Zwiebeln würfeln.',
      'Avocados zerdrücken und mit Limettensaft, Salz vermischen.',
      'Koriander hacken.',
      'Tortillas kurz in einer Pfanne erwärmen.',
      'Tortillas mit Fleisch füllen.',
      'Mit Guacamole, Tomaten, Zwiebeln toppen.',
      'Mit Koriander garnieren.'
    ]
  },
  {
    id: 'r013',
    title: 'Apfelstrudel',
    description: 'Österreichischer Strudel mit Äpfeln, Rosinen und Zimt.',
    image: 'https://images.unsplash.com/photo-1568571780765-9276ac8b75a9',
    servings: 8,
    prepTime: '45 mins',
    cookTime: '40 mins',
    ingredients: [
      { amount: '300g', item: 'Strudelteig' },
      { amount: '1kg', item: 'Äpfel' },
      { amount: '100g', item: 'Rosinen' },
      { amount: '100g', item: 'gemahlene Mandeln' },
      { amount: '100g', item: 'Zucker' },
      { amount: '2 TL', item: 'Zimt' },
      { amount: '100g', item: 'zerlassene Butter' },
      { amount: '', item: 'Puderzucker zum Bestäuben' }
    ],
    instructions: [
      'Äpfel schälen und in dünne Scheiben schneiden.',
      'Äpfel mit Rosinen, Mandeln, Zucker und Zimt mischen.',
      'Strudelteig ausrollen und mit Butter bestreichen.',
      'Apfelmischung auf dem Teig verteilen.',
      'Strudel vorsichtig einrollen.',
      'Mit restlicher Butter bestreichen.',
      'Bei 180°C 40 Minuten backen.',
      'Mit Puderzucker bestäubt servieren.'
    ]
  },
  {
    id: 'r014',
    title: 'Pad Thai',
    description: 'Thailändische Reisnudeln mit Tofu, Garnelen und Erdnüssen.',
    image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e',
    servings: 2,
    prepTime: '20 mins',
    cookTime: '15 mins',
    ingredients: [
      { amount: '200g', item: 'Reisnudeln' },
      { amount: '200g', item: 'Garnelen' },
      { amount: '100g', item: 'Tofu' },
      { amount: '2', item: 'Eier' },
      { amount: '100g', item: 'Sojasprossen' },
      { amount: '3 EL', item: 'Fischsauce' },
      { amount: '2 EL', item: 'Tamarindenpaste' },
      { amount: '50g', item: 'gehackte Erdnüsse' },
      { amount: '', item: 'Limetten und Koriander zum Garnieren' }
    ],
    instructions: [
      'Reisnudeln in warmem Wasser einweichen.',
      'Tofu und Garnelen anbraten.',
      'Eier verquirlen und zu Rührei braten.',
      'Nudeln mit Fischsauce und Tamarindenpaste anbraten.',
      'Sojasprossen hinzufügen.',
      'Alles vermischen und kurz durcherhitzen.',
      'Mit gehackten Erdnüssen bestreuen.',
      'Mit Limettenspalten und Koriander servieren.'
    ]
  },
  {
    id: 'r015',
    title: 'Shakshuka',
    description: 'Nordafrikanisches Frühstücksgericht mit Eiern in würziger Tomatensauce.',
    image: 'https://images.unsplash.com/photo-1590412200988-a436970781fa',
    servings: 4,
    prepTime: '10 mins',
    cookTime: '25 mins',
    ingredients: [
      { amount: '6', item: 'Eier' },
      { amount: '400g', item: 'stückige Tomaten' },
      { amount: '2', item: 'Paprika' },
      { amount: '1', item: 'Zwiebel' },
      { amount: '2', item: 'Knoblauchzehen' },
      { amount: '1 TL', item: 'Kreuzkümmel' },
      { amount: '1 TL', item: 'Paprikapulver' },
      { amount: '', item: 'Petersilie zum Garnieren' }
    ],
    instructions: [
      'Zwiebeln und Paprika in Streifen schneiden.',
      'Gemüse mit Gewürzen anbraten.',
      'Tomaten hinzufügen und einkochen lassen.',
      'Mulden in die Sauce drücken.',
      'Eier in die Mulden geben.',
      'Bei geschlossenem Deckel 5-7 Minuten garen.',
      'Mit Petersilie garnieren.',
      'Mit Fladenbrot servieren.'
    ]
  },
  {
    id: 'r016',
    title: 'Sushi Roll',
    description: 'Verschiedene Sushi-Rollen mit frischem Fisch und Gemüse.',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c',
    servings: 4,
    prepTime: '45 mins',
    cookTime: '30 mins',
    ingredients: [
      { amount: '300g', item: 'Sushi Reis' },
      { amount: '200g', item: 'Lachs' },
      { amount: '1', item: 'Avocado' },
      { amount: '1', item: 'Gurke' },
      { amount: '4', item: 'Nori-Blätter' },
      { amount: '50ml', item: 'Reisessig' },
      { amount: '1 EL', item: 'Zucker' },
      { amount: '', item: 'Wasabi und Sojasauce zum Servieren' }
    ],
    instructions: [
      'Reis kochen und mit Essig-Zucker-Mischung abschmecken.',
      'Lachs in Streifen schneiden.',
      'Avocado und Gurke in dünne Streifen schneiden.',
      'Nori-Blatt mit Reis bedecken.',
      'Zutaten am unteren Rand platzieren.',
      'Mit Hilfe einer Bambusmatte aufrollen.',
      'In 6-8 Stücke schneiden.',
      'Mit Wasabi und Sojasauce servieren.'
    ]
  },
  {
    id: 'r017',
    title: 'Kartoffelgratin',
    description: 'Cremiges Kartoffelgratin mit Sahne und geriebenem Käse.',
    image: 'https://images.unsplash.com/photo-1568600891621-50f697b9a1c7',
    servings: 6,
    prepTime: '25 mins',
    cookTime: '50 mins',
    ingredients: [
      { amount: '1kg', item: 'Kartoffeln' },
      { amount: '400ml', item: 'Sahne' },
      { amount: '200g', item: 'geriebener Gruyère' },
      { amount: '2', item: 'Knoblauchzehen' },
      { amount: '1', item: 'Zwiebel' },
      { amount: '', item: 'Muskatnuss' },
      { amount: '', item: 'Salz und Pfeffer' }
    ],
    instructions: [
      'Kartoffeln schälen und in dünne Scheiben schneiden.',
      'Auflaufform mit Knoblauch einreiben.',
      'Kartoffelschichten mit Zwiebeln, Käse schichten.',
      'Mit Sahne übergießen.',
      'Mit Muskat, Salz und Pfeffer würzen.',
      'Mit Käse bestreuen.',
      'Bei 180°C 50 Minuten backen.',
      'Vor dem Servieren 10 Minuten ruhen lassen.'
    ]
  },
  {
    id: 'r018',
    title: 'Gazpacho',
    description: 'Erfrischende spanische kalte Suppe aus frischen Tomaten und Gemüse.',
    image: 'https://images.unsplash.com/photo-1604152135912-04a022e23696',
    servings: 4,
    prepTime: '20 mins',
    cookTime: '0 mins',
    ingredients: [
      { amount: '1kg', item: 'reife Tomaten' },
      { amount: '1', item: 'Gurke' },
      { amount: '1', item: 'rote Paprika' },
      { amount: '2', item: 'Knoblauchzehen' },
      { amount: '50ml', item: 'Olivenöl' },
      { amount: '2 EL', item: 'Sherry-Essig' },
      { amount: '', item: 'Brotwürfel zum Garnieren' },
      { amount: '', item: 'Salz und Pfeffer' }
    ],
    instructions: [
      'Tomaten häuten und grob würfeln.',
      'Gurke und Paprika klein schneiden.',
      'Alles mit Knoblauch fein pürieren.',
      'Olivenöl und Essig unterrühren.',
      'Mit Salz und Pfeffer abschmecken.',
      'Mindestens 2 Stunden kühlen.',
      'Mit Brotwürfeln garnieren.',
      'Eisgekühlt servieren.'
    ]
  },
  {
    id: 'r019',
    title: 'Tiramisu',
    description: 'Italienisches Dessert mit Mascarpone, Kaffee und Kakao.',
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9',
    servings: 8,
    prepTime: '30 mins',
    cookTime: '0 mins',
    ingredients: [
      { amount: '500g', item: 'Mascarpone' },
      { amount: '4', item: 'Eier' },
      { amount: '100g', item: 'Zucker' },
      { amount: '300g', item: 'Löffelbiskuits' },
      { amount: '300ml', item: 'starker Kaffee' },
      { amount: '4 EL', item: 'Amaretto' },
      { amount: '', item: 'Kakaopulver zum Bestäuben' }
    ],
    instructions: [
      'Eigelb mit Zucker schaumig schlagen.',
      'Mascarpone unterrühren.',
      'Eiweiß steif schlagen und unterheben.',
      'Kaffee mit Amaretto mischen.',
      'Biskuits kurz in Kaffeemischung tauchen.',
      'Schichtweise Biskuits und Creme in Form füllen.',
      'Mindestens 4 Stunden kühlen.',
      'Vor dem Servieren mit Kakao bestäuben.'
    ]
  },
  {
    id: 'r020',
    title: 'Bibimbap',
    description: 'Koreanische Reisschüssel mit Gemüse, Ei und Gochujang-Sauce.',
    image: 'https://images.unsplash.com/photo-1553163147-622ab57be1c7',
    servings: 2,
    prepTime: '30 mins',
    cookTime: '20 mins',
    ingredients: [
      { amount: '300g', item: 'Reis' },
      { amount: '200g', item: 'Spinat' },
      { amount: '100g', item: 'Karotten' },
      { amount: '100g', item: 'Shiitake Pilze' },
      { amount: '200g', item: 'Sojasprossen' },
      { amount: '2', item: 'Eier' },
      { amount: '2 EL', item: 'Gochujang (koreanische Chilipaste)' },
      { amount: '2 EL', item: 'Sesamöl' }
    ],
    instructions: [
      'Reis kochen.',
      'Gemüse separat kurz anbraten.',
      'Spiegeleier braten.',
      'Reis in Schüsseln geben.',
      'Gemüse kreisförmig auf dem Reis anrichten.',
      'Spiegelei in die Mitte setzen.',
      'Gochujang und Sesamöl darüber geben.',
      'Vor dem Essen alles vermischen.'
    ]
  }
]; 