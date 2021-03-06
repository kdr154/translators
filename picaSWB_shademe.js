{
	"translatorID": "2edf7a1b-eded-48d7-ae11-7126fd1c1b07s",
	"label": "PicaSWB_shademe",
	"creator": "Philipp Zumstein, Timotheus Kim, Mario Trojan",
	"target": "txt",
	"minVersion": "3.0",
	"maxVersion": "",
	"priority": 100,
	"inRepository": true,
	"translatorType": 2,
	"browserSupport": "gcs",
	"lastUpdated": "2018-07-09 16:45:00"
}


// Zotero Export Translator für das Pica Intern Format
// (wie es im SWB Verbund benutzt wird)


/*
	***** BEGIN LICENSE BLOCK *****
	Copyright © 2016 Philipp Zumstein
	This file is part of Zotero.
	Zotero is free software: you can redistribute it and/or modify
	it under the terms of the GNU Affero General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.
	Zotero is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
	GNU Affero General Public License for more details.
	You should have received a copy of the GNU Affero General Public License
	along with Zotero. If not, see <http://www.gnu.org/licenses/>.
	***** END LICENSE BLOCK *****
*/

/* =============================================================================================================== */
// Mapping tables that get populated with the entries from their corresponding map files in the Github repo
var issn_to_keyword_field = {};
var issn_to_language_code = {};
var issn_to_license = {};
var issn_to_physical_form = {};
var issn_to_ssg = {};
var issn_to_superior_ppn = {};
var issn_to_volume = {};
var language_to_language_code = {};
// Repository base URL
var zts_enhancement_repo_url = 'https://raw.githubusercontent.com/ubtue/zotero-enhancement-maps/master/';
var downloaded_map_files = 0;
var max_map_files = 8;


/*
    The following maps DO NOT have a corresponding file in the zts_enhancement_maps repository.
    Until they are added somewhere online for downloading, we'll use the hardcoded maps that follow:
*/
// Mapping für JournalTitle>PPN
var journal_title_to_ppn = {
	"Perspectives in Religious Studies" : "!014809931!", //Perspectives in religious studies Print-PPN
	"Journal of the Evangelical Theological Society" : "!345580796!", // Journal of the Evangelical Theological Society Print-PPN
	"American Baptist Quarterly" : "!015260909!", // American Baptist Quarterly Print-PPN
	"Churchman" : "!015191273!", // Churchman Print-PPN
	"Liturgisches Jahrbuch" : "!014407558!", // Liturgisches Jahrbuch Print-PPN
	"The Mennonite Quarterly Review" : "!015181278!", // The Mennonite Quarterly Review Print-PPN
	"Journal of Theological Interpretation" : "!424663988!", // Journal of Theological Interpretation E-PPN
	"Oriens Christianus" :"!014895242!", // Oriens Christianus Print-PPN
	"Phronema" : "!477959601!", // Phronema E-PPN
	"Word & World" : "!325341044!", // Word & World E-PPN
	"Ephemerides Theologicae Lovanienses" : "!112891160!", // Ephemerides theologicae Lovanienses
	"Lumen Vitae" : "!428280439!", // Lumen Vitae E-PPN
	"Religion and Society" : "!015198073!", // Religion and Society Print-PPN
	"Counseling et spiritualité / Counselling and Spirituality" : "!410016403!", // Counseling et spiritualité / Counselling and Spirituality E-PPN
	"Detroit Baptist Seminary Journal" : "!454420730!", // Detroit Baptist Seminary Journal E-PPN
	"One in Christ" : "!015178552!", // One in Christ Print-PPN
	"The Reformed Theological Review" : "!42401243X!", // The Reformed Theological Review E-PPN
	"Studies in Spirituality" : "!113564856!", // Studies in Spirituality E-PPN
	"Philosophia Christi" : "!106362623!", // Philosophia Christi
	"Calvin Theological Journal" : "!501717714!", // Calvin Theological Journal
	"Anglican and Episcopal History" : "!016232976!", // Anglican and Episcopal History
	"Foi et vie" : "!455507414!", // Foi et vie
	"Protestantesimo" : "!015182266!", // Protestantesimo
	"Ethical Perspectives" : "!112891179!", // Ethical Perspectives
	"Journal of Eastern Christian Studies" : "!112891225!", // Journal of Eastern Christian Studies
	"Antonianum" : "!014992124!", // Antonianum
	"Dialogue & Alliance" : "!023125381!", // Dialogue & Alliance
	"Luther" : "!014414112!", // Luther, Zeitschrift der Luthergesellschaft
	"Journal of Eastern Christian Studies" : "!112891225!", // Journal of Eastern Christian Studies
	"American Journal of Theology & Philosophy" : "!318814447!", // American journal of theology and philosophy
	"Louvain Studies" : "!113144229!", // Louvain Studies
	"ARC" : "!059754931!", // ARC
	"Science et Esprit" : "!015183734!", // Science et Esprit
	"Questions Liturgiques/Studies in Liturgy" : "!11395039X!", // Questions Litugiques
	"Ons Geestelijk Erf" : "!114618771!", // Ons Geestelijk Erf
	"Studia Canonica" : "!413867323!", // Studia Canonica
	"Journal of Coptic Studies" : "!112891217!", // Journal of Coptic Studies
	"Revue Théologique de Louvain" : "!379064863!", // Revue Théologique de Louvain

};
// Mapping JournalTitle>Language
var journal_title_to_language_code = {
	"Oriens Christianus" :"ger",
	"Ephemerides Theologicae Lovanienses" : "fre",
	"Science et Esprit" : "fre",
}

