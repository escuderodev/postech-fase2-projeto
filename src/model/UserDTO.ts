export class UserDTO {
    private id?: string
    private name?: string
    private email?: string

    constructor(id?: string, name?: string, email?: string) {
        this.id = id
        this.name = name
        this.email = email
    }
}