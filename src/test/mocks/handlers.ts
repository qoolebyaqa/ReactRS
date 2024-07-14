import { HttpHandler } from '../../../node_modules/msw/src/core/handlers/HttpHandler';
import { HttpResponse } from '../../../node_modules/msw/src/core/HttpResponse';
import { http } from '../../../node_modules/msw/src/core/http';
export const handlers: HttpHandler[] = [
  http.get('https://pokeapi.co/api/v2/pokemon', () => {
    return HttpResponse.json({
      "results": [{ name: 'Pokemon1', url: 'url1' }, { name: 'Pokemon2', url: 'url2' }, { name: 'Pokemon3', url: 'url3' }]
    }, { status: 200 })
  })
]