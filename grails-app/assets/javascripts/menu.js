function expandAdvancedOptions()
{


    document.getElementById("more").innerHTML =
        '<span class="text">&nbsp;&nbsp; Alternative approaches, such as Fisher\'s exact test and the '
        +' binomial test implemented in the GREAT software, typically use a single nucleotide point, '
        +'the midpoint or mode of the peak, to represent an entire peak region. However, this ignores '
        +'potentially important regulatory information. As opposed to ChIP-seq peaks for transcription '
        +'factors, ChIP-seq peaks for histone modifications tend to be much broader, often span multiple '
        +'genes, and cover a larger overall portion of the genome. Thus, Broad-Enrich leverages more  '
        +'cis-regulatory information from the ChIP-seq experiment than alternative approaches.  '
        +'</span> <a href = "#" onclick="closeExp()">less</a>'
    ;

}

function closeExp()
{
    document.getElementById("more").innerHTML = '<a href = "#" onclick="expandAdvancedOptions()">more</a>';
}

function selectAllGO()
{

    if(document.getElementById("go").checked == false)
    {
        document.getElementById("gobio").checked=false;
        document.getElementById("gocell").checked=false;
        document.getElementById("gomol").checked=false;
    }
    else
    {
        document.getElementById("gobio").checked=true;
        document.getElementById("gocell").checked=true;
        document.getElementById("gomol").checked=true;
    }
}


function selectAllDb(source)

{

    checkboxes = document.getElementsByName('slist');
    console.log(checkboxes.length);

    for (var i =0, n=checkboxes.length;i<n;i++)
    {
        console.log("its iniside for loop");
        checkboxes[i].checked = source.checked;
    }
}










function removeAllOptions()
{
    document.getElementById("supgeneset").innerHTML = "";
}




function selectRangeCheck()
{
    var sglist= document.getElementById("sglist");
    var sglistIndex = sglist.selectedIndex;
    var selection = sglist.options[sglistIndex].value;


    if(document.upform.ismappable[1].checked )
    {

        var list = "";
        document.getElementById("rangeCheck").innerHTML = list;

    }
    if(document.upform.ismappable[0].checked && selection == "hg19") {

        var list =
            '<ul class="checklist">'
            +'<td align="right" valign="top"><span class="formText">Read Length</span></td>'
            +'<td>'
            +'<ulclass="checklist">'
            +'<li><input type="radio" name="rc" value="24"  /><span class="formText">24</span></li>'
            +'<li><input type="radio" name="rc" value="36"  /><span class="formText">36</span></li>'
            +'<li><input type="radio" name="rc" value="40" /><span class="formText">40</span></li>'
            +'<li><input type="radio" name="rc" value="50"  /><span class="formText">50</span></li>'
            +'<li><input type="radio" name="rc" value="75"/><span class="formText">75</span></li>'
            +'<li><input type="radio" name="rc" value="100" /><span class="formText">100</span></li>'
            +'<li><input type="radio" name="rc" value="user" onClick="userDefMappa()" /><span class="formText">User defined</span></li>'
            +'</ul>'
            +'</td>';

        document.getElementById("rangeCheck").innerHTML = list;
    }


    if(document.upform.ismappable[0].checked && selection == "mm9") {

        var list =
            '<ul class="checklist">'
            +'<td align="right" valign="top"><span class="formText">Read Length</span></td>'
            +'<td>'
            +'<ulclass="checklist">'
            +'<li><input type="radio" name="rc" value="36"  /><span class="formText">36</span></li>'
            +'<li><input type="radio" name="rc" value="40" /><span class="formText">40</span></li>'
            +'<li><input type="radio" name="rc" value="50"  /><span class="formText">50</span></li>'
            +'<li><input type="radio" name="rc" value="75"/><span class="formText">75</span></li>'
            +'<li><input type="radio" name="rc" value="100"/><span class="formText">100</span></li>'
            +'<li><input type="radio" name="rc" value="user" onClick="userDefMappa()" /><span class="formText">User defined</span></li>'
            +'<li><div id ="file"></div></li>'
            +'</ul>'
            +'</td>';

        document.getElementById("rangeCheck").innerHTML = list;
    }
    if(document.upform.ismappable[0].checked && selection == "")
    {
        alert("Please select supported genome to see specific read lengths");
        var list =
            '<ul>'
            +'<li><input type="radio" name="ismappable" value="T" onClick="selectRangeCheck(this)"/> <span class="formText">True</span></li>'
            +'<li><input type="radio" name="ismappable" value="F" onClick="selectRangeCheck(this)" /><span class="formText">False</span></li>'
            +'</ul>';
        document.getElementById("mapp").innerHTML = list;
    }


}


