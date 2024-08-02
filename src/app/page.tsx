import Canvas from '@/components/canvas';
import List from '@/components/list';

const Home = () => {
	return (
		<main className="flex flex-1 gap-4 p-4">
			<Canvas />
			<List />
		</main>
	);
};

export default Home;
