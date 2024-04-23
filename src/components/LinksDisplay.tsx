import {NavLink} from 'react-router-dom';

type LinksDisplayProps = {
	link: string;
	name: string;
};

export default function LinksDisplay({link, name}: LinksDisplayProps) {
	return (
		<NavLink
			to={link}
			className={({isActive}) =>
				isActive
					? 'text-gray-300 uppercase font-bold border-b-2'
					: 'text-white uppercase font-bold'
			}
		>
			{name}
		</NavLink>
	);
}
