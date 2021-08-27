import Layout from '@/components/Layout';
import PromotionBlock from '@/components/PromotionBlock';
import PromotionCardFull from '@/components/PromotionCardFull';
import SearchBigHeader from '@/components/SearchBigHeader';

export default function Home(props) {
  const data = [
    {
      name: 'Melbourne',
      code: 'MEL',
      known: 'Foodie central, take your pick of a number of top restaurants.',
    },
    {
      name: 'Sydney',
      code: 'SYD',
      known: 'Famous for its twin landmarks, and gorgeous harbour.',
    },
    {
      name: 'Rome',
      code: 'FCO',
      known: 'Stunning architecture; Colleseum, Pantheon, and Trevi Fountain to name a few.',
    },
    {
      name: 'Paris',
      code: 'LBG',
      known: 'The Eiffel Tower, Louve, Notre Damn, Moulin Rouge, pastries need we go on?',
    },
  ];
  return (
    <Layout search={false}>
      <div>
        <SearchBigHeader />
        <PromotionBlock title={'Popular Destinations'} data={data} />
        <PromotionCardFull />
      </div>
    </Layout>
  );
}
