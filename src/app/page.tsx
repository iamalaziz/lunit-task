import Canvas from '@/components/Canvas';
import List from '@/components/List';

const Home = () => {
	return (
		<main className="flex flex-1 flex-col gap-4 p-4 md:flex-row">
			<Canvas />
			<List />
		</main>
	);
};

export default Home;
