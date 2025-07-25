import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

import WordSelectionModal from '@/components/Discussion/WordSelectionModal';
import { DiscussionStepKey } from '@/domain/entities/Step';
import { useCompleteAndSaveDiscussion } from '@/hooks/discussion/useCompleteAndSaveDiscussion';
import useDiscussionStore, {
  discussionStore,
} from '@/hooks/discussion/useDiscussionStore';

const DiscussionStepsAccordion = () => {
  const { discussion } = useDiscussionStore();
  const { mutateAsync: createDiscussion } = useCompleteAndSaveDiscussion();
  const steps = discussion.steps;
  const { t } = useTranslation();
  const handleAccordionChange = (value: string) => {
    setError(false);
    setActiveStep(Number(value.split('-')[1]));
  };
  const descriptionRef = useRef<HTMLButtonElement>(null);

  const [content, setContent] = useState<string[]>(
    steps.map((step) => step.content)
  );
  const [error, setError] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState<number>(0);

  const navigate = useNavigate();

  const handleNextStep = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(false);
    if (content[activeStep] === '') {
      setError(true);
      return;
    }
    setActiveStep(activeStep + 1);
    steps[activeStep].updateContent(content[activeStep]);

    discussionStore.setState((state) => ({
      ...state,
      discussion,
    }));
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
      if (descriptionRef.current) {
        descriptionRef.current.focus();
      }
    } else {
      // TODO : add a verification to check if the discussion is completed
      if (content.every((step) => step !== '')) {
        createDiscussion(undefined, {
          onSuccess: () => {
            navigate('/discussion/summary');
          },
        });
      } else {
        const index = content.findIndex((step) => step === '');
        setActiveStep(index);
        setError(true);
      }
    }
  };

  return (
    <Accordion
      type="single"
      collapsible
      className="w-full max-w-2xl mx-auto bg-dark-blue text-white p-4 rounded-lg"
      defaultValue={`item-0`}
      value={`item-${activeStep}`}
      onValueChange={handleAccordionChange}
    >
      {steps.map((step, index) => (
        <AccordionItem value={`item-${index}`} key={index}>
          <AccordionTrigger
            ref={activeStep === index - 1 ? descriptionRef : undefined}
          >
            {index + 1}. {t(`discussion-page.step.${step.key}.title`)}
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <form
              title={t(`discussion-page.step.${steps[index].key}.title`)}
              className="flex flex-col gap-4 bg-dark-blue mt-1 text-white px-4 rounded-lg"
              onSubmit={handleNextStep}
            >
              <p className="text-sm">
                {t(`discussion-page.step.${steps[index].key}.description`)}
              </p>
              {(steps[index].key === DiscussionStepKey.NEEDS ||
                steps[index].key === DiscussionStepKey.FEELINGS) && (
                <WordSelectionModal
                  currentContent={content[index]}
                  translationKey={steps[index].key}
                  activeStep={index}
                  setContent={setContent}
                />
              )}
              <Label htmlFor={steps[index].key} className="sr-only">
                {t(`discussion-page.step.${steps[index].key}.label`)}
              </Label>
              <Textarea
                className={`bg-white text-black text-sm ${
                  error ? 'border-red-500 border-2' : ''
                }`}
                name={steps[index].key}
                id={steps[index].key}
                placeholder={t(
                  `discussion-page.step.${steps[index].key}.placeholder`
                )}
                aria-label={t(
                  `discussion-page.step.${steps[index].key}.aria-label`
                )}
                value={content[index]}
                onChange={(e) =>
                  setContent((prev) => {
                    const newContent = [...prev];
                    newContent[index] = e.target.value;
                    return newContent;
                  })
                }
              />
              {error && (
                <p className="text-red-500 text-sm text-center bg-white rounded-lg p-2 mx-auto">
                  {t('discussion-page.step.error')}
                </p>
              )}
              <Button
                type="submit"
                className="bg-orange text-black hover:bg-orange/80 max-w-40 mx-auto"
                disabled={!content}
                aria-label={
                  index < steps.length - 1
                    ? t('discussion-page.step.button-next-aria')
                    : t('discussion-page.step.button-finish-aria')
                }
              >
                {index < steps.length - 1
                  ? t('discussion-page.step.button-next')
                  : t('discussion-page.step.button-finish')}
              </Button>
            </form>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default DiscussionStepsAccordion;
