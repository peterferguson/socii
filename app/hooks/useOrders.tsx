import { OrderObject } from "@alpaca/models";
import { useAuth } from "@hooks";
import { fetcher } from "@utils/fetcher";
import useSWR from "swr";


export const useOrders = () => {
  const { user } = useAuth();
  const alpacaId = "933ab506-9e30-3001-8230-50dc4e12861c"; // - user?.alpacaID

  const { data: orders, error } = useSWR<OrderObject[]>(
    user?.token && alpacaId ? ["/api/alpaca/orders", user.token, alpacaId] : null,
    (url, token, alpacaId) => {
      const res = fetcher(url, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify({ accountId: alpacaId }),
      });
      return res;
    },
    { refreshInterval: 3600 * 1000, refreshWhenOffline: false }
  );
  return { orders, error };
};
