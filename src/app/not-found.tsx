import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Title } from "@/components/shared/typography/title";

export default function NotFoundPage() {
	return (
		<>
			<Title>404 - Page Not Found</Title>
			<p className={"text-lg"}>Sorry, that page does not exist.</p>
			<Link href={"/"}>
				<Button className={"text-xl text-primary"} variant={"link"}>
					Go Home
				</Button>
			</Link>
		</>
	);
}
