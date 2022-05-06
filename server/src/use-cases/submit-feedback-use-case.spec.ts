import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

//function espiã
const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const  submitFeedback =  new SubmitFeedbackUseCase(
     { create:   createFeedbackSpy},
     { sendMail: sendMailSpy }
)


describe('Submit feedback', () => {


     it('should be able to submit a feedback', async () => {

          await expect(submitFeedback.execute( {
               type: 'BUG',
               comment: 'example comment',
               screenshot: 'data:imagem/png;base64',
          })).resolves.not.toThrow(); //espera a função até o seu final, não disparando erro.

          //espero que a função tenha sido chamada
          expect(createFeedbackSpy).toHaveBeenCalled();
          expect(sendMailSpy).toHaveBeenCalled();
     });

     // ======================================

     it('should not be able to submit feedback without type', async () => {

         await expect(submitFeedback.execute( {
              type: '',
              comment: 'example comment',
              screenshot: 'data:imagem/png;base64',
         })).rejects.toThrow(); //espera a função até o seu final, não disparando erro.
    });

     // ======================================

    it('should not be able to submit feedback without comment', async () => {

          await expect(submitFeedback.execute( {
               type: 'BUG',
               comment: '',
               screenshot: 'data:imagem/png;base64',
          })).rejects.toThrow(); //espera a função até o seu final, não disparando erro.
     });

     it('should not be able to submit feedback with an invalid screenshot', async () => {

          await expect(submitFeedback.execute( {
               type: 'BUG',
               comment: 'Tá tudo bugado',
               screenshot: 'test.jpg',
          })).rejects.toThrow(); //espera a função até o seu final, não disparando erro.
     });
});