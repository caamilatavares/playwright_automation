import { expect } from '@playwright/test';

export class Api {    
    constructor(request) {
        this.request = request
        this.baseUrlApi = process.env.BASE_API
        this.user = process.env.ADMIN_USER
        this.password = process.env.ADMIN_PASSWORD
    }

    async createLead(email, name) {
        const newLead = await this.request.post(this.baseUrlApi + "/leads", {
            data: {
                email: email,
                name: name
            }
        })

        expect(newLead.ok()).toBeTruthy()
    }

    async createSession() {
        const email = this.user
        const password = this.password
        
        const newSession = await this.request.post(this.baseUrlApi + "/sessions", {
            data: {
                email: email,
                password: password
            }
        })

        expect(newSession.ok()).toBeTruthy()

        const body = JSON.parse(await newSession.text())
            const token = body.token
            const userId = body.user.id

        return {
            token: token, 
            userId: userId
        }
    }

    async getCompanyId(token, companyName) {
        await this.createSession() 

        const getCompany = await this.request.get(`${this.baseUrlApi}/companies`, {
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

        const companyId = body.data[0].id

        return companyId
    }

    async createMovie(token, companyId, movie) {
        const newMovie = await this.request.post(`${this.baseUrlApi}/movies`, {
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
    }

    async createTvShow(token, companyId, tvShow) {
        const newTvShow = await this.request.post(`${this.baseUrlApi}/tvshows`, {
            headers: {
                ContentType: 'multipart/form-data',
                Authorization: 'Bearer ' + token,
                Accept: 'application/json, text/plain, */*'
            },
            multipart: {
                title: tvShow.title,
                overview: tvShow.overview,
                company_id: companyId,
                release_year: tvShow.release_year,
                seasons: tvShow.seasons,
                featured: tvShow.featured
            }
        })
        expect(newTvShow.ok()).toBeTruthy()
    } 
}
