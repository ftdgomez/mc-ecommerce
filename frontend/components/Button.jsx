import Link from 'next/link';

export const Button = ({ type = null, children, href, className }) => {
	const classNames =
		'py-2 px-4 text-center bg-primary text-white rounded w-full font-bold hover:bg-secondary transition-colors';

	if (href) {
		return (
			<Link href={href}>
				<a className={`${classNames} ${className && className}`}>{children}</a>
			</Link>
		);
	} else {
		return (
			<button
				href={href && href}
				type={type}
				className={`${classNames} ${className && className}`}>
				{children}
			</button>
		);
	}
};
