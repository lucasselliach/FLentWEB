export class GamesModel {
    public id: string;
    public name: string;
    public registerDate: string;
    public lent: string;
    public userId: string;
}

export class GamesCreateModel {
    public name: string;
}

export class GamesEditModel {
    public id: string;
    public name: string;
}