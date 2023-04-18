{
    "title": " ",
    "description": " ",
    "logoWidth": "0px",
    "logoHeight": "0px",
    "logoFit": "none",
    "logoPosition": "right",
    "pages": [
     {
      "name": "cat_region",
      "elements": [
       {
        "type": "dropdown",
        "name": "cat_region_country",
        "title": "Country",
        "isRequired": true,
        "choices": [
         "България ",
         "Česko",
         "Danmark",
         "Deutschland",
         "Eesti",
         "Éire/Ireland",
         "Ελλάδα ",
         "España",
         "France",
         "Hrvatska",
         "Italia",
         "Κύπρος ",
         "Latvija",
         "Lietuva",
         "Luxembourg",
         "Magyarország",
         "Malta",
         "Nederland",
         "Österreich",
         "Polska",
         "Portugal",
         "România",
         "Slovenija",
         "Slovensko",
         "Suomi/Finland",
         "Sverige",
         "United Kingdom",
         "Ísland",
         "Liechtenstein",
         "Norge",
         "Schweiz/Suisse/Svizzera",
         "Црна Гора ",
         "Северна Македонија",
         "Shqipëria",
         "Srbija/Сpбија",
         "Türkiye"
        ],
        "placeholder": "Select country",
        "autocomplete": "country"
       },
       {
        "type": "dropdown",
        "name": "cat_region_state_de",
        "visible": false,
        "visibleIf": "{cat_region_country} = 'Deutschland'",
        "title": "State",
        "isRequired": true,
        "choices": [
         "Baden-Württemberg",
         "Bayern",
         "Berlin",
         "Brandenburg",
         "Bremen",
         "Hamburg",
         "Hessen",
         "Mecklenburg-Vorpommern",
         "Niedersachsen",
         "Nordrhein-Westfalen",
         "Rheinland-Pfalz",
         "Saarland",
         "Sachsen",
         "Sachsen-Anhalt",
         "Schleswig-Holstein",
         "Thüringen",
         "Other"
        ],
        "placeholder": "Select state"
       },
       {
        "type": "dropdown",
        "name": "cat_region_de_nrw",
        "visible": false,
        "visibleIf": "{cat_region_state_de} = 'Nordrhein-Westfalen'",
        "title": "City",
        "isRequired": true,
        "choices": [
         "Düsseldorf",
         "Köln",
         "Münster",
         "Detmold",
         "Arnsberg"
        ],
        "placeholder": "Select city"
       },
       {
        "type": "dropdown",
        "name": "cat_region_de_bw",
        "visible": false,
        "visibleIf": "{cat_region_state_de} = 'Baden-Württemberg'",
        "title": "City",
        "isRequired": true,
        "choices": [
         "Stuttgart",
         "Karlsruhe",
         "Freiburg",
         "Tübingen"
        ],
        "placeholder": "Select city"
       },
       {
        "type": "dropdown",
        "name": "cat_region_de_bayern",
        "visible": false,
        "visibleIf": "{cat_region_state_de} = 'Bayern'",
        "title": "City",
        "isRequired": true,
        "choices": [
         "Oberbayern",
         "Niederbayern",
         "Oberpfalz",
         "Oberfranken",
         "Mittelfranken",
         "Unterfranken",
         "Schwaben"
        ],
        "placeholder": "Select city"
       },
       {
        "type": "dropdown",
        "name": "cat_region_de_hessen",
        "visible": false,
        "visibleIf": "{cat_region_state_de} = 'Hessen'",
        "title": "City",
        "isRequired": true,
        "choices": [
         "Darmstadt",
         "Gießen",
         "Kassel"
        ],
        "placeholder": "Select city"
       },
       {
        "type": "dropdown",
        "name": "cat_region_de_niedersachsen",
        "visible": false,
        "visibleIf": "{cat_region_state_de} = 'Niedersachsen'",
        "title": "City",
        "isRequired": true,
        "choices": [
         "Braunschweig",
         "Hannover",
         "Lüneburg",
         "Weser-Ems"
        ],
        "placeholder": "Select city"
       },
       {
        "type": "dropdown",
        "name": "cat_region_de_rp",
        "visible": false,
        "visibleIf": "{cat_region_state_de} = 'Rheinland-Pfalz'",
        "title": "City",
        "isRequired": true,
        "choices": [
         "Koblenz",
         "Trier",
         "Rheinhessen-Pfalz"
        ],
        "placeholder": "Select city"
       },
       {
        "type": "dropdown",
        "name": "cat_region_de_sachsen",
        "visible": false,
        "visibleIf": "{cat_region_state_de} = 'Sachsen'",
        "title": "City",
        "isRequired": true,
        "choices": [
         "Dresden",
         "Chemnitz",
         "Leipzig"
        ],
        "placeholder": "Select city"
       },
       {
        "type": "dropdown",
        "name": "cat_region_de_koeln",
        "visible": false,
        "visibleIf": "{cat_region_de_nrw} = 'Köln'",
        "title": "Area",
        "isRequired": true,
        "choices": [
         "Bonn, Kreisfreie Stadt",
         "Köln, Kreisfreie Stadt",
         "Leverkusen, Kreisfreie Stadt",
         "Düren",
         "Rhein-Erft-Kreis",
         "Euskirchen",
         "Heinsberg",
         "Oberbergischer Kreis",
         "Rheinisch-Bergischer Kreis",
         "Rhein-Sieg-Kreis",
         "Städteregion Aachen"
        ],
        "placeholder": "Select area"
       },
       {
        "type": "dropdown",
        "name": "cat_region_de_bw_stuttgart",
        "visible": false,
        "visibleIf": "{cat_region_de_bw} = 'Stuttgart'",
        "title": "Area",
        "isRequired": true,
        "choices": [
         "Stuttgart, Stadtkreis",
         "Böblingen",
         "Esslingen",
         "Göppingen",
         "Ludwigsburg",
         "Rems-Murr-Kreis",
         "Heilbronn, Stadtkreis",
         "Heilbronn, Landkreis",
         "Hohenlohekreis",
         "Schwäbisch Hall",
         "Main-Tauber-Kreis",
         "Heidenheim",
         "Ostalbkreis"
        ],
        "placeholder": "Select area"
       },
       {
        "type": "dropdown",
        "name": "cat_region_de_bw_karlsruhe",
        "visible": false,
        "visibleIf": "{cat_region_de_bw} = 'Karlsruhe'",
        "title": "Area",
        "isRequired": true,
        "choices": [
         "Baden-Baden, Stadtkreis",
         "Karlsruhe, Stadtkreis",
         "Karlsruhe, Landkreis",
         "Rastatt",
         "Heidelberg, Stadtkreis",
         "Mannheim, Stadtkreis",
         "Neckar-Odenwald-Kreis",
         "Rhein-Neckar-Kreis",
         "Pforzheim, Stadtkreis",
         "Calw",
         "Enzkreis",
         "Freudenstadt"
        ],
        "placeholder": "Select area"
       },
       {
        "type": "dropdown",
        "name": "cat_region_de_bw_freiburg",
        "visible": false,
        "visibleIf": "{cat_region_de_bw} = 'Freiburg'",
        "title": "Area",
        "isRequired": true,
        "choices": [
         "Freiburg im Breisgau, Stadtkreis",
         "Breisgau-Hochschwarzwald",
         "Emmendingen",
         "Ortenaukreis",
         "Rottweil",
         "Schwarzwald-Baar-Kreis",
         "Tuttlingen",
         "Konstanz",
         "Lörrach",
         "Waldshut"
        ],
        "placeholder": "Select area"
       },
       {
        "type": "dropdown",
        "name": "cat_region_de_bw_tuebingen",
        "visible": false,
        "visibleIf": "{cat_region_de_bw} = 'Tübingen'",
        "title": "Area",
        "isRequired": true,
        "choices": [
         "Reutlingen",
         "Tübingen, Landkreis",
         "Zollernalbkreis",
         "Ulm, Stadtkreis",
         "Alb-Donau-Kreis",
         "Biberach",
         "Bodenseekreis",
         "Ravensburg",
         "Sigmaringen"
        ],
        "placeholder": "Select area"
       },
       {
        "type": "dropdown",
        "name": "cat_region_de_bayern_oberbayern",
        "visible": false,
        "visibleIf": "{cat_region_de_bayern} = 'Oberbayern'",
        "title": "Area",
        "isRequired": true,
        "choices": [
         "Ingolstadt, Kreisfreie Stadt",
         "München, Kreisfreie Stadt",
         "Rosenheim, Kreisfreie Stadt",
         "Altötting",
         "Berchtesgadener Land",
         "Bad Tölz-Wolfratshausen",
         "Dachau",
         "Ebersberg",
         "Eichstätt",
         "Erding",
         "Freising",
         "Fürstenfeldbruck",
         "Garmisch-Partenkirchen",
         "Landsberg am Lech",
         "Miesbach",
         "Mühldorf a. Inn",
         "München, Landkreis",
         "Neuburg-Schrobenhausen",
         "Pfaffenhofen a. d. Ilm",
         "Rosenheim, Landkreis",
         "Starnberg",
         "Traunstein",
         "Weilheim-Schongau"
        ],
        "placeholder": "Select area"
       },
       {
        "type": "dropdown",
        "name": "cat_region_de_bayern_niederbayern",
        "visible": false,
        "visibleIf": "{cat_region_de_bayern} = 'Niederbayern'",
        "title": "Area",
        "isRequired": true,
        "choices": [
         "Landshut, Kreisfreie Stadt",
         "Passau, Kreisfreie Stadt",
         "Straubing, Kreisfreie Stadt",
         "Deggendorf",
         "Freyung-Grafenau",
         "Kelheim",
         "Landshut, Landkreis",
         "Passau, Landkreis",
         "Regen",
         "Rottal-Inn",
         "Straubing-Bogen",
         "Dingolfing-Landau"
        ],
        "placeholder": "Select area"
       },
       {
        "type": "dropdown",
        "name": "cat_region_de_bayern_oberpfalz",
        "visible": false,
        "visibleIf": "{cat_region_de_bayern} = 'Oberpfalz'",
        "title": "Area",
        "isRequired": true,
        "choices": [
         "Amberg, Kreisfreie Stadt",
         "Regensburg, Kreisfreie Stadt",
         "Weiden i. d. Opf, Kreisfreie Stadt",
         "Amberg-Sulzbach",
         "Cham",
         "Neumarkt i. d. OPf.",
         "Neustadt a. d. Waldnaab",
         "Regensburg, Landkreis",
         "Schwandorf",
         "Tirschenreuth"
        ],
        "placeholder": "Select area"
       },
       {
        "type": "dropdown",
        "name": "cat_region_de_bayern_oberfranken",
        "visible": false,
        "visibleIf": "{cat_region_de_bayern} = 'Oberfranken'",
        "title": "Area",
        "isRequired": true,
        "choices": [
         "Bamberg, Kreisfreie Stadt",
         "Bayreuth, Kreisfreie Stadt",
         "Coburg, Kreisfreie Stadt",
         "Hof, Kreisfreie Stadt",
         "Bamberg, Landkreis",
         "Bayreuth, Landkreis",
         "Coburg, Landkreis",
         "Forchheim",
         "Hof, Landkreis",
         "Kronach",
         "Kulmbach",
         "Lichtenfels",
         "Wunsiedel i. Fichtelgebirge"
        ],
        "placeholder": "Select area"
       },
       {
        "type": "dropdown",
        "name": "cat_region_de_bayern_mittelfranken",
        "visible": false,
        "visibleIf": "{cat_region_de_bayern} = 'Mittelfranken'",
        "title": "Area",
        "isRequired": true,
        "choices": [
         "Ansbach, Kreisfreie Stadt",
         "Erlangen, Kreisfreie Stadt",
         "Fürth, Kreisfreie Stadt",
         "Nürnberg, Kreisfreie Stadt",
         "Schwabach, Kreisfreie Stadt",
         "Ansbach, Landkreis",
         "Erlangen-Höchstadt",
         "Fürth, Landkreis",
         "Nürnberger Land",
         "Neustadt a. d. Aisch-Bad Windsheim",
         "Roth",
         "Weißenburg-Gunzenhausen"
        ],
        "placeholder": "Select area"
       },
       {
        "type": "dropdown",
        "name": "cat_re_de_bayern_unterfranken",
        "visible": false,
        "visibleIf": "{cat_region_de_bayern} = 'Unterfranken'",
        "title": "Area",
        "isRequired": true,
        "choices": [
         "Aschaffenburg, Kreisfreie Stadt",
         "Schweinfurt, Kreisfreie Stadt",
         "Würzburg, Kreisfreie Stadt",
         "Aschaffenburg, Landkreis",
         "Bad Kissingen",
         "Rhön-Grabfeld",
         "Haßberge",
         "Kitzingen",
         "Miltenberg",
         "Main-Spessart",
         "Schweinfurt, Landkreis",
         "Würzburg, Landkreis"
        ],
        "placeholder": "Select area"
       },
       {
        "type": "dropdown",
        "name": "cat_region_de_brandenburg",
        "visible": false,
        "visibleIf": "{cat_region_state_de} = 'Brandenburg'",
        "title": "Area",
        "isRequired": true,
        "choices": [
         "Brandenburg an der Havel, Kreisfreie Stadt",
         "Cottbus, Kreisfreie Stadt",
         "Frankfurt (Oder), Kreisfreie Stadt",
         "Potsdam, Kreisfreie Stadt",
         "Barnim",
         "Dahme-Spreewald",
         "Elbe-Elster",
         "Havelland",
         "Märkisch-Oderland",
         "Oberhavel",
         "Oberspreewald-Lausitz",
         "Oder-Spree",
         "Ostprignitz-Ruppin",
         "Potsdam-Mittelmark",
         "Prignitz",
         "Spree-Neiße",
         "Teltow-Fläming",
         "Uckermark"
        ],
        "placeholder": "Select area"
       },
       {
        "type": "dropdown",
        "name": "cat_region_bremen",
        "visible": false,
        "visibleIf": "{cat_region_state_de} = 'Bremen'",
        "title": "Area",
        "isRequired": true,
        "choices": [
         "Bremen, Kreisfreie Stadt",
         "Bremerhaven, Kreisfreie Stadt"
        ],
        "placeholder": "Select area"
       },
       {
        "type": "dropdown",
        "name": "cat_region_de_hessen_darmstadt",
        "visible": false,
        "visibleIf": "{cat_region_de_hessen} = 'Darmstadt'",
        "title": "Area",
        "isRequired": true,
        "choices": [
         "Darmstadt, Kreisfreie Stadt",
         "Frankfurt am Main, Kreisfreie Stadt",
         "Offenbach am Main, Kreisfreie Stadt",
         "Wiesbaden, Kreisfreie Stadt",
         "Bergstraße",
         "Darmstadt-Dieburg",
         "Groß-Gerau",
         "Hochtaunuskreis",
         "Main-Kinzig-Kreis",
         "Main-Taunus-Kreis",
         "Odenwaldkreis",
         "Offenbach, Landkreis",
         "Rheingau-Taunus-Kreis",
         "Wetteraukreis"
        ],
        "placeholder": "Select area"
       },
       {
        "type": "dropdown",
        "name": "cat_region_de_hessen_giesen",
        "visible": false,
        "visibleIf": "{cat_region_de_hessen} = 'Gießen'",
        "title": "Area",
        "isRequired": true,
        "choices": [
         "Gießen, Landkreis",
         "Lahn-Dill-Kreis",
         "Limburg-Weilburg",
         "Marburg-Biedenkopf",
         "Vogelsbergkreis"
        ],
        "placeholder": "Select area"
       },
       {
        "type": "dropdown",
        "name": "cat_region_de_hessen_kassel",
        "visible": false,
        "visibleIf": "{cat_region_de_hessen} = 'Kassel'",
        "title": "Area",
        "isRequired": true,
        "choices": [
         "Kassel, Kreisfreie Stadt",
         "Fulda",
         "Hersfeld-Rotenburg",
         "Kassel, Landkreis",
         "Schwalm-Eder-Kreis",
         "Waldeck-Frankenberg",
         "Werra-Meißner-Kreis"
        ],
        "placeholder": "Select area"
       },
       {
        "type": "dropdown",
        "name": "cat_region_de_mv",
        "visible": false,
        "visibleIf": "{cat_region_state_de} = 'Mecklenburg-Vorpommern'",
        "title": "Area",
        "isRequired": true,
        "choices": [
         "Rostock, Kreisfreie Stadt",
         "Schwerin, Kreisfreie Stadt",
         "Mecklenburgische Seenplatte",
         "Landkreis Rostock",
         "Vorpommern-Rügen",
         "Nordwestmecklenburg",
         "Vorpommern-Greifswald",
         "Ludwigslust-Parchim"
        ],
        "placeholder": "Select area"
       },
       {
        "type": "dropdown",
        "name": "cat_region_de_ns_braunschweig",
        "visible": false,
        "visibleIf": "{cat_region_de_niedersachsen} = 'Braunschweig'",
        "title": "Area",
        "isRequired": true,
        "choices": [
         "Braunschweig, Kreisfreie Stadt",
         "Salzgitter, Kreisfreie Stadt",
         "Wolfsburg, Kreisfreie Stadt",
         "Gifhorn",
         "Goslar",
         "Helmstedt",
         "Northeim",
         "Peine",
         "Wolfenbüttel",
         "Göttingen"
        ],
        "placeholder": "Select area"
       },
       {
        "type": "dropdown",
        "name": "cat_region_de_ns_hannover",
        "visible": false,
        "visibleIf": "{cat_region_de_niedersachsen} = 'Hannover'",
        "title": "Area",
        "isRequired": true,
        "choices": [
         "Diepholz",
         "Hameln-Pyrmont",
         "Hildesheim",
         "Holzminden",
         "Nienburg (Weser)",
         "Schaumburg",
         "Region Hannover"
        ],
        "placeholder": "Select area"
       },
       {
        "type": "dropdown",
        "name": "cat_region_de_ns_luenburg",
        "visible": false,
        "visibleIf": "{cat_region_de_niedersachsen} = 'Lüneburg'",
        "title": "Area",
        "isRequired": true,
        "choices": [
         "Celle",
         "Cuxhaven",
         "Harburg",
         "Lüchow-Dannenberg",
         "Lüneburg, Landkreis",
         "Osterholz",
         "Rotenburg (Wümme)",
         "Heidekreis",
         "Stade",
         "Uelzen",
         "Verden"
        ],
        "placeholder": "Select area"
       },
       {
        "type": "dropdown",
        "name": "cat_region_de_ns_we",
        "visible": false,
        "visibleIf": "{cat_region_de_niedersachsen} = 'Weser-Ems'",
        "title": "Area",
        "isRequired": true,
        "choices": [
         "Delmenhorst, Kreisfreie Stadt",
         "Emden, Kreisfreie Stadt",
         "Oldenburg (Oldenburg), Kreisfreie Stadt",
         "Osnabrück, Kreisfreie Stadt",
         "Wilhelmshaven, Kreisfreie Stadt",
         "Ammerland",
         "Aurich",
         "Cloppenburg",
         "Emsland",
         "Friesland (DE)",
         "Grafschaft Bentheim",
         "Leer",
         "Oldenburg, Landkreis",
         "Osnabrück, Landkreis",
         "Vechta",
         "Wesermarsch",
         "Wittmund"
        ],
        "placeholder": "Select area"
       },
       {
        "type": "dropdown",
        "name": "cat_region_de_nrw_duesseldorf",
        "visible": false,
        "visibleIf": "{cat_region_de_nrw} = 'Düsseldorf'",
        "title": "Area",
        "isRequired": true,
        "choices": [
         "Düsseldorf, Kreisfreie Stadt",
         "Duisburg, Kreisfreie Stadt",
         "Essen, Kreisfreie Stadt",
         "Krefeld, Kreisfreie Stadt",
         "Mönchengladbach, Kreisfreie Stadt",
         "Mülheim an der Ruhr, Kreisfreie Stadt",
         "Oberhausen, Kreisfreie Stadt",
         "Remscheid, Kreisfreie Stadt",
         "Solingen, Kreisfreie Stadt",
         "Wuppertal, Kreisfreie Stadt",
         "Kleve",
         "Mettmann",
         "Rhein-Kreis Neuss",
         "Viersen",
         "Wesel"
        ],
        "placeholder": "Select area"
       },
       {
        "type": "dropdown",
        "name": "cat_region_de_nrw_muenster",
        "visible": false,
        "visibleIf": "{cat_region_de_nrw} = 'Münster'",
        "title": "Area",
        "isRequired": true,
        "choices": [
         "Bottrop, Kreisfreie Stadt",
         "Gelsenkirchen, Kreisfreie Stadt",
         "Münster, Kreisfreie Stadt",
         "Borken",
         "Coesfeld",
         "Recklinghausen",
         "Steinfurt",
         "Warendorf"
        ],
        "placeholder": "Select area"
       },
       {
        "type": "dropdown",
        "name": "cat_region_de_nrw_detmold",
        "visible": false,
        "visibleIf": "{cat_region_de_nrw} = 'Detmold'",
        "title": "Area",
        "isRequired": true,
        "choices": [
         "Bielefeld, Kreisfreie Stadt",
         "Gütersloh",
         "Herford",
         "Höxter",
         "Lippe",
         "Minden-Lübbecke",
         "Paderborn"
        ],
        "placeholder": "Select area"
       },
       {
        "type": "dropdown",
        "name": "cat_region_de_nrw_arnsberg",
        "visible": false,
        "visibleIf": "{cat_region_de_nrw} = 'Arnsberg'",
        "title": "Area",
        "isRequired": true,
        "choices": [
         "Bochum, Kreisfreie Stadt",
         "Dortmund, Kreisfreie Stadt",
         "Hagen, Kreisfreie Stadt",
         "Hamm, Kreisfreie Stadt",
         "Herne, Kreisfreie Stadt",
         "Ennepe-Ruhr-Kreis",
         "Hochsauerlandkreis",
         "Märkischer Kreis",
         "Olpe",
         "Siegen-Wittgenstein",
         "Soest",
         "Unna"
        ],
        "placeholder": "Select area"
       },
       {
        "type": "dropdown",
        "name": "cat_region_de_rp_koblenz",
        "visible": false,
        "visibleIf": "{cat_region_de_rp} = 'Koblenz'",
        "title": "Area",
        "isRequired": true,
        "choices": [
         "Koblenz, Kreisfreie Stadt",
         "Ahrweiler",
         "Altenkirchen (Westerwald)",
         "Bad Kreuznach",
         "Birkenfeld",
         "Mayen-Koblenz",
         "Neuwied",
         "Rhein-Lahn-Kreis",
         "Westerwaldkreis",
         "Cochem-Zell",
         "Rhein-Hunsrück-Kreis"
        ],
        "placeholder": "Select area"
       },
       {
        "type": "dropdown",
        "name": "cat_region_de_rp_trier",
        "visible": false,
        "visibleIf": "{cat_region_de_rp} = 'Trier'",
        "title": "Area",
        "isRequired": true,
        "choices": [
         "Trier, Kreisfreie Stadt",
         "Bernkastel-Wittlich",
         "Eifelkreis Bitburg-Prüm",
         "Vulkaneifel",
         "Trier-Saarburg"
        ],
        "placeholder": "Select area"
       },
       {
        "type": "dropdown",
        "name": "cat_region_de_rp_rp",
        "visible": false,
        "visibleIf": "{cat_region_de_rp} = 'Rheinhessen-Pfalz'",
        "title": "Area",
        "isRequired": true,
        "choices": [
         "Frankenthal (Pfalz), Kreisfreie Stadt",
         "Kaiserslautern, Kreisfreie Stadt",
         "Landau in der Pfalz, Kreisfreie Stadt",
         "Ludwigshafen am Rhein, Kreisfreie Stadt",
         "Mainz, Kreisfreie Stadt",
         "Neustadt an der Weinstraße, Kreisfreie Stadt",
         "Pirmasens, Kreisfreie Stadt",
         "Speyer, Kreisfreie Stadt",
         "Worms, Kreisfreie Stadt",
         "Zweibrücken, Kreisfreie Stadt",
         "Alzey-Worms",
         "Bad Dürkheim",
         "Donnersbergkreis",
         "Germersheim",
         "Kaiserslautern, Landkreis",
         "Kusel",
         "Südliche Weinstraße",
         "Rhein-Pfalz-Kreis",
         "Mainz-Bingen",
         "Südwestpfalz"
        ],
        "placeholder": "Select area"
       },
       {
        "type": "dropdown",
        "name": "cat_region_de_saarland",
        "visible": false,
        "visibleIf": "{cat_region_state_de} = 'Saarland'",
        "title": "Area",
        "isRequired": true,
        "choices": [
         "Regionalverband Saarbrücken",
         "Merzig-Wadern",
         "Neunkirchen",
         "Saarlouis",
         "Saarpfalz-Kreis",
         "St. Wendel"
        ],
        "placeholder": "Select area"
       },
       {
        "type": "dropdown",
        "name": "cat_region_de_sachen_dresden",
        "visible": false,
        "visibleIf": "{cat_region_de_sachsen} = 'Dresden'",
        "title": "Area",
        "isRequired": true,
        "choices": [
         "Dresden, Kreisfreie Stadt",
         "Bautzen",
         "Görlitz",
         "Meißen",
         "Sächsische Schweiz-Osterzgebirge"
        ],
        "placeholder": "Select area"
       },
       {
        "type": "dropdown",
        "name": "cat_region_de_sachsen_chemnitz",
        "visible": false,
        "visibleIf": "{cat_region_de_sachsen} = 'Chemnitz'",
        "title": "Area",
        "isRequired": true,
        "choices": [
         "Chemnitz, Kreisfreie Stadt",
         "Erzgebirgskreis",
         "Mittelsachsen",
         "Vogtlandkreis",
         "Zwickau"
        ],
        "placeholder": "Select area"
       },
       {
        "type": "dropdown",
        "name": "cat_region_de_sachsen_leipzig",
        "visible": false,
        "visibleIf": "{cat_region_de_sachsen} = 'Leipzig'",
        "title": "Area",
        "isRequired": true,
        "choices": [
         "Leipzig, Kreisfreie Stadt",
         "Leipzig",
         "Nordsachsen"
        ],
        "placeholder": "Select area"
       },
       {
        "type": "dropdown",
        "name": "cat_region_de_sa",
        "visible": false,
        "visibleIf": "{cat_region_state_de} = 'Sachsen-Anhalt'",
        "title": "Area",
        "isRequired": true,
        "choices": [
         "Dessau-Roßlau, Kreisfreie Stadt",
         "Halle (Saale), Kreisfreie Stadt",
         "Magdeburg, Kreisfreie Stadt",
         "Altmarkkreis Salzwedel",
         "Anhalt-Bitterfeld",
         "Jerichower Land",
         "Börde",
         "Burgenlandkreis",
         "Harz",
         "Mansfeld-Südharz",
         "Saalekreis",
         "Salzlandkreis",
         "Stendal",
         "Wittenberg"
        ],
        "placeholder": "Select area"
       },
       {
        "type": "dropdown",
        "name": "cat_region_de_sh",
        "visible": false,
        "visibleIf": "{cat_region_state_de} = 'Schleswig-Holstein'",
        "title": "Area",
        "isRequired": true,
        "choices": [
         "Flensburg, Kreisfreie Stadt",
         "Kiel, Kreisfreie Stadt",
         "Lübeck, Kreisfreie Stadt",
         "Neumünster, Kreisfreie Stadt",
         "Dithmarschen",
         "Herzogtum Lauenburg",
         "Nordfriesland",
         "Ostholstein",
         "Pinneberg",
         "Plön",
         "Rendsburg-Eckernförde",
         "Schleswig-Flensburg",
         "Segeberg",
         "Steinburg",
         "Stormarn"
        ],
        "placeholder": "Select area"
       },
       {
        "type": "dropdown",
        "name": "cat_region_de_thueringen",
        "visible": false,
        "visibleIf": "{cat_region_state_de} = 'Thüringen'",
        "title": "Area",
        "isRequired": true,
        "choices": [
         "Erfurt, Kreisfreie Stadt",
         "Gera, Kreisfreie Stadt",
         "Jena, Kreisfreie Stadt",
         "Suhl, Kreisfreie Stadt",
         "Weimar, Kreisfreie Stadt",
         "Eichsfeld",
         "Nordhausen",
         "Unstrut-Hainich-Kreis",
         "Kyffhäuserkreis",
         "Schmalkalden-Meiningen",
         "Gotha",
         "Sömmerda",
         "Hildburghausen",
         "Ilm-Kreis",
         "Weimarer Land",
         "Sonneberg",
         "Saalfeld-Rudolstadt",
         "Saale-Holzland-Kreis",
         "Saale-Orla-Kreis",
         "Greiz",
         "Altenburger Land",
         "Eisenach, Kreisfreie Stadt",
         "Wartburgkreis"
        ],
        "placeholder": "Select area"
       }
      ],
      "title": "Which country does the house belong to?",
      "description": "Understanding the location of the house can provide valuable insight into its environmental factors, such as the amount of sunlight it receives."
     },
     {
      "name": "cat_con_1",
      "elements": [
       {
        "type": "text",
        "name": "cat_con_size",
        "title": "What is the size of the house? ",
        "description": "Square metre",
        "isRequired": true,
        "inputType": "number",
        "min": 0
       }
      ],
      "title": "House condition",
      "description": "Knowing the condition of a house can assist in understanding its energy consumption by calculating factors such as insulation efficiency."
     },
     {
      "name": "cat_con_2",
      "elements": [
       {
        "type": "dropdown",
        "name": "cat_con_year",
        "title": "When was the house built?",
        "description": "Knowing the year a house was built can provide insight into its construction materials, such as the composition of the walls.",
        "isRequired": true,
        "choices": [
         {
          "value": "Item 1",
          "text": "before \" \""
         },
         {
          "value": "Item 2",
          "text": "\" \" - \" \""
         },
         {
          "value": "Item 3",
          "text": "\" \" - now"
         }
        ]
       }
      ],
      "title": "House condition",
      "description": "Knowing the condition of a house can assist in understanding its energy consumption by calculating factors such as insulation efficiency."
     },
     {
      "name": "cat_con_3",
      "elements": [
       {
        "type": "boolean",
        "name": "cat_con_renovate",
        "visibleIf": "{cat_con_year} notempty",
        "title": "Has the house ever been renovated before?",
        "description": "Renovations can include upgrading insulation, replacing windows with energy-efficient ones, installing high-efficiency HVAC systems, sealing air leaks, etc. ",
        "isRequired": true
       },
       {
        "type": "checkbox",
        "name": "cat_con_renovate_selection",
        "visible": false,
        "visibleIf": "{cat_con_renovate} = true",
        "title": "What have been renovated in the house?",
        "isRequired": true,
        "choices": [
         {
          "value": "Item 1",
          "text": "Basement"
         },
         {
          "value": "Item 2",
          "text": "Roof"
         },
         {
          "value": "Item 3",
          "text": "Window"
         },
         {
          "value": "Item 4",
          "text": "Wall"
         }
        ],
        "showSelectAllItem": true
       }
      ],
      "title": "House condition",
      "description": "Knowing the condition of a house can assist in understanding its energy consumption by calculating factors such as insulation efficiency."
     },
     {
      "name": "cat_use_1",
      "elements": [
       {
        "type": "text",
        "name": "cat_use_adultNo",
        "title": "Adults",
        "description": "Age 25 and above",
        "isRequired": true,
        "inputType": "number",
        "min": 0
       },
       {
        "type": "text",
        "name": "cat_use_childrenNo",
        "title": "Young people",
        "description": "Age 0-25",
        "isRequired": true,
        "inputType": "number",
        "min": 0
       }
      ],
      "title": "How many people are living in the house?"
     },
     {
      "name": "cat_use_2",
      "elements": [
       {
        "type": "dropdown",
        "name": "cat_use_wfh_1",
        "visible": false,
        "visibleIf": "{cat_use_adultNo} > 0",
        "title": "Adult 1",
        "isRequired": true,
        "choices": [
         {
          "value": "Item 1",
          "text": "0 day per week"
         },
         {
          "value": "Item 2",
          "text": "1 day per week"
         },
         {
          "value": "Item 3",
          "text": "2 day per week"
         },
         {
          "value": "Item 4",
          "text": "3 day per week"
         },
         {
          "value": "Item 5",
          "text": "4 day per week"
         },
         {
          "value": "Item 6",
          "text": "5 day per week"
         }
        ]
       },
       {
        "type": "dropdown",
        "name": "cat_use_wfh_2",
        "visible": false,
        "visibleIf": "{cat_use_adultNo} > 1",
        "title": "Adult 2",
        "isRequired": true,
        "choices": [
         {
          "value": "Item 1",
          "text": "0 day per week"
         },
         {
          "value": "Item 2",
          "text": "1 day per week"
         },
         {
          "value": "Item 3",
          "text": "2 day per week"
         },
         {
          "value": "Item 4",
          "text": "3 day per week"
         },
         {
          "value": "Item 5",
          "text": "4 day per week"
         },
         {
          "value": "Item 6",
          "text": "5 day per week"
         }
        ]
       },
       {
        "type": "dropdown",
        "name": "cat_use_wfh_3",
        "visible": false,
        "visibleIf": "{cat_use_adultNo} > 2",
        "title": "Adult 3",
        "isRequired": true,
        "choices": [
         {
          "value": "Item 1",
          "text": "0 day per week"
         },
         {
          "value": "Item 2",
          "text": "1 day per week"
         },
         {
          "value": "Item 3",
          "text": "2 day per week"
         },
         {
          "value": "Item 4",
          "text": "3 day per week"
         },
         {
          "value": "Item 5",
          "text": "4 day per week"
         },
         {
          "value": "Item 6",
          "text": "5 day per week"
         }
        ]
       },
       {
        "type": "dropdown",
        "name": "cat_use_wfh_4",
        "visible": false,
        "visibleIf": "{cat_use_adultNo} > 3",
        "title": "Adult 4",
        "isRequired": true,
        "choices": [
         {
          "value": "Item 1",
          "text": "0 day per week"
         },
         {
          "value": "Item 2",
          "text": "1 day per week"
         },
         {
          "value": "Item 3",
          "text": "2 day per week"
         },
         {
          "value": "Item 4",
          "text": "3 day per week"
         },
         {
          "value": "Item 5",
          "text": "4 day per week"
         },
         {
          "value": "Item 6",
          "text": "5 day per week"
         }
        ]
       },
       {
        "type": "dropdown",
        "name": "cat_use_wfh_5",
        "visible": false,
        "visibleIf": "{cat_use_adultNo} > 4",
        "title": "Adult 5",
        "isRequired": true,
        "choices": [
         {
          "value": "Item 1",
          "text": "0 day per week"
         },
         {
          "value": "Item 2",
          "text": "1 day per week"
         },
         {
          "value": "Item 3",
          "text": "2 day per week"
         },
         {
          "value": "Item 4",
          "text": "3 day per week"
         },
         {
          "value": "Item 5",
          "text": "4 day per week"
         },
         {
          "value": "Item 6",
          "text": "5 day per week"
         }
        ]
       },
       {
        "type": "dropdown",
        "name": "cat_use_wfh_6",
        "visible": false,
        "visibleIf": "{cat_use_adultNo} > 5\n",
        "title": "Adult 6",
        "isRequired": true,
        "choices": [
         {
          "value": "Item 1",
          "text": "0 day per week"
         },
         {
          "value": "Item 2",
          "text": "1 day per week"
         },
         {
          "value": "Item 3",
          "text": "2 day per week"
         },
         {
          "value": "Item 4",
          "text": "3 day per week"
         },
         {
          "value": "Item 5",
          "text": "4 day per week"
         },
         {
          "value": "Item 6",
          "text": "5 day per week"
         }
        ]
       },
       {
        "type": "dropdown",
        "name": "question2",
        "visible": false,
        "visibleIf": "{cat_use_adultNo} > 6\n\n",
        "title": "Adult 7",
        "isRequired": true,
        "choices": [
         {
          "value": "Item 1",
          "text": "0 day per week"
         },
         {
          "value": "Item 2",
          "text": "1 day per week"
         },
         {
          "value": "Item 3",
          "text": "2 day per week"
         },
         {
          "value": "Item 4",
          "text": "3 day per week"
         },
         {
          "value": "Item 5",
          "text": "4 day per week"
         },
         {
          "value": "Item 6",
          "text": "5 day per week"
         }
        ]
       },
       {
        "type": "dropdown",
        "name": "cat_use_wfh_8",
        "visible": false,
        "visibleIf": "{cat_use_adultNo} > 8\n\n\n",
        "title": "Adult 8",
        "isRequired": true,
        "choices": [
         {
          "value": "Item 1",
          "text": "0 day per week"
         },
         {
          "value": "Item 2",
          "text": "1 day per week"
         },
         {
          "value": "Item 3",
          "text": "2 day per week"
         },
         {
          "value": "Item 4",
          "text": "3 day per week"
         },
         {
          "value": "Item 5",
          "text": "4 day per week"
         },
         {
          "value": "Item 6",
          "text": "5 day per week"
         }
        ]
       },
       {
        "type": "dropdown",
        "name": "cat_use_wfh_9",
        "visible": false,
        "visibleIf": "{cat_use_adultNo} > 9\n\n\n",
        "title": "Adult 9",
        "isRequired": true,
        "choices": [
         {
          "value": "Item 1",
          "text": "0 day per week"
         },
         {
          "value": "Item 2",
          "text": "1 day per week"
         },
         {
          "value": "Item 3",
          "text": "2 day per week"
         },
         {
          "value": "Item 4",
          "text": "3 day per week"
         },
         {
          "value": "Item 5",
          "text": "4 day per week"
         },
         {
          "value": "Item 6",
          "text": "5 day per week"
         }
        ]
       }
      ],
      "title": "How often does each adult work from home?"
     },
     {
      "name": "cat_use_3",
      "elements": [
       {
        "type": "boolean",
        "name": "cat_use_car",
        "title": "Does anyone in the house have an electric car?",
        "isRequired": true
       }
      ],
      "title": "Energy use"
     },
     {
      "name": "cat_use_4",
      "elements": [
       {
        "type": "boolean",
        "name": "cat_use_ac",
        "title": "Is there any air conditioner in the house?",
        "isRequired": true
       },
       {
        "type": "text",
        "name": "cat_use_ac_power",
        "visible": false,
        "visibleIf": "{cat_use_ac} = true",
        "title": "What is the power of the air conditioner?",
        "description": "Watts per hour \n(The average power of an air conditioner is 3000 watts per hour)",
        "defaultValueExpression": "3000",
        "inputType": "number",
        "min": 0
       },
       {
        "type": "dropdown",
        "name": "cat_use_ac_efficiency",
        "visible": false,
        "visibleIf": "{cat_use_ac} = true",
        "title": "What is the energy efficiency class of the air conditioner?",
        "description": "(The average energy efficiency class of an air conditioner is class F)",
        "defaultValueExpression": "F",
        "choices": [
         {
          "value": "Item 1",
          "text": "Class A"
         },
         {
          "value": "Item 2",
          "text": "Class B"
         },
         {
          "value": "Item 3",
          "text": "Class C"
         },
         {
          "value": "Item 4",
          "text": "Class D"
         },
         {
          "value": "Item 5",
          "text": "Class E"
         },
         {
          "value": "Item 6",
          "text": "Class F"
         },
         {
          "value": "Item 7",
          "text": "Class G"
         }
        ]
       }
      ],
      "title": "Energy use"
     },
     {
      "name": "cat_use_5",
      "elements": [
       {
        "type": "dropdown",
        "name": "cat_use_source",
        "title": "What type of heating energy is used in the house?",
        "isRequired": true,
        "choices": [
         "Biomass",
         "District heating",
         "Electricity",
         "Heating oil",
         "Natural gas",
         "Others"
        ]
       }
      ],
      "title": "Energy use"
     },
     {
      "name": "cat_use_6",
      "elements": [
       {
        "type": "dropdown",
        "name": "cat_use_mintemp",
        "title": "Minimal temperature",
        "description": "degrees Celsius",
        "isRequired": true,
        "choices": [
         {
          "value": "Item 1",
          "text": "0"
         },
         {
          "value": "Item 2",
          "text": "1"
         },
         {
          "value": "Item 4",
          "text": "3"
         },
         {
          "value": "Item 5",
          "text": "4"
         },
         {
          "value": "Item 6",
          "text": "5"
         },
         {
          "value": "Item 7",
          "text": "6"
         },
         {
          "value": "Item 8",
          "text": "7"
         },
         {
          "value": "Item 9",
          "text": "8"
         },
         {
          "value": "Item 10",
          "text": "9"
         },
         {
          "value": "Item 11",
          "text": "10"
         },
         {
          "value": "Item 12",
          "text": "11"
         },
         {
          "value": "Item 13",
          "text": "12"
         },
         {
          "value": "Item 14",
          "text": "13"
         },
         {
          "value": "Item 15",
          "text": "14"
         },
         {
          "value": "Item 16",
          "text": "15"
         },
         {
          "value": "Item 17",
          "text": "16"
         },
         {
          "value": "Item 18",
          "text": "17"
         },
         {
          "value": "Item 19",
          "text": "18"
         },
         {
          "value": "Item 20",
          "text": "19"
         },
         {
          "value": "Item 21",
          "text": "20"
         },
         {
          "value": "Item 22",
          "text": "21"
         },
         {
          "value": "Item 23",
          "text": "22"
         },
         {
          "value": "Item 24",
          "text": "23"
         },
         {
          "value": "Item 25",
          "text": "24"
         },
         {
          "value": "Item 26",
          "text": "25"
         },
         {
          "value": "Item 27",
          "text": "26"
         },
         {
          "value": "Item 28",
          "text": "27"
         },
         {
          "value": "Item 29",
          "text": "28"
         }
        ],
        "placeholder": "Select"
       },
       {
        "type": "dropdown",
        "name": "cat_use_maxtemp",
        "title": "Maximal temperature",
        "description": "degrees Celsius",
        "isRequired": true,
        "choices": [
         {
          "value": "Item 1",
          "text": "0"
         },
         {
          "value": "Item 2",
          "text": "1"
         },
         {
          "value": "Item 4",
          "text": "3"
         },
         {
          "value": "Item 5",
          "text": "4"
         },
         {
          "value": "Item 6",
          "text": "5"
         },
         {
          "value": "Item 7",
          "text": "6"
         },
         {
          "value": "Item 8",
          "text": "7"
         },
         {
          "value": "Item 9",
          "text": "8"
         },
         {
          "value": "Item 10",
          "text": "9"
         },
         {
          "value": "Item 11",
          "text": "10"
         },
         {
          "value": "Item 12",
          "text": "11"
         },
         {
          "value": "Item 13",
          "text": "12"
         },
         {
          "value": "Item 14",
          "text": "13"
         },
         {
          "value": "Item 15",
          "text": "14"
         },
         {
          "value": "Item 16",
          "text": "15"
         },
         {
          "value": "Item 17",
          "text": "16"
         },
         {
          "value": "Item 18",
          "text": "17"
         },
         {
          "value": "Item 19",
          "text": "18"
         },
         {
          "value": "Item 20",
          "text": "19"
         },
         {
          "value": "Item 21",
          "text": "20"
         },
         {
          "value": "Item 22",
          "text": "21"
         },
         {
          "value": "Item 23",
          "text": "22"
         },
         {
          "value": "Item 24",
          "text": "23"
         },
         {
          "value": "Item 25",
          "text": "24"
         },
         {
          "value": "Item 26",
          "text": "25"
         },
         {
          "value": "Item 27",
          "text": "26"
         },
         {
          "value": "Item 28",
          "text": "27"
         },
         {
          "value": "Item 29",
          "text": "28"
         }
        ],
        "placeholder": "Select"
       }
      ],
      "title": "What is the ideal home temperature range?"
     },
     {
      "name": "cat_hes_1",
      "elements": [
       {
        "type": "boolean",
        "name": "cat_hes_pv",
        "title": "Is there a photovoltaic (PV) system in the House?",
        "description": "A PV system is a system that uses solar panels to convert sunlight into electricity for use in a building.",
        "isRequired": true
       },
       {
        "type": "text",
        "name": "cat_hes_pv_size",
        "visible": false,
        "visibleIf": "{cat_hes_pv} = true",
        "title": "What is the size of the PV system?",
        "description": "kW_peak\n(The average size of a PV system is 4kW_peak)",
        "defaultValueExpression": "4",
        "isRequired": true,
        "inputType": "number",
        "min": 0
       }
      ],
      "title": "Home energy system"
     },
     {
      "name": "cat_hes_2",
      "elements": [
       {
        "type": "boolean",
        "name": "cat_hes_battery",
        "title": "Is there a battery system in the house?",
        "description": "A home battery system is a device that stores energy produced by solar panels or other sources to be used later when needed.",
        "isRequired": true
       },
       {
        "type": "text",
        "name": "cat_hes_battery_cap",
        "visible": false,
        "visibleIf": "{cat_hes_battery} = true",
        "title": "What is the capacity of the battery?",
        "description": "Kilowatt-hours \n(The average capacity of a home battery system is around 5 kilowatt-hours)",
        "defaultValueExpression": "5",
        "inputType": "number",
        "min": 0
       }
      ],
      "title": "Home energy system"
     },
     {
      "name": "cat_hes_3",
      "elements": [
       {
        "type": "boolean",
        "name": "cat_use_sems",
        "title": "Is there a smart energy management system in the house?",
        "isRequired": true
       }
      ],
      "title": "Home energy system"
     }
    ],
    "showTitle": false,
    "showCompletedPage": false,
    "navigateToUrl": "/result.html"
   }