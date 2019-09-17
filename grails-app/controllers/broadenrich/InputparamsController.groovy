package broadenrich

import grails.validation.ValidationException
import static org.springframework.http.HttpStatus.*

class InputparamsController {

    InputparamsService inputparamsService

    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]
    def main()
    {



    }

    def saveParamsDb()
    {
       /* params from inpPara [isDatabaseExternal:true, todo:upload, outname:check_web,
       email:inspiresnehal@gmail.com, sglist:hg19, slist:biocarta_pathway, ld:nearest_tss, filter:2000,
       ismappable:T, peakthr:1, rc:24, submit:Submit,
       uploadfile:org.springframework.web.multipart.support.StandardMultipartHttpServletRequest$StandardMultipartFile@21361f4f,
       controller:inputparams, format:null, action:saveParamsDb, id:upform
       ]

*/
        println("params from inpPara $params")

        println("***************************************************************")
        def uploadfile= request.getFile('uploadfile')


        def outname=params.outname
        def email=params.email
        def sglist=params.sglist
        def ld=params.ld
        def slist=params.slist


        def ismappable=params.ismappable
        def uploadMappafile

        def rc= params.rc

        println("rc valus is $rc params.rc")


        if(!rc.find())
        {
            rc='NA'
            println("rc is nulls")
        }
        else
        {
            rc=params.rc
        }
        def qc ='true'

        def filter=params.filter
        def peakthr=params.peakthr


        UUID uuid = UUID.randomUUID()
        def uploadCustomldFile=request.getFile('uploadcustomfile')
        def dirpath ='/Users/snehalpatil/Documents/GithubProjects/broaddata/'+outname




        println(uploadfile)
        File f = new File(dirpath);
        def outpath = ''
        if(!f.exists())
        {
            f.mkdir();
             outpath=  dirpath
        }
        else{

            dirpath ='/Users/snehalpatil/Documents/GithubProjects/broaddata/'+outname+uuid
            f=new File(dirpath);
            f.mkdir();
             outpath=  dirpath

        }


        def uploadfilename = uploadfile.originalFilename
        def newfilepath = dirpath+'/'+uploadfilename
        println(newfilepath)
        uploadfile.transferTo(new File(newfilepath))

        def newldpath ='nothings'

        if(ld.toString().equals("user"))
        {

            def uploadcustldfile = uploadCustomldFile.originalFilename
             newldpath = dirpath+'/'+uploadcustldfile
            uploadCustomldFile.transferTo(new File(newldpath))


        }

        println("newldpath is $newldpath and ls is $ld")
        def uploadMappaFile=request.getFile('mappaFile')
        def newmappath='NA'

        if(rc.toString().equals("user"))
        {
            def uploadmappafile = uploadMappaFile.originalFilename
            newmappath= dirpath+'/'+uploadmappafile
            uploadMappaFile.transferTo(new File(newmappath))

        }


        def cpara= new Inputparams(uploadfile:newfilepath,uploadMappafile:newmappath,outname:outname,email:email,sglist:sglist,ld:ld,slist:slist,ismappable:ismappable,
        rc:rc, qc:qc,method:"broadenrich",outpath:outpath,filter:filter,peakthr:peakthr,uploadCustomFile:newldpath,uuid:uuid,status:"queued")
        cpara.save(insert:true)
        if (!cpara.save()) {
            cpara.errors.each {
                println it
            }
        }
        println ("capara is $cpara.id")

        String s1= "braodenrich@gmail.com"

        String s2 = "tatagroup"

        String s3 = email

       // JavaMailer jm = new JavaMailer();

        String subject = "Job $cpara.id is queued"


        String redpage= ""

        String body = "Thank you for submitting your job. Your job is queued with jobid $cpara.id. Please check "+
                "http://pepcentric.arsci.com:8080/jobque/redirectResult?jobid=$cpara.id  link later for results"















     /*   def cpara= new Inputparams()
        cpara.save(insert:true)
        if (!cpara.save()) {
            cpara.errors.each {
                println it
            }
        }*/

        [uuid:uuid, outname:outname, email:email]

    }

    def displayStatus()
    {

    }

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond inputparamsService.list(params), model:[inputparamsCount: inputparamsService.count()]
    }

    def show(Long id) {
        respond inputparamsService.get(id)
    }

    def create() {
        respond new Inputparams(params)
    }

    def save(Inputparams inputparams) {
        if (inputparams == null) {
            notFound()
            return
        }

        try {
            inputparamsService.save(inputparams)
        } catch (ValidationException e) {
            respond inputparams.errors, view:'create'
            return
        }

        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.created.message', args: [message(code: 'inputparams.label', default: 'Inputparams'), inputparams.id])
                redirect inputparams
            }
            '*' { respond inputparams, [status: CREATED] }
        }
    }

    def edit(Long id) {
        respond inputparamsService.get(id)
    }

    def update(Inputparams inputparams) {
        if (inputparams == null) {
            notFound()
            return
        }

        try {
            inputparamsService.save(inputparams)
        } catch (ValidationException e) {
            respond inputparams.errors, view:'edit'
            return
        }

        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.updated.message', args: [message(code: 'inputparams.label', default: 'Inputparams'), inputparams.id])
                redirect inputparams
            }
            '*'{ respond inputparams, [status: OK] }
        }
    }

    def delete(Long id) {
        if (id == null) {
            notFound()
            return
        }

        inputparamsService.delete(id)

        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.deleted.message', args: [message(code: 'inputparams.label', default: 'Inputparams'), id])
                redirect action:"index", method:"GET"
            }
            '*'{ render status: NO_CONTENT }
        }
    }

    protected void notFound() {
        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.not.found.message', args: [message(code: 'inputparams.label', default: 'Inputparams'), params.id])
                redirect action: "index", method: "GET"
            }
            '*'{ render status: NOT_FOUND }
        }
    }
}