//notes > IxTheo Notationen
var notes_to_ixtheo_notation = {

"aa" : "!372042961!",
"ab" : "!372042996!",
"ad" : "!372043011!",
"ae" : "!37204302x!",
"af" : "!372043208!",
"ag" : "!372043224!",
"ah" : "!48036480x!",
"ax" : "!372043259!",
"az" : "!372043321!",
"ba" : "!37204333x!",
"bb" : "!372043348!",
"bc" : "!372043372!",
"bd" : "!372043380!",
"be" : "!372043399!",
"bf" : "!372043410!",
"bg" : "!372043445!",
"bh" : "!372043526!",
"bj" : "!372043534!",
"bk" : "!372043577!",
"bl" : "!37204364x!",
"bm" : "!372043666!",
"bn" : "!372043704!",
"br" : "!372043720!",
"bs" : "!480735654!",
"bt" : "!480735697!",
"ca" : "!372043747!",
"cb" : "!372043763!",
"cc" : "!372043801!",
"cd" : "!372043852!",
"ce" : "!372043887!",
"cf" : "!372043895!",
"cg" : "!372043917!",
"ch" : "!480735840!",
"fa" : "!372044026!",
"fb" : "!372044042!",
"fd" : "!372044077!",
"ha" : "!372044085!",
"hb" : "!372044123!",
"hc" : "!372044131!",
"hd" : "!372044166!",
"hh" : "!372044182!",
"kaa" : "!372044220!",
"kab" : "!37204428x!",
"kac" : "!372044336!",
"kad" : "!37204445x!",
"kae" : "!372044468!",
"kaf" : "!372044530!",
"kag" : "!372044603!",
"kah" : "!37204462x!",
"kaj" : "!372044646!",
"kba" : "!372044697!",
"kbb" : "!372044727!",
"kbc" : "!372044743!",
"kbd" : "!37204476x!",
"kbe" : "!372044786!",
"kbf" : "!372044883!",
"kbg" : "!372044980!",
"kbh" : "!372044999!",
"kbj" : "!372048781!",
"kbk" : "!37204882x!",
"kbl" : "!372048889!",
"kbm" : "!372048935!",
"kbn" : "!372049028!",
"kbp" : "!372049109!",
"kbq" : "!372049222!",
"kbr" : "!372049273!",
"kbs" : "!372049354!",
"kca" : "!372049443!",
"kcb" : "!372049494!",
"kcc" : "!372049613!",
"kcd" : "!372049656!",
"kda" : "!372049729!",
"kdb" : "!372049834!",
"kdc" : "!372049931!",
"kdd" : "!372050042!",
"kde" : "!37205014x!",
"kdf" : "!372050379!",
"kdg" : "!372050476!",
"kdh" : "!480736162!",
"kdj" : "!372050603!",
"naa" : "!372050786!",
"nab" : "!372050921!",
"nba" : "!372050999!",
"nbb" : "!372051324!",
"nbc" : "!372051502!",
"nbd" : "!372051537!",
"nbe" : "!372051685!",
"nbf" : "!372051782!",
"nbg" : "!372051960!",
"nbh" : "!372052126!",
"nbj" : "!37205224x!",
"nbk" : "!372052320!",
"nbl" : "!372052363!",
"nbm" : "!37205238x!",
"nbn" : "!37205241x!",
"nbp" : "!372052436!",
"nbq" : "!372052444!",
"nca" : "!372052460!",
"ncb" : "!372052819!",
"ncc" : "!372052835!",
"ncd" : "!372052851!",
"nce" : "!372052959!",
"ncf" : "!372052967!",
"ncg" : "!372052983!",
"nch" : "!480736553!",
"ncj" : "!480736588!",
"ra" : "!372053009!",
"rb" : "!372053025!",
"rc" : "!372053068!",
"rd" : "!372053106!",
"re" : "!372053130!",
"rf" : "!372053157!",
"rg" : "!37205319x!",
"rh" : "!37205322x!",
"rj" : "!372053246!",
"rk" : "!372053270!",
"sa" : "!372053289!",
"sb" : "!372053319!",
"sc" : "!372053335!",
"sd" : "!372053351!",
"se" : "!372053378!",
"ta" : "!372053408!",
"tb" : "!37205353x!",
"tc" : "!372053564!",
"td" : "!372053580!",
"te" : "!372053602!",
"tf" : "!372053637!",
"tg" : "!372053696!",
"th" : "!372053920!",
"tj" : "!372053904!",
"tk" : "!372053882!",
"va" : "!37205384x!",
"vb" : "!372053815!",
"xa" : "!372053793!",
"za" : "!372053777!",
"zb" : "!372053750!",
"zc" : "!480736960!",
"zd" : "!372053742!",
"zf" : "!372053718!",
}
/* =============================================================================================================== */
// ab hier Programmcode
var defaultSsgNummer = "1";
var defaultLanguage = "eng";
var lokaldatensatz = "\nE* l01\n7100$jn \n8002 ixzs;ixzo\n";
//lokaldatensatz z.B. \\n6700 !372049834!\\n6700 !37205241X!\\n6700 !372053025!\\n6700!37205319X!

