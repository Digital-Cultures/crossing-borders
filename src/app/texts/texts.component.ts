import { Component, OnInit } from '@angular/core';
import { DataSourceRequest, DataSourceResultOfUser, User } from "../../../api/api.module";
import { Observable } from 'rxjs/Observable';

import { JsondataService } from '../services/jsondata.service';
@Component({
  selector: 'app-texts',
  templateUrl: './texts.component.html',
  styleUrls: ['./texts.component.scss']
})
//http://pojo.sodhanalibrary.com/ConvertToVariable
//https://www.onlinewebtoolkit.com/text-to-html
export class TextsComponent implements OnInit  {
	currentText: any;
	texts: any = {
		bevis: {
			title: "Bevis of Hampton: Translation and Transmission",
			author: "Aisling Byrne (University of Reading)",
			history: "England, Norway, Iceland, Wales, Ireland, France (and elsewhere)",
			languages:"Anglo-Norman, Old Norse-Icelandic, Middle Welsh, Middle English, Early Modern Irish (and non-insular languages)",
			significance:""	
		},
		prophecy_of_the_six_kings:{
			title: "Prophecy of the Six Kings: Translation and Transmission",
			author:"Victoria Flood (University of Birmingham)",
			circulation: "England, France, Wales, Scotland",
			languages: "Anglo-Norman, English, Welsh, Latin",
			significance:'<p>The insular and continental reception of the <em>Prophecy of the Six Kings</em>must be understood in relation to the far-reaching appeal of Galfridian prophecy across late medieval Europe, as in the case of the <em>Prophetiae Merlini, </em>on which text the <em>Six Kings </em>draws heavily (see <strong><em>Prophecies of Merlin</em></strong>). However, unlike the <em>Prophetiae, </em>there is no evidence of Scandinavian circulation, and the<em>Six Kings </em>appears to have had no purchase outside political contexts with a direct investment in the English accession. Drawing on motifs lifted from Geoffrey of Monmouth’s <em>Prophetiae Merlini, </em>the prophecy forecasts the reigns of the lamb (Henry III), the dragon (Edward I), the goat (Edward II), the boar (Edward III), and finally the ass, who is deposed by the mole (identified in the fifteenth century as Richard II and Henry IV), who is overthrown in turn by a lion from Ireland, dragon from the North and wolf from the west, who between them divide England, or Britain, in three. Although long associated by scholars with the Revolt of Owain Glyn Dŵr (in part because of Shakespeare’s references to the prophecy in <em>1 Henry IV</em>), and even once ascribed a putative Welsh source, the prophecy is now recognised as a product of disillusionment in Edward II, written in support of his deposition and the accession of his young son, the future Edward III.<a title="" name="_ftnref1" href="applewebdata://ADB26E2E-479E-442A-B641-894D455174CB#_ftn1">[1]</a></p>'+
'<p> </p>'+
'<p>The prophecy survives in seven recensions, produced between 1333 and 1470, across four languages. As identified by Tim Smallwood, alongside the original version, these are termed:<a title="" name="_ftnref2" href="applewebdata://ADB26E2E-479E-442A-B641-894D455174CB#_ftn2">[2]</a></p>'+
'<p> </p>'+
'<p>1. <em>The Original Prose Version </em>(Anglo-Norman), c. 1312-27<a title="" name="_ftnref3" href="applewebdata://ADB26E2E-479E-442A-B641-894D455174CB#_ftn3">[3]</a></p>'+
'<p>2.<em>The Revised Prose Version </em>(Anglo-Norman), incorporated in the <em>Brut</em>, c. 1333.</p>'+
'<p>3. <em>The English Prose Version</em>, translated with the rest of the <em>Brut </em>into English, c. 1370-1400<a title="" name="_ftnref4" href="applewebdata://ADB26E2E-479E-442A-B641-894D455174CB#_ftn4">[4]</a></p>'+
'<p>4. <em>The English Couplet Version, </em>c. 1370-80</p>'+
'<p>5.<em>The First Revised Couplet Version, </em>c. 1400-1450</p>'+
'<p>6. <em>The Second Revised Couplet Version, </em>c. 1450</p>'+
'<p>7.<em>The Welsh Prose Translation, </em>c. 1450 (there are in fact two separate Welsh prose translations from this period).<a title="" name="_ftnref5" href="applewebdata://ADB26E2E-479E-442A-B641-894D455174CB#_ftn5">[5]</a></p>'+
'<p>8.<em>The Latin Version, </em>c. 1415-1470. </p>'+
'<p> </p>'+
'<p>There are three significant translation and cross-border transmission movements of particular note for the present project, all of which (judging from extant manuscripts) belong to the second half of the fifteenth century: 1. the circulation of the prophecy in continental Europe among English or Burgundian partisans in the context of the Hundred Years War; 2. Welsh translations and English-language adaptations of the prophecy in Wales in the context of the Wars of the Roses; 3. the translation of the prophecy into Latin in England, similarly during the Wars of the Roses. The French, Welsh and Latin contexts of the prophecy are discussed below. This entry does not address the translation of the original text from Anglo-Norman into Middle English, the readership and circumstances of which have been traced, in the context of the Middle English <em>Brut</em>, by Lister M. Matheson and, more recently, the <a href="http://www.qub.ac.uk/imagining-history/">Imagining History project</a>.<a title="" name="_ftnref6" href="applewebdata://ADB26E2E-479E-442A-B641-894D455174CB#_ftn6">[6]</a>The only witness of particular note among the English Prose Version, in terms of its cross-border circulation (in addition to manuscripts in Herefordshire and Welsh circulation, noted below), is Glasgow, University of Glasgow, Hunterian MS 83 (1), which has been understood to be in a Scottish scribal hand, although the dialect has been localised in northern England.<a title="" name="_ftnref7" href="applewebdata://ADB26E2E-479E-442A-B641-894D455174CB#_ftn7">[7]</a>This is the only witness of the prophecy with a known Scottish connection. </p>'+
'<p> </p>'+
'<p><strong><span style="text-decoration: underline;">French & Continental Transmission History</span></strong></p>'+
'<p>The continental transmission of the <em>Six Kings</em>is one facet of its association with the <em>Brut </em>tradition. The <em>Revised Prose Version</em><em>of the Six Kings </em>was incorporated in the long version of the Anglo-Norman<em>Brut </em>(extending to 1333), which circulated in continental Europe as well as England, although the prophecies are not found in all manuscripts. All three of the continental manuscripts detailed for the <em>Six Kings </em>on the database are mid-late fifteenth-century copies of the <em>Brut</em><strong>.</strong>Like the <em>Brut</em>itself, this must be situated in the broader context of the partisan literature of the Hundred Years War, and was presumably received in France as anti-French pro-Burgundian or English content. An anti-French utility is a function of the prophecy from its earliest versions, which incorporates a vision of the English conquest of Paris, by a boar (originally read as Edward III but subsequently applied to later kings of England), who whets his teeth on Paris’s gates: ‘anguisera ces dentz sur les portes de Paris’ (British Library, Harley MS 746, fol 2r; <em>Original Prose Version, </em>my transcription). It has been speculatively proposed that Paris, BNF, MS fonds français 12155 was produced in Flanders either for Louis de Gruuthuse (supporter of Edward IV, and from 1472, the Earl of Winchester), or the dukes of Burgundy.<a title="" name="_ftnref8" href="applewebdata://ADB26E2E-479E-442A-B641-894D455174CB#_ftn8">[8]</a>This sits interestingly with what we know of the circulation of the prophecy in Yorkist circles during this period. This line of affinity does seem to have facilitated the transmission of Galfridian material at the Burgundian court in the late fifteenth century – among the manuscripts owned by Louis is Jean de Wavrin’s <em>Recueil,</em>which incorporates a French prose translation of Geoffrey’s <em>Historia </em>and<em>Prophecies</em>, Paris, BNF, français 74-85 (c. 1475).</p>'+
'<p><strong> </strong></p>'+
'<p><strong><span style="text-decoration: underline;">Welsh Translation</span></strong></p>'+
'<p>Two Welsh prose translations were produced, seemingly independently of one another, in the mid-fifteenth century.<a title="" name="_ftnref9" href="applewebdata://ADB26E2E-479E-442A-B641-894D455174CB#_ftn9">[9]</a>Given the extensive level of adaptation, it is impossible to tell whether these are derived from the Anglo-Norman<em>Revised Prose Version</em>or the <em>English Prose Translation</em>. The longer of the two, <em>Darogan Chwe Brenin </em>(‘Prophecy of the Six Kings’), appears in Aberystwyth, NLW, Peniarth MS 50 (c. 1445-56) alongside English, Welsh and Latin prophecies. The manuscript, which may have been compiled at Neath Abbey in Glamorgan, includes Yorkist and proto-Yorkist material, bothin English and in Welsh translation, alongside Welsh prophecies.<a title="" name="_ftnref10" href="applewebdata://ADB26E2E-479E-442A-B641-894D455174CB#_ftn10">[10]</a>Peniarth 50 has attracted considerable comment for its combinative attitude towards Welsh, English and Latin prophetic content.<a title="" name="_ftnref11" href="applewebdata://ADB26E2E-479E-442A-B641-894D455174CB#_ftn11">[11]</a>The scribe, Dafydd, who gives his name before the first item in a multilingual prophetic sequence, <em>Darogan Olew Bendigaid</em>(an adaptative translation from the English Latin prophecy ‘Holy Oil of St Thomas’), states that he was encouraged by ‘some mysterious companion’ to translate material from English, Latin and French into Welsh.<a title="" name="_ftnref12" href="applewebdata://ADB26E2E-479E-442A-B641-894D455174CB#_ftn12">[12]</a>This field of linguistic interest speaks to the contents of the manuscript as a whole.<a title="" name="_ftnref13" href="applewebdata://ADB26E2E-479E-442A-B641-894D455174CB#_ftn13">[13]</a>The second Welsh version is found in <a href="https://viewer.library.wales/4389453#?c=0&m=0&s=0&cv=0&xywh=-352%2C-182%2C3494%2C3636">Aberystwyth, NLW, Peniarth MS 54 i</a>, where it appears alongside Welsh verse prophecy (<em>cwyddau brud</em>). This version is entitled <em>Y Broffwydoliath Fer </em>(The Small Prophecy), a title which suggests that it was read as a counterpart to the Welsh translation of the <em>Prophetiae Merlini: Y Broffwydoliaeth Fawr </em>(The Great Prophecy) (see <strong><em>Prophecies of Merlin</em>)</strong>.<a title="" name="_ftnref14" href="applewebdata://ADB26E2E-479E-442A-B641-894D455174CB#_ftn14">[14]</a><em>Y </em><em>Broffwydoliath Fer</em>introduces an additional figure to the order of succession given in the prophecy: a piglet born of the boar of Windsor, who precedes the mole. The piglet appears in Welsh language prophecies, such as the Myrddin poem <em>Yr Oianau </em>(<em>‘</em>The Ohs’), and this inclusion belongs to a distinctly Welsh prophetic context. The Welsh translation and reception history of the <em>Six Kings</em>suggests the naturalisation of the prophecy within a Welsh prophetic context, although it is worth noting that it does not appear to have ever been rendered in <em>cywydd. </em>Allusions from the prophecy do, however, appear in Welsh political poetry from the fourteenth century onwards, including Iolo Goch’s panegyric to Edward III, which lauds Edward as the boar of Windsor; and fifteenth-century Tudor prophecy, such as the <em>cywyddau brud </em>of Dafydd Llwyd, which identity Richard III as the despised mole.<a title="" name="_ftnref15" href="applewebdata://ADB26E2E-479E-442A-B641-894D455174CB#_ftn15">[15]</a></p>'+
'<p> </p>'+
'<p><strong><span style="text-decoration: underline;">English Language Composition (/Combining) in Wales</span></strong></p>'+
'<p>An English language verse adaptation of the <em>Original Prose Version </em>(via two intermediary English verse texts: the <em>English Couplet Version </em>and the <em>First Revised Couplet Version</em>)<em>,<a title="" name="_ftnref16" href="applewebdata://ADB26E2E-479E-442A-B641-894D455174CB#_ftn16"><strong>[16]</strong></a></em>termed the <em>Second Revised Couplet Version,</em>appears in another significant multilingual manuscript containing Yorkist political prophecies, produced in the Welsh March (Oswestry) during the mid-fifteenth century: Aberystwyth, NLW, Peniarth MS 26.<a title="" name="_ftnref17" href="applewebdata://ADB26E2E-479E-442A-B641-894D455174CB#_ftn17">[17]</a>This variant version is only found in a Welsh context. Alongside Peniarth 26, it survives in Aberystwyth, NLW, Peniarth MS 94 (compiled c. 1600), the commonplace book of Thomas Wiliems, Caernarfonshire recusant, lexicographer and physician.<a title="" name="_ftnref18" href="applewebdata://ADB26E2E-479E-442A-B641-894D455174CB#_ftn18">[18]</a>In Peniarth 94, it appears in a sequence of English language prophecies, in a manuscript which is otherwise in Welsh. The <em>Second Revised Couplet Version</em>is derived from the <em>First Revised Couplet Version, </em>which features in Yorkist manuscripts from England. In both Welsh manuscripts, the <em>Second Revised Couplet Version</em>follows continuously from another prophecy in circulation in both England and Wales in the mid-fifteenth century, concerning British resurgence and Saxon decline, beginning ‘S Mysed’ (<a href="https://www.dimev.net/record.php?recID=4522">DIMEV 4522</a>). The <em>Second Revised Couplet Version</em>draws on the concluding vision of the tripartite division of Britain (or England) under the lion, wolf and dragon:</p>'+
'<p> </p>'+
'<p>[then] the ii bestys schal be fule scharppe</p>'+
'<p>to were agayns the moldwarppe</p>'+
'<p>Then owt o Ireland schall come a lyon</p>'+
'<p>To holde with the wolf and the dragon</p>'+
'<p>The moldwerppe fast schall flee</p>'+
'<p>Sothen after dye shall hee</p>'+
'<p>In the flood of the trebull see</p>'+
'<p>(Peniarth 26, p. 116; my transcription)</p>'+
'<p> </p>'+
'<p>As in the <em>First Revised Couplet Version,</em>the moldwarp is succeeded not by the three-part rule of the wolf, dragon and lion, but the ass (the fifth king of the original prophecy), which presumably is a reference to legends of the return of Richard II, which appears in English and Welsh prophecies of this period. The interest in this particular passage may owe something to its retrospective association with the anti-Lancastrian alliance between Owain Glyn Dŵr and the Percy family in the early fifteenth century, which culminated in the 1405 Tripartite Indenture, proposing a three-part division of England and an extended, independent, Wales. This is certainly a feature of a number of English prophecies which saw mid-century Welsh reception. Beyond its putative political applications, the production and circulation of the <em>Second Revised Couplet Version</em>is strongly suggestive of English-language verse adaptation in a Welsh or Marcher context, and testifies to the status of English as a literary-political language in Wales by the mid-fifteenth century. </p>'+
'<p> </p>'+
'<p>This transmission history might also be contextualised by the circulation of Middle English prose copies of the prophecy contained in the Middle English <em>Brut,</em>in Herefordshire during the fifteenth century, as noted on the database. In addition, the earliest name which appears in Yale, Yale University Library Takamiya MS 12 (which Matheson has suggested is fifteenth-century) is Richard Thomas of Neath (Glamorgan), which appears alongside other names suggestive of the manuscript’s Welsh circulation.<a title="" name="_ftnref19" href="applewebdata://ADB26E2E-479E-442A-B641-894D455174CB#_ftn19">[19]</a></p>'+
'<p> </p>'+
'<p><strong><span style="text-decoration: underline;">The Latin Translation</span></strong></p>'+
'<p>Between 1415 and 1470, an abbreviated adaptative Latin translation of the Anglo-Norman <em>Original Prose Version</em>was produced, which survives in three fifteenth-century, and one seventeenth-century, English manuscripts (the latter is excluded from our database as it is beyond the date range of the current survey).<a title="" name="_ftnref20" href="applewebdata://ADB26E2E-479E-442A-B641-894D455174CB#_ftn20">[20]</a>This is an unusual direction of translation, and appears to have been undertaken with a mind to the prophecy’s incorporation in Latin prophecy collections,including prophetic material from Geoffrey of Monmouth’s <em>Historia, </em>the <em>Prophetiae Merlini, </em>and later Latin derivatives.In the case of the Latin translations, language choice appears to have been governed by a sense of linguistic congruity in terms of manuscript context. </p>'+
'<p> </p>'+
'<p>The Latin translation saw explicitly Yorkist application, and in Oxford, Bodleian, Bodley MS 623 it appears alongside <a href="https://digital.bodleian.ox.ac.uk/inquire/Discover/Search/#/?p=c+0,t+,rsrs+0,rsps+10,fa+,so+ox%3Asort%5Easc,scids+,pid+9a17e0fb-c2a0-45e2-8f93-97daba215bb1,vi+b29e7add-3aaa-459d-82cc-64a2b4c3e2c3">diagrams</a>identifying Edward IV with various heroes of Galfridian prophecy, including the boar (aper), and Henry VI with similarly Galfridian terms of antipathy, including the mole (talpa); both figures lifted from the <em>Six Kings. </em>The most significant adaptive detail of the Latin translation is its division of the career of the boar into two parts: the first (containing an account of the boar’s various good qualities) appears as in the original sequence; the second (the boar’s imperial conquests) is included as a coda, after the reign of the moldwarp. This was surely facilitated by the identification of the Lancastrian kings with the moldwarp, and the particular association of Edward IV with the boar – the prophetic meanings of which here conveniently intersect with a heraldic symbol of the house of York. In this new arrangement, the boar appears as both Edward III and Edward IV.</p>'+
'<p> </p>'+
'<p>One of the three fifteenth-century manuscripts containing the Latin translation is suggestive of an overt association with the Percy earls of Northumberland, presumably following their allegiance to the house of York in 1469. London, BL Cotton MS Vespasian E. vii contains the arms of Henry Percy, 4<sup>th</sup>Earl of Northumberland, and a number of the prophecies in the collection mention ‘luna’, a cipher for the house.<a title="" name="_ftnref21" href="applewebdata://ADB26E2E-479E-442A-B641-894D455174CB#_ftn21">[21]</a>Fol. 74r contains a very similar table of positive prophetic ciphers as Bodleian 623. The <em>Six Kings </em>may well represent a nodal point between Yorkist and Percy-ite dynastic discourses: figures from the <em>Six Kings </em>(the union of the dragon and the lion) appear to have been understood in relation to the 1405 Tripartite Indenture, as it appears in the Percy-ite prophecy <em>Cock in the North – </em>an English language derivative of the <em>Six Kings,</em>also in Latin translation in Cotton Vespasian E. vii, and similarly circulated as a Yorkist political prophecy in both England and Wales.<a title="" name="_ftnref22" href="applewebdata://ADB26E2E-479E-442A-B641-894D455174CB#_ftn22">[22]</a></p>'+
'<p> </p>'+
'<p><strong><span style="text-decoration: underline;">Conclusion</span></strong></p>'+
'<p>It is no coincidence that the <em>Six Kings </em>appears in English or Welsh translation in both Peniarth MSS 26 and 50. These two manuscripts are among the earliest trilingual collections in Wales containing English rather than French content alongside Welsh and Latin. The circulation of English-language prophecies in Wales (whether in translation or original) appears to have been intimately connected to the late medieval literary uses of English in Wales, and even – I have elsewhere suggested – played a part in the growth of English as a literary language in Wales.<a title="" name="_ftnref23" href="applewebdata://ADB26E2E-479E-442A-B641-894D455174CB#_ftn23">[23]</a>Beyond Wales, the <em>Six Kings </em>presents a significant chapter in a broader history of insular multilingualism. The prophecy’s multilingual reception history speaks to the horizons of expectation associated with particular medieval languages in different spheres across the insular world. During the same period in which the prophecies were adapted in English, as a political language, in Wales (alongside their Welsh translation), they were also translated into Latin in England. This appears to have been undertaken to establish parity with earlier Galfridian prophecies, and this particular language choice suggests a strong perception of source relationships which governed treatment of the text (this is not dissimilar to the alignment of the Peniarth 54 Welsh prose translation with Welsh translations of the <em>Prophetiae Merlini</em>). Although in this context Latin appears to have been understood as particularly germane to prophetic and imperial imaginings, it was not functioning uniformly as an elite language in a way in which, in this period, insular vernaculars were not – alongside the function of Welsh, and potential English, as a prestige language in Wales during this period, we might note that in the context of the <em>Brut,</em>the prophecy found an aristocratic, or even royal, readership in Anglo-Norman on the continent. </p>'+
'<p> </p>'+
'<p>The results of this survey are particularly remarkable, however, in the temporal correspondence they suggest between the transmission and translation of English political prophetic content in Wales and in France, for which the strongest hypothesis appears to be (when read alongside a resurgence of partisan English uses of the prophecy) the presence of cross-border networks of Yorkist affiliation and political interest from the mid-fifteenth century onwards. This line of analysis is, however, only one part of the story, and cross-border reception may well have shaped the subsequent development and applications of the English tradition. Certainly, the <em>Second Revised Couplet Version </em>suggests the importance of Wales and the March as a sphere of English language literary activity and innovation.</p>'+
'<p> </p>'+
'<p> </p>'+
'<p><strong>EDITIONS</strong></p>'+
'<p><strong><span style="text-decoration: underline;">Original Prose Version</span></strong></p>'+
'<p>Taylor, Rupert, <em>Political Prophecy in England </em>(New York: Cornell University Press, 1911), pp. 160-64</p>'+
'<p><strong> </strong></p>'+
'<p><strong><span style="text-decoration: underline;">English Prose Translation</span></strong></p>'+
'<p>Brie, Friedrich W. D., ed., <em>The Brut or the Chronicles of England </em>(London: K. Paul, Trench, Trübner, 1906-08), 72-76</p>'+
'<p> </p>'+
'<p><strong><span style="text-decoration: underline;">English Couplet Version</span></strong></p>'+
'<p>Hall, Joseph, ed., <em>The Poems of Laurence Minot</em>(Oxford: Clarendon, 1887; rev. ed., 1914), pp. 103-11</p>'+
'<p> </p>'+
'<p><strong><span style="text-decoration: underline;">Welsh Translation</span></strong></p>'+
'<p>Evans, R. W., ‘“Y Proffwydoliaeth Fawr” a’r “Broffwydoliaeth Fer”’, <em>Bulletin of the Board of Celtic Studies</em>22 (1966–68): 119–21 (pp. 120-21)</p>'+
'<p> </p>'+
'<p>Fulton, Helen, <em>Welsh Prophecy and English Politics in the Later Middle Ages </em>(Aberystwyth: Canolfan Uwchefrydiau Cymreig a Cheltaidd Prifysgol Cymru, 2009), pp. 27-35</p>'+
'<p> </p>'+
'<p><strong>WORKS CITED</strong></p>'+
'<p>Bonner Jenkins, Manon, ‘Aspects of the Welsh Prophetic Verse Tradition in the Middle Ages’, 2 vols (unpublished doctoral thesis, University of Cambridge, 1990)</p>'+
'<p> </p>'+
'<p>Evans, J. Gwenogvryn, <em>Report on Manuscripts in the Welsh Language</em>, 3 vols (London: Eyre and Spottiswoode, 1898–1910)</p>'+
'<p> </p>'+
'<p>Flood, Victoria, <em>Prophecy, Politics and Place in Medieval England: From Geoffrey of Monmouth to Thomas of Erceldoune </em>(Cambridge: D. S. Brewer, 2016)</p>'+
'<p> </p>'+
'<p>Flood, ‘Early Tudor Translations of English Prophecy in Wales’, in <em>Crossing Borders in the Insular Middle Ages</em>, ed. Aisling Byrne and Victoria Flood (Turnhout: Brepols, 2019), pp. 65-88</p>'+
'<p> </p>'+
'<p>Fulton, Helen, ‘Owain Glyn Dŵr and the Uses of Prophecy’, <em>Studia Celtica </em>39 (2005): 105-21</p>'+
'<p> </p>'+
'<p>Fulton, Helen, <em>Welsh Prophecy and English Politics in the Later Middle Ages </em>(Aberystwyth: Canolfan Uwchefrydiau Cymreig a Cheltaidd Prifysgol Cymru, 2009)</p>'+
'<p> </p>'+
'<p>Huws, Daniel, <em>Medieval Welsh Manuscripts</em>(Cardiff: University of Wales Press; Aberystwyth: National Library of Wales, 2000)</p>'+
'<p> </p>'+
'<p>Jones, Aled Llion, <em>Darogan: Prophecy, Lament and Absent Heroes in Medieval Welsh Literature</em>(Cardiff: University of Wales Press, 2013)</p>'+
'<p> </p>'+
'<p>Lloyd-Morgan, Ceridwen, ‘Prophecy and Welsh Nationhood in the Fifteenth Century’, <em>Transactions of the Honourable Society of Cymmrodorion</em>(1985), 9–26</p>'+
'<p> </p>'+
'<p>Matheson, Lister M., <em>The Prose Brut: The Development of a Middle English Chronicle. </em>Medieval & Renaissance Texts & Studies Vol. 180(Tempe, AZ: Regents of Arizona State University, 1998)</p>'+
'<p> </p>'+
'<p>Marx, William, <em>Index of Middle English Prose: Handlist XIV Manuscripts in the National Library of Wales </em>(Cambridge: D. S. Brewer, 1999)</p>'+
'<p> </p>'+
'<p>Smallwood, T. M., ‘The Prophecy of the <em>Six Kings</em>’, <em>Speculum </em>60 (1985): 571-92</p>'+
'<p><strong> </strong></p>'+
'<p><strong> </strong></p>'+
'<p><strong>DIGITAL RESOURCES</strong></p>'+
'<p>​For an account of the political and geographical circulation of the Middle English Brut manuscripts, see <a href="file:///C:/Users/xr910628/AppData/Local/Temp/Temp1_Encyclopedia%20entries.zip/Encyclopedia%20entries/www.qub.ac.uk/imagining-history/">www.qub.ac.uk/imagining-history/</a><br /><br /></p>'+
'<p> </p>'+
'<p><strong>DIGITISED MANUSCRIPTS</strong><br />Aberystwyth, National Library of Wales, Peniarth Manuscripts: <a href="https://www.library.wales/collections/learn-more/introduction0/llawysgrifaupeniarth/">https://www.library.wales/collections/learn-more/introduction0/llawysgrifaupeniarth/</a></p>'+
'<p> </p>'+
'<p>Oxford, Bodleian Library, Digital Bodleian: <a href="https://digital.bodleian.ox.ac.uk/">https://digital.bodleian.ox.ac.uk/</a></p>'+
'<div><br clear="all" /><hr align="left" size="1" width="33%" />'+
'<div id="ftn1">'+
'<p><a title="" name="_ftn1" href="applewebdata://ADB26E2E-479E-442A-B641-894D455174CB#_ftnref1">[1]</a>For discussion of the association with Owain, see Helen Fulton, ‘Owain Glyn Dŵr and the Uses of Prophecy’, <em>Studia Celtica </em>39 (2005): 105-21.</p>'+
'</div>'+
'<div id="ftn2">'+
'<p><a title="" name="_ftn2" href="applewebdata://ADB26E2E-479E-442A-B641-894D455174CB#_ftnref2">[2]</a>T. M. Smallwood, ‘The Prophecy of the <em>Six Kings</em>’, <em>Speculum </em>60 (1985): 571-92 (pp. 572-73).</p>'+
'</div>'+
'<div id="ftn3">'+
'<p><a title="" name="_ftn3" href="applewebdata://ADB26E2E-479E-442A-B641-894D455174CB#_ftnref3">[3]</a>Rupert Taylor, <em>Political Prophecy in England </em>(New York: Cornell University Press, 1911)<em>,</em>pp. 160-64<strong>(</strong>from London, BL Harley MS 746, fols 1v-3r). This transcription contains some errors – for edited sections of the prophecy, see Victoria Flood,<em>Prophecy, Politics and Place in Medieval England: From Geoffrey of Monmouth to Thomas of Erceldoune </em>(Cambridge: D. S. Brewer, 2016)<em>, </em>Chapter 2.</p>'+
'</div>'+
'<div id="ftn4">'+
'<p><a title="" name="_ftn4" href="applewebdata://ADB26E2E-479E-442A-B641-894D455174CB#_ftnref4">[4]</a>Friedrich W. D. Brie, <em>The Brut or the Chronicles of England </em>(London: K. Paul, Trench, Trübner, 1906-08),pp.<em> </em>72-76.</p>'+
'</div>'+
'<div id="ftn5">'+
'<p><a title="" name="_ftn5" href="applewebdata://ADB26E2E-479E-442A-B641-894D455174CB#_ftnref5">[5]</a>Transcribed in R. W. Evans, ‘“Y Proffwydoliaeth Fawr” a’r “Broffwydoliaeth Fer”’, <em>BBCS</em>22 (1966–68): 119–21 (pp. 120-21); translated in Helen Fulton, <em>Welsh Prophecy and English Politics in the Later Middle Ages </em>(Aberystwyth: Canolfan Uwchefrydiau Cymreig a Cheltaidd Prifysgol Cymru, 2009), pp. 27-35.</p>'+
'</div>'+
'<div id="ftn6">'+
'<p><a title="" name="_ftn6" href="applewebdata://ADB26E2E-479E-442A-B641-894D455174CB#_ftnref6">[6]</a>Lister M. Matheson, <em>The Prose Brut: The Development of a Middle English Chronicle. </em>Medieval & Renaissance Texts & Studies Vol. 180(Tempe, AZ: Regents of Arizona State University, 1998).</p>'+
'</div>'+
'<div id="ftn7">'+
'<p><a title="" name="_ftn7" href="applewebdata://ADB26E2E-479E-442A-B641-894D455174CB#_ftnref7">[7]</a>Matheson, <em>Prose Brut, </em>p. 205.</p>'+
'</div>'+
'<div id="ftn8">'+
'<p><a title="" name="_ftn8" href="applewebdata://ADB26E2E-479E-442A-B641-894D455174CB#_ftnref8">[8]</a>Matheson, <em>Prose Brut, </em>p. 12</p>'+
'</div>'+
'<div id="ftn9">'+
'<p><a title="" name="_ftn9" href="applewebdata://ADB26E2E-479E-442A-B641-894D455174CB#_ftnref9">[9]</a>For the fullest discussion to date of this these texts, and their contexts, see Fulton, <em>Welsh Prophecy and English Politics.</em></p>'+
'</div>'+
'<div id="ftn10">'+
'<p><a title="" name="_ftn10" href="applewebdata://ADB26E2E-479E-442A-B641-894D455174CB#_ftnref10">[10]</a>J. Gwenogvryn Evans, <em>Report on Manuscripts in the Welsh Language</em>, 3 vols (London: Eyre and Spottiswoode, 1898–1910), I, pp. 389–99.</p>'+
'</div>'+
'<div id="ftn11">'+
'<p><a title="" name="_ftn11" href="applewebdata://ADB26E2E-479E-442A-B641-894D455174CB#_ftnref11">[11]</a>Daniel Huws, <em>Medieval Welsh Manuscripts</em>(Cardiff: University of Wales Press; Aberystwyth: National Library of Wales, 2000), p. 61. For a transcription and discussion of the Welsh prophecies of NLW, MS Peniarth 50, see Marion Bonner Jenkins, ‘Aspects of the Welsh Prophetic Verse Tradition in the Middle Ages’, 2 vols (unpublished doctoral thesis, University of Cambridge, 1990). For a brief discussion of the multilingual status of MS Peniarth 50, see also Aled Llion Jones, <em>Darogan: Prophecy, Lament and Absent Heroes in Medieval Welsh Literature</em>(Cardiff: University of Wales Press, 2013), pp. 128–32, 193–209; Flood<em>, Prophecy, Politics, and Place</em>, pp. 179–84</p>'+
'</div>'+
'<div id="ftn12">'+
'<p><a title="" name="_ftn12" href="applewebdata://ADB26E2E-479E-442A-B641-894D455174CB#_ftnref12">[12]</a>Ceridwen Lloyd-Morgan, ‘Prophecy and Welsh Nationhood in the Fifteenth Century’, <em>Transactions of the Honourable Society of Cymmrodorion</em>, 1985, 9–26.</p>'+
'</div>'+
'<div id="ftn13">'+
'<p><a title="" name="_ftn13" href="applewebdata://ADB26E2E-479E-442A-B641-894D455174CB#_ftnref13">[13]</a>Evans, <em>Report on Manuscripts, </em>I, p. 389.</p>'+
'</div>'+
'<div id="ftn14">'+
'<p><a title="" name="_ftn14" href="applewebdata://ADB26E2E-479E-442A-B641-894D455174CB#_ftnref14">[14]</a>Evans, ‘“Y Proffwydoliaeth Fawr” a’r “Broffwydoliaeth Fer”.</p>'+
'</div>'+
'<div id="ftn15">'+
'<p><a title="" name="_ftn15" href="applewebdata://ADB26E2E-479E-442A-B641-894D455174CB#_ftnref15">[15]</a>David Johnston, ‘Iolo Goch and the English: Welsh Poetry and Politics in the Fourteenth Century’, <em>Cambridge Medieval Celtic Studies </em>12 (1986): 73-98; Flood, <em>Prophecy, Politics and Place, </em>pp. 195-97.</p>'+
'</div>'+
'<div id="ftn16">'+
'<p><a title="" name="_ftn16" href="applewebdata://ADB26E2E-479E-442A-B641-894D455174CB#_ftnref16">[16]</a>The <em>English Couplet Version </em>(Cotton Galba E. ix) has been edited by Joseph Hall, ed., <em>The Poems of Laurence Minot</em>(Oxford: Clarendon, 1887; rev. ed., 1914), pp. 103-11.</p>'+
'</div>'+
'<div id="ftn17">'+
'<p><a title="" name="_ftn17" href="applewebdata://ADB26E2E-479E-442A-B641-894D455174CB#_ftnref17">[17]</a>Evans, <em>Report on Manuscripts, </em>I, pp. 351-54. </p>'+
'</div>'+
'<div id="ftn18">'+
'<p><a title="" name="_ftn18" href="applewebdata://ADB26E2E-479E-442A-B641-894D455174CB#_ftnref18">[18]</a>William Marx, <em>Index of Middle English Prose: Handlist XIV Manuscripts in the National Library of Wales </em>(Cambridge: D. S. Brewer, 1999), p. 36.</p>'+
'</div>'+
'<div id="ftn19">'+
'<p><a title="" name="_ftn19" href="applewebdata://ADB26E2E-479E-442A-B641-894D455174CB#_ftnref19">[19]</a>Matheson, <em>Prose Brut, </em>p. 179.</p>'+
'</div>'+
'<div id="ftn20">'+
'<p><a title="" name="_ftn20" href="applewebdata://ADB26E2E-479E-442A-B641-894D455174CB#_ftnref20">[20]</a>This dating and source relationship identification is Smallwood’s, for which see Smallwood, ‘Prophecy of the Six Kings’, p. 573.</p>'+
'</div>'+
'<div id="ftn21">'+
'<p><a title="" name="_ftn21" href="applewebdata://ADB26E2E-479E-442A-B641-894D455174CB#_ftnref21">[21]</a>H. L. D. Ward, <em>Catalogue of Romances in the Department of Manuscripts in the British Museum </em>, 3 vols (London, 1883–1910), I, pp. 320–24 </p>'+
'</div>'+
'<div id="ftn22">'+
'<p><a title="" name="_ftn22" href="applewebdata://ADB26E2E-479E-442A-B641-894D455174CB#_ftnref22">[22]</a>Flood, <em>Prophecy, Politics, and Place, </em>Chapter 4.</p>'+
'</div>'+
'<div id="ftn23">'+
'<p><a title="" name="_ftn23" href="applewebdata://ADB26E2E-479E-442A-B641-894D455174CB#_ftnref23">[23]</a>Flood, ‘Early Tudor Translations of English Prophecy in Wales’, in <em>Crossing Borders in the Insular Middle Ages</em>, ed. Aisling Byrne and Victoria Flood (Turnhout: Brepols, 2019), pp. 65-88</p>'+
'</div>'+
'</div>'
		},
		life_of_st_edward:{
			title: "Life of St Edward",
			history: "Life of St Edward moved from place to place",
			significance:"Life of St Edward was important because"	
		},
		pseudo_turpin:{
			title: "Pseudo Turpin",
			history: "Pseudo Turpin moved from place to place",
			significance:"Pseudo Turpin was important because"	
		},
		fierabras:{
			title: "Fierabras",
			history: "Fierabras moved from place to place",
			significance:"Fierabras was important because"	
		},
		roman_alexandre:{
			title: "Roman d'Alexandre",
			history: "Roman d'Alexandre moved from place to place",
			significance:"Roman d'Alexandre was important because"	
		},
		elucidarium:{
			title: "Elucidarius",
			history: "Elucidarius moved from place to place",
			significance:"Elucidarius was important because"	
		},
		marwolaeth_mair:{
			title: "Marwolaeth Mair",
			history: "Marwolaeth Mair moved from place to place",
			significance:"Marwolaeth Mair was important because"	
		},
		proffwydoliaeth_merdin:{
			title: "Proffwydoliaeth Merdin",
			history: "Proffwydoliaeth Merdin moved from place to place",
			significance:"Proffwydoliaeth Merdin was important because"	
		}

		}
		

  constructor(private jsondataService: JsondataService) {

        this.jsondataService.currentRawData.subscribe((rawData: any) => {
            this.datasource = (request: DataSourceRequest): Observable<DataSourceResultOfUser> => {
                let data = this.jsondataService.getData(request);
                return data;
            }
        })
    }
    ngOnInit() {
    	this.currentText = this.texts["prophecy_of_the_six_kings"];
  }

    public datasource: any = (request: DataSourceRequest): Observable<DataSourceResultOfUser> => {
        let data = this.jsondataService.getData(request);
        return data;
    }
    changeData(event){
    	console.log(event.target.value, this.texts);
    	this.currentText = this.texts[event.target.value];
    }

  // ngOnInit() {
  // }

}