package broadenrich

import grails.gorm.transactions.Transactional
import org.rosuda.REngine.REXP;
import org.rosuda.REngine.RList
import org.rosuda.REngine.Rserve.*;
import org.rosuda.Rserve.*;


@Transactional
class SubmitBroadenrichJobService {

    // InputparamsService inputparamsService
    RConnection connection = new RConnection();

    def serviceMethod() {

    }

    void send(String user) {
        connection.eval("library(chipenrich)");


        log.info "Sending email to ${user}"
        def qjobs = Inputparams.createCriteria()


        def qresult = qjobs.list {
            eq("status", "queued")
        }
        def rjobs = Inputparams.executeQuery("select uuid from Inputparams where status ='running'")
        println("below query with queued jobs $qresult.size() running jobs $rjobs.size")
        def rjobCount = rjobs.size()
        println("1")




        if (rjobCount < 2 && qresult.size != 0) {

            /* args.add(NameValuePairUtil.buildNameValuePairFromNameValue("uploadfile", data.getUploadFile()));
             args.add(NameValuePairUtil.buildNameValuePairFromNameValue("uploadMappafile", data.getUploadMappaFile()));
             args.add(NameValuePairUtil.buildNameValuePairFromNameValue("uploadCustomFile", data.getUploadCustomFile()));
             args.add(NameValuePairUtil.buildNameValuePairFromNameValue("outpath", data.getOutPath()));
             args.add(NameValuePairUtil.buildNameValuePairFromNameValue("email", data.getEmail()));
             args.add(NameValuePairUtil.buildNameValuePairFromNameValue("outname", data.getOutName()));
             args.add(NameValuePairUtil.buildNameValuePairFromNameValue("sglist", data.getSgList()));
             args.add(NameValuePairUtil.buildNameValuePairFromNameValue("method", data.getMethod()));
             args.add(NameValuePairUtil.buildNameValuePairFromNameValue("ld", data.getLd()));
             args.add(NameValuePairUtil.buildNameValuePairFromCollection("slist", toStringList(data.getSgSetList())));
             args.add(NameValuePairUtil.buildNameValuePairFromNameValue("ismappable", data.getIsMappable()));
             args.add(NameValuePairUtil.buildNameValuePairFromNameValue("rc", data.getRc()));
             args.add(NameValuePairUtil.buildNameValuePairFromNameValue("qc", data.getQc()));
             args.add(NameValuePairUtil.buildNameValuePairFromNameValue("weighing", data.getWeighing()));
             args.add(NameValuePairUtil.buildNameValuePairFromNameValue("filter", data.getFilter()));
             args.add(NameValuePairUtil.buildNameValuePairFromNameValue("peakthr", data.getPeakThr()));
             args.add(NameValuePairUtil.buildNameValuePairFromNameValue("javax", true));
             System.out.println("weighting is buildNameValueArgsFromChipEnrichData "+ data.getWeighing());

              String uploadfile
      String uploadMappafile
      String outname
      String email
      String sglist
      String ld
      String slist
      String ismappable
      String rc
      String qc
      String method
      String outpath
      String filter
      String peakthr
      String uploadCustomFile
      String uuid
      String status
      */

            /* //broadenrich(peaks, out_name = "broadenrich", out_path = getwd(),
       genome = supported_genomes(), genesets = c("GOBP", "GOCC", "GOMF"),
       locusdef = "nearest_tss", mappability = NULL, qc_plots = TRUE,
       min_geneset_size = 15, max_geneset_size = 2000, randomization = NULL,
       n_cores = 1)
       */
            def firstSubJob = qresult[0]


            def status = firstSubJob.status
            println("Status of current job is " + status)
            println("1")
            def filepath = firstSubJob.uploadfile
            def mappafile = firstSubJob.uploadMappafile
            String outname = firstSubJob.outname
            String email = firstSubJob.email
            String sglist = firstSubJob.sglist
            String ld = firstSubJob.ld
            String slist = firstSubJob.slist
            String ismappable = firstSubJob.ismappable
            String rc = firstSubJob.rc
            String qc = firstSubJob.qc
            String method = firstSubJob.method
            String outpath = firstSubJob.outpath
            String filter = firstSubJob.filter
            String peakthr = firstSubJob.peakthr
            String uploadCustomFile = firstSubJob.uploadCustomFile
            String uuid = firstSubJob.uuid
            String weightingOption = ""//only for polyenrich



            connection.assign("peaks", filepath);
            connection.assign("outname", outname);
            connection.assign("outpath", outpath);
            connection.assign("genomedata", sglist);
            connection.assign("genesetdata", slist);

            connection.assign("ld", ld)


            System.out.println("Weighting is " + weightingOption);

            if (weightingOption.equals("true")) {
                System.out.println("1");
                if (method.equals("polyenrich")) {
                    System.out.println("2");
                    method = "polyenrich_weighted";


                }


            }

            connection.assign("method", method);
            //rserver.assignRVariable("mappaFileLoc", data.getUploadMappaFile());
            //rserver.assignRVariable("mappaFileLoc", data.getUploadMappaFile());
            //rserver.assignRVariable("customFileLoc", data.getUploadCustomFile());

            if (ismappable.equals("F")) {
                System.out.println("no mappability");
                //rserver.assignRVariable("mappability","NULL");
                connection.eval("assign('mappability',NULL)");

            } else {

                if (rc.equals("user")) {
                    connection.assign("mappability", mappafile);

                }
                else {
                    connection.assign("mappability", rc);

                }

            }

            println("peaks $filepath")
            println("out_name $outname")
            println("out_path $outpath")
            println("genome $sglist")
            println("genesetdata $slist")
            println("ld $ld")
            println("method $method")
            println("mappability $ismappable")


            String command = null;

            if (method.equals("chipenrich")) {

                command = "  ChipEnrichResults <- chipenrich( " +
                        "  peaks" +
                        ", out_name = outname " +
                        ", out_path = outpath" +
                        ", genome = genomedata " +
                        ", genesets = genesetdata " +
                        ", locusdef = ld " +
                        ", method = method " +
                        ", mappability = mappability" +
                        ", qc_plots = TRUE" +
                        ", max_geneset_size = " + filter +
                        ", randomization = NULL" +
                        ", num_peak_threshold = " + peakthr +
                        ")";

            }
            else if (method.equals("polyenrich")) {

                command = "  ChipEnrichResults <- polyenrich( " +
                        "  peaks" +
                        ", out_name = outname " +
                        ", out_path = outpath" +
                        ", genome = genomedata " +
                        ", genesets = genesetdata " +
                        ", method = method " +
                        ", weighting = weighting " +
                        ", locusdef = ld " +
                        ", mappability = mappability" +
                        ", qc_plots = TRUE" +
                        ", max_geneset_size = " + filter +
                        ", randomization = NULL" +
                        ")";

            }
            else if (method.equals("hybrid")) {
                command = "  ChipEnrichResults <- hybridenrich( " +
                        "  peaks" +
                        ", out_name = outname " +
                        ", out_path = outpath" +
                        ", genome = genomedata " +
                        ", genesets = genesetdata " +
                        ", methods = c('chipenrich','polyenrich')" +
                        ", weighting = weighting " +
                        ", locusdef = ld " +
                        ", mappability = mappability" +
                        ", qc_plots = TRUE" +
                        ", max_geneset_size = " + filter +
                        ", randomization = NULL" +
                        ", num_peak_threshold = " + peakthr +
                        ")";
            }
            else if (method.equals("broadenrich")) {

              /*  //broadenrich(peaks, out_name = "broadenrich", out_path = getwd(),
                genome = supported_genomes(), genesets = c("GOBP", "GOCC", "GOMF"),
                locusdef = "nearest_tss", mappability = NULL, qc_plots = TRUE,
                min_geneset_size = 15, max_geneset_size = 2000, randomization = NULL,
                n_cores = 1)*/


                command = "  ChipEnrichResults <- broadenrich( " +
                        "  peaks" +
                        ", out_name = outname " +
                        ", out_path = outpath" +
                        ", genome = genomedata " +
                        ", genesets = genesetdata " +
                        ", locusdef = ld " +
                        ", mappability = NULL" +
                        ", qc_plots = TRUE" +
                        ", max_geneset_size = " + filter +
                        ", randomization = NULL" +
                        ")";
            }

            System.out.println("command is  " + command);

            List<String> status2 = new ArrayList();
            String result;

            try
            {
                REXP r1 =  connection.parseAndEval("try("+command+",silent=TRUE)");

               // REXP r1 =connection.parseAndEval(command)

                println(r1)

                println("its got the results")
                if (r1.inherits("try-error"))
                {
                    System.err.println("Error: "+r1.asString());
                    status = "Error: "+r1.asString();
                }
                else { System.out.println("Hello");
                    status = "Done";
                }

            }
            catch (RserveException e)
            {
                e.printStackTrace();
                throw new IllegalStateException("Unable to run command  parseAndEval on RServer: " + command);
            }
            /*catch(Exception e)
            {

                println("normal exception")
            }
*/
            System.out.println("Inside processResultsOfAnalysis");


        }

        connection.close()

    }
}