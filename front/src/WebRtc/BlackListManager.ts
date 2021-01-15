class BlackListManager {
    private list: number[] = []; //todo: localstorage
    
    isBlackListed(userId: number) {
        return this.list.indexOf(userId) > -1;
    }
    
    blackList(userId: number): void {
        if (this.isBlackListed(userId)) return;
        this.list.push(userId);
    }
}

export const blackListManager = new BlackListManager();