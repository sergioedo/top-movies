import GenreAction from "@components/icons/GenreAction.astro";
import GenreAnime from "@components/icons/GenreAnime.astro";
import GenreComedy from "@components/icons/GenreComedy.astro";
import GenreFamily from "@components/icons/GenreFamily.astro";
import GenreRomance from "@components/icons/GenreRomance.astro";
import GenreFantasy from "@components/icons/GenreFantasy.astro";
import GenreHorror from "@components/icons/GenreHorror.astro";
import GenreSciFi from "@components/icons/GenreSciFi.astro";
import GenreThriller from "@components/icons/GenreThriller.astro";
import TopMovie from "@components/icons/TopMovie.astro";

export const GENRES = ['',
	'action', 'thriller', 'horror', 'fantasy', 'scifi', 'anime', 'family', 'comedy', 'romance'
]

export const GENRE_TITLE = {
	'': {
		es: 'Pelis',
		en: 'Movies'
	},
	'action': {
		es: 'Acción',
		en: 'Action'
	},
	'horror': {
		es: 'Terror',
		en: 'Horror'
	},
	'scifi': {
		es: 'Ficción',
		en: 'Sci-Fi'
	},
	'anime': {
		es: 'Anime',
		en: 'Anime'
	},
	'thriller': {
		es: 'Thriller',
		en: 'Thriller'
	},
	'fantasy': {
		es: 'Fantasía',
		en: 'Fantasy'
	},
	'family': {
		es: 'Familia',
		en: 'Family'
	},
	'comedy': {
		es: 'Comedia',
		en: 'Comedy'
	},
	'romance': {
		es: 'Romance',
		en: 'Romance'
	}
}

export const GENRE_IDS = {
	'action': [28, 12, 10752, 37], //Action, Adventure, War, Western
	'horror': [27],
	'scifi': [878],
	'anime': [16],
	'thriller': [53, 80, 9648], //Thriller, Crime, Mistery
	'fantasy': [14],
	'family': [10751],
	'comedy': [35],
	'romance': [10749, 18], //	Romance, Drama
}

export const GENRE_ICONS = {
	'': TopMovie,
	'action': GenreAction,
	'horror': GenreHorror,
	'scifi': GenreSciFi,
	'anime': GenreAnime,
	'thriller': GenreThriller,
	'fantasy': GenreFantasy,
	'family': GenreFamily,
	'comedy': GenreComedy,
	'romance': GenreRomance
}

const lang = "es";
export const genreTitle = (genre) => `${GENRE_TITLE[genre || ""][lang]}`;