//item.type --> 0500 Bibliographische Gattung und Status
//http://swbtools.bsz-bw.de/winibwhelp/Liste_0500.htm
// TODO: check if the folowing 3 variables are being used correctly
var cataloguingStatus = "n";//0500 Position 3
var cataloguingStatusO = "n";//0500 Position 3

/*
    WICHTIG - ERST LESEN UND !!!VERSTEHEN!!! BEVOR ÄNDERUNGEN GEMACHT WERDEN

    Hinweise zur Nebenläufigkeit
    - Dieses Skript verwendet Remote-calls zum Auflösen verschiedener Daten (z.B. PPNs für Autoren)
    - Diese Calls sind per Javascript nur asynchron aufrufbar
        - Konstrukte wie z.B. Zotero.wait() und Zotero.done() existieren in der aktuellen Zotero-Version (5) noch, haben aber keine Funktion mehr.
        - Verschiedene Workarounds wurden ausprobiert (z.B. Semaphor über globale Variable), haben aber nie funktioniert
        - Man kommt also um die asynchronen Aufrufe nicht herum

    HINWEISE ZUR IMPLEMENTATION in diesem Skript
    - Die Variable runningThreadCount enthält die Anzahl der noch laufenden Threads (Hauptskript + asynchrone abfragen)
        - Startwert 1 (für Hauptskript)
        - +1 beim Start jedes zusätzlichen asynchronen Aufrufs
        - -1 beim Ende jedes asynchronen Aufrufs (im ondone callback)
        - -1 beim Ende des Hauptskripts
    - Alle Informationen werden im itemsOutputCache nach Item gruppiert gesammelt (laufende Nummer)
    - Erst am Ende des Skripts werden die Einträge im itemsOutputCache sortiert und geschrieben
        - Sortierung ist notwendig, da Hauptskript und asynchrone Threads gemischt Codes reinschreiben => Codes sind durcheinander
        - So wird auch verhindert dass Datensätze durcheinander sind, falls mehrere gleichzeitig exportiert werden
    - Dafür ist es notwendig, dass sowohl das Ende des Skripts als auch jeder einzelne Async ondone callback auf
      runningThreadCount == 0 prüft und bei Bedarf die finale Funktion WriteItems aufruft.
 */

