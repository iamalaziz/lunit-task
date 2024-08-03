export const Footer = () => {
	return (
		<footer className="text-muted-foreground w-full py-4 text-center text-sm">
			© {new Date().getFullYear()} By{' '}
			<a href="https://github.com/iamalaziz" target="_blank" className="font-semibold text-gray-600">
				Abdulaziz Mashrabov
			</a>
		</footer>
	);
};
