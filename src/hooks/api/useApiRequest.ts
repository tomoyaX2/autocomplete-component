import { useCallback, useState } from "react";
import { EndpointSchema } from "../../shared/api/api-constants";
import { enhancedFetch } from "../../shared/enhanced-fetch";

// this should come from env
const baseUrl = "https://mangamischief.com/backend";

export const useApiRequest = () => {
  const [isLoading, setLoading] = useState(false);

  const fetch = useCallback(async <ReturnType>(args: EndpointSchema) => {
    setLoading(true);
    let url = `${baseUrl}/${args.route}`;

    if ("query" in args) {
      const entries = Object.entries(args.query);
      entries
        .filter(([_, value]) => !!value)
        .forEach(([key, value], index) => {
          if (index === 0) {
            url += `?${key}=${value}`;
          } else {
            url += `&${key}=${value}`;
          }
        });
    }

    const data = await enhancedFetch<ReturnType>({
      url,
      method: args.method,
      // body: "body" in args ? args.body : undefined,
    });

    setLoading(false);
    return data;
  }, []);

  return { fetch, isLoading };
};
