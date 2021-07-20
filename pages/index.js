import Layout from '@/components/Layout';
import SearchBigHeader from '@/components/SearchBigHeader';

export default function Home(props) {
  // const [data, setData] = useState(props.hotels.data);

  return (
    <>
      <Layout>
        <SearchBigHeader />
      </Layout>
    </>
  );
}
