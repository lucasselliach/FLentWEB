export class StringUtils {
    public static isNullOrEmpty(val: string) : boolean {
        if (val === undefined || val === null || val.trim() === '') {
            return true;
        }
        return false;
    };
}

// '1' == 1 = true
// '1' != 1 = false

// '1' === 1 = false
// '1' !== 1 = true
