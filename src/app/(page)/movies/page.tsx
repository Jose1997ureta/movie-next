import { ListGenderMovie } from "./_components/list-gender-movie";
import { FilterGenderMovie } from "./_components/filter-gender-movie";

export default function MoviePage() {
	return (
		<div className="px-5 lg:px-10">
			<ListGenderMovie />
			<FilterGenderMovie />
		</div>
	);
}
