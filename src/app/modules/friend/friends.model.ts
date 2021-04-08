export class FriendsModel {
    public id: string;
    public name: string;
    public nickName: string;
    public registerDate: string;
    public email: string;
    public phoneNumber01: string;
    public userId: string;
}

export class FriendModel {
    public id: string;
    public name: string;
    public nickName: string;
    public registerDate: string;
    public email: Email;
    public phoneNumber01: PhoneNumber01;
    public userId: string;
}

export class FriendsCreateModel {
    public name: string;
    public nickName: string;
    public email: string;
    public phoneNumber01: string;
}

export class FriendsEditModel {
    public id: string;
    public name: string;
    public nickName: string;
    public email: string;
    public phoneNumber01: string;
}


class Email{
    public value: string;
}

class PhoneNumber01{
    public value: string;
}