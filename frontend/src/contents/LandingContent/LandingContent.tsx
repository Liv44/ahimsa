import { useTranslation } from 'react-i18next';

import GroupDiscussion from '@/assets/illus/group-discussion.png';
import Isolation from '@/assets/illus/isolation.png';
import MarshallRosenberg from '@/assets/illus/marshall-rosenberg.png';
import Mockup from '@/assets/illus/mockup.png';

import ContentBlock from './ContentBlock';
import MethodCard from './MethodCard';

const LandingContent = () => {
  const { t } = useTranslation();

  const ofnrSteps = [
    {
      title: t('landing.ofnr_method.observation.title'),
      description: t('landing.ofnr_method.observation.description'),
      example: t('landing.ofnr_method.observation.example'),
    },
    {
      title: t('landing.ofnr_method.feelings.title'),
      description: t('landing.ofnr_method.feelings.description'),
      example: t('landing.ofnr_method.feelings.example'),
    },

    {
      title: t('landing.ofnr_method.needs.title'),
      description: t('landing.ofnr_method.needs.description'),
      example: t('landing.ofnr_method.needs.example'),
    },
    {
      title: t('landing.ofnr_method.request.title'),
      description: t('landing.ofnr_method.request.description'),
      example: t('landing.ofnr_method.request.example'),
    },
  ];
  return (
    <div className="flex flex-col gap-10">
      <ContentBlock
        title={t('landing.hero.title')}
        descriptions={
          t('landing.hero.descriptions', {
            returnObjects: true,
          }) as string[]
        }
        imageSrc={GroupDiscussion}
        imageAlt=""
        linkText={t('landing.hero.linkText')}
        hrefLink={'/feelings-list'}
        imageLeft={true}
      />
      <ContentBlock
        title={t('landing.block1.title')}
        descriptions={
          t('landing.block1.descriptions', {
            returnObjects: true,
          }) as string[]
        }
        imageSrc={Isolation}
        imageAlt=""
      />
      <ContentBlock
        title={t('landing.block2.title')}
        descriptions={
          t('landing.block2.descriptions', {
            returnObjects: true,
          }) as string[]
        }
        imageSrc={MarshallRosenberg}
        imageAlt=""
        imageLeft={true}
      />
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold">{t('landing.ofnr_method.title')}</h2>
        <p>{t('landing.ofnr_method.description')}</p>
        <ul className="flex flex-col md:flex-row w-full justify-between gap-4 px-4 md:px-10">
          {ofnrSteps.map(
            (step) =>
              step.title &&
              step.description &&
              step.example && (
                <MethodCard
                  key={step.title}
                  title={step.title}
                  description={step.description}
                  example={step.example}
                />
              )
          )}
        </ul>
      </div>
      <ContentBlock
        title={t('landing.block3.title')}
        descriptions={
          t('landing.block3.descriptions', {
            returnObjects: true,
          }) as string[]
        }
        imageSrc={Mockup}
        imageAlt=""
        imageLeft={true}
      />
    </div>
  );
};

export default LandingContent;
