import Canvas from '@/components/Canvas';
import List from '@/components/List';

const Home = () => {
	return (
		<main className="flex flex-1 gap-4 p-4 flex-col md:flex-row">
			<Canvas />
			<List />
		</main>
	);
};

export default Home;
