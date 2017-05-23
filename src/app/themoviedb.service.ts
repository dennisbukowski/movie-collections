import { Injectable } from '@angular/core';
import { Jsonp } from '@angular/http';
import { tmdbConfig } from './tmdbConfig';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TheMovieDBService {
    private apikey = '&api_key=' + tmdbConfig.apiKey;
    private baseUrl = 'https://api.themoviedb.org/3/';
    private sortByPopularity = '&sort_by=popularity.desc';
    private jsonpCallback = '?callback=JSONP_CALLBACK';

    constructor(private jsonp: Jsonp) {}

    public searchMovies(query: string) {
      return this.jsonp.get(this.baseUrl + 'search/movie' + this.jsonpCallback + '&query=' + query + this.sortByPopularity + this.apikey).map(result => result.json());
    }

  }