function populateISSNMaps(mapData, url) {
    var mapFilename = url.substr(url.lastIndexOf("/") + 1);
    var temp = new Map();
    var lines = mapData.split('\n');

    for (i in lines) {
        var line = lines[i].split("#")[0].trim();
        if (line.length < 2)
            continue;

        var elements = line.split("=");
        if (elements.length != 2) {
            Z.debug("Line " + i + " in map file " + mapFilename + " has too many/few splits (" + elements.length + ")");
            Z.debug("Invalid line: " + line);
            continue;
        }

        switch (mapFilename) {
            case "ISSN_to_superior_ppn.map":
                temp.set(elements[0], "!" + elements[1] + "!");
                break;
            default:
                temp.set(elements[0], elements[1]);
        }
    }

	if (temp.size == 0) {
		throw "Empty map file! This is unexpected";
	}

    switch (mapFilename) {
        case "ISSN_to_keyword_field.map":
            issn_to_keyword_field = temp;
            break;
        case "ISSN_to_language_code.map":
            issn_to_language_code = temp;
            break;
        case "ISSN_to_licence.map":
            issn_to_license = temp;
            break;
        case "ISSN_to_physical_form.map":
            issn_to_physical_form = temp;
            break;
        case "ISSN_to_SSG.map":
            issn_to_ssg = temp;
            break;
        case "ISSN_to_superior_ppn.map":
            issn_to_superior_ppn = temp;
            break;
        case "ISSN_to_volume.map":
            issn_to_volume = temp;
            break;
        case "language_to_language_code.map":
            language_to_language_code = temp;
            break;
        default:
            throw "Unknown map file: " + mapFilename;
    }

    downloaded_map_files += 1;
}

var runningThreadCount = 1;
var currentItemId = -1;
var itemsOutputCache = []
var authorMapping = {};

/**
 * Diese Funktion dient als Ersatz für Zotero.ProcessDocuments
 * Mit dieser Funktion ist es möglich, der processor-Funktion eine zusätzliche Variable weiterzugeben ("processorParams").
 * Notwendig um z.B. Kopien globaler Variablen weiterzugeben, die sonst den Wert ändern
 * bis die Processor-Funktion am Ende des callbacks aufgerufen wird.
 *
 * Original siehe: https://github.com/zotero/zotero/blob/master/chrome/content/zotero/xpcom/http.js
 */
async function processDocumentsCustom (url, processor, processorParams, onDone, onError) {
    var f = function() {
       Zotero.Utilities.loadDocument(url, function(doc) {
           processor(doc, url, processorParams);
       });

    };

    try {
        await f();
    }
    catch (e) {
        if (onError) {
            onError(e);
        }
        throw e;
    }

    if (onDone) {
        onDone();
    }
};

