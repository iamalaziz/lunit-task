import '@/styles/globals.css';

import { PropsWithChildren } from 'react';
import type { Metadata } from 'next';

import { Footer } from '@/components/footer';
import { Navbar } from '@/components/navbar/navbar';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { siteConfig } from '@/lib/constant';
import { fonts } from '@/lib/fonts';
import { cn } from '@/lib/utils';
import { Providers } from '@/store/provider';

export const generateMetadata = (): Metadata => ({
	metadataBase: new URL(siteConfig.url()),
	title: {
		default: 'draw.io',
		template: `%s | 'draw.io'`,
	},
	description: 'Canvas App',
	keywords: 'draw',
	robots: { index: true, follow: true },
	icons: {
		icon: '/favicon/favicon.ico',
		shortcut: '/favicon/favicon-16x16.png',
		apple: '/favicon/apple-touch-icon.png',
	},
});

const RootLayout = ({ children }: PropsWithChildren) => {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={cn('min-h-screen font-sans', fonts)}>
				<Providers>
					<ThemeProvider attribute="class">
						<div className="flex h-screen flex-col">
							<Navbar />
							{children}
							<Footer />
						</div>
						<Toaster />
					</ThemeProvider>
				</Providers>
			</body>
		</html>
	);
};

export default RootLayout;
