export class Usuario{
    constructor(
        public nombre: string,
        public email: string,
        public password?: string,
        public rol?: string,
        public img?: string,
        public google?: boolean,
        public uid?: string,
    ){
    }
}