export interface FeedbackCreateData {
    type:string;
    comment: string;
    screenshot?: string;
}

export interface FeedbacksRepository {
    //quais metodos existem, quais ações a aplicação pode fazer com o feedback com o bdd
    create: (data: FeedbackCreateData) => Promise<void>; //como é funcção async, se torna promise
}