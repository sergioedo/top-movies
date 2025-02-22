import movieProvidersES from '../db/movie_providers_es.json'

export const MOVIE_PROVIDERS = movieProvidersES.results;

export const getMovieProviderById = (id) => {
	return MOVIE_PROVIDERS.find(p => p.provider_id === id)
}