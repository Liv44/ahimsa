interface IUserConstructorProps {
  id: string;
  pseudo: string;
  email: string;
}

class User {
  private _id: string;
  private _email: string;
  private _pseudo: string;

  constructor({ id, email, pseudo }: IUserConstructorProps) {
    this._id = id;
    this._email = email;
    this._pseudo = pseudo;
  }

  get id(): string {
    return this._id;
  }

  get email(): string {
    return this._email;
  }

  get pseudo(): string {
    return this._pseudo;
  }
}

export default User;
