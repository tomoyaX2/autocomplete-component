export enum RestMethods {
  Get = "GET",
  Post = "POST",
  Put = " PUT",
  Patch = "PATCH",
  Delete = "DELETE",
}

export enum Endpoints {
  // GET
  GetAlbums = "albums",
}

interface GetAlbumsSchema {
  method: RestMethods.Get;
  route: Endpoints.GetAlbums;
  query: { page: number; perPage: number; title?: string };
}

export type EndpointSchema = GetAlbumsSchema;