function addLine(itemid, code, value) {
    //Halbgeviertstrich ersetzen
    value = value.replace(/–/g, '-').replace(/’/g, '\'').replace(/œ/g, '\\u0153').replace(/ā/g, '\\u0101').replace(/â/g, '\\u00E2').replace(/Ṣ/g, '\\u1E62').replace(/ṣ/g, '\\u1E63').replace(/ū/g, '\\u016B').replace(/ḥ/g, '\\u1E25').replace(/ī/g, '\\u012B').replace(/ṭ/g, '\\u1E6D').replace(/ʾ/g, '\\u02BE').replace(/ʿ/g, '\\u02BF').replace(/–/g, '-').replace(/&#160;/g, "");

    //Zeile zusammensetzen
    var line = code + " " + value;
    itemsOutputCache[itemid].push(line);
}

// this should be called at end of each element,
// and also when all async calls are finished (only when runningThreadCount == 0)
function WriteItems() {
    itemsOutputCache.forEach(function(element, index) {
        // sort first, codes might be unsorted due to async stuff
        element.sort();

        // implode + write
        if(index > 0) {
            Zotero.write("\n");
        }
        Zotero.write(element.join("\n") + "\n");
    });
}


function performExport() {
    Z.debug("Begin exporting item(s)...");

    var item;
	while ((item = Zotero.nextItem())) {
        currentItemId++;
        itemsOutputCache[currentItemId] = [];

		var physicalForm = "";//0500 Position 1
		var licenceField = ""; // 0500 Position 4 only for Open Access Items; http://swbtools.bsz-bw.de/cgi-bin/help.pl?cmd=kat&val=4085&regelwerk=RDA&verbund=SWB
		var SsgField = "";
		var superiorPPN = "";

		item.ISSN = ZU.cleanISSN(item.ISSN);
		Z.debug("Item ISSN: " + item.ISSN);
		//enrich items based on their ISSN
		if (!item.language && issn_to_language_code.get(item.ISSN) !== undefined) {
			item.language = issn_to_language_code.get(item.ISSN);
			Z.debug("Found lang:" + item.language);
		}
		if (issn_to_ssg.get(item.ISSN) !== undefined) {
			SsgField = issn_to_ssg.get(item.ISSN);
			Z.debug("Found ssg:" + SsgField);
		}
		if (!item.volume && issn_to_volume.get(item.ISSN) !== undefined) {
			item.volume = issn_to_volume.get(item.ISSN) + item.volume;
			Z.debug("Found volume:" + item.volume);
		}
		if (issn_to_physical_form.get(item.ISSN) !== undefined) {
			physicalForm = issn_to_physical_form.get(item.ISSN); // position 1 http://swbtools.bsz-bw.de/winibwhelp/Liste_0500.htm
			Z.debug("Found physicalForm:" + physicalForm);
		}
		if (issn_to_license.get(item.ISSN) !== undefined) {
			licenceField = issn_to_license.get(item.ISSN); // position 4 http://swbtools.bsz-bw.de/winibwhelp/Liste_0500.htm
			Z.debug("Found license:" + licenceField);
        }
		if (issn_to_superior_ppn.get(item.ISSN) !== undefined) {
			superiorPPN = issn_to_superior_ppn.get(item.ISSN);
			Z.debug("Found superiorPPN:" + superiorPPN);
        }


		var article = false;
		switch (item.itemType) {
			case "journalArticle":
			case "bookSection":
			case "magazineArticle": // wird bei der Erfassung von Rezensionen verwendet. Eintragsart "Magazin-Artikel" wird manuell geändert.
			case "newspaperArticle":
			case "encyclopediaArticle":
				article = true;
				break;
		}

		//item.type --> 0500 Bibliographische Gattung und Status
		//http://swbtools.bsz-bw.de/winibwhelp/Liste_0500.htm
		switch (true) {
			case physicalForm === "A":
				addLine(currentItemId, '0500', physicalForm+"o"+cataloguingStatus);
				break;
			case physicalForm === "O" && licenceField === "l":
				addLine(currentItemId, '0500', physicalForm+"o"+cataloguingStatus+licenceField);
				break;
			case physicalForm === "O" && licenceField === "kw":
				addLine(currentItemId, '0500', physicalForm+"o"+cataloguingStatus);
				break;
			default:
				addLine(currentItemId, '0500', physicalForm+"o"+cataloguingStatus); // //z.B. Aou, Oou, Oox etc.
			}
        //item.type --> 0501 Inhaltstyp
        addLine(currentItemId, "0501", "Text$btxt");

        //item.type --> 0502 Medientyp
        switch (physicalForm) {
            case "A":
                addLine(currentItemId, "0502", "ohne Hilfsmittel zu benutzen$bn");
                break;
            case "O":
                addLine(currentItemId, "0502", "Computermedien$bc");
                break;
            default:
                addLine(currentItemId, "0502", "");
        }

        //item.type --> 0503 Datenträgertyp

        switch (physicalForm) {
            case "A":
                addLine(currentItemId, "0503", "Band$bnc");
                break;
            case "O":
                addLine(currentItemId, "0503", "Online-Ressource$bcr");
                break;
            default:
                addLine(currentItemId, "0503", "");
        }
        //item.date --> 1100
        var date = Zotero.Utilities.strToDate(item.date);
        if (date.year !== undefined) {
            addLine(currentItemId, "1100", date.year.toString() + "$n[" + date.year.toString() + "]");
        }

        //1130 Datenträger
        //http://swbtools.bsz-bw.de/winibwhelp/Liste_1130.htm

        switch (physicalForm) {
            case "A":
                addLine(currentItemId, "1130", "druck");
                break;
            case "O":
                addLine(currentItemId, "1130", "cofz");
                break;
            default:
                addLine(currentItemId, "1130", "");
        }

        //1131 Art des Inhalts
        if (item.itemType == "magazineArticle") {
            addLine(currentItemId, "1131", "!209083166!");
        }

        // 1140 Veröffentlichungsart und Inhalt http://swbtools.bsz-bw.de/winibwhelp/Liste_1140.htm
        if (item.itemType == "magazineArticle") {
            addLine(currentItemId, "1140", "uwre");
        }


        //item.language --> 1500 Sprachcodes
        if (item.language) {
            if (language_to_language_code.get(item.language)) {
                item.language = language_to_language_code.get(item.language);
            }
            addLine(currentItemId, "1500", item.language);
        } else {
            addLine(currentItemId, "1500", defaultLanguage);
        }

        //1505 Katalogisierungsquelle
        addLine(currentItemId, "1505", "$erda");

        //item.ISBN --> 2000 ISBN
        if (item.ISBN) {
            addLine(currentItemId, "2000", item.ISBN);
        }

        //item.DOI --> 2051 bei "Oou" bzw. 2053 bei "Aou"
        if (item.DOI) {
            if (physicalForm === "O") {
                addLine(currentItemId, "2051", item.DOI);
            } else if (physicalForm === "A") {
                addLine(currentItemId, "2053", item.DOI);
            }
        }

        //Autoren --> 3000, 3010
        //Titel, erster Autor --> 4000
        var titleStatement = "";
        if (item.shortTitle == "journalArticle") {
            titleStatement += item.shortTitle;
            if (item.title && item.title.length > item.shortTitle.length) {
                titleStatement += "$d" + item.title.substr(item.shortTitle.length).replace(/^\s*:\s*/,'');
            }
        } else {
            titleStatement += item.title.replace(/\s*:\s*/,'$d');
        }
        //Sortierzeichen hinzufügen, vgl. https://github.com/UB-Mannheim/zotkat/files/137992/ARTIKEL.pdf
        if (item.language == "ger" || !item.language) {
            titleStatement = titleStatement.replace(/^(Der|Die|Das|Des|Dem|Den|Ein|Eines|Einem|Eine|Einen|Einer) ([^@])/, "$1 @$2");
        }
        if (item.language == "eng" || !item.language) {
            titleStatement = titleStatement.replace(/^(The|A|An) ([^@])/, "$1 @$2");
        }
        if (item.language == "fre" || !item.language) {
            titleStatement = titleStatement.replace(/^(Le|La|Les|Des|Un|Une) ([^@])/, "$1 @$2");
            titleStatement = titleStatement.replace(/^L'([^@])/, "L' @$1");
        }
		if (item.language == "ita" || !item.language) {
			titleStatement = titleStatement.replace(/^(La|Le|Lo|Gli|I|Il|Un|Una|Uno) ([^@])/, "$1 @$2");
			titleStatement = titleStatement.replace(/^L'([^@])/, "L' @$1").replace(/^L’([^@])/, "L' @$1");
		}

		if (item.language == "por" || !item.language) {
			titleStatement = titleStatement.replace(/^(A|O|As|Os|Um|Uma|Umas|Uns) ([^@])/, "$1 @$2");
		}
		if (item.language == "spa" || !item.language) {
			titleStatement = titleStatement.replace(/^(El|La|Los|Las|Un|Una|Unos|Unas) ([^@])/, "$1 @$2");
		}

        var i = 0;
        var creator;
        while (item.creators.length>0) {
            creator = item.creators.shift();

            if (creator.creatorType == "author") {
                var authorName = creator.lastName + (creator.firstName ? ", " + creator.firstName : "");

                var code = 0;
                if (i === 0) {
                    code = "3000";
                    titleStatement += "$h" + (creator.firstName ? creator.firstName + " " : "") + creator.lastName;
                } else {
                    code = "3010";
                }

                i++;

                //Lookup für Autoren
                if (authorName[0] != "!") {
                    var lookupUrl = "http://swb.bsz-bw.de/DB=2.104/SET=70/TTL=1/CMD?SGE=&ACT=SRCHM&MATCFILTER=Y&MATCSET=Y&NOSCAN=Y&PARSE_MNEMONICS=N&PARSE_OPWORDS=N&PARSE_OLDSETS=N&IMPLAND=Y&NOABS=Y&ACT0=SRCHA&SHRTST=50&IKT0=1&TRM0=" + authorName +"&ACT1=*&IKT1=2057&TRM1=*&ACT2=*&IKT2=8977&TRM2=(theolog*|neutestament*|alttestament*|kirchenhist*|judais*|Religionswi*|pfarrer*)&ACT3=-&IKT3=8978-&TRM3=1[1%2C2%2C3%2C4%2C5%2C6%2C7%2C8][0%2C1%2C2%2C3%2C4%2C5%2C6%2C7%2C8%2C9][0%2C1%2C2%2C3%2C4%2C5%2C6%2C7%2C8%2C9]?"

                    /*
                    lookupUrl kann je nach Anforderung noch spezifiziert werden, im obigen Abfragebeispiel:
                    suchen [und] (Person(Phrase: Nachname, Vorname) [PER]) " authorName "
                    eingrenzen (Systematiknummer der SWD [SN]) *
                    eingrenzen (Relationiertes Schlagwort in der GND [RLS]) theolog*
                    ausgenommen (Relationierte Zeit in der GND [RLZ]) 1[1,2,3,4,5,6,7,8][0,1,2,3,4,5,6,7,8,9][0,1,2,3,4,5,6,7,8,9]

                    IKT0=1 TRM0= für Persönlicher Name in Picafeld 100
                    IKT1=2057 TRM1=3.* für GND-Systematik
                    IKT2=8963 TRM2=theolog*    für Berufsbezeichnung 550
                    IKT3=8991 TRM3=1[1,2,3,4,5,6,7,8][0,1,2,3,4,5,6,7,8,9][0,1,2,3,4,5,6,7,8,9] für Geburts- und Sterbedatum (Bereich)

                    ###OPERATOREN vor "IKT"###
                    UND-Verknüpfung "&" | ODER-Verknüpfung "%2B&" | Nicht "-&"

                    ###TYP IKT=Indikatoren|Zweite Spalte Schlüssel(IKT)###
                    Liste der Indikatoren und Routine http://swbtools.bsz-bw.de/cgi-bin/help.pl?cmd=idx_list_typ&regelwerk=RDA&verbund=SWB
                    */

                    // threadParams = globale Variablen die sich evtl ändern
                    // während die async-Funktion processDocumentsCustom ausgeführt wird
                    // und daher per Kopie übergeben werden müssen
                    var threadParams = {
                        "currentItemId" : currentItemId,
                        "code" : code,
                        "authorName" : authorName,
                    };

                    runningThreadCount++;
                    processDocumentsCustom(lookupUrl,
                        // processing callback function
                        function(doc, url, threadParams){
                            var ppn = Zotero.Utilities.xpathText(doc, '//small[a[img]]');
                            if (ppn) {
                                var authorValue = "!" + ppn.slice(0,9).trim() + "!" + "$BVerfasserIn$4aut" + "\n8910 $aixzom$bAutor maschinell zugeordnet";
                                addLine(threadParams["currentItemId"], threadParams["code"], authorValue);
                            } else {
                                addLine(threadParams["currentItemId"], threadParams["code"], threadParams["authorName"]  + "$BVerfasserIn$4aut");
                            }

                            // separate onDone function not needed because we only call one url
                            runningThreadCount--;
                            if (runningThreadCount === 0) {
                                for (key in authorMapping) {
                                    var value = authorMapping[key];
                                }
                                WriteItems();
                            }
                        },
                        threadParams,
                        //onDone
                        undefined,
                        //onError
                        function(e) {
                            var message = "Error in external lookup: " + e.message;
                            Zotero.debug(message);
                            Zotero.write(message);
                        }
                    );
                }
            }

            //TODO: editors, other contributors...
        }

        addLine(currentItemId, "4000", titleStatement);

        //Ausgabe --> 4020
        if (item.edition) {
            addLine(currentItemId, "4020", item.edition);
        }

        //Erscheinungsvermerk --> 4030
        if (!article) {
            var publicationStatement = "";
            if (item.place) { publicationStatement += item.place; }
            if (item.publisher) { publicationStatement +=  "$n" + item.publisher; }
            addLine(currentItemId, "4030", publicationStatement);
        }


        //4070 $v Bandzählung $j Jahr $h Heftnummer $p Seitenzahl
        if (item.itemType == "journalArticle" || item.itemType == "magazineArticle") {
            var volumeyearissuepage = "";
			if (item.volume) { volumeyearissuepage += "$v" + item.volume.replace("Tome ", "").replace(/\s\(Number\s\d+-?\d+\)/, "").replace(/^\d.\w..\s\w\w.\s/, ""); }
			if (date.year !== undefined) { volumeyearissuepage +=  "$j" + date.year; }
			if (item.issue) { volumeyearissuepage += "$h" + item.issue.replace("-", "/").replace(/^0/, ""); }
			if (item.pages) { volumeyearissuepage += "$p" + item.pages; }

            addLine(currentItemId, "4070", volumeyearissuepage);
        }

        //URL --> 4085 nur bei Dokumenttyp "magazineArticle" für Rezension im Feld 0500
        if (item.url && item.itemType == "magazineArticle") {
            addLine(currentItemId, "4085", "$u" + item.url + "$xH");
        }

		//URL --> 4085 nur bei Satztyp "O.." im Feld 0500
		switch (true) {
			case item.url && physicalForm === "O" && licenceField === "l":
				addLine(currentItemId, "4085", "$u" + item.url + "$xH$zLF");
				break;
			case item.url && physicalForm === "O" && licenceField === "kw":
				addLine(currentItemId, "4085", "$u" + item.url + "$xH$zKW");
				break;
			case item.url && physicalForm === "O":
				addLine(currentItemId, "4085", "$u" + item.url + "$xH");
				break;
			case item.url && item.itemType == "magazineArticle":
				addLine(currentItemId, "4085", "$u" + item.url + "$xH");
				break;
			}
        //Reihe --> 4110
        if (!article) {
            var seriesStatement = "";
            if (item.series) {
                seriesStatement += item.series;
            }
            if (item.seriesNumber) {
                seriesStatement += " ; " + item.seriesNumber;
            }
            addLine(currentItemId, "4110", seriesStatement);
        }

        //Inhaltliche Zusammenfassung --> 4207
        if (item.abstractNote) {
			item.abstractNote = ZU.unescapeHTML(item.abstractNote);
            addLine(currentItemId, "4207", item.abstractNote.replace("Zusammenfassung", "").replace(" Summary", "").replace("", "").replace(/–/g, '-').replace(/&#160;/g, "").replace('No abstract available.', '').replace('not available', ''));
        }

        //item.publicationTitle --> 4241 Beziehungen zur größeren Einheit
        if (item.itemType == "journalArticle" || item.itemType == "magazineArticle") {
            if (superiorPPN.length != 0) {
                addLine(currentItemId, "4241", "Enthalten in " + superiorPPN);
            } else if (item.publicationTitle) {
                addLine(currentItemId, "4241", "Enthalten in " + journal_title_to_ppn[item.publicationTitle]);
            }

            //4261 Themenbeziehungen (Beziehung zu der Veröffentlichung, die beschrieben wird)|case:magazineArticle
            if (item.itemType == "magazineArticle") {
                addLine(currentItemId, "4261", "Rezension von" + item.publicationTitle); // zwischen den Ausrufezeichen noch die PPN des rezensierten Werkes manuell einfügen.
            }

            //SSG bzw. FID-Nummer --> 5056 "0" = Religionwissenschaft | "1" = Theologie | "0; 1" = RW & Theol.

            if (SsgField === "0" || SsgField === "0; 1" || SsgField === "FID-KRIM-DE-21") {
                addLine(currentItemId, "5056", SsgField);
            } else {
                addLine(currentItemId, "5056", defaultSsgNummer);
            }
			
            //Schlagwörter aus einem Thesaurus (Fremddaten) --> 5520 (oder alternativ siehe Mapping)
            if (issn_to_keyword_field.get(item.ISSN) !== undefined) {
                var codeBase = issn_to_keyword_field.get(item.ISSN);
                for (i=0; i<item.tags.length; i++) {
                    var code = codeBase + i;
                    addLine(currentItemId, code, "|s|" + item.tags[i].tag.replace(/\s?--\s?/g, '; '));
                }
            } else {
                for (i=0; i<item.tags.length; i++) {
                    addLine(currentItemId, "5520", "|s|" + ZU.unescapeHTML(item.tags[i].tag.replace(/\s?--\s?/g, '; ')));
                }
            }
			//notes > IxTheo-Notation
			if (item.notes) {
				for (i in item.notes) {
					var note = item.notes[i].note.replace("<p>", "").replace("</p>", "")
                    var re = /\s*,\s*/;
					var notation_splits = note.toLowerCase().split(re);
                    for (i in notation_splits) {
                        var notation = notation_splits[i]
                        var notation_ppn = notes_to_ixtheo_notation[notation];
                        if (notation_ppn) {
                            addLine(currentItemId, "6700", notation_ppn);
                        }
                    }
				}
			}

			addLine(currentItemId, "E* l01" + "\n" + "7100 $jn" + "\n8002 ixzs;ixzo" + "\n" + "\n", "");
        }
    }

    runningThreadCount--;
    if (runningThreadCount === 0) {
        WriteItems();
    }
    Z.debug("Done exporting item(s)!");
}

function doExport() {
	Z.debug("Populating ISSN mapping tables...");

	ZU.doGet([
            zts_enhancement_repo_url + "ISSN_to_keyword_field.map",
            zts_enhancement_repo_url + "ISSN_to_language_code.map",
            zts_enhancement_repo_url + "ISSN_to_licence.map",
            zts_enhancement_repo_url + "ISSN_to_physical_form.map",
            zts_enhancement_repo_url + "ISSN_to_SSG.map",
            zts_enhancement_repo_url + "ISSN_to_superior_ppn.map",
            zts_enhancement_repo_url + "ISSN_to_volume.map",
            zts_enhancement_repo_url + "language_to_language_code.map",
            ], function (responseText, request, url) {
                switch (responseText) {
                    case "404: Not Found":
                        Z.debug("Error: 404 for url " + url);
                        break;
                    default:
                        populateISSNMaps(responseText, url);
                }
            }, function () {
                if (downloaded_map_files != max_map_files)
                    throw "Some map files were not downloaded!";

                performExport();
            });
}
