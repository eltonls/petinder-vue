export default class User {
  constructor(
    public username?: string ,
    public email?: string ,
    public password?: string,
    public adress?: string,
    public phone?: string ,
    public id?: string,
    public auth_id? :string,
    public created_at?: Date,
    public image_url?: string
  ) {}
}


