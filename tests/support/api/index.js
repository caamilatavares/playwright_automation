import { expect } from '@playwright/test'

export class Api {

    constructor(request) {
        this.request = request
        this.companyId = undefined
    }

    async createLead(email, name) {
        const newLead = await this.request.post('http://localhost:3333/leads', {
            data: {
                email: email,
                name: name
            }
        })

        expect(newLead.ok()).toBeTruthy()
    }

    async createSession(user, password) {
        const newSession = await this.request.post('http://localhost:3333/sessions', {
            data: {
                email: user,
                password: password
            }
        })

        expect(newSession.ok()).toBeTruthy()

        const body = JSON.parse(await newSession.text())

        return this.token = body.token
    }

    async getCompanyId(token, companyName) {
        const getCompany = await this.request.get('http://localhost:3333/companies', {
            headers: {
                Authorization: 'Bearer ' + token,
                Accept: 'application/json, text/plain, */*'
            },
            params: {
                name: companyName
            }
        })

        expect(getCompany.ok()).toBeTruthy()

        const body = JSON.parse(await getCompany.text())

        this.companyId = body.data[0].id

        return this.companyId
    }

    async createMovie(token, companyId, movie) {
        const newMovie = await this.request.post('http://localhost:3333/movies', {
            headers: {
                ContentType: 'multipart/form-data',
                Authorization: 'Bearer ' + token,
                Accept: 'application/json, text/plain, */*'
            },
            multipart: {
                title: movie.title,
                overview: movie.overview,
                company_id: companyId,
                release_year: movie.release_year,
                featured: movie.featured
            }
        })
        expect(newMovie.ok()).toBeTruthy()
        console.log(await newMovie.text())
    }
}
