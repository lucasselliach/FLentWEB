export class DetectMobile {
    public static detectmob() : boolean {
        if(window.innerWidth <= 800 && window.innerHeight <= 600) {
            return true;
        } else {
            return false;
        }
    }
}