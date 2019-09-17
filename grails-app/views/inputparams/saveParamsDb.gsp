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

                       Your Job is submitted with uuid ${uuid} and email will be sent once the job is done at ${email}

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
