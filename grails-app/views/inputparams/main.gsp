<!DOCTYPE html>
<html>
<head>
    <meta name="layout" content="main"/>
    <asset:javascript src="menu.js"/>
    <asset:javascript src="validation.js" />
    <g:set var="entityName" value="${message(code: 'inputparams.label', default: 'Inputparams')}"/>
    <title><g:message code="default.create.label" args="[entityName]"/></title>
</head>

<body>
<div class="container-fluid">
    <div class="row"><div class="col-12">


        <div class="card"><div class="card-body">
            <div class="row">
                <div class="col-12">
                    <h2>Overview</h2>
                    <span class="text">Broad-Enrich tests sets of broad genomic regions (e.g., from ChIP-seq data
                    for histone modifications or copy number variations) for enriched biological pathways, Gene
                    Ontology terms, or other gene sets. The pre-defined gene sets are the same as used in LRpath,
                    and can be browsed <a
                            href="http://lrpath.ncibi.org/browse.jsp">here</a>. Using an input .bed, .narrowPeak or.broadPeak file, Broad-Enrich determines the proportion of
                    each gene locus covered by a peak, using a chosen "gene locus definition". The "locus" of a
                    gene is the region from which the gene is predicted to be regulated. Broad-Enrich uses a
                    logistic regression model to test for association between the proportion of each gene locus
                    covered by a peak and gene set membership. It empirically adjusts for the bias due to locus
                    length using a binomial cubic smoothing spline within the logistic model. Detailed methods are
                    provided <a
                            href="data/BroadEnrichMethods.pdf">here</a>. Output includes summary plots, peak to gene assignments, and enrichment (and depletion)
                    results including odds ratio, p-value, and FDR for each gene set.
                    </span>

                    <div id="more">
                        <a href="#" onclick="expandAdvancedOptions()">more</a>

                    </div>
                    Broad-Enrich is also available as part of the Chip-Enrich R package:<a href = "data/chipenrich_v1.1.2.zip">Broad-Enrich.zip</a><br>
                    Vignette:<a href = "data/chipenrich_vignette.pdf">pdf</a>
                </div>
            </div>
        </div></div>
    </div>

    </div>
