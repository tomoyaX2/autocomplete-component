import { RestMethods } from "./api/api-constants";

interface Args<BodyType> {
  url: string;
  method: RestMethods;
  body?: BodyType;
}

export const enhancedFetch = async <ReturnType, BodyType = {}>({
  url,
  method,
  body,
}: Args<BodyType>): Promise<ReturnType> => {
  const requestData = await fetch(url, {
    method,
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await requestData.json();

  return data as ReturnType;
};
