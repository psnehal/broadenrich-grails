package broadenrich

import grails.testing.mixin.integration.Integration
import grails.gorm.transactions.Rollback
import spock.lang.Specification
import org.hibernate.SessionFactory

@Integration
@Rollback
class InputparamsServiceSpec extends Specification {

    InputparamsService inputparamsService
    SessionFactory sessionFactory

    private Long setupData() {
        // TODO: Populate valid domain instances and return a valid ID
        //new Inputparams(...).save(flush: true, failOnError: true)
        //new Inputparams(...).save(flush: true, failOnError: true)
        //Inputparams inputparams = new Inputparams(...).save(flush: true, failOnError: true)
        //new Inputparams(...).save(flush: true, failOnError: true)
        //new Inputparams(...).save(flush: true, failOnError: true)
        assert false, "TODO: Provide a setupData() implementation for this generated test suite"
        //inputparams.id
    }

    void "test get"() {
        setupData()

        expect:
        inputparamsService.get(1) != null
    }

    void "test list"() {
        setupData()

        when:
        List<Inputparams> inputparamsList = inputparamsService.list(max: 2, offset: 2)

        then:
        inputparamsList.size() == 2
        assert false, "TODO: Verify the correct instances are returned"
    }

    void "test count"() {
        setupData()

        expect:
        inputparamsService.count() == 5
    }

    void "test delete"() {
        Long inputparamsId = setupData()

        expect:
        inputparamsService.count() == 5

        when:
        inputparamsService.delete(inputparamsId)
        sessionFactory.currentSession.flush()

        then:
        inputparamsService.count() == 4
    }

    void "test save"() {
        when:
        assert false, "TODO: Provide a valid instance to save"
        Inputparams inputparams = new Inputparams()
        inputparamsService.save(inputparams)

        then:
        inputparams.id != null
    }
}