</div>



        <!--  FORM PANEL -------------------------------------------------------------------------------------------------------------------------->

        <div class="container-fluid">
        <div class="row"><div class="col-12">


            <div class="card"><div class="card-body">
                <div class="row">
                    <h2>Run Analysis</h2>

                        <center>
                            <div id="formPanel">
                                <g:form action="saveParamsDb" method="post" id="upform" name="upform"
                                      enctype="multipart/form-data">
                                    <input type="hidden" name="isDatabaseExternal" value="true"/>
                                    <input type="hidden" name="todo" value="upload">


                                    <table id="basic">
                                        <tr>
                                            <td align="right" valign="top"><span
                                                    class="formText"><b>Select input file</b></span>
                                            </td>
                                            <td><input id="uploadfile" type="file" name="uploadfile" size="30"
                                                       class="formObject"> <br/> <br/>
                                                <span class="footnote">
                                                    The following formats are fully supported via their file extensions: .bed, .broadPeak, .narrowPeak, .gff3, .gff2, .gff, and .bedGraph or .bdg.
                                                    BED3 through BED6 files are supported under the .bed extension. Files without these extensions are supported under the conditions that
                                                    the first 3 columns correspond to 'chr', 'start', and 'end' and that there is either no header column, or it is commented out.
                                                </span>
                                                <br/> <br/>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td align="right" valign="top"><span class="formText"><b>Analysis Name</b>
                                            </span>
                                            </td>
                                            <td><input id="outname" type="text" name="outname" size="30"
                                                       class="formObject" onChange="validate(this);"> <br/>
                                                <span class="footnote">
                                                    Please provide a meaningful name for this analysis (used to name output files).
                                                </span>
                                                <br/> <br/>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td align="right" valign="top"><span class="formText"><b>Email</b></span>
                                            </td>
                                            <td><input id="email" type="text" name="email" size="30"
                                                       class="formObject"> <br/>
                                                <span class="footnote">Please provide your email address if you wish to be notified when the analysis has been completed.</span>
                                                <br/> <br/>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td align="right" valign="top" width="140"><span
                                                    class="formText"><b>Supported Genomes</b></span></td>
                                            <td><select name="sglist" id="sglist" size="1" class="formObject"
                                                        onChange="selectMappaOption();">
                                                <option value="">Select Genome</option>
                                                <option value="hg19">Human (hg19)</option>
                                                <option value="hg38">Human (hg38)</option>
                                                <option value="mm9">Mouse (mm9)</option>
                                                <option value="mm10">Mouse (mm10)</option>
                                                <option value="rn4">Rat (rn4)</option>
                                                <option value="rn5">Rat (rn5)</option>
                                                <option value="rn6">Rat (rn6)</option>
                                                <option value="dm3">D. melanogaster (dm3)</option>
                                                <option value="dm6">D. melanogaster (dm6)</option>
                                                <option value="dre">D. Zebrafish (danRer10)</option>
                                            </select>
                                                <br/> <br/><br/> <br/>
                                            </td>
                                        </tr>



                                        <tr>
                                            <td align="right" valign="top"><span
                                                    class="formText"><b>Annotation Databases</b></span>
                                            </td>
                                            <td>
                                                <div id="databaseList">

                                                    <ul class="checklist">
                                                        <li><label>Functional Annotations</label>
                                                            <ul>
                                                                <li><label><input name="slist" value="biocarta_pathway"
                                                                                  type="checkbox"/><a
                                                                        href="http://www.biocarta.com/">Biocarta Pathway</a>
                                                                </label>
                                                                </li>
                                                                <li><label><input name="slist" value="ehmn_pathway_gene"
                                                                                  type="checkbox"/><a
                                                                        href="http://www.ehmn.bioinformatics.ed.ac.uk">EHMN
                                                                    metabolic pathways</a>
                                                                </label>
                                                                </li>

                                                                <li><label><input name="slist" value="GO"
                                                                                  type="checkbox" id="go"
                                                                                  onclick="selectAllGO()"/><a
                                                                        href="http://www.geneontology.org/">GO</a>
                                                                </label>
                                                                    <ul>
                                                                        <li><label><input name="slist" value="GOBP"
                                                                                          id="gobio" type="checkbox"/><a
                                                                                href="http://www.geneontology.org/">GO Biological
                                                                            Process</a>
                                                                        </label>
                                                                        </li>
                                                                        <li><label><input name="slist" value="GOCC"
                                                                                          id="gocell"
                                                                                          type="checkbox"/><a
                                                                                href="http://www.geneontology.org/">GO Cellular
                                                                            Component</a>
                                                                        </label>
                                                                        </li>
                                                                        <li><label><input name="slist" value="GOMF"
                                                                                          id="gomol" type="checkbox"/><a
                                                                                href="http://www.geneontology.org/">GO Molecular
                                                                            Function</a>
                                                                        </label>
                                                                        </li>
                                                                    </ul></li>
                                                                <li><label><input name="slist" value="kegg_pathway"
                                                                                  type="checkbox"/><a
                                                                        href="http://www.genome.jp/kegg/">KEGG Pathway</a>
                                                                </label>
                                                                </li>
                                                                <li><label><input name="slist" value="panther_pathway"
                                                                                  type="checkbox"/><a
                                                                        href="http://www.pantherdb.org/pathway/">Panther
                                                                    Pathway</a>
                                                                </label>
                                                                </li>
                                                                <li><label><input name="slist" value="pfam"
                                                                                  type="checkbox"/><a
                                                                        href="http://pfam.sanger.ac.uk/">pFAM</a>
                                                                </label>
                                                                </li>
                                                                <li><label><input name="slist" value="reactome"
                                                                                  type="checkbox"/><a
                                                                        href="http://www.reactome.org/">Reactome</a>
                                                                </label>
                                                                </li>
                                                            </ul></li>
                                                        <li><label>Literature Derived</label>
                                                            <ul>
                                                                <li><label><input name="slist" value="mesh"
                                                                                  type="checkbox"/><a
                                                                        href="http://gene2mesh.ncibi.org/">MeSH</a>
                                                                </label>
                                                                </li>

                                                            </ul></li>

                                                        <li><label>MSigDB Derived</label>
                                                            <ul>
                                                                <li><label><input name="slist" value="hallmark"
                                                                                  type="checkbox"/><a
                                                                        href="http://software.broadinstitute.org/gsea/msigdb/collections.jsp">Hallmark</a>
                                                                </label></li>
                                                                <li><label><input name="slist" value="immunologic"
                                                                                  type="checkbox"/><a
                                                                        href=http://software.broadinstitute.org/gsea/msigdb/collections.jsp">Immunologic</a>
                                                                </label></li>
                                                                <li><label><input name="slist" value="oncogenic"
                                                                                  type="checkbox"/><a
                                                                        href="http://software.broadinstitute.org/gsea/msigdb/collections.jsp">Oncogenic</a>
                                                                </label></li>

                                                            </ul></li>


                                                        <li><label>Targets</label>
                                                            <ul>
                                                                <li><label><input name="slist" value="ctd"
                                                                                  type="checkbox"/><a
                                                                        href="http://ctdbase.org/">Comparative Toxicogenomics Database (CTD)</a>
                                                                </label>
                                                                </li>
                                                                <li><label><input name="slist" value="drug_bank"
                                                                                  type="checkbox"/><a
                                                                        href="http://www.drugbank.ca/">Drug Bank</a>
                                                                </label>
                                                                </li>
                                                                <li><label><input name="slist" value="microrna"
                                                                                  type="checkbox"/><a
                                                                        href=http://software.broadinstitute.org/gsea/msigdb/collections.jsp">MicroRNA</a>
                                                                </label>
                                                                </li>
                                                                <li><label><input name="slist"
                                                                                  value="transcription_factors"
                                                                                  type="checkbox"/><a
                                                                        href="http://biobase-international.com/index.php?id=transfac">Transcription
                                                                    Factors</a>
                                                                </label>
                                                                </li>
                                                            </ul></li>
                                                        <li><label>Interaction</label>
                                                            <ul>
                                                                <li><label><input name="slist"
                                                                                  value="protein_interaction_biogrid"
                                                                                  type="checkbox"/><a
                                                                        href="https://thebiogrid.org">Protein
                                                                    Interaction BioGRID</a>
                                                                </label>
                                                                </li>
                                                            </ul></li>
                                                        <li><label>Other</label>
                                                            <ul>
                                                                <li><label><input name="slist" value="metabolite"
                                                                                  type="checkbox"/><a
                                                                        href="http://www.ncibi.org">Metabolite</a>
                                                                </label>
                                                                </li>
                                                                <li><label><input name="slist" value="cytoband"
                                                                                  type="checkbox"/><a
                                                                        href="http://www.ncbi.nlm.nih.gov/sites/entrez?db=gene">Cytoband</a>
                                                                </label>
                                                                </li>

                                                            </ul>
                                                            <br/>

                                                        <li><label>Custom</label>
                                                            <ul>
                                                                <li><label><input name="slist" value="custom"
                                                                                  type="checkbox"
                                                                                  onchange="selectCustomFile()"/><a
                                                                        href="">Custom</a></label>
                                                                    <input id="uploadcustomfile" type="file"
                                                                           name="uploadcustomfile" size="30"
                                                                           class="formObject" onchange="uploadFile()">
                                                                </li>

                                                                <p><span
                                                                        class="footnote">To test custom gene sets,file should be defined in tab-delimited text file with the first column geneset ID or name, and the Entrez IDs belonging to the geneset.
                                                                    An example is provided <a href="images/custeg.txt"
                                                                                              target="_blank">here</a>.
                                                                </p></span>

                                                            </ul>
                                                            <br/>



                                                        <li><label>Select All Datatbases</label>
                                                            <ul>
                                                                <li><label><input name="slist2" value="selectall"
                                                                                  type="checkbox"
                                                                                  onchange="selectAllDb(this)"/><a
                                                                        href="http://www.ncbi.nlm.nih.gov/sites/entrez?db=gene">SelectAll</a>
                                                                </label>
                                                                </li>
                                                            </ul>

                                                    </ul>
                                                </div>
                                                <span class="footnote">Selecting multiple, or a
                                                large, annotation database may require several minutes of
                                                computation time.</span>
                                                <span class="footnote">For approximate Chip-Enrich
                                                running times against different databases view
                                                    <a href="data/ChipenrichTestTimes.pdf"
                                                       target="_blank">this</a> table.</span>
                                                <br/> <br/></td>
                                        </tr>



                                        <tr>
                                            <td align="right" valign="top"><span
                                                    class="formText"><b>Locus Definition</b></span></td>
                                            <td>
                                                <div id="locusdefinations">
                                                    <ul class="b">
                                                        <li><input type="radio" name="ld" value="1kb"/><span
                                                                class="formText">< 1kb</span><br/>
                                                            <span class="footnote">(only use peaks within 1kb of a transcription start site)</span>
                                                        </li>
                                                        <li><input type="radio" name="ld" value="5kb"/><span
                                                                class="formText">< 5kb</span><br/>
                                                            <span class="footnote">(only use peaks within 5kb of a transcription start site)</span>
                                                        </li>
                                                        <li><input type="radio" name="ld" value="10kb"/><span
                                                                class="formText">< 10kb</span><br/>
                                                            <span class="footnote">(only use peaks within 10kb of a transcription start site)</span>
                                                        </li>
                                                        <li><input type="radio" name="ld"
                                                                   value="10kb_outside_upstream"/><span
                                                                class="formText">> 10kb upstream</span><br/>
                                                            <span class="footnote">(only use peaks greater than  10kb upstream of a transcription start site)</span>
                                                        </li>
                                                        <li><input type="radio" name="ld" value="exon"
                                                                   onClick="warnForFet(this)"/><span
                                                                class="formText">Exon</span><br/>
                                                            <span class="footnote">(only use peaks that fall within an annotated exon)</span>
                                                        </li>
                                                        <li><input type="radio" name="ld" value="intron"
                                                                   onClick="warnForFet(this)"/><span
                                                                class="formText">Intron</span><br/>
                                                            <span class="footnote">(only use peaks that fall within an annotated itron)</span>
                                                        </li>
                                                        <li><input type="radio" name="ld" value="nearest_gene"
                                                                   onClick="warnForFet(this)"/><span
                                                                class="formText">Nearest Gene</span><br/>
                                                            <span class="footnote">(use all peaks; assign peaks to the nearest gene defined by transcription start and end sites)</span>
                                                        </li>
                                                        <li><input type="radio" name="ld" value="nearest_tss"
                                                                   checked="checked" onClick="warnForFet(this)"/><span
                                                                class="formText">Nearest TSS</span><br/>
                                                            <span class="footnote">(use all peaks; assign peaks to the gene with the closest TSS)</span>
                                                        </li>
                                                        <li><input type="radio" name="ld" value="user"
                                                                   onClick="UploadLdFile(this)"/><span
                                                                class="formText">User Defined</span><br/>
                                                            <span class="footnote">(user can input their own locus definition)</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td align="right" valign="top"><span class="formText"><b>Filter</b></span>
                                            </td>
                                            <td><span
                                                    class="formText">Only test gene sets with less than the following number of genes:</span>
                                                <input id="filter" type="text" name="filter" size="10" value="2000"
                                                       class="formObject">
                                                <span class="formText"></span>
                                                <br/> <span class="footnote">
                                                Filter value should be numeric and greater than 30.It can be used to remove large, vague gene sets such as "binding".
                                            </span>
                                                <br/> <br/>

                                        </tr>
                                        <tr>
                                            <td align="right" valign="top"><span
                                                    class="formText"><b>Adjust for the mappability of the gene locus regions</b>
                                            </span></td>
                                            <td>
                                                <div id="mapp">
                                                    <ul>
                                                        <li><input type="radio" name="ismappable" value="T"
                                                                   onClick="selectRangeCheck(this)"/> <span
                                                                class="formText">True</span></li>
                                                        <li><input type="radio" name="ismappable" value="F"
                                                                   onClick="selectRangeCheck(this)"
                                                                   checked="checked"/><span
                                                                class="formText">False</span></li>
                                                    </ul>
                                                </div>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td align="right" valign="top"><span
                                                    class="formText"><b>Peak Threshold Number</b></span>
                                            </td>
                                            <td>
                                                <input id="peakthr" type="text" name="peakthr" size="10" value="1"
                                                       class="formObject" onClick="checkPeakThr(this)">

                                                <br/> <span class="footnote">
                                                Number of peaks a gene must have assigned to it before getting coded as 1 (having a peak) in the test. Typically, this should be set to 1.
                                            </span>
                                                <br/> <br/>
                                            </td>
                                        </tr>



                                        <tr>
                                            <td align="right" valign="top"><span class="formText"></span></td>
                                            <td>
                                                <div id="rangeCheck">
                                                    <ul>

                                                    </ul>
                                                </div>
                                            </td>
                                        </tr>




                                        <tr>
                                            <td>&nbsp;</td>
                                            <td>

                                            </td>
                                        </tr>

                                    </table>
                                    <g:submitButton name="submit"  value="Submit"
                                                    class="buttonsubmit"/>
                                </br>
                                </br>

                                </g:form>
                                <!--  Form Panel-->
                            </div>
                        </center>
                        <!--  textPanel -->

                    <!--  formContentPanel -->

                </div>
            </div>

            </div>


            <div id="contentPanel">
                <hr>
                <span class="formTitle">Reference</span>

                <div id="textPanel">
                    <span class="text">Please reference the following
                    publication when citing Broad-Enrich: <br/> <br/> <sup>1</sup>
                        Cavalcante RG, Lee C, Welch RP, Patil S, Weymouth T, Scott LJ and Sartor MA. “Broad-Enrich: Functional interpretation of large sets of broad genomic regions.” (submitted).
                    </span>
                </div>
                <hr/>

                <div id="textPanel">
                    <span class="text">Change log for this page can be accessed <a
                            href="broadMainChangeLog.jsp">here</a> <br/> <br/></span>
                </div>

            </div>

        </div>

</body>
</html>
