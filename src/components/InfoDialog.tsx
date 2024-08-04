import { Icons } from './Icons';

import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';

const InfoDialog = () => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="px-2" variant="secondary">
					<Icons.info />
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>About</DialogTitle>
					<DialogDescription>
						<p className="mb-2 text-left">
							This project is built to pass the Assignment Step in the
							interview process.
						</p>
					</DialogDescription>

					<DialogTitle>Tasks</DialogTitle>
					<DialogDescription>
						<ul className="tasks-list pl-4 text-left">
							<li>
								<strong>Make two components</strong>: Canvas & List
							</li>
							<li>
								<strong>Canvas</strong>:
								<ul className="tasks-list pl-4">
									<li>The user can draw circles.</li>
									<li>
										The beginning and the end points of the
										circle should get connected to form a
										full circle.
									</li>
								</ul>
							</li>
							<li>
								<strong>List</strong>:
								<ul className="tasks-list pl-4">
									<li>
										Finished circle names are displayed in
										the List component.
									</li>
								</ul>
							</li>
							<li>
								<strong>Circle Interaction</strong>:
								<ul className="tasks-list pl-4">
									<li>
										If clicked inside a circle, it gets
										removed from the canvas.
									</li>
									<li>
										If two circles overlap, the one added
										last gets removed.
									</li>
								</ul>
							</li>
						</ul>
					</DialogDescription>
				</DialogHeader>

				<DialogFooter>
					<Button type="button" className="flex gap-2">
						<Icons.github />
						<a
							href="https://github.com/iamalaziz/lunit-task"
							target="_blank"
							rel="noopener noreferrer"
						>
							Source Code
						</a>
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default InfoDialog;
