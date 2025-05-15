export class UserEntity {
    constructor(
        public name: string,
        public surname: string,
        public phone: number,
        public email: string,
        public password: string,
        public isVisible: boolean = false,
        public isActive: boolean = false,

    ) {
    }
}