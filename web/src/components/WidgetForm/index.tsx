import { useState } from "react";

import { CloseButton } from "../CloseButton";
import bugImageUrl from '../../assets/images/bug.svg';
import ideaImageUrl from '../../assets/images/idea.svg';
import thoughtImageUrl from '../../assets/images/thought.svg';
import { FeedbackTypeStep } from "./Steps/FeedbackTypeStep";
import { FeedbackContentStep } from "./Steps/FeedbackContentStep";
import { FeedbackSuccessStep } from "./Steps/FeedbackSuccessStep";

export const feedbackTypes = {
    BUG: {
        title: 'problema',
        image: {
            source: bugImageUrl,
            alt: 'imagem de um inseto'
        }
    },
    IDEA: {
        image: {
            source: ideaImageUrl,
            alt: 'imagem de uma lâmpada'
        },
        title: 'ideia'
    },
    OTHER: {
        title: 'outro',
        image: {
            source: thoughtImageUrl,
            alt: 'imagem de um pensamento'
        }
       
    },
};
//retorna a tipagem do feedbacktypes
export type FeedbackType = keyof typeof feedbackTypes;

export function WidgetForm() {

    const [feedbackType, setFeedbackType] = useState<FeedbackType | null >(null);
    const [feedbackSent, setFeedbackSent] = useState(false);

    function handleRestartFeedback() {
        setFeedbackSent(false);
        setFeedbackType(null);
    }

    return (

        <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg
         w-[calc(100vw-2rem)] md:w-auto">
            
            {feedbackSent ? (
                <FeedbackSuccessStep onFeedbackRestartRequested={handleRestartFeedback} />
            ) : (
              <>
                {!feedbackType ? (
                <FeedbackTypeStep onFeedbackTypeChanged={setFeedbackType} />
            ) : (
                    <FeedbackContentStep 
                    feedbackType={feedbackType}
                    onFeedbackRestartRequested={handleRestartFeedback}
                    onFeedbackSent={() => setFeedbackSent(true)}
                    />
                )}
              </>
            )}

            <footer className="text-ms text-neutral-400">
                <p> <a className="underline">copyright: 2022</a> - todos os direitos reservados</p>
            </footer>
        
        
        </div>

       

    );
}
// vw - largura total da tela - 2 rem