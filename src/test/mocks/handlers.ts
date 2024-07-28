import { HttpHandler } from '../../../node_modules/msw/src/core/handlers/HttpHandler';
import { HttpResponse } from '../../../node_modules/msw/src/core/HttpResponse';
import { http } from '../../../node_modules/msw/src/core/http';
export const handlers: HttpHandler[] = [
  http.get('https://pokeapi.co/api/v2/pokemon', () => {
    return HttpResponse.json({
      "results": new Array(15).fill(1).map((val, index) => val = { name: `bulbasaur${index}`, url: `url${index}` })
    }, { status: 200 })
  })
]