function selectMappaOption(){

    var sglist= document.getElementById("sglist");
    var sglistIndex = sglist.selectedIndex;
    var selection = sglist.options[sglistIndex].value;
    console.log(selection);
    if(selection == "rn4"  ){
        var list =
            '<ul>'
            +'<li><input type="radio" name="ismappable" value="F" checked="checked"  /><span class="formText">False</span><br/><span class="footnote"> Mappability is only available for hg19 and mm9 </span></li>'
            +'</ul>'
            +'</div>'
            +'</td>'
            +'</tr>' ;

        console.log("inside if loop of rat");
        document.getElementById("mapp").innerHTML = list;
        document.upform.isDatabaseExternal.value = 'true';

        var list2 =
            '<ul class="checklist">'+
            '<li><label>Functional Annotations</label>'+
            '<ul>'+
            '<li><label><input name="slist" value="biocarta_pathway" type="checkbox"/><a href="http://www.biocarta.com/">Biocarta Pathway</a>'+
            '</label>'+
            '</li>'+
            '<li><label><input name="slist" value="ehmn_pathway_gene" type="checkbox"/><a href="http://www.ehmn.bioinformatics.ed.ac.uk">EHMN Metabolic Pathways</a>'+
            '</label>'+
            '</li>'+
            '<li><label><input name="slist" value="GO" type="checkbox" id="go" onclick="selectAllGO()"/><a href="http://www.geneontology.org/">GO</a>'+
            '</label>'+
            '<ul>'+
            '<li><label><input name="slist" value="GOBP" id="gobio" type="checkbox"/><a href="http://www.geneontology.org/">GO Biological Process</a>'+
            '</label>'+
            '</li>'+
            '<li><label><input name="slist" value="GOCC" id="gocell" type="checkbox"/><a href="http://www.geneontology.org/">GO Cellular Component</a>'+
            '</label>'+
            '</li>'+
            '<li><label><input name="slist" value="GOMF" id="gomol" type="checkbox"/><a href="http://www.geneontology.org/">GO Molecular Function</a>'+
            '</label>'+
            '</li>'+
            '</ul></li>'+
            '<li><label><input name="slist" value="kegg_pathway" type="checkbox"/><a href="http://www.genome.jp/kegg/">KEGG Pathway</a>'+
            '</label>'+
            '</li>'+
            '<li><label><input name="slist" value="panther_pathway" type="checkbox"/><a href="http://www.pantherdb.org/pathway/">Panther Pathway</a>'+
            '</label>'+
            '</li>'+
            '<li><label><input name="slist" value="pfam" type="checkbox"/><a href="http://pfam.sanger.ac.uk/">pFAM</a>'+
            '</label>'+
            '</li>'+
            '</ul></li>'+
            '<li><label>Literature Derived</label>'+
            '<ul>'+
            '<li><label><input name="slist" value="mesh" type="checkbox"/><a href="http://gene2mesh.ncibi.org/">MeSH</a>'+
            '</label>'+
            '</li>'+


            '</ul></li>'+
            '<li><label>Targets</label>'+
            '<ul>'+
            '<li><label><input name="slist" value="drug_bank" type="checkbox"/><a href="http://www.drugbank.ca/">Drug Bank</a>'+
            '</label>'+
            '</li>'+
            '<li><label><input name="slist" value="mirbase" type="checkbox"/><a href="http://www.mirbase.org/">miRBase</a>'+
            '</label>'+
            '</li>'+
            '<li><label><input name="slist" value="transcription_factors" type="checkbox"/><a href="http://biobase-international.com/index.php?id=transfac">Transcription Factors</a>'+
            '</label>'+
            '</li>'+
            '</ul></li>'+
            '<li><label>Interaction</label>'+
            '<ul>'+
            '<li><label><input name="slist" value="protein_interaction_mimi" type="checkbox"/><a href="http://mimi.ncibi.org/MimiWeb/main-page.jsp">Protein Interaction (MiMI)</a>'+
            '</label>'+
            '</li>'+
            '</ul></li>'+
            '<li><label>Other</label>'+
            '<ul>'+
            '<li><label><input name="slist" value="metabolite" type="checkbox"/><a href="http://www.ncibi.org">Metabolite</a>'+
            '</label>'+
            '</li>'+
            '<li><label><input name="slist" value="cytoband" type="checkbox"/><a href="http://www.ncbi.nlm.nih.gov/sites/entrez?db=gene">Cytoband</a>'+
            '</label>'+
            '</li>'+
            '</ul>'+
            '<br/>'+
            '<li><label>Select All Datatbases</label>'+
            '<ul>'+
            '<li><label><input name="slist2"  type="checkbox"  onclick="selectAllDb(this)"/><a href="http://www.ncbi.nlm.nih.gov/sites/entrez?db=gene">Select All</a>'+
            '</ul>'+
            '</ul>';

        document.getElementById("databaseList").innerHTML = list2;
        document.getElementById("rangeCheck").innerHTML = "";


        var list3 =
            '<ul class= "b">'
            +'<li><input type="radio" name="ld" value="1kb" /><span class="formText">1kb</span><br />'
            +'<span class="footnote">(only use peaks within 1kb of a transcription start site)</span></li>'
            +'<li><input type="radio" name="ld" value="5kb"  /><span class="formText">5kb</span><br />'
            +'<span class="footnote">(only use peaks within 5kb of a transcription start site)</span></li>'
            +'<li><input type="radio" name="ld" value="exon" onClick="warnForFet(this)"/><span class="formText">Exon</span><br />'
            +'<span class="footnote">(only use peaks that fall within an annotated exon)</span></li>'
            +'<li><input type="radio" name="ld" value="nearest_gene" onClick="warnForFet(this)"  /><span class="formText">Nearest Gene</span><br />'
            +'<span class="footnote">(use all peaks; assign peaks to the nearest gene defined by transcription start and end sites)</span></li>'
            +'<li><input type="radio" name="ld" value="nearest_tss" checked="checked" onClick="warnForFet(this)"/><span class="formText">Nearest TSS</span><br />'
            +'<span class="footnote">(use all peaks; assign peaks to the gene with the closest TSS)</span></li>'
            +'<li><input type="radio" name="ld" value="user" onClick="UploadLdFile(this)"/><span class="formText">User Defined</span><br />'
            +'<span class="footnote">(user can input their own locus definition)</span></li>'
            +'</ul>' ;

        document.getElementById("locusdefinations").innerHTML = list3;


    }
    else if (selection == 'mm10')
    {


        var list =
            '<ul class="checklist">'+
            '<li><label>Functional Annotations</label>'+
            '<ul>'+
            '<li><label><input name="slist" value="biocarta_pathway" type="checkbox"/><a href="http://www.biocarta.com/">Biocarta Pathway</a>'+
            '</label>'+
            '</li>'+
            '<li><label><input name="slist" value="ehmn_pathway_gene" type="checkbox"/><a href="http://www.ehmn.bioinformatics.ed.ac.uk">EHMN Metabolic Pathways</a>'+
            '</label>'+
            '</li>'+
            '<li><label><input name="slist" value="GO" type="checkbox" id="go" onclick="selectAllGO()"/><a href="http://www.geneontology.org/">GO</a>'+
            '</label>'+
            '<ul>'+
            '<li><label><input name="slist" value="GOBP" id="gobio" type="checkbox"/><a href="http://www.geneontology.org/">GO Biological Process</a>'+
            '</label>'+
            '</li>'+
            '<li><label><input name="slist" value="GOCC" id="gocell" type="checkbox"/><a href="http://www.geneontology.org/">GO Cellular Component</a>'+
            '</label>'+
            '</li>'+
            '<li><label><input name="slist" value="GOMF" id="gomol" type="checkbox"/><a href="http://www.geneontology.org/">GO Molecular Function</a>'+
            '</label>'+
            '</li>'+
            '</ul></li>'+
            '<li><label><input name="slist" value="kegg_pathway" type="checkbox"/><a href="http://www.genome.jp/kegg/">KEGG Pathway</a>'+
            '</label>'+
            '</li>'+
            '<li><label><input name="slist" value="panther_pathway" type="checkbox"/><a href="http://www.pantherdb.org/pathway/">Panther Pathway</a>'+
            '</label>'+
            '</li>'+
            '<li><label><input name="slist" value="pfam" type="checkbox"/><a href="http://pfam.sanger.ac.uk/">pFAM</a>'+
            '</label>'+
            '</li>'+
            '</ul></li>'+
            '<li><label>Literature Derived</label>'+
            '<ul>'+
            '<li><label><input name="slist" value="mesh" type="checkbox"/><a href="http://gene2mesh.ncibi.org/">MeSH</a>'+
            '</label>'+
            '</li>'+


            '</ul></li>'+
            '<li><label>Targets</label>'+
            '<ul>'+
            '<li><label><input name="slist" value="drug_bank" type="checkbox"/><a href="http://www.drugbank.ca/">Drug Bank</a>'+
            '</label>'+
            '</li>'+
            '<li><label><input name="slist" value="mirbase" type="checkbox"/><a href="http://www.mirbase.org/">miRBase</a>'+
            '</label>'+
            '</li>'+
            '<li><label><input name="slist" value="transcription_factors" type="checkbox"/><a href="http://biobase-international.com/index.php?id=transfac">Transcription Factors</a>'+
            '</label>'+
            '</li>'+
            '</ul></li>'+
            '<li><label>Interaction</label>'+
            '<ul>'+
            '<li><label><input name="slist" value="protein_interaction_mimi" type="checkbox"/><a href="http://mimi.ncibi.org/MimiWeb/main-page.jsp">Protein Interaction (MiMI)</a>'+
            '</label>'+
            '</li>'+
            '</ul></li>'+
            '<li><label>Other</label>'+
            '<ul>'+
            '<li><label><input name="slist" value="metabolite" type="checkbox"/><a href="http://www.ncibi.org">Metabolite</a>'+
            '</label>'+
            '</li>'+
            '</ul>'+
            '<br/>'+
            '<li><label>Select All Datatbases</label>'+
            '<ul>'+
            '<li><label><input name="slist2"  type="checkbox"  onclick="selectAllDb(this)"/><a href="http://www.ncbi.nlm.nih.gov/sites/entrez?db=gene">Select All</a>'+
            '</ul>'+
            '</ul>';


        document.getElementById("databaseList").innerHTML = list;



        var list2 =
            '<ul>'
            +'<li><input type="radio" name="ismappable" value="F" checked="checked"  /><span class="formText">False </span> <br/>'
            +'<span class="footnote"> Mappability is only available for hg19 and mm9 </span></li>'
            +'</ul>'

            +'</div>'
            +'</td>'
            +'</tr>' ;

        console.log("inside if loop of mm10");
        document.getElementById("mapp").innerHTML = list2;


        var list3 =
            '<ul class= "b">'
            +'<li><input type="radio" name="ld" value="1kb" /><span class="formText">1kb</span><br />'
            +'<span class="footnote">(only use peaks within 1kb of a transcription start site)</span></li>'
            +'<li><input type="radio" name="ld" value="5kb"  /><span class="formText">5kb</span><br />'
            +'<span class="footnote">(only use peaks within 5kb of a transcription start site)</span></li>'
            +'<li><input type="radio" name="ld" value="nearest_tss" checked="checked" onClick="warnForFet(this)"/><span class="formText">Nearest TSS</span><br />'
            +'<span class="footnote">(use all peaks; assign peaks to the gene with the closest TSS)</span></li>'
            +'<li><input type="radio" name="ld" value="user" onClick="UploadLdFile(this)"/><span class="formText">User Defined</span><br />'
            +'<span class="footnote">(user can input their own locus definition)</span></li>'
            +'</ul>' ;

        document.getElementById("locusdefinations").innerHTML = list3;



    }
    else if(selection == "mm9" ){

        var list =
            '<ul class="checklist">'+
            '<li><label>Functional Annotations</label>'+
            '<ul>'+
            '<li><label><input name="slist" value="biocarta_pathway" type="checkbox"/><a href="http://www.biocarta.com/">Biocarta Pathway</a>'+
            '</label>'+
            '</li>'+
            '<li><label><input name="slist" value="ehmn_pathway_gene" type="checkbox"/><a href="http://www.ehmn.bioinformatics.ed.ac.uk">EHMN Metabolic Pathways</a>'+
            '</label>'+
            '</li>'+
            '<li><label><input name="slist" value="GO" type="checkbox" id="go" onclick="selectAllGO()"/><a href="http://www.geneontology.org/">GO</a>'+
            '</label>'+
            '<ul>'+
            '<li><label><input name="slist" value="GOBP" id="gobio" type="checkbox"/><a href="http://www.geneontology.org/">GO Biological Process</a>'+
            '</label>'+
            '</li>'+
            '<li><label><input name="slist" value="GOCC" id="gocell" type="checkbox"/><a href="http://www.geneontology.org/">GO Cellular Component</a>'+
            '</label>'+
            '</li>'+
            '<li><label><input name="slist" value="GOMF" id="gomol" type="checkbox"/><a href="http://www.geneontology.org/">GO Molecular Function</a>'+
            '</label>'+
            '</li>'+
            '</ul></li>'+
            '<li><label><input name="slist" value="kegg_pathway" type="checkbox"/><a href="http://www.genome.jp/kegg/">KEGG Pathway</a>'+
            '</label>'+
            '</li>'+
            '<li><label><input name="slist" value="panther_pathway" type="checkbox"/><a href="http://www.pantherdb.org/pathway/">Panther Pathway</a>'+
            '</label>'+
            '</li>'+
            '<li><label><input name="slist" value="pfam" type="checkbox"/><a href="http://pfam.sanger.ac.uk/">pFAM</a>'+
            '</label>'+
            '</li>'+
            '</ul></li>'+
            '<li><label>Literature Derived</label>'+
            '<ul>'+
            '<li><label><input name="slist" value="mesh" type="checkbox"/><a href="http://gene2mesh.ncibi.org/">MeSH</a>'+
            '</label>'+
            '</li>'+


            '</ul></li>'+
            '<li><label>Targets</label>'+
            '<ul>'+
            '<li><label><input name="slist" value="drug_bank" type="checkbox"/><a href="http://www.drugbank.ca/">Drug Bank</a>'+
            '</label>'+
            '</li>'+
            '<li><label><input name="slist" value="mirbase" type="checkbox"/><a href="http://www.mirbase.org/">miRBase</a>'+
            '</label>'+
            '</li>'+
            '<li><label><input name="slist" value="transcription_factors" type="checkbox"/><a href="http://biobase-international.com/index.php?id=transfac">Transcription Factors</a>'+
            '</label>'+
            '</li>'+
            '</ul></li>'+
            '<li><label>Interaction</label>'+
            '<ul>'+
            '<li><label><input name="slist" value="protein_interaction_mimi" type="checkbox"/><a href="http://mimi.ncibi.org/MimiWeb/main-page.jsp">Protein Interaction (MiMI)</a>'+
            '</label>'+
            '</li>'+
            '</ul></li>'+
            '<li><label>Other</label>'+
            '<ul>'+
            '<li><label><input name="slist" value="metabolite" type="checkbox"/><a href="http://www.ncibi.org">Metabolite</a>'+
            '</label>'+
            '</li>'+
            '</ul>'+
            '<br/>'+
            '<li><label>Select All Datatbases</label>'+
            '<ul>'+
            '<li><label><input name="slist2"  type="checkbox"  onclick="selectAllDb(this)"/><a href="http://www.ncbi.nlm.nih.gov/sites/entrez?db=gene">Select All</a>'+
            '</ul>'+
            '</ul>';


        document.getElementById("databaseList").innerHTML = list;



        var list2 =
            '<ul>'
            +'<li><input type="radio" name="ismappable" value="T" onClick="selectRangeCheck(this)"/> <span class="formText">True</span></li>'
            +'<li><input type="radio" name="ismappable" value="F" onClick="selectRangeCheck(this)" /><span class="formText">False</span></li>'
            +'</ul>'
            +'</div>'
            +'</td>'
            +'</tr>' ;

        console.log("inside if loop of mouse");
        document.getElementById("mapp").innerHTML = list2;



        var list3 =
            '<ul class= "b">'
            +'<li><input type="radio" name="ld" value="1kb" /><span class="formText">1kb</span><br />'
            +'<span class="footnote">(only use peaks within 1kb of a transcription start site)</span></li>'
            +'<li><input type="radio" name="ld" value="5kb"  /><span class="formText">5kb</span><br />'
            +'<span class="footnote">(only use peaks within 5kb of a transcription start site)</span></li>'
            +'<li><input type="radio" name="ld" value="exon" onClick="warnForFet(this)"/><span class="formText">Exon</span><br />'
            +'<span class="footnote">(only use peaks that fall within an annotated exon)</span></li>'
            +'<li><input type="radio" name="ld" value="nearest_gene" onClick="warnForFet(this)"  /><span class="formText">Nearest Gene</span><br />'
            +'<span class="footnote">(use all peaks; assign peaks to the nearest gene defined by transcription start and end sites)</span></li>'
            +'<li><input type="radio" name="ld" value="nearest_tss" checked="checked" onClick="warnForFet(this)"/><span class="formText">Nearest TSS</span><br />'
            +'<span class="footnote">(use all peaks; assign peaks to the gene with the closest TSS)</span></li>'
            +'<li><input type="radio" name="ld" value="user" onClick="UploadLdFile(this)"/><span class="formText">User Defined</span><br />'
            +'<span class="footnote">(user can input their own locus definition)</span></li>'
            +'</ul>' ;

        document.getElementById("locusdefinations").innerHTML = list3;





    }
    else if(selection == "hg19")
    {

        var list =
            '<ul class="checklist">'+
            '<li><label>Functional Annotations</label>'+
            '<ul>'+
            '<li><label><input name="slist" value="biocarta_pathway" type="checkbox"/><a href="http://www.biocarta.com/">Biocarta Pathway</a>'+
            '</label>'+
            '</li>'+
            '<li><label><input name="slist" value="ehmn_pathway_gene" type="checkbox"/><a href="http://www.ehmn.bioinformatics.ed.ac.uk">EHMN Metabolic Pathways</a>'+
            '</label>'+
            '</li>'+
            '<li><label><input name="slist" value="GO" type="checkbox" id="go" onclick="selectAllGO()"/><a href="http://www.geneontology.org/">GO</a>'+
            '</label>'+
            '<ul>'+
            '<li><label><input name="slist" value="GOBP" id="gobio" type="checkbox"/><a href="http://www.geneontology.org/">GO Biological Process</a>'+
            '</label>'+
            '</li>'+
            '<li><label><input name="slist" value="GOCC" id="gocell" type="checkbox"/><a href="http://www.geneontology.org/">GO Cellular Component</a>'+
            '</label>'+
            '</li>'+
            '<li><label><input name="slist" value="GOMF" id="gomol" type="checkbox"/><a href="http://www.geneontology.org/">GO Molecular Function</a>'+
            '</label>'+
            '</li>'+
            '</ul></li>'+
            '<li><label><input name="slist" value="kegg_pathway" type="checkbox"/><a href="http://www.genome.jp/kegg/">KEGG Pathway</a>'+
            '</label>'+
            '</li>'+
            '<li><label><input name="slist" value="panther_pathway" type="checkbox"/><a href="http://www.pantherdb.org/pathway/">Panther Pathway</a>'+
            '</label>'+
            '</li>'+
            '<li><label><input name="slist" value="pfam" type="checkbox"/><a href="http://pfam.sanger.ac.uk/">pFAM</a>'+
            '</label>'+
            '</li>'+
            '</ul></li>'+
            '<li><label>Literature Derived</label>'+
            '<ul>'+
            '<li><label><input name="slist" value="mesh" type="checkbox"/><a href="http://gene2mesh.ncibi.org/">MeSH</a>'+
            '</label>'+
            '</li>'+


            '</ul></li>'+
            '<li><label>Targets</label>'+
            '<ul>'+
            '<li><label><input name="slist" value="drug_bank" type="checkbox"/><a href="http://www.drugbank.ca/">Drug Bank</a>'+
            '</label>'+
            '</li>'+
            '<li><label><input name="slist" value="mirbase" type="checkbox"/><a href="http://www.mirbase.org/">miRBase</a>'+
            '</label>'+
            '</li>'+
            '<li><label><input name="slist" value="transcription_factors" type="checkbox"/><a href="http://biobase-international.com/index.php?id=transfac">Transcription Factors</a>'+
            '</label>'+
            '</li>'+
            '</ul></li>'+
            '<li><label>Interaction</label>'+
            '<ul>'+
            '<li><label><input name="slist" value="protein_interaction_mimi" type="checkbox"/><a href="http://mimi.ncibi.org/MimiWeb/main-page.jsp">Protein Interaction (MiMI)</a>'+
            '</label>'+
            '</li>'+
            '</ul></li>'+
            '<li><label>Other</label>'+
            '<ul>'+
            '<li><label><input name="slist" value="metabolite" type="checkbox"/><a href="http://www.ncibi.org">Metabolite</a>'+
            '</label>'+
            '</li>'+
            '<li><label><input name="slist" value="cytoband" type="checkbox"/><a href="http://www.ncbi.nlm.nih.gov/sites/entrez?db=gene">Cytoband</a>'+
            '</label>'+
            '</li>'+
            '</ul>'+
            '<br/>'+
            '<li><label>Select All Datatbases</label>'+
            '<ul>'+
            '<li><label><input name="slist2"  type="checkbox"  onclick="selectAllDb(this)"/><a href="http://www.ncbi.nlm.nih.gov/sites/entrez?db=gene">Select All</a>'+
            '</ul>'+
            '</ul>';

        document.getElementById("databaseList").innerHTML = list;
        document.upform.isDatabaseExternal.value = 'false';

        var list2 =
            '<ul>'
            +'<li><input type="radio" name="ismappable" value="T" onClick="selectRangeCheck(this)"/> <span class="formText">True</span></li>'
            +'<li><input type="radio" name="ismappable" value="F"  onClick="selectRangeCheck(this)"  /><span class="formText">False</span></li>'
            +'</ul>'
            +'</div>'
            +'</td>'
            +'</tr>' ;


        console.log("inside human loop");
        document.getElementById("mapp").innerHTML = list2;
        document.upform.isDatabaseExternal.value = 'true';


        var list3 =
            '<ul class= "b">'
            +'<li><input type="radio" name="ld" value="1kb" /><span class="formText">1kb</span><br />'
            +'<span class="footnote">(only use peaks within 1kb of a transcription start site)</span></li>'
            +'<li><input type="radio" name="ld" value="5kb"  /><span class="formText">5kb</span><br />'
            +'<span class="footnote">(only use peaks within 5kb of a transcription start site)</span></li>'
            +'<li><input type="radio" name="ld" value="exon" onClick="warnForFet(this)"/><span class="formText">Exon</span><br />'
            +'<span class="footnote">(only use peaks that fall within an annotated exon)</span></li>'
            +'<li><input type="radio" name="ld" value="nearest_gene" onClick="warnForFet(this)"  /><span class="formText">Nearest Gene</span><br />'
            +'<span class="footnote">(use all peaks; assign peaks to the nearest gene defined by transcription start and end sites)</span></li>'
            +'<li><input type="radio" name="ld" value="nearest_tss" checked="checked" onClick="warnForFet(this)"/><span class="formText">Nearest TSS</span><br />'
            +'<span class="footnote">(use all peaks; assign peaks to the gene with the closest TSS)</span></li>'
            +'<li><input type="radio" name="ld" value="user" onClick="UploadLdFile(this)"/><span class="formText">User Defined</span><br />'
            +'<span class="footnote">(user can input their own locus definition)</span></li>'
            +'</ul>' ;

        document.getElementById("locusdefinations").innerHTML = list3;


    }
    else
    {

        var list =
            '<ul>'
            +'<li><input type="radio" name="ismappable" value="T" onClick="selectRangeCheck(this)"/> <span class="formText">True</span></li>'
            +'<li><input type="radio" name="ismappable" value="F"  onClick="selectRangeCheck(this)"  /><span class="formText">False</span></li>'
            +'</ul>'
            +'</div>'
            +'</td>'
            +'</tr>' ;


        console.log("inside human loop");
        document.getElementById("mapp").innerHTML = list;
        document.upform.isDatabaseExternal.value = 'true';

    }








}

