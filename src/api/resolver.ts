import { AxiosResponse } from "axios";

interface ResolvedResult<T> {
  data: T | null;
  error: any | null;
}

const resolve = async <T>(
  promise: Promise<AxiosResponse<T>>
): Promise<ResolvedResult<T>> => {
  const resolved: ResolvedResult<T> = {
    data: null,
    error: null,
  };

  try {
    resolved.data = (await promise).data as T;
  } catch (e) {
    resolved.error = e;
  }
  return resolved;
};

export { resolve };
