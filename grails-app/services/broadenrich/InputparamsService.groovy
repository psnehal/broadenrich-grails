package broadenrich

import grails.gorm.services.Service

@Service(Inputparams)
interface InputparamsService {

    Inputparams get(Serializable id)

    List<Inputparams> list(Map args)

    Long count()

    void delete(Serializable id)

    Inputparams save(Inputparams inputparams)



}