function userDefMappa(){

    var radioButtons = document.getElementsByName("rc");
    for (var x = 0; x < radioButtons.length; x ++) {
        if (radioButtons[x].checked) {
            console.log(radioButtons[x].value);
            if(radioButtons[x].value == "user")
            {

                var list =
                    '<ul class="checklist">'
                    +'<td align="right" valign="top"><span class="formText">Read Length</span></td>'
                    +'<td>'
                    +'<ulclass="checklist">'

                    +'<li><input type="radio" name="rc" value="user" checked="checked" /><span class="formText">User defined</span></li>'
                    +'<li>Input Mappability File<input id="mappaFile" type="file" name="mappaFile" size="30" class="formObject"> </li>'

                    +'</ul>'
                    +'</td>';


                document.getElementById("rangeCheck").innerHTML = list;

            }
        }

    }


}

function UploadLdFile()
{

    var radioButtons = document.getElementsByName("ld");

    console.log(radioButtons.value);
    for (var x = 0; x < radioButtons.length; x ++) {
        if (radioButtons[x].checked) {
            console.log(radioButtons[x].value);
            if(radioButtons[x].value == "user")
            {

                var list =
                    '<ul class="checklist">'
                    +'<ulclass="checklist">'

                    +'<li><input type="radio" name="ld" value="user" checked="checked" /><span class="formText">User defined</span></li>'
                    +'<span class="formText">Input Locus definition File</span> <input id="ldFile" type="file" name="ldFile" size="30" class="formObject"> '

                    +'</ul>'
                    +'</td>';

                document.getElementById("locusdefinations").innerHTML = list;

            }
        }

    }


}

function checkPeakThr()
{


    var no =document.getElementById('peakthr');
    var numValue = Number(no.value);
    console.log(numValue);
    console.log(no.value);

    if(numValue < 0   )
    {

        filterValueError = "Value should not be less than 5";
        alert(filterValueError);
    }
    else if(isNaN(numValue) )
    {
        filterValueError2 = "value is not numeric";
        alert(filterValueError2);
    }
}



function warnForFet()
{
    console.log("1");
    var selection=0;
    var range= document.getElementsByName("method");
    for (var i = 0; i < range.length; i++) {
        console.log(range.length);
        if (range[i].checked) {
            selection =range[i].value;
        }
    }
    var selection2=0;
    var range2= document.getElementsByName("ld");
    for (var i = 0; i < range2.length; i++) {
        console.log(range2.length);
        if (range2[i].checked) {
            selection2 =range2[i].value;
        }
    }
    if (selection == "fet" && (selection2 == "exon"|| selection2 == "nearest_gene"||selection2 == "nearest_tss"))
    {
        alert("There is bias if you select Fisher's exact test with "+ selection2 );

    }



}


function checkOutname()
{
    var name= document.getElementsByName("outname");
    console.log(name);

}





