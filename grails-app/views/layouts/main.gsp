<!doctype html>
<html lang="en" class="no-js">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <title>
        <g:layoutTitle default="Grails"/>
    </title>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <asset:link rel="icon" href="favicon.ico" type="image/x-ico"/>

    <asset:stylesheet src="application.css"/>

    <g:layoutHead/>
    <style>
.navbar-brand {
    transform: translateX(-50%);
    left: 50%;
    position: absolute;
}


/* DEMO example styles for logo image */
.brand-centered {
    display: flex;
    justify-content: center;
    position: absolute;
    width: 100%;
    left: 0;
    top: 0;
}
.navbar-brand {
    display: flex;
    align-items: center;
}
</style>
</head>

<body>

<nav class="navbar navbar-expand-lg navbar-light navbar-static-top" role="navigation">


    <a class="navbar-brand mx-auto" href="/#">
        <a class="navbar-center" href="${createLink(uri: '/')}"><img src="${resource(dir: 'images', file: 'broadLogo.png')}" alt="GSE" style="height:auto; width: 5em;" />
            <br/>
            <br/>
        <span class="logoTitle">Broad-Enrich: gene set enrichment testing for sets of broad genomic regions</span></a>

</a>

</nav>

<g:layoutBody/>

<div class="footer row" role="contentinfo">
    <div class="col">

    </div>
    <div class="col">

    </div>

    <div class="col">

</div>


<div id="spinner" class="spinner" style="display:none;">
    <g:message code="spinner.alt" default="Loading&hellip;"/>
</div>

<asset:javascript src="application.js"/>

</body>
</html>
