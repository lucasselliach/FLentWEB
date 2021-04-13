import { FriendModel } from "./../friend/friends.model"
import { GameModel } from "./../game/games.model"

export class LendsModel {
    public id: string;
    public title: string;
    public friend: FriendModel;
    public game: GameModel;
    public lendingDate: string;
    public deadlineDate: string;
    public returnDate: string;
    public active: string;
    public userId: string;
}

export class LendModel {
    public id: string;
    public title: string;
    public friend: FriendModel;
    public game: GameModel;
    public lendingDate: string;
    public deadlineDate: string;
    public returnDate: string;
    public active: string;
    public userId: string;
}

export class LendsCreateModel {
    public gamerId: string;
    public friendId: string;
    public deadlineDate: string;
}