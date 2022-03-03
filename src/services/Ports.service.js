import { cargoApi } from '@/service/axios'

class PortsService {

    async getPorts(params) {

        const { data, status } = await cargoApi.get('/ports', {
            params: params
        })

        return { data, status }

    }
}

export default new PortsService()