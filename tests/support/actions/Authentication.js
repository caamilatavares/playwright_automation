// Class to define a process of authentication by setting local storage data
export class Auth {
    constructor(page){
        this.page = page
        this.userEmail = process.env.ADMIN_USER
        this.userName = process.env.ADMIN_NAME
    }

   async setSessionStorage(token, userId) {
        await this.page.evaluate(
            ({ token, userId, userName, userEmail }) => {
                sessionStorage.setItem('@ZombiePlus:token', token)

                sessionStorage.setItem(
                    '@ZombiePlus:user',
                    JSON.stringify({
                        id: userId,
                        name: userName,
                        email: userEmail
                    })
                )
            },
            {
                token,
                userId,
                userName: this.userName,
                userEmail: this.userEmail
            }
        )
    }
}