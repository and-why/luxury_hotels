import Container from '@/components/Container';
import Layout from '@/components/Layout';
import PromotionBlock from '@/components/PromotionBlock';

export default function SoloCitiesPage(props) {
  const data = [
    {
      name: 'Bangkok-Thailand',
      code: 'DMK',
      guests: 1,
      known:
        'Eat like a local and experience streets bustling with vendors selling delicacies to enjoy',
    },
    {
      name: 'Porto-Portugal',
      code: 'OPO',
      guests: 1,
      known:
        'Warm sun, good food, and bustling streets. The country’s second city is famous for its port wine production',
    },
    {
      name: 'Reykjavik-Iceland',
      code: 'RKV',
      guests: 1,
      known:
        'Whether it’s to see the northern lights or go whale watching, Iceland will satisfy any adventurous traveller.',
    },
    {
      name: 'Budapest-Hungary',
      code: 'BUD',
      guests: 1,
      known:
        'one of the most photogenic cities in Europe. The dramatic skyline that Budapest is most famous for is peppered with 19th-century architectural wonders alongside the Danube River',
    },
  ];
  return (
    <Layout search={false}>
      <div>
        <PromotionBlock title={'Travel alone in these awesome cities!'} data={data} />
      </div>
    </Layout>
  );